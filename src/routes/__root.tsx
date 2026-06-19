import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Devtools } from "@/components/Devtools";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <Outlet />
            <Devtools />
        </>
    );
}
