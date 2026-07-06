import { useMemo, useState } from 'react'

type JsonPrimitive = string | number | boolean | null
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue }

type Props = {
  className?: string
}

const DEFAULT_JSON_TEXT = `{
  "company": {
    "name": "Albert Ontology",
    "active": true,
    "domains": ["education", "services"],
    "metadata": {
      "version": "v1",
      "owner": "platform-team"
    }
  }
}`

const MAX_RENDER_NODES = 3000
const RENDER_WARNING_TEXT =
  'Large JSON detected. Rendering has been truncated for performance. Refine search or collapse nodes.'

function isContainer(value: JsonValue): value is JsonValue[] | { [key: string]: JsonValue } {
  return Array.isArray(value) || (typeof value === 'object' && value !== null)
}

function formatPath(parentPath: string, segment: string | number): string {
  if (typeof segment === 'number') {
    return `${parentPath}[${segment}]`
  }

  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(segment)
    ? `${parentPath}.${segment}`
    : `${parentPath}[${JSON.stringify(segment)}]`
}

function parseInput(text: string): { value: JsonValue | null; error: string | null } {
  const trimmed = text.trim()
  if (!trimmed) {
    return { value: null, error: 'Enter JSON content to continue.' }
  }

  try {
    const parsed = JSON.parse(trimmed) as JsonValue
    return { value: parsed, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { value: null, error: `Invalid JSON: ${error.message}` }
    }

    return { value: null, error: 'Invalid JSON input.' }
  }
}

function collectContainerPaths(value: JsonValue, path = '$', acc = new Set<string>()): Set<string> {
  if (!isContainer(value)) {
    return acc
  }

  acc.add(path)

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectContainerPaths(item, formatPath(path, index), acc)
    })
    return acc
  }

  Object.entries(value).forEach(([key, entry]) => {
    collectContainerPaths(entry, formatPath(path, key), acc)
  })

  return acc
}

function normalizeSearch(value: string): string {
  return value.trim().toLowerCase()
}

function textMatches(text: string, search: string): boolean {
  return search.length > 0 && text.toLowerCase().includes(search)
}

function nodeMatchesSearch(value: JsonValue, search: string, key?: string): boolean {
  if (search.length === 0) {
    return true
  }

  if (key && textMatches(key, search)) {
    return true
  }

  if (!isContainer(value)) {
    return textMatches(String(value), search)
  }

  if (Array.isArray(value)) {
    return value.some((item) => nodeMatchesSearch(item, search))
  }

  return Object.entries(value).some(([entryKey, entryValue]) => nodeMatchesSearch(entryValue, search, entryKey))
}

function HighlightText({ text, search }: { text: string; search: string }) {
  if (!search) {
    return <>{text}</>
  }

  const lower = text.toLowerCase()
  const index = lower.indexOf(search)
  if (index === -1) {
    return <>{text}</>
  }

  const before = text.slice(0, index)
  const match = text.slice(index, index + search.length)
  const after = text.slice(index + search.length)

  return (
    <>
      {before}
      <mark>{match}</mark>
      {after}
    </>
  )
}

