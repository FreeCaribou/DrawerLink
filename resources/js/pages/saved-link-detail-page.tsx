import { SavedLink } from "@/types";
import AppInternLayout from "@/layouts/app-intern-layout";

export default function DrawCard({
    savedLink,
}: {
    savedLink: SavedLink;
}) {
    return (
        <AppInternLayout>
            <h2>{savedLink.label}</h2>
            <h3>Todo</h3>
        </AppInternLayout>
    );
}