import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import App from './App'

type FetchResponse = {
  ok: boolean
  status: number
  json: () => Promise<unknown>
}

function response(status: number, body: unknown): FetchResponse {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  }
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  window.sessionStorage.clear()
  window.history.replaceState(null, '', '/')
})

describe('comparison mode', () => {
  beforeEach(() => {
    window.sessionStorage.setItem('brov.auth', 'true')
    window.history.replaceState(null, '', '/')
  })

  it('renders compare workflow without Modified Ontology panel', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('/api/ontology/389?version=v1')) {
        return response(200, { id: 389, output_json: { one: 1 } })
      }
      return response(404, { detail: 'not found' })
    })

    vi.stubGlobal('fetch', fetchMock)
    render(<App />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Pre' })).toBeInTheDocument()
    })

    expect(screen.getByRole('heading', { name: 'Post' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Modified Ontology' })).not.toBeInTheDocument()
    expect(screen.queryByText('Bubble actions only.')).not.toBeInTheDocument()
    expect(screen.queryByText('Bubble actions are available in the Pre and Post panes.')).not.toBeInTheDocument()
  })

  it('keeps Pre/Post controls and viewer toggles operational', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('/api/ontology/389?version=v1')) {
        return response(200, { id: 389, output_json: { alpha: 1 } })
      }
      return response(404, { detail: 'not found' })
    })

    vi.stubGlobal('fetch', fetchMock)
    render(<App />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Pre' })).toBeInTheDocument()
    })

    const prePane = screen.getByRole('heading', { name: 'Pre' }).closest('article')
    const postPane = screen.getByRole('heading', { name: 'Post' }).closest('article')
    expect(prePane).not.toBeNull()
    expect(postPane).not.toBeNull()
    if (!prePane || !postPane) {
      return
    }

    expect(within(prePane).getByRole('tab', { name: 'Change Only' })).toBeInTheDocument()
    expect(within(prePane).getByRole('tab', { name: 'Complete JSON' })).toBeInTheDocument()
    expect(within(postPane).getByRole('tab', { name: 'Change Only' })).toBeInTheDocument()
    expect(within(postPane).getByRole('tab', { name: 'Complete JSON' })).toBeInTheDocument()

    expect(within(prePane).getByLabelText('Pre ontology ID')).toBeInTheDocument()
    expect(within(prePane).getByLabelText('Pre ontology version')).toBeInTheDocument()
    expect(within(postPane).getByLabelText('Post ontology ID')).toBeInTheDocument()
    expect(within(postPane).getByLabelText('Post ontology version')).toBeInTheDocument()

    const sharedIdInput = screen.getByLabelText('Shared ontology ID')
    const sharedVersionInput = screen.getByLabelText('Shared ontology version')
    expect(sharedIdInput).toHaveValue('389')
    expect(sharedVersionInput).toHaveValue('v1')

    await userEvent.click(screen.getByRole('button', { name: 'Forward' }))
    await waitFor(() => {
      expect(within(prePane).getByLabelText('Pre ontology ID')).toHaveValue('390')
      expect(within(postPane).getByLabelText('Post ontology ID')).toHaveValue('391')
      expect(sharedIdInput).toHaveValue('390')
      expect(within(prePane).getByLabelText('Pre ontology version')).toHaveValue('v1')
      expect(within(postPane).getByLabelText('Post ontology version')).toHaveValue('v1')
    })

    await userEvent.click(screen.getByRole('button', { name: 'Backward' }))
    await waitFor(() => {
      expect(within(prePane).getByLabelText('Pre ontology ID')).toHaveValue('389')
      expect(within(postPane).getByLabelText('Post ontology ID')).toHaveValue('390')
      expect(sharedIdInput).toHaveValue('389')
    })

    await userEvent.clear(sharedVersionInput)
    await userEvent.type(sharedVersionInput, 'v3')
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }))
    await waitFor(() => {
      expect(within(prePane).getByLabelText('Pre ontology ID')).toHaveValue('389')
      expect(within(postPane).getByLabelText('Post ontology ID')).toHaveValue('390')
      expect(within(prePane).getByLabelText('Pre ontology version')).toHaveValue('v3')
      expect(within(postPane).getByLabelText('Post ontology version')).toHaveValue('v3')
    })
  })

  it('preserves bubble navigation behavior across Pre and Post panes', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('/api/ontology/389?version=v1')) {
        return response(200, { id: 389, output_json: { status: 'draft', onlyPre: 'legacy' } })
      }
      if (url.includes('/api/ontology/389?version=v2')) {
        return response(200, { id: 389, output_json: { status: 'approved', onlyPost: 'new' } })
      }
      return response(404, { detail: 'not found' })
    })

    vi.stubGlobal('fetch', fetchMock)
    render(<App />)

    const postPane = screen.getByRole('heading', { name: 'Post' }).closest('article')
    expect(postPane).not.toBeNull()
    if (!postPane) {
      return
    }

    const postVersion = within(postPane).getByLabelText('Post ontology version')
    await userEvent.clear(postVersion)
    await userEvent.type(postVersion, 'v2')
    await userEvent.click(within(postPane).getByRole('button', { name: 'Load' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Go to Pre JSON path root.onlyPre/i })).toBeInTheDocument()
    })

    const goToPre = screen.getByRole('button', { name: /Go to Pre JSON path root.onlyPre/i })
    await userEvent.click(goToPre)

    const prePane = screen.getByRole('heading', { name: 'Pre' }).closest('article')
    const postPaneAfterNav = screen.getByRole('heading', { name: 'Post' }).closest('article')
    expect(prePane).not.toBeNull()
    expect(postPaneAfterNav).not.toBeNull()
    if (!prePane || !postPaneAfterNav) {
      return
    }

    expect(within(prePane).getByText('Focused path: root.onlyPre')).toBeInTheDocument()
    expect(within(postPaneAfterNav).getByText('Focused path: root.onlyPre')).toBeInTheDocument()
    expect(within(prePane).getByLabelText('Pre ontology JSON').querySelector('.code-line-highlight')).not.toBeNull()
  })

  it('renders image and OCR sections while keeping metadata columns visible', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('/api/ontology/389?version=v1')) {
        return response(200, {
          id: 389,
          output_json: { stable: true },
          location: 'https://cdn.example.com/ontology/389.png',
          ocr_text: 'Detected OCR content for ontology 389.',
          change_description: 'Added certified_teacher qualification',
          hierarchy_assessment: 'VALID',
          validation_notes: 'Schema validated without conflicts',
          change_reason: 'Provider qualification metadata update',
        })
      }
      return response(404, { detail: 'not found' })
    })

    vi.stubGlobal('fetch', fetchMock)
    render(<App />)

    await waitFor(() => {
      expect(screen.getByLabelText('Image panel')).toBeInTheDocument()
    })

    expect(screen.getByRole('img', { name: 'Ontology source' })).toHaveAttribute(
      'src',
      'https://cdn.example.com/ontology/389.png',
    )
    expect(screen.getByLabelText('OCR text panel')).toHaveTextContent('Detected OCR content for ontology 389.')
    expect(screen.getByLabelText('Metadata fields panel')).toBeInTheDocument()
    expect(screen.getByLabelText('Metadata and media layout')).toBeInTheDocument()

    const metadataPanel = screen.getByRole('complementary', { name: 'Metadata Columns' })
    expect(metadataPanel).toHaveClass('metadata-panel-absolute')

    const rightPaneContent = document.querySelector('.right-pane-content')
    expect(rightPaneContent).not.toBeNull()
    expect(rightPaneContent?.querySelectorAll('.right-pane-half')).toHaveLength(2)

    const metadataGrid = document.querySelector('.metadata-columns-grid')
    expect(metadataGrid).not.toBeNull()
    expect(metadataGrid?.querySelectorAll('.metadata-column')).toHaveLength(4)

    const metadataHeadings = Array.from(metadataGrid?.querySelectorAll('h3') ?? []).map((heading) => heading.textContent)
    expect(metadataHeadings.slice(0, 2)).toEqual(['Validation Notes', 'Change Reason'])

    const prePane = screen.getByRole('heading', { name: 'Pre' }).closest('article')
    expect(prePane).not.toBeNull()
    if (!prePane) {
      return
    }
    expect(prePane).toHaveClass('source-comparison-pane')
    expect(metadataPanel).toHaveClass('metadata-panel-absolute')
  })

  it('shows explicit media fallback states when location and ocr_text are missing', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('/api/ontology/389?version=v1')) {
        return response(200, {
          id: 389,
          output_json: { stable: true },
          location: null,
          ocr_text: null,
        })
      }
      return response(404, { detail: 'not found' })
    })

    vi.stubGlobal('fetch', fetchMock)
    render(<App />)

    await waitFor(() => {
      expect(screen.getByLabelText('Image panel')).toBeInTheDocument()
    })

    expect(screen.getByLabelText('Image panel')).toHaveTextContent('Image unavailable')
    expect(screen.getByLabelText('OCR text panel')).toHaveTextContent('OCR text not available')
    expect(screen.queryByRole('img', { name: 'Ontology source' })).not.toBeInTheDocument()
  })

  it('expands and contracts metadata image on click and closes with Escape', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('/api/ontology/389?version=v1')) {
        return response(200, {
          id: 389,
          output_json: { stable: true },
          location: 'https://cdn.example.com/ontology/389.png',
          ocr_text: 'Detected OCR content for ontology 389.',
        })
      }
      return response(404, { detail: 'not found' })
    })

    vi.stubGlobal('fetch', fetchMock)
    render(<App />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Expand ontology image' })).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: 'Expand ontology image' }))
    expect(screen.getByRole('dialog', { name: 'Expanded ontology image' })).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Expanded ontology image' })).not.toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: 'Expand ontology image' }))
    await userEvent.click(screen.getByRole('button', { name: 'Contract ontology image' }))
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Expanded ontology image' })).not.toBeInTheDocument()
    })
  })

  it('falls back to image unavailable when image load fails', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('/api/ontology/389?version=v1')) {
        return response(200, {
          id: 389,
          output_json: { stable: true },
          location: 'https://cdn.example.com/ontology/389.png',
          ocr_text: 'Detected OCR content for ontology 389.',
        })
      }
      return response(404, { detail: 'not found' })
    })

    vi.stubGlobal('fetch', fetchMock)
    render(<App />)

    await waitFor(() => {
      expect(screen.getByRole('img', { name: 'Ontology source' })).toBeInTheDocument()
    })

    fireEvent.error(screen.getByRole('img', { name: 'Ontology source' }))

    await waitFor(() => {
      expect(screen.getByLabelText('Image panel')).toHaveTextContent('Image unavailable')
      expect(screen.queryByRole('img', { name: 'Ontology source' })).not.toBeInTheDocument()
    })
  })

  it('preserves metadata fallback behavior when values are missing', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('/api/ontology/389?version=v1')) {
        return response(200, {
          id: 389,
          output_json: { one: 1 },
          change_description: null,
          hierarchy_assessment: ' ',
          validation_notes: undefined,
          change_reason: null,
        })
      }
      return response(404, { detail: 'not found' })
    })

    vi.stubGlobal('fetch', fetchMock)
    render(<App />)

    await waitFor(() => {
      expect(screen.getByLabelText('Change Description column')).toBeInTheDocument()
    })

    expect(screen.getByLabelText('Change Description column')).toHaveTextContent('Not available')
    expect(screen.getByLabelText('Hierarchy Assessment column')).toHaveTextContent('Not available')
    expect(screen.getByLabelText('Validation Notes column')).toHaveTextContent('Not available')
    expect(screen.getByLabelText('Change Reason column')).toHaveTextContent('Not available')
  })
})

