import React from 'react'
import {createRoot} from 'react-dom/client'
import {createInertiaApp} from '@inertiajs/inertia-react'
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {WagmiProvider} from 'wagmi'
import {wagmiConfig} from "./wagmi-config.ts";
import {WalletProvider} from "./context/WalletContext.tsx";


const queryClient = new QueryClient();

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({el, App, props}) {
        createRoot(el).render(
            <WalletProvider>
                <WagmiProvider config={wagmiConfig}>
                    <QueryClientProvider client={queryClient}>
                        <App {...props} />
                        <ReactQueryDevtools initialIsOpen={false}/>
                    </QueryClientProvider>
                </WagmiProvider>
            </WalletProvider>
        );
    },
});
