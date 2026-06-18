import { createFileRoute } from "@tanstack/react-router";
import { LinkButton } from "@/components/Link";
import { Scaffold, ScaffoldContent } from "@/components/Scaffold";
import { Settings } from "@/components/Settings";

export const Route = createFileRoute("/home")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Scaffold isNavigationDocked variant="decorative">
            <ScaffoldContent
                style={{
                    display: "flex",
                    gap: "var(--md-sys-layout-space-32)",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Home
                <LinkButton to="/">Index</LinkButton>
                <Settings />
            </ScaffoldContent>
        </Scaffold>
    );
}