function JsonViewer({ className }: Props) {
  const [inputText, setInputText] = useState(DEFAULT_JSON_TEXT)
  const initialParsed = useMemo(() => parseInput(DEFAULT_JSON_TEXT), [])
  const [parsedJson, setParsedJson] = useState<JsonValue | null>(initialParsed.value)
  const [parseError, setParseError] = useState<string | null>(initialParsed.error)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPath, setSelectedPath] = useState<string>('')
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(() => {
    return initialParsed.value ? new Set(['$']) : new Set()
  })

  const normalizedSearch = normalizeSearch(searchTerm)

  function updateParsedState(nextValue: JsonValue, nextText: string) {
    setParsedJson(nextValue)
    setInputText(nextText)
    setParseError(null)
    setExpandedPaths(new Set(['$']))
    setSelectedPath('$')
  }

  function handleParse() {
    const result = parseInput(inputText)
    if (result.error || result.value === null) {
      setParseError(result.error)
      return
    }

    updateParsedState(result.value, JSON.stringify(result.value, null, 2))
  }

  function handlePretty() {
    const result = parseInput(inputText)
    if (result.error || result.value === null) {
      setParseError(result.error)
      return
    }

    updateParsedState(result.value, JSON.stringify(result.value, null, 2))
  }

  function handleMinify() {
    const result = parseInput(inputText)
    if (result.error || result.value === null) {
      setParseError(result.error)
      return
    }

    updateParsedState(result.value, JSON.stringify(result.value))
  }

  function handleClear() {
    setInputText('')
    setParsedJson(null)
    setParseError(null)
    setSearchTerm('')
    setSelectedPath('')
    setExpandedPaths(new Set())
  }

  function togglePath(path: string) {
    setExpandedPaths((previous) => {
      const next = new Set(previous)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  function handleExpandAll() {
    if (!parsedJson) {
      return
    }
    setExpandedPaths(collectContainerPaths(parsedJson))
  }

  function handleCollapseAll() {
    if (!parsedJson) {
      setExpandedPaths(new Set())
      return
    }
    setExpandedPaths(new Set(['$']))
  }

  const treeOutput = useMemo(() => {
    if (!parsedJson) {
      return {
        truncated: false,
        content: null as JSX.Element | null,
      }
    }

    let renderedNodeCount = 0
    let truncated = false

    function renderNode(value: JsonValue, path: string, keyLabel?: string): JSX.Element | null {
      if (normalizedSearch && !nodeMatchesSearch(value, normalizedSearch, keyLabel)) {
        return null
      }

      renderedNodeCount += 1
      if (renderedNodeCount > MAX_RENDER_NODES) {
        truncated = true
        return null
      }

      const isSelected = selectedPath === path
      const displayKey = keyLabel ?? (path === '$' ? '$' : path)

      if (!isContainer(value)) {
        const scalarText = JSON.stringify(value)
        return (
          <li key={path} className={`json-node ${isSelected ? 'json-node-selected' : ''}`}>
            <button
              type="button"
              className="json-node-select"
              aria-label={`Select node ${path}`}
              onClick={() => setSelectedPath(path)}
            >
              <span className="json-key">
                <HighlightText text={displayKey} search={normalizedSearch} />
              </span>
              <span className={`json-value ${textMatches(scalarText, normalizedSearch) ? 'json-match' : ''}`}>
                <HighlightText text={scalarText} search={normalizedSearch} />
              </span>
            </button>
          </li>
        )
      }

      const isExpanded = expandedPaths.has(path)
      const children = Array.isArray(value)
        ? value.map((item, index) => ({
            node: item,
            label: `[${index}]`,
            path: formatPath(path, index),
          }))
        : Object.entries(value).map(([entryKey, entryValue]) => ({
            node: entryValue,
            label: entryKey,
            path: formatPath(path, entryKey),
          }))

      return (
        <li key={path} className={`json-node ${isSelected ? 'json-node-selected' : ''}`}>
          <div className="json-node-row">
            <button
              type="button"
              className="json-toggle"
              aria-label={`Toggle node ${path}`}
              onClick={() => togglePath(path)}
            >
              {isExpanded ? '-' : '+'}
            </button>
            <button
              type="button"
              className="json-node-select"
              aria-label={`Select node ${path}`}
              onClick={() => setSelectedPath(path)}
            >
              <span className={`json-key ${textMatches(displayKey, normalizedSearch) ? 'json-match' : ''}`}>
                <HighlightText text={displayKey} search={normalizedSearch} />
              </span>
              <span className="json-meta">{Array.isArray(value) ? `Array(${value.length})` : 'Object'}</span>
            </button>
          </div>
          {isExpanded ? (
            <ul className="json-children">
              {children
                .map((child) => renderNode(child.node, child.path, child.label))
                .filter((entry): entry is JSX.Element => entry !== null)}
            </ul>
          ) : null}
        </li>
      )
    }

    const content = renderNode(parsedJson, '$')
    return {
      truncated,
      content,
    }
  }, [expandedPaths, normalizedSearch, parsedJson, selectedPath])

  return (
    <section className={`json-viewer ${className ?? ''}`.trim()} aria-label="JSON viewer">
      <header className="json-viewer-header">
        <h2>JSON Viewer & Formatter</h2>
        <p>Paste JSON, validate, format, and inspect with tree navigation.</p>
      </header>

      <div className="json-viewer-grid">
        <section className="json-input-panel" aria-label="JSON input panel">
          <label htmlFor="json-viewer-input">JSON Input</label>
          <textarea
            id="json-viewer-input"
            aria-label="JSON input"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            spellCheck={false}
          />

          <div className="json-controls" role="toolbar" aria-label="JSON controls">
            <button type="button" className="chip chip-strong" onClick={handleParse}>Parse JSON</button>
            <button type="button" className="chip" onClick={handlePretty}>Pretty Format</button>
            <button type="button" className="chip" onClick={handleMinify}>Minify JSON</button>
            <button type="button" className="chip" onClick={handleClear}>Clear JSON</button>
          </div>

          {parseError ? (
            <p className="json-error" role="alert">{parseError}</p>
          ) : (
            <p className="json-help">Valid JSON is rendered in tree output.</p>
          )}
        </section>

        <section className="json-output-panel" aria-label="JSON output panel">
          <div className="json-output-toolbar">
            <input
              aria-label="Search JSON"
              placeholder="Search keys/values"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="button" className="chip" onClick={handleExpandAll}>Expand All</button>
            <button type="button" className="chip" onClick={handleCollapseAll}>Collapse All</button>
          </div>

          <p className="json-path">Selected path: {selectedPath || 'None'}</p>

          {treeOutput.truncated ? <p className="json-warning">{RENDER_WARNING_TEXT}</p> : null}

          <div className="json-tree" aria-label="JSON tree output">
            {treeOutput.content ? <ul className="json-root">{treeOutput.content}</ul> : <p>No JSON parsed yet.</p>}
          </div>
        </section>
      </div>
    </section>
  )
}

export default JsonViewer
