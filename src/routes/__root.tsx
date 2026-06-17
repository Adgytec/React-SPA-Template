import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Devtools } from "@/components/Devtools/Devtools";
import { LoadVisualPreferences } from "@/components/LoadVisualPreferences/LoadVisualPreferences";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <LoadVisualPreferences />
            <div>Hello "__root"!</div>
            <Outlet />
            <Devtools />
        </>
    );
}
