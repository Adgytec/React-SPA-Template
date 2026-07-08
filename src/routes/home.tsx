import { createFileRoute } from "@tanstack/react-router";
import { LinkButton } from "@/components/Link";
import { Settings } from "@/components/Settings";

export const Route = createFileRoute("/home")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            Home
            <LinkButton to="/">Index</LinkButton>
            <Settings />
        </>
    );
}
