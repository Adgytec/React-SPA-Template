import {
    createRootRoute,
    type NavigateOptions,
    Outlet,
    type RegisteredRouter,
    type ToPathOption,
    useRouter,
} from "@tanstack/react-router";
import { RouterProvider } from "react-aria-components";
import { Devtools } from "@/components/Devtools/Devtools";
import { LoadVisualPreferences } from "@/components/LoadVisualPreferences/LoadVisualPreferences";

// https://stackblitz.com/edit/tanstack-router-hhpjdc?file=src%2Froutes%2F__root.tsx&preset=node
// used this for react-aria-components usage with tanstack-router
declare module "react-aria-components" {
    interface RouterConfig {
        href: ToPathOption<RegisteredRouter, "/", "/">;
        routerOptions: Omit<NavigateOptions, "to" | "from">;
    }
}

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const router = useRouter();

    return (
        <RouterProvider
            navigate={(to, options) =>
                router.navigate({
                    ...options,
                    to: to as ToPathOption<RegisteredRouter, "/", "/">,
                })
            }
            useHref={(to) => buildHref(to, router)}
        >
            <LoadVisualPreferences />
            <div>Hello "__root"!</div>
            <Outlet />
            <Devtools />
        </RouterProvider>
    );
}

// https://github.com/adobe/react-spectrum/issues/6397#issuecomment-2473017479
// refrenced this for external url
const ABSOLUTE_URL_PREFIXES = [
    "https://",
    "http://",
    "mailto:",
    "tel:",
] as const;

function buildHref(
    to: ToPathOption<RegisteredRouter, "/", "/">,
    router: RegisteredRouter
): string {
    if (!to) return "";

    if (ABSOLUTE_URL_PREFIXES.some((prefix) => to.startsWith(prefix))) {
        return to;
    }

    return router.buildLocation({ to }).href;
}
