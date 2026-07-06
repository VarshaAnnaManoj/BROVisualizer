import { useEffect, useMemo, useRef, useState } from 'react'

import './App.css'

type OntologyApiRecord = {
  id: number
  output_json: Record<string, unknown>
  image_url?: unknown
  location?: unknown
  ocr_text?: unknown
  change_description?: unknown
  hierarchy_assessment?: unknown
  validation_notes?: unknown
  change_reason?: unknown
  change_type?: string | null
  change_severity?: string | null
}

type LoginApiResponse = {
  success: boolean
  message?: string
}

type MetadataFieldKey = 'change_description' | 'hierarchy_assessment' | 'validation_notes' | 'change_reason'

type MetadataFields = Record<MetadataFieldKey, string>

type MediaFields = {
  imageUrl: string
  ocrText: string
}

type PaneKey = 'pre' | 'post'

type ViewerMode = 'change-only' | 'complete-json'

type PaneState = {
  idInput: string
  versionInput: string
  selectedId: number
  selectedVersion: string
  validationError: string | null
  loading: boolean
  error: string | null
  json: Record<string, unknown>
  metadata: MetadataFields
  media: MediaFields
  viewerMode: ViewerMode
}

type JsonRecord = Record<string, unknown>

type DiffEntry = {
  path: string
  value: unknown
}

type ChangedDiffEntry = {
  path: string
  preValue: unknown
  postValue: unknown
}

type DiffResult = {
  removed: DiffEntry[]
  added: DiffEntry[]
  changed: ChangedDiffEntry[]
}

type PresenceDiffEntry = {
  path: string
  value: unknown
  sourcePane: PaneKey
  entryType: 'pre-only' | 'post-only'
}

type BubbleNavAction = {
  pane: PaneKey
  path: string
}

type RawPresenceEntry = PresenceDiffEntry

type ActiveTarget = {
  sourcePane: PaneKey
  path: string
}

type HighlightRange = {
  startLine: number
  endLine: number
}

type JsonRenderModel = {
  lines: string[]
  ranges: Map<string, HighlightRange>
}

const DEFAULT_ONTOLOGY_ID = 389
const DEFAULT_VERSION = 'v1'
const PANE_KEYS: PaneKey[] = ['pre', 'post']
const PANE_LABELS: Record<PaneKey, string> = {
  pre: 'Pre',
  post: 'Post',
}

