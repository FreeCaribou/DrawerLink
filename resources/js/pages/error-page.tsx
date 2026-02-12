import AppInternLayout from "@/layouts/app-intern-layout";
import React from "react";
import { usePage } from "@inertiajs/react";

export default function ErrorPage({
    error
}: {
    error: string;
}) {
    const { errors } = usePage().props;

    return (
        <AppInternLayout>
            <h1>An error occur !</h1>
            <h2>{error}</h2>
            TODO better display of error, show the messages
            {errors && (
                <div>
                    {Object.entries(errors).map(([key, value]) => (
                        <React.Fragment key={key}>
                            <h3>{value}</h3>
                        </React.Fragment>
                    ))}
                </div>
            )}
        </AppInternLayout>
    );
}