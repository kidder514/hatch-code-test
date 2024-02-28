import { createRoot } from 'react-dom/client';
import { Provider } from 'jotai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById('app') as HTMLElement);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
        },
    },
});

root.render(
    <QueryClientProvider client={queryClient}>
        <Provider>
            <App />
        </Provider>
    </QueryClientProvider >
);

