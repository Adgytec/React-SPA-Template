import { createFileRoute } from "@tanstack/react-router";
import { LinkButton } from "@/components/Link";

export const Route = createFileRoute("/home")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div
            style={{
                display: "flex",
                gap: "var(--md-sys-layout-space-16)",
                alignItems: "center",
            }}
        >
            Hello "/home"!
            <LinkButton to="/">index</LinkButton>
        </div>
    );
}
