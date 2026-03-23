import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen.ts";

import "./i18n/i18n.ts";
import "./styles/main.css";
import { I18nWrapper } from "./components/I18nWrapper/I18nWrapper.tsx";

import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider.tsx";

// Create a new router instance
const TanStackQueryProviderContext = TanStackQueryProvider.getContext();
export const router = createRouter({
    routeTree,
    context: {
        ...TanStackQueryProviderContext,
    },
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element not found");
}

createRoot(rootElement).render(
    <StrictMode>
        <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
            <Suspense fallback={null}>
                <I18nWrapper>
                    <RouterProvider router={router} />
                </I18nWrapper>
            </Suspense>
        </TanStackQueryProvider.Provider>
    </StrictMode>
);
