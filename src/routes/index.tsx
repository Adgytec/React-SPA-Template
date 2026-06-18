import { createFileRoute } from "@tanstack/react-router";
import { LinkButton } from "@/components/Link";
import { Scaffold, ScaffoldContent } from "@/components/Scaffold";
import { Settings } from "@/components/Settings";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Scaffold isNavigationDocked>
            <ScaffoldContent
                style={{
                    display: "flex",
                    gap: "var(--md-sys-layout-space-32)",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Index
                <LinkButton to="/home" color="elevated">
                    home
                </LinkButton>
                <Settings />
            </ScaffoldContent>
        </Scaffold>
    );
}
