"use client";

import {
    ApplicationError,
    normalizeError,
    parseError,
} from "@adgytec/adgytec-web-utils";
import type { ReactNode } from "react";
import type z from "zod";
import { ErrorMessage } from "./ErrorMessage";

export const LoaderErrorMessage = <TSchema extends z.ZodType = z.ZodType>({
    error,
    actionErrors,
}: {
    error: unknown;
    actionErrors?: {
        schema: TSchema;
        render: (data: z.infer<TSchema>) => ReactNode;
    };
}) => {
    const parsedErr = parseError(error);

    if (
        actionErrors &&
        parsedErr.code === "zod-error" &&
        error instanceof ApplicationError
    ) {
        const result = actionErrors.schema.safeParse(error.details);
        if (result.success) {
            return actionErrors.render(result.data);
        }
    }

    return <ErrorMessage err={normalizeError(parsedErr)} />;
};
