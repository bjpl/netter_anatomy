import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <header className="bg-primary text-white p-4">
            <h1 className="text-2xl font-bold">Netter's Anatomy Learning Tool</h1>
          </header>
          <main className="container mx-auto p-4">
            <div className="text-center mt-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Welcome to Interactive Anatomy Learning
              </h2>
              <p className="text-lg text-gray-600">
                Project initialized successfully. Ready for development.
              </p>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
