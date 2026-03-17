type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface ApiOptions {
  headers?: Record<string, string>
  body?: any
  redirectOnUnauthorized?: boolean
  skipErrorHandler?: boolean
}

type ErrorHandler = (error: unknown) => void

let globalErrorHandler: ErrorHandler | null = null
const authBypassed = () => window.__APP_ENV__?.DISABLE_AUTH === true

export function setApiErrorHandler(handler: ErrorHandler) {
  globalErrorHandler = handler
}

async function apiFetch<T>(
  endpoint: string,
  method: HttpMethod,
  options: ApiOptions = {},
): Promise<T> {
  const token = localStorage.getItem('token')

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  try {
    const response = await fetch(endpoint, {
      method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    })

    if (response.status === 401 && options.redirectOnUnauthorized !== false && !authBypassed()) {
      window.location.href = '/login'
      throw new Error('Unauthorized')
    }

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || `Request failed with status ${response.status}`)
    }

    return response.json() as Promise<T>
  } catch (err) {
    if (!options.skipErrorHandler && globalErrorHandler) {
      globalErrorHandler(err)
    }
    throw err
  }
}

export function useApi() {
  return {
    get: <T>(endpoint: string, options?: ApiOptions) => apiFetch<T>(endpoint, 'GET', options),
    post: <T>(endpoint: string, options?: ApiOptions) => apiFetch<T>(endpoint, 'POST', options),
    put: <T>(endpoint: string, options?: ApiOptions) => apiFetch<T>(endpoint, 'PUT', options),
    del: <T>(endpoint: string, options?: ApiOptions) => apiFetch<T>(endpoint, 'DELETE', options),
    patch: <T>(endpoint: string, options?: ApiOptions) => apiFetch<T>(endpoint, 'PATCH', options),
  }
}

export function createApiWithBaseUrl(baseUrl: string) {
  return {
    get: <T>(path: string, options?: ApiOptions) =>
      apiFetch<T>(`${baseUrl}${path}`, 'GET', options),
    post: <T>(path: string, options?: ApiOptions) =>
      apiFetch<T>(`${baseUrl}${path}`, 'POST', options),
    put: <T>(path: string, options?: ApiOptions) =>
      apiFetch<T>(`${baseUrl}${path}`, 'PUT', options),
    del: <T>(path: string, options?: ApiOptions) =>
      apiFetch<T>(`${baseUrl}${path}`, 'DELETE', options),
    patch: <T>(path: string, options?: ApiOptions) =>
      apiFetch<T>(`${baseUrl}${path}`, 'PATCH', options),
  }
}