describe('login gate', () => {
  it('shows login page and redirects unauthenticated users to /login', async () => {
    window.history.replaceState(null, '', '/comparison')
    render(<App />)

    expect(screen.getByRole('heading', { name: 'BR Ontology Visualizer Login' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
    await waitFor(() => {
      expect(window.location.pathname).toBe('/login')
    })
  })

  it('displays an error on failed login', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('/api/auth/login')) {
        return response(401, { detail: 'Invalid user ID or password.' })
      }
      return response(404, { detail: 'not found' })
    })

    vi.stubGlobal('fetch', fetchMock)
    render(<App />)

    await userEvent.type(screen.getByLabelText('User ID'), 'wrong')
    await userEvent.type(screen.getByLabelText('Password'), 'incorrect')
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid user ID or password.')
    expect(window.sessionStorage.getItem('brov.auth')).not.toBe('true')
  })

  it('allows login with API authentication and supports logout', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input)
      if (url.includes('/api/auth/login')) {
        return response(200, { success: true, message: 'Login successful.' })
      }
      if (url.includes('/api/ontology/389?version=v1')) {
        return response(200, { id: 389, output_json: { one: 1 } })
      }
      if (url.includes('/api/ontology/390?version=v1')) {
        return response(200, { id: 390, output_json: { one: 2 } })
      }
      return response(404, { detail: 'not found' })
    })

    vi.stubGlobal('fetch', fetchMock)
    render(<App />)

    await userEvent.type(screen.getByLabelText('User ID'), 'user')
    await userEvent.type(screen.getByLabelText('Password'), 'Fifa2026$')
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Pre' })).toBeInTheDocument()
      expect(window.location.pathname).toBe('/')
      expect(window.sessionStorage.getItem('brov.auth')).toBe('true')
    })

    await userEvent.click(screen.getByRole('button', { name: 'Logout' }))

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'BR Ontology Visualizer Login' })).toBeInTheDocument()
      expect(window.location.pathname).toBe('/login')
      expect(window.sessionStorage.getItem('brov.auth')).toBeNull()
    })
  })

  it('shows service unavailable error when login API fails', async () => {
    const fetchMock = vi.fn(async () => response(500, { detail: 'Authentication service unavailable.' }))

    vi.stubGlobal('fetch', fetchMock)
    render(<App />)

    await userEvent.type(screen.getByLabelText('User ID'), 'user')
    await userEvent.type(screen.getByLabelText('Password'), 'Fifa2026$')
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Login service unavailable. Please try again.')
    expect(window.sessionStorage.getItem('brov.auth')).not.toBe('true')
  })
})


