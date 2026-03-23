import { Link } from "@adgytec/adgytec-web-ui-components";
import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "@/components/Settings/Settings";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            Hello "/"!
            <Settings />
            <Link href="/home">go to index</Link>
        </div>
    );
}
