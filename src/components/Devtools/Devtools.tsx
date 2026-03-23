import { lazy, Suspense } from "react";

const TanStackRouterDevtools = lazy(() =>
    import("@tanstack/react-router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
    }))
);

const TanstackQueryDevtools = lazy(
    () => import("../../integrations/tanstack-query/devtools.tsx")
);

export function Devtools() {
    if (!import.meta.env.DEV) {
        return null;
    }

    return (
        <Suspense fallback={null}>
            <TanStackRouterDevtools />
            <TanstackQueryDevtools />
        </Suspense>
    );
}
