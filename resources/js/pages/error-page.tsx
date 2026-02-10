import { SavedLink } from "@/types";
import AppInternLayout from "@/layouts/app-intern-layout";
import React from "react";

export default function ErrorPage({
    error, messages = []
}: {
    error: string;
    messages: string[]
}) {
    return (
        <AppInternLayout>
            <h1>An error occur !</h1>
            <h2>{error}</h2>
            TODO better display of error, show the messages
            {messages.map((m) => (
                <React.Fragment key={m}>
                    <h3>{m}</h3>
                </React.Fragment>
            ))}
        </AppInternLayout>
    );
}