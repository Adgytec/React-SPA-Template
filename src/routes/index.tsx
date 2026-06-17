import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/Link";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            Hello "/"!
            <Link to="/home">go to home</Link>
        </div>
    );
}
