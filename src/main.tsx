import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen.ts";

import "./i18n/i18n.ts";

// styles
import "./styles/core/theme/base/base.css";
import "./styles/core/core.css";
import "./styles/main.css";

import { ApplicationProvider } from "./components/ApplicationProvider/ApplicationProvider";
import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider";

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
                <ApplicationProvider>
                    <RouterProvider router={router} />
                </ApplicationProvider>
            </Suspense>
        </TanStackQueryProvider.Provider>
    </StrictMode>
);
