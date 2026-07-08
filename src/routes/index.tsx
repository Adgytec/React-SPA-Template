import { createFileRoute } from "@tanstack/react-router";
import { LinkButton } from "@/components/Link";
import { Settings } from "@/components/Settings";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            Index
            <LinkButton to="/home" color="elevated">
                home
            </LinkButton>
            <Settings />
        </>
    );
}
