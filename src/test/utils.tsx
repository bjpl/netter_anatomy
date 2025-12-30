/**
 * Test Utilities
 * Custom render function and test helpers
 */

import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// ============================================================================
// Test Providers
// ============================================================================

interface AllProvidersProps {
  children: ReactNode;
}

/**
 * Create a new QueryClient for each test to ensure isolation
 */
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Disable retries in tests
        retry: false,
        // Don't cache queries in tests
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

/**
 * Wrapper component with all providers
 */
function AllProviders({ children }: AllProvidersProps) {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}

// ============================================================================
// Custom Render Function
// ============================================================================

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /**
   * Initial route for Router
   */
  initialRoute?: string;
  /**
   * Custom QueryClient instance
   */
  queryClient?: QueryClient;
}

/**
 * Custom render function that includes all necessary providers
 *
 * @example
 * ```tsx
 * const { getByText } = renderWithProviders(<MyComponent />);
 * ```
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  const { initialRoute = '/', queryClient, ...renderOptions } = options || {};

  // Set initial route if provided
  if (initialRoute !== '/') {
    window.history.pushState({}, 'Test page', initialRoute);
  }

  // Create custom wrapper if queryClient is provided
  const Wrapper = queryClient
    ? ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
      )
    : AllProviders;

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// ============================================================================
// Test Helpers
// ============================================================================

/**
 * Wait for all loading states to finish
 * Useful for waiting for async data fetching
 */
export async function waitForLoadingToFinish() {
  const { findByText, queryByText } = renderWithProviders(<div />);

  // Wait for common loading indicators to disappear
  const loadingTexts = ['Loading...', 'Please wait...', 'Fetching...'];

  for (const text of loadingTexts) {
    if (queryByText(text)) {
      await findByText(text, {}, { timeout: 5000 }).then(() => {
        // Wait for it to disappear
        return new Promise((resolve) => setTimeout(resolve, 100));
      });
    }
  }
}

/**
 * Sleep utility for waiting in tests
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Create a mock file for file upload tests
 */
export function createMockFile(
  name: string = 'test.jpg',
  size: number = 1024,
  type: string = 'image/jpeg'
): File {
  const file = new File(['dummy content'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
}

/**
 * Mock fetch response
 */
export function createMockFetchResponse<T>(data: T, ok: boolean = true) {
  return {
    ok,
    status: ok ? 200 : 400,
    json: async () => data,
    text: async () => JSON.stringify(data),
    blob: async () => new Blob([JSON.stringify(data)]),
    headers: new Headers(),
    redirected: false,
    statusText: ok ? 'OK' : 'Bad Request',
    type: 'basic' as ResponseType,
    url: '',
    clone: () => createMockFetchResponse(data, ok),
    body: null,
    bodyUsed: false,
    arrayBuffer: async () => new ArrayBuffer(0),
    formData: async () => new FormData(),
  };
}

/**
 * Wait for an element to be removed from the DOM
 */
export async function waitForElementToBeRemoved(
  callback: () => HTMLElement | null,
  options?: { timeout?: number }
) {
  const { timeout = 3000 } = options || {};
  const startTime = Date.now();

  while (callback()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for element to be removed');
    }
    await sleep(50);
  }
}

/**
 * Suppress console errors during a test
 * Useful for testing error states without polluting test output
 */
export function suppressConsoleError(testFn: () => void | Promise<void>) {
  return async () => {
    const originalError = console.error;
    console.error = () => {};
    try {
      await testFn();
    } finally {
      console.error = originalError;
    }
  };
}

// ============================================================================
// Re-export testing library utilities for convenience
// ============================================================================

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { renderWithProviders as render };