const ARRAY_ID_KEYS = ['id', 'uuid', 'code'] as const
const ATTACHMENT_PLACEHOLDER_PATTERN = /^pasted image(?:\s*#?\s*\d+)?$/i
const METADATA_FALLBACK_VALUE = 'Not available'
const IMAGE_FALLBACK_VALUE = 'Image unavailable'
const OCR_FALLBACK_VALUE = 'OCR text not available'
const LOGIN_PATH = '/login'
const APP_PATH = '/'
const AUTH_SESSION_KEY = 'brov.auth'
const LOGIN_ENDPOINT = '/api/auth/login'
const LOGIN_INVALID_MESSAGE = 'Invalid user ID or password.'
const LOGIN_UNAVAILABLE_MESSAGE = 'Login service unavailable. Please try again.'
const METADATA_FIELD_CONFIG: Array<{ key: MetadataFieldKey; label: string }> = [
  { key: 'validation_notes', label: 'Validation Notes' },
  { key: 'change_reason', label: 'Change Reason' },
  { key: 'change_description', label: 'Change Description' },
  { key: 'hierarchy_assessment', label: 'Hierarchy Assessment' },
]

function isPlainObject(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(',')}]`
  }

  if (isPlainObject(value)) {
    const sortedKeys = Object.keys(value).sort((left, right) => left.localeCompare(right))
    const parts = sortedKeys.map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
    return `{${parts.join(',')}}`
  }

  return JSON.stringify(value)
}

function isAttachmentPlaceholderLabel(value: string): boolean {
  return ATTACHMENT_PLACEHOLDER_PATTERN.test(value.trim())
}

function sanitizeOntologyValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return isAttachmentPlaceholderLabel(value) ? undefined : value
  }

  if (Array.isArray(value)) {
    const next = value
      .map((item) => sanitizeOntologyValue(item))
      .filter((item) => item !== undefined)
    return next
  }

  if (isPlainObject(value)) {
    const next: JsonRecord = {}
    for (const [key, entry] of Object.entries(value)) {
      const sanitizedEntry = sanitizeOntologyValue(entry)
      if (sanitizedEntry !== undefined) {
        next[key] = sanitizedEntry
      }
    }
    return next
  }

  return value
}

function sanitizeOntologyJson(value: Record<string, unknown>): Record<string, unknown> {
  const sanitized = sanitizeOntologyValue(value)
  return isPlainObject(sanitized) ? sanitized : {}
}

function normalizeMetadataValue(value: unknown): string {
  if (value === null || value === undefined) {
    return METADATA_FALLBACK_VALUE
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : METADATA_FALLBACK_VALUE
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  try {
    const serialized = JSON.stringify(value)
    return serialized && serialized !== 'null' ? serialized : METADATA_FALLBACK_VALUE
  } catch {
    return METADATA_FALLBACK_VALUE
  }
}

function buildMetadataFields(payload: OntologyApiRecord): MetadataFields {
  return {
    change_description: normalizeMetadataValue(payload.change_description),
    hierarchy_assessment: normalizeMetadataValue(payload.hierarchy_assessment),
    validation_notes: normalizeMetadataValue(payload.validation_notes),
    change_reason: normalizeMetadataValue(payload.change_reason),
  }
}

function createEmptyMetadataFields(): MetadataFields {
  return {
    change_description: METADATA_FALLBACK_VALUE,
    hierarchy_assessment: METADATA_FALLBACK_VALUE,
    validation_notes: METADATA_FALLBACK_VALUE,
    change_reason: METADATA_FALLBACK_VALUE,
  }
}

function normalizeMediaValue(value: unknown, fallback: string): string {
  if (value === null || value === undefined) {
    return fallback
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : fallback
  }

  return normalizeMetadataValue(value)
}

function buildMediaFields(payload: OntologyApiRecord): MediaFields {
  const locationSource = payload.location ?? payload.image_url

  return {
    imageUrl: normalizeMediaValue(locationSource, IMAGE_FALLBACK_VALUE),
    ocrText: normalizeMediaValue(payload.ocr_text, OCR_FALLBACK_VALUE),
  }
}

function createEmptyMediaFields(): MediaFields {
  return {
    imageUrl: IMAGE_FALLBACK_VALUE,
    ocrText: OCR_FALLBACK_VALUE,
  }
}

function isDescendantPath(parentPath: string, candidatePath: string): boolean {
  if (candidatePath === parentPath) {
    return false
  }

  return candidatePath.startsWith(`${parentPath}.`) || candidatePath.startsWith(`${parentPath}[`)
}

function buildGroupedPresenceEntries(entries: RawPresenceEntry[]): PresenceDiffEntry[] {
  const sorted = [...entries].sort((left, right) => {
    const pathCompare = left.path.localeCompare(right.path)
    if (pathCompare !== 0) {
      return pathCompare
    }

    return left.sourcePane.localeCompare(right.sourcePane)
  })

  const grouped: PresenceDiffEntry[] = []
  const seen = new Set<string>()

  for (const entry of sorted) {
    const key = `${entry.sourcePane}::${entry.path}`
    if (seen.has(key)) {
      continue
    }

    const hasAncestor = grouped.some((candidate) =>
      candidate.sourcePane === entry.sourcePane && isDescendantPath(candidate.path, entry.path),
    )
    if (hasAncestor) {
      continue
    }

    grouped.push(entry)
    seen.add(key)
  }

  return grouped
}

function extractChangedSubset(source: unknown, target: unknown): unknown | undefined {
  if (Array.isArray(source)) {
    if (!Array.isArray(target)) {
      return source
    }

    return stableStringify(source) === stableStringify(target) ? undefined : source
  }

  if (isPlainObject(source)) {
    if (!isPlainObject(target)) {
      return source
    }

    const result: JsonRecord = {}
    const keys = Object.keys(source)
    for (const key of keys) {
      const hasTargetKey = Object.prototype.hasOwnProperty.call(target, key)
      if (!hasTargetKey) {
        result[key] = source[key]
        continue
      }

      const changed = extractChangedSubset(source[key], target[key])
      if (changed !== undefined) {
        result[key] = changed
      }
    }

    return Object.keys(result).length > 0 ? result : undefined
  }

  return stableStringify(source) === stableStringify(target) ? undefined : source
}

function buildPaneDisplayJson(currentPane: PaneState, otherPane: PaneState): Record<string, unknown> {
  if (currentPane.viewerMode === 'complete-json') {
    return currentPane.json
  }

  const changedSubset = extractChangedSubset(currentPane.json, otherPane.json)
  return isPlainObject(changedSubset) ? changedSubset : {}
}

function pushLine(lines: string[], text: string) {
  lines.push(text)
}

function getParentPath(path: string): string | null {
  if (path === 'root') {
    return null
  }

  if (path.endsWith(']')) {
    const openBracketIndex = path.lastIndexOf('[')
    if (openBracketIndex > 0) {
      return path.slice(0, openBracketIndex)
    }
  }

  const dotIndex = path.lastIndexOf('.')
  if (dotIndex > 0) {
    return path.slice(0, dotIndex)
  }

  return null
}

function serializeNode(
  value: unknown,
  path: string,
  indentLevel: number,
  trailingComma: boolean,
  lines: string[],
  ranges: Map<string, HighlightRange>,
): HighlightRange {
  const startLine = lines.length
  const indent = '  '.repeat(indentLevel)

  if (Array.isArray(value)) {
    if (value.length === 0) {
      pushLine(lines, `${indent}[]${trailingComma ? ',' : ''}`)
    } else {
      pushLine(lines, `${indent}[`)
      for (let index = 0; index < value.length; index += 1) {
        const item = value[index]
        const isLast = index === value.length - 1
        const itemPath = `${path}[${index}]`
        const itemRange = serializeNode(item, itemPath, indentLevel + 1, !isLast, lines, ranges)
        ranges.set(itemPath, itemRange)

        const keyedPath = tryGetArrayKey(item)
        if (keyedPath) {
          ranges.set(`${path}[${keyedPath}]`, itemRange)
        }
      }
      pushLine(lines, `${indent}]${trailingComma ? ',' : ''}`)
    }

    const endLine = lines.length - 1
    const range = { startLine, endLine }
    ranges.set(path, range)
    return range
  }

  if (isPlainObject(value)) {
    const keys = Object.keys(value)
    if (keys.length === 0) {
      pushLine(lines, `${indent}{}${trailingComma ? ',' : ''}`)
    } else {
      pushLine(lines, `${indent}{`)
      for (let index = 0; index < keys.length; index += 1) {
        const key = keys[index]
        const keyPath = `${path}.${key}`
        const keyLiteral = JSON.stringify(key)
        const isLast = index === keys.length - 1
        const keyIndent = '  '.repeat(indentLevel + 1)
        const entryValue = value[key]

        if (Array.isArray(entryValue)) {
          if (entryValue.length === 0) {
            pushLine(lines, `${keyIndent}${keyLiteral}: []${isLast ? '' : ','}`)
          } else {
            const propertyStart = lines.length
            pushLine(lines, `${keyIndent}${keyLiteral}: [`)
            for (let itemIndex = 0; itemIndex < entryValue.length; itemIndex += 1) {
              const item = entryValue[itemIndex]
              const itemIsLast = itemIndex === entryValue.length - 1
              const itemPath = `${keyPath}[${itemIndex}]`
              const itemRange = serializeNode(item, itemPath, indentLevel + 2, !itemIsLast, lines, ranges)
              ranges.set(itemPath, itemRange)

              const keyedPath = tryGetArrayKey(item)
              if (keyedPath) {
                ranges.set(`${keyPath}[${keyedPath}]`, itemRange)
              }
            }
            pushLine(lines, `${keyIndent}]${isLast ? '' : ','}`)
            ranges.set(keyPath, { startLine: propertyStart, endLine: lines.length - 1 })
          }
          continue
        }

        if (isPlainObject(entryValue)) {
          const nestedKeys = Object.keys(entryValue)
          if (nestedKeys.length === 0) {
            pushLine(lines, `${keyIndent}${keyLiteral}: {}${isLast ? '' : ','}`)
            ranges.set(keyPath, { startLine: lines.length - 1, endLine: lines.length - 1 })
            continue
          }

          const propertyStart = lines.length
          pushLine(lines, `${keyIndent}${keyLiteral}: {`)
          for (let nestedIndex = 0; nestedIndex < nestedKeys.length; nestedIndex += 1) {
            const nestedKey = nestedKeys[nestedIndex]
            const nestedPath = `${keyPath}.${nestedKey}`
            const nestedIsLast = nestedIndex === nestedKeys.length - 1
            const nestedLiteral = JSON.stringify(nestedKey)
            const nestedIndent = '  '.repeat(indentLevel + 2)
            const nestedValue = entryValue[nestedKey]

            if (Array.isArray(nestedValue) || isPlainObject(nestedValue)) {
              const nestedPropertyRange = serializeNode(
                nestedValue,
                nestedPath,
                indentLevel + 2,
                nestedIsLast,
                lines,
                ranges,
              )
              const headerLine = lines[nestedPropertyRange.startLine]
              const contentStart = headerLine.trim().startsWith('{') || headerLine.trim().startsWith('[')
              if (contentStart) {
                lines[nestedPropertyRange.startLine] = `${nestedIndent}${nestedLiteral}: ${headerLine.trim()}`
              }
              continue
            }

            pushLine(lines, `${nestedIndent}${nestedLiteral}: ${JSON.stringify(nestedValue)}${nestedIsLast ? '' : ','}`)
            ranges.set(nestedPath, { startLine: lines.length - 1, endLine: lines.length - 1 })
          }
          pushLine(lines, `${keyIndent}}${isLast ? '' : ','}`)
          ranges.set(keyPath, { startLine: propertyStart, endLine: lines.length - 1 })
          continue
        }

        pushLine(lines, `${keyIndent}${keyLiteral}: ${JSON.stringify(entryValue)}${isLast ? '' : ','}`)
        ranges.set(keyPath, { startLine: lines.length - 1, endLine: lines.length - 1 })
      }
      pushLine(lines, `${indent}}${trailingComma ? ',' : ''}`)
    }

    const endLine = lines.length - 1
    const range = { startLine, endLine }
    ranges.set(path, range)
    return range
  }

  pushLine(lines, `${indent}${JSON.stringify(value)}${trailingComma ? ',' : ''}`)
  const endLine = lines.length - 1
  const range = { startLine, endLine }
  ranges.set(path, range)
  return range
}

function buildJsonRenderModel(json: Record<string, unknown>): JsonRenderModel {
  const lines: string[] = []
  const ranges = new Map<string, HighlightRange>()

  serializeNode(json, 'root', 0, false, lines, ranges)
  return { lines, ranges }
}

function resolveHighlightRange(path: string, ranges: Map<string, HighlightRange>): HighlightRange | null {
  if (ranges.has(path)) {
    return ranges.get(path) ?? null
  }

  let cursor = path
  while (true) {
    const parent = getParentPath(cursor)
    if (!parent) {
      return null
    }

    if (parent !== 'root' && ranges.has(parent)) {
      return ranges.get(parent) ?? null
    }

    cursor = parent
  }
}

function renderHighlightedJson(json: Record<string, unknown>, activePath: string | null, label: string) {
  const model = buildJsonRenderModel(json)
  const range = activePath ? resolveHighlightRange(activePath, model.ranges) : null

  return (
    <pre className="code-view code-view-lines" aria-label={`${label} ontology JSON`}>
      {model.lines.map((line, index) => {
        const isHighlighted =
          range !== null && index >= range.startLine && index <= range.endLine

        return (
          <span key={`${label}-line-${index}`} className={`code-line ${isHighlighted ? 'code-line-highlight' : ''}`}>
            {line.length > 0 ? line : ' '}
          </span>
        )
      })}
    </pre>
  )
}

function tryGetArrayKey(value: unknown): string | null {
  if (!isPlainObject(value)) {
    return null
  }

  for (const keyName of ARRAY_ID_KEYS) {
    const keyValue = value[keyName]
    if (typeof keyValue === 'string' || typeof keyValue === 'number') {
      return `${keyName}=${keyValue}`
    }
  }

  return null
}

function pushSortedRemoved(result: DiffResult, path: string, value: unknown) {
  result.removed.push({ path, value })
}

function pushSortedAdded(result: DiffResult, path: string, value: unknown) {
  result.added.push({ path, value })
}

function collectBranchEntries(
  result: DiffResult,
  path: string,
  value: unknown,
  direction: 'removed' | 'added',
) {
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      const item = value[index]
      const keyed = tryGetArrayKey(item)
      const segment = keyed ? `[${keyed}]` : `[${index}]`
      collectBranchEntries(result, `${path}${segment}`, item, direction)
    }
    return
  }

  if (isPlainObject(value)) {
    const keys = Object.keys(value).sort((left, right) => left.localeCompare(right))
    for (const key of keys) {
      collectBranchEntries(result, `${path}.${key}`, value[key], direction)
    }
    return
  }

  if (direction === 'removed') {
    pushSortedRemoved(result, path, value)
    return
  }

  pushSortedAdded(result, path, value)
}

function compareArrayNodes(result: DiffResult, path: string, pre: unknown[], post: unknown[]) {
  const preKeyed = new Map<string, unknown>()
  const postKeyed = new Map<string, unknown>()
  const preIndexOnly: unknown[] = []
  const postIndexOnly: unknown[] = []

  for (const item of pre) {
    const key = tryGetArrayKey(item)
    if (key) {
      preKeyed.set(key, item)
    } else {
      preIndexOnly.push(item)
    }
  }

  for (const item of post) {
    const key = tryGetArrayKey(item)
    if (key) {
      postKeyed.set(key, item)
    } else {
      postIndexOnly.push(item)
    }
  }

  const keyedUnion = Array.from(new Set([...preKeyed.keys(), ...postKeyed.keys()])).sort((left, right) =>
    left.localeCompare(right),
  )

  for (const key of keyedUnion) {
    const preValue = preKeyed.get(key)
    const postValue = postKeyed.get(key)
    const nextPath = `${path}[${key}]`

    if (preValue === undefined && postValue !== undefined) {
      collectBranchEntries(result, nextPath, postValue, 'added')
      continue
    }

    if (preValue !== undefined && postValue === undefined) {
      collectBranchEntries(result, nextPath, preValue, 'removed')
      continue
    }

    compareNodes(result, nextPath, preValue, postValue)
  }

  const maxLength = Math.max(preIndexOnly.length, postIndexOnly.length)
  for (let index = 0; index < maxLength; index += 1) {
    const preValue = preIndexOnly[index]
    const postValue = postIndexOnly[index]
    const nextPath = `${path}[${index}]`

    if (preValue === undefined && postValue !== undefined) {
      collectBranchEntries(result, nextPath, postValue, 'added')
      continue
    }

    if (preValue !== undefined && postValue === undefined) {
      collectBranchEntries(result, nextPath, preValue, 'removed')
      continue
    }

    compareNodes(result, nextPath, preValue, postValue)
  }
}

function compareNodes(result: DiffResult, path: string, pre: unknown, post: unknown) {
  if (Array.isArray(pre) && Array.isArray(post)) {
    compareArrayNodes(result, path, pre, post)
    return
  }

  if (isPlainObject(pre) && isPlainObject(post)) {
    const keys = Array.from(new Set([...Object.keys(pre), ...Object.keys(post)])).sort((left, right) =>
      left.localeCompare(right),
    )

    for (const key of keys) {
      const keyPath = `${path}.${key}`
      const preHasKey = Object.prototype.hasOwnProperty.call(pre, key)
      const postHasKey = Object.prototype.hasOwnProperty.call(post, key)

      if (preHasKey && !postHasKey) {
        pushSortedRemoved(result, keyPath, pre[key])
        continue
      }

      if (!preHasKey && postHasKey) {
        pushSortedAdded(result, keyPath, post[key])
        continue
      }

      compareNodes(result, keyPath, pre[key], post[key])
    }

    return
  }

  if (stableStringify(pre) !== stableStringify(post)) {
    result.changed.push({
      path,
      preValue: pre,
      postValue: post,
    })
  }
}

function compareJson(pre: JsonRecord, post: JsonRecord): DiffResult {
  const result: DiffResult = {
    removed: [],
    added: [],
    changed: [],
  }

  compareNodes(result, 'root', pre, post)

  result.removed.sort((left, right) => left.path.localeCompare(right.path))
  result.added.sort((left, right) => left.path.localeCompare(right.path))
  result.changed.sort((left, right) => left.path.localeCompare(right.path))

  return result
}

function parseOntologyId(rawValue: string): number | null {
  const trimmed = rawValue.trim()
  if (!trimmed || !/^\d+$/.test(trimmed)) {
    return null
  }

  const parsed = Number(trimmed)
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null
  }

  return parsed
}

function parseVersion(rawValue: string): string | null {
  const trimmed = rawValue.trim()
  return trimmed.length > 0 ? trimmed : null
}

function buildOntologyUrl(id: number, version: string | null): string {
  const params = new URLSearchParams()
  if (version) {
    params.set('version', version)
  }
  const query = params.toString()
  return query ? `/api/ontology/${id}?${query}` : `/api/ontology/${id}`
}

function createInitialPaneState(ontologyId: number): PaneState {
  return {
    idInput: String(ontologyId),
    versionInput: DEFAULT_VERSION,
    selectedId: ontologyId,
    selectedVersion: DEFAULT_VERSION,
    validationError: null,
    loading: false,
    error: null,
    json: {},
    metadata: createEmptyMetadataFields(),
    media: createEmptyMediaFields(),
    viewerMode: 'change-only',
  }
}

function createInitialPaneStates(): Record<PaneKey, PaneState> {
  return {
    pre: createInitialPaneState(DEFAULT_ONTOLOGY_ID),
    post: createInitialPaneState(DEFAULT_ONTOLOGY_ID + 1),
  }
}

function normalizeRoutePath(pathname: string): string {
  return pathname === LOGIN_PATH ? LOGIN_PATH : APP_PATH
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return window.sessionStorage.getItem(AUTH_SESSION_KEY) === 'true'
  })
  const [routePath, setRoutePath] = useState(() => {
    if (typeof window === 'undefined') {
      return APP_PATH
    }
    return normalizeRoutePath(window.location.pathname)
  })
  const [loginUserIdInput, setLoginUserIdInput] = useState('')
  const [loginPasswordInput, setLoginPasswordInput] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginSubmitting, setLoginSubmitting] = useState(false)
  const [paneStates, setPaneStates] = useState<Record<PaneKey, PaneState>>(createInitialPaneStates())
  const [activeTarget, setActiveTarget] = useState<ActiveTarget | null>(null)
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const [imageLoadFailed, setImageLoadFailed] = useState(false)
  const [bannerIdInput, setBannerIdInput] = useState(String(DEFAULT_ONTOLOGY_ID))
  const [bannerVersionInput, setBannerVersionInput] = useState(DEFAULT_VERSION)
  const [bannerNavigationError, setBannerNavigationError] = useState<string | null>(null)
  const paneArticleRefs = useRef<Record<PaneKey, HTMLElement | null>>({ pre: null, post: null })

  const updatePane = (pane: PaneKey, updater: (previous: PaneState) => PaneState) => {
    setPaneStates((previous) => ({
      ...previous,
      [pane]: updater(previous[pane]),
    }))
  }

  const navigateToPath = (nextPath: string) => {
    const normalizedPath = normalizeRoutePath(nextPath)
    if (typeof window !== 'undefined' && window.location.pathname !== normalizedPath) {
      window.history.replaceState(null, '', normalizedPath)
    }
    setRoutePath(normalizedPath)
  }

  async function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedUserId = loginUserIdInput.trim()
    if (!normalizedUserId || !loginPasswordInput) {
      setLoginError(LOGIN_INVALID_MESSAGE)
      return
    }

    setLoginSubmitting(true)

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: normalizedUserId,
          password: loginPasswordInput,
        }),
      })

      if (response.status === 401) {
        setLoginError(LOGIN_INVALID_MESSAGE)
        return
      }

      if (!response.ok) {
        setLoginError(LOGIN_UNAVAILABLE_MESSAGE)
        return
      }

      const payload = (await response.json()) as LoginApiResponse
      if (!payload.success) {
        setLoginError(LOGIN_INVALID_MESSAGE)
        return
      }

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(AUTH_SESSION_KEY, 'true')
      }
      setLoginError(null)
      setIsAuthenticated(true)
      setLoginUserIdInput('')
      setLoginPasswordInput('')
    } catch {
      setLoginError(LOGIN_UNAVAILABLE_MESSAGE)
    } finally {
      setLoginSubmitting(false)
    }
  }

  function handleLogout() {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(AUTH_SESSION_KEY)
    }
    setIsImageExpanded(false)
    setLoginError(null)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const handlePopState = () => {
      setRoutePath(normalizeRoutePath(window.location.pathname))
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated && routePath === LOGIN_PATH) {
      navigateToPath(APP_PATH)
      return
    }

    if (!isAuthenticated && routePath !== LOGIN_PATH) {
      navigateToPath(LOGIN_PATH)
    }
  }, [isAuthenticated, routePath])

  async function loadPane(pane: PaneKey, ontologyId: number, version: string, signal?: AbortSignal) {
    updatePane(pane, (previous) => ({
      ...previous,
      loading: true,
      error: null,
    }))

    try {
      const response = await fetch(buildOntologyUrl(ontologyId, version), { signal })

      if (response.status === 404) {
        updatePane(pane, (previous) => ({
          ...previous,
          loading: false,
          json: {},
          metadata: createEmptyMetadataFields(),
          media: createEmptyMediaFields(),
          error: `Ontology not found for id=${ontologyId}, version=${version}.`,
        }))
        return
      }

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      const payload = (await response.json()) as OntologyApiRecord
      const nextJson = sanitizeOntologyJson(payload.output_json ?? {})
      const nextMetadata = buildMetadataFields(payload)
      const nextMedia = buildMediaFields(payload)
      updatePane(pane, (previous) => ({
        ...previous,
        loading: false,
        error: null,
        json: stableStringify(previous.json) === stableStringify(nextJson) ? previous.json : nextJson,
        metadata: nextMetadata,
        media: nextMedia,
      }))
    } catch (fetchError) {
      if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
        return
      }

      updatePane(pane, (previous) => ({
        ...previous,
        loading: false,
        json: {},
        metadata: createEmptyMetadataFields(),
        media: createEmptyMediaFields(),
        error: `Unable to load ontology for id=${ontologyId}, version=${version}.`,
      }))
    }
  }

  function handlePaneInput(pane: PaneKey, field: 'idInput' | 'versionInput', value: string) {
    updatePane(pane, (previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  function handlePaneViewerMode(pane: PaneKey, mode: ViewerMode) {
    updatePane(pane, (previous) => ({
      ...previous,
      viewerMode: mode,
    }))
  }

  function handlePaneSubmit(pane: PaneKey, event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const currentPane = paneStates[pane]
    const parsedId = parseOntologyId(currentPane.idInput)
    if (parsedId === null) {
      updatePane(pane, (previous) => ({
        ...previous,
        validationError: 'Enter a valid positive integer ontology ID.',
      }))
      return
    }

    const parsedVersion = parseVersion(currentPane.versionInput)
    if (parsedVersion === null) {
      updatePane(pane, (previous) => ({
        ...previous,
        validationError: 'Enter a non-empty ontology version.',
      }))
      return
    }

    updatePane(pane, (previous) => ({
      ...previous,
      validationError: null,
      selectedId: parsedId,
      selectedVersion: parsedVersion,
    }))
  }

  function synchronizePaneSelection(nextPreId: number, nextVersion: string) {
    const nextPostId = nextPreId + 1

    setPaneStates((previous) => {
      return {
        ...previous,
        pre: {
          ...previous.pre,
          idInput: String(nextPreId),
          versionInput: nextVersion,
          selectedId: nextPreId,
          selectedVersion: nextVersion,
          validationError: null,
        },
        post: {
          ...previous.post,
          idInput: String(nextPostId),
          versionInput: nextVersion,
          selectedId: nextPostId,
          selectedVersion: nextVersion,
          validationError: null,
        },
      }
    })

    setBannerIdInput(String(nextPreId))
    setBannerVersionInput(nextVersion)
  }

  function handleBannerSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsedId = parseOntologyId(bannerIdInput)
    if (parsedId === null) {
      setBannerNavigationError('Enter a valid positive integer ID for shared navigation.')
      return
    }

    const parsedVersion = parseVersion(bannerVersionInput)
    if (parsedVersion === null) {
      setBannerNavigationError('Enter a non-empty version for shared navigation.')
      return
    }

    setBannerNavigationError(null)
    synchronizePaneSelection(parsedId, parsedVersion)
  }

  function handleBannerStep(delta: number) {
    const baseId = parseOntologyId(bannerIdInput) ?? paneStates.pre.selectedId
    const nextId = Math.max(1, baseId + delta)
    const nextVersion = parseVersion(bannerVersionInput) ?? paneStates.pre.selectedVersion

    setBannerNavigationError(null)
    synchronizePaneSelection(nextId, nextVersion)
  }

  const comparisonSelectionSignature = useMemo(
    () => PANE_KEYS.map((pane) => `${paneStates[pane].selectedId}:${paneStates[pane].selectedVersion}`).join('|'),
    [paneStates],
  )

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    const controller = new AbortController()
    for (const pane of PANE_KEYS) {
      const state = paneStates[pane]
      void loadPane(pane, state.selectedId, state.selectedVersion, controller.signal)
    }

    return () => {
      controller.abort()
    }
  }, [comparisonSelectionSignature])

  const prePane = paneStates.pre
  const postPane = paneStates.post
  const metadataPanelValues = postPane.error ? prePane.metadata : postPane.metadata
  const mediaPanelValues = postPane.error ? prePane.media : postPane.media
  const hasImage = mediaPanelValues.imageUrl !== IMAGE_FALLBACK_VALUE && !imageLoadFailed
  const preDisplayJson = useMemo(() => buildPaneDisplayJson(prePane, postPane), [prePane, postPane])
  const postDisplayJson = useMemo(() => buildPaneDisplayJson(postPane, prePane), [postPane, prePane])
  const prePostJsonSignature = useMemo(
    () => `${stableStringify(prePane.json)}|${stableStringify(postPane.json)}`,
    [prePane.json, postPane.json],
  )

  const diffResult = useMemo(
    () => compareJson(prePane.json, postPane.json),
    [prePostJsonSignature],
  )

  const combinedPresenceEntries = useMemo(() => {
    const merged: RawPresenceEntry[] = [
      ...diffResult.removed.map((entry) => ({
        path: entry.path,
        value: entry.value,
        sourcePane: 'pre' as const,
        entryType: 'pre-only' as const,
      })),
      ...diffResult.added.map((entry) => ({
        path: entry.path,
        value: entry.value,
        sourcePane: 'post' as const,
        entryType: 'post-only' as const,
      })),
    ]

    return buildGroupedPresenceEntries(merged)
  }, [diffResult])

  const bubbleActions = useMemo(() => {
    const actions: BubbleNavAction[] = []

    for (const entry of combinedPresenceEntries) {
      actions.push({
        pane: entry.sourcePane,
        path: entry.path,
      })
    }

    for (const entry of diffResult.changed) {
      actions.push({ pane: 'pre', path: entry.path })
      actions.push({ pane: 'post', path: entry.path })
    }

    return actions
  }, [combinedPresenceEntries, diffResult.changed])

  const preBubbleActions = useMemo(
    () => bubbleActions.filter((action) => action.pane === 'pre'),
    [bubbleActions],
  )

  const postBubbleActions = useMemo(
    () => bubbleActions.filter((action) => action.pane === 'post'),
    [bubbleActions],
  )

  useEffect(() => {
    setImageLoadFailed(false)
    if (mediaPanelValues.imageUrl === IMAGE_FALLBACK_VALUE) {
      setIsImageExpanded(false)
    }
  }, [mediaPanelValues.imageUrl])

  useEffect(() => {
    if (!isImageExpanded) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsImageExpanded(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isImageExpanded])

  function setPaneArticleRef(pane: PaneKey, node: HTMLElement | null) {
    paneArticleRefs.current[pane] = node
  }

  function navigateToEntry(pane: PaneKey, path: string) {
    setActiveTarget({ sourcePane: pane, path })

    requestAnimationFrame(() => {
      for (const targetPane of PANE_KEYS) {
        const paneRef = paneArticleRefs.current[targetPane]
        if (!paneRef) {
          continue
        }

        if (typeof paneRef.scrollIntoView === 'function') {
          paneRef.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }

        const highlightedLine = paneRef.querySelector('.code-line-highlight') as HTMLElement | null
        if (highlightedLine && typeof highlightedLine.scrollIntoView === 'function') {
          highlightedLine.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }

      const sourcePaneRef = paneArticleRefs.current[pane]
      if (sourcePaneRef && typeof sourcePaneRef.focus === 'function') {
        sourcePaneRef.focus()
      }
    })
  }

  const statusLabel = 'NO RECORDS'

  if (!isAuthenticated) {
    return (
      <main className="login-page" aria-label="Login page">
        <section className="login-card" aria-label="Login card">
          <h1>BR Ontology Visualizer Login</h1>
          <p>Sign in to continue.</p>
          <form className="login-form" onSubmit={handleLoginSubmit} aria-label="Login form">
            <label htmlFor="login-user-id">User ID</label>
            <input
              id="login-user-id"
              aria-label="User ID"
              value={loginUserIdInput}
              onChange={(event) => setLoginUserIdInput(event.target.value)}
              autoComplete="username"
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              aria-label="Password"
              value={loginPasswordInput}
              onChange={(event) => setLoginPasswordInput(event.target.value)}
              autoComplete="current-password"
            />

            <button type="submit" className="chip chip-strong" disabled={loginSubmitting}>Login</button>
          </form>
          {loginError ? (
            <p className="login-error" role="alert">
              {loginError}
            </p>
          ) : null}
        </section>
      </main>
    )
  }

  return (
    <main className="dashboard-page" aria-label="BR Ontology dashboard">
      <section className="dashboard-shell" aria-label="Dashboard frame">
        <header className="top-header">
          <div className="brand-row">
            <span className="brand-dot" aria-hidden="true" />
            <h1>BR Ontology Visualizer</h1>
          </div>
          <div className="top-header-actions">
            <span className="badge">ALBERT ONTOLOGY</span>
            <form className="banner-nav" onSubmit={handleBannerSubmit} aria-label="Shared ontology banner controls">
              <input
                aria-label="Shared ontology ID"
                value={bannerIdInput}
                onChange={(event) => setBannerIdInput(event.target.value)}
                placeholder="ID"
              />
              <input
                aria-label="Shared ontology version"
                value={bannerVersionInput}
                onChange={(event) => setBannerVersionInput(event.target.value)}
                placeholder="Version"
              />
              <button
                type="button"
                className="chip"
                onClick={() => handleBannerStep(-1)}
              >
                Backward
              </button>
              <button
                type="button"
                className="chip"
                onClick={() => handleBannerStep(1)}
              >
                Forward
              </button>
              <button type="submit" className="chip chip-strong">Apply</button>
              <button type="button" className="chip chip-logout" onClick={handleLogout}>Logout</button>
            </form>
            {bannerNavigationError ? <span className="banner-nav-error">{bannerNavigationError}</span> : null}
          </div>
        </header>

        <section className="analysis-grid" aria-label="Ontology and summary panels">
          <section className="comparison-grid" aria-label="Pre and Post ontology comparison">
            {PANE_KEYS.map((pane) => {
              const paneState = paneStates[pane]
              const label = PANE_LABELS[pane]
              const titleId = `${pane}-title`
              const displayJson = pane === 'pre' ? preDisplayJson : postDisplayJson
              const paneBubbleActions = pane === 'pre' ? preBubbleActions : postBubbleActions

              const isActivePane = activeTarget !== null
              const activePathForPane =
                activeTarget !== null && activeTarget.sourcePane === pane ? activeTarget.path : null

              return (
                <article
                  className={`panel code-panel source-comparison-pane ${
                    isActivePane ? `source-pane-active source-pane-active-${pane}` : ''
                  }`}
                  aria-labelledby={titleId}
                  key={pane}
                  ref={(node) => setPaneArticleRef(pane, node)}
                  tabIndex={-1}
                >
                  <header className="panel-header pane-header">
                    <div className="pane-header-main">
                      <h2 id={titleId}>{label}</h2>
                      <div className="pane-viewer-mode" role="tablist" aria-label={`${label} viewer mode`}>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={paneState.viewerMode === 'change-only'}
                          className={`chip ${paneState.viewerMode === 'change-only' ? 'chip-strong' : ''}`}
                          onClick={() => handlePaneViewerMode(pane, 'change-only')}
                        >
                          Change Only
                        </button>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={paneState.viewerMode === 'complete-json'}
                          className={`chip ${paneState.viewerMode === 'complete-json' ? 'chip-strong' : ''}`}
                          onClick={() => handlePaneViewerMode(pane, 'complete-json')}
                        >
                          Complete JSON
                        </button>
                      </div>
                    </div>
                    <form className="pane-form" onSubmit={(event) => handlePaneSubmit(pane, event)}>
                      <input
                        aria-label={`${label} ontology ID`}
                        value={paneState.idInput}
                        onChange={(event) => handlePaneInput(pane, 'idInput', event.target.value)}
                        placeholder="ID"
                      />
                      <input
                        aria-label={`${label} ontology version`}
                        value={paneState.versionInput}
                        onChange={(event) => handlePaneInput(pane, 'versionInput', event.target.value)}
                        placeholder="Version"
                      />
                      <button type="submit" className="chip chip-strong">Load</button>
                      <button
                        type="button"
                        className="chip"
                        onClick={() => {
                          void loadPane(pane, paneState.selectedId, paneState.selectedVersion)
                        }}
                      >
                        {paneState.loading ? 'Loading...' : 'Retry'}
                      </button>
                    </form>
                  </header>
                  <div className="pane-message">{paneState.validationError ?? paneState.error ?? 'Ready'}</div>
                  {paneBubbleActions.length > 0 ? (
                    <div className="pane-bubble-strip" aria-label={`${label} bubble actions`}>
                      {paneBubbleActions.map((action, actionIndex) => {
                        const isActive =
                          activeTarget?.sourcePane === action.pane && activeTarget.path === action.path

                        return (
                          <button
                            key={`${action.pane}-${action.path}-${actionIndex}`}
                            type="button"
                            className={`diff-index-bubble-button ${isActive ? 'diff-index-bubble-button-active' : ''}`}
                            onClick={() => navigateToEntry(action.pane, action.path)}
                            aria-label={`Go to ${action.pane === 'pre' ? 'Pre' : 'Post'} JSON path ${action.path}`}
                          >
                            {actionIndex + 1}
                          </button>
                        )
                      })}
                    </div>
                  ) : null}
                  {isActivePane ? (
                    <div
                      className={`source-target-banner source-target-banner-${pane}`}
                      aria-label={`${label} source target`}
                    >
                      <span className="source-target-path">Focused path: {activeTarget.path}</span>
                    </div>
                  ) : null}
                  <div className={`comparison-code-wrapper ${isActivePane ? `source-code-view-active source-code-view-active-${pane}` : ''}`}>
                    {renderHighlightedJson(displayJson, activePathForPane, label)}
                  </div>
                </article>
              )
            })}

          </section>

          <aside className="panel metadata-panel right-pane metadata-panel-absolute" aria-labelledby="metadata-title">
            <header className="panel-header">
              <h2 id="metadata-title">Metadata Columns</h2>
            </header>
            <section className="right-pane-content" aria-label="Metadata and media layout">
              <section className="right-pane-half right-pane-top-grid" aria-label="Media and OCR panels">
                <section className="right-pane-card" aria-label="Image panel">
                  <h3>Image</h3>
                  {hasImage ? (
                    <button
                      type="button"
                      className="right-pane-image-button"
                      aria-label="Expand ontology image"
                      onClick={() => setIsImageExpanded(true)}
                    >
                      <img
                        src={mediaPanelValues.imageUrl}
                        alt="Ontology source"
                        className="right-pane-image"
                        onError={() => {
                          setImageLoadFailed(true)
                          setIsImageExpanded(false)
                        }}
                      />
                    </button>
                  ) : (
                    <div className="right-pane-empty">{IMAGE_FALLBACK_VALUE}</div>
                  )}
                </section>

                <section className="right-pane-card" aria-label="OCR text panel">
                  <h3>OCR Text</h3>
                  <p className="right-pane-ocr-text">{mediaPanelValues.ocrText}</p>
                </section>
              </section>
              <section className="right-pane-half metadata-columns-grid" aria-label="Metadata fields panel">
                {METADATA_FIELD_CONFIG.map((field) => (
                  <section
                    key={field.key}
                    className="metadata-column"
                    aria-label={`${field.label} column`}
                  >
                    <h3>{field.label}</h3>
                    <p>{metadataPanelValues[field.key]}</p>
                  </section>
                ))}
              </section>
            </section>
          </aside>

          {isImageExpanded && hasImage ? (
            <div
              className="image-expand-overlay"
              role="dialog"
              aria-modal="true"
              aria-label="Expanded ontology image"
              onClick={() => setIsImageExpanded(false)}
            >
              <button
                type="button"
                className="image-expand-close"
                aria-label="Close expanded image"
                onClick={(event) => {
                  event.stopPropagation()
                  setIsImageExpanded(false)
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="image-expand-image-button"
                aria-label="Contract ontology image"
                onClick={(event) => {
                  event.stopPropagation()
                  setIsImageExpanded(false)
                }}
              >
                <img
                  src={mediaPanelValues.imageUrl}
                  alt="Ontology source expanded"
                  className="image-expand-image"
                  onError={() => {
                    setImageLoadFailed(true)
                    setIsImageExpanded(false)
                  }}
                />
              </button>
            </div>
          ) : null}
        </section>

        <section className="record-block panel" aria-label="Change records">
          <div className="record-content">
            <p>
              {prePane.error ?? postPane.error ?? 'Live data connected to backend ontology endpoint.'}
            </p>
            <div className="status-tags">
              <span className="tag good">{prePane.loading || postPane.loading ? 'FETCHING' : 'API CONNECTED'}</span>
              <span className="tag good">{statusLabel}</span>
            </div>
            <ul>
              {!prePane.loading && !postPane.loading && <li>No records found in backend database.</li>}
            </ul>
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
