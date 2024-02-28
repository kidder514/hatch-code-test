
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render } from '@testing-library/react';
import { Provider } from 'jotai';

// for unit-testing only
const queryClient = new QueryClient();
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient} >
            <Provider>
                {children}
            </Provider>
        </QueryClientProvider >
    )
};

const wrapRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { wrapRender as render }