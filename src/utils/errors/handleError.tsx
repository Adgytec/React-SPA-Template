import type { useSnackbarQueue } from "@adgytec/adgytec-web-ui-components";
import {
    ApplicationError,
    type FlattenedErrors,
    flattenFieldNodes,
    formCodes,
    normalizeError,
    parseError,
} from "@adgytec/adgytec-web-utils";
import type { ReactNode } from "react";
import type z from "zod";
import { ErrorMessage } from "@/components/ErrorMessage";

type HandleErrorsOptions<TSchema extends z.ZodType = z.ZodType> = {
    handleFormFieldErrors?: (fieldErrs: FlattenedErrors) => void;
    snackbarQueue?: ReturnType<typeof useSnackbarQueue>;
    actionErrors?: {
        schema: TSchema;
        render: (data: z.infer<TSchema>) => ReactNode;
    };
};

type HandleErrors = <TSchema extends z.ZodType = z.ZodType>(
    error: unknown,
    options?: HandleErrorsOptions<TSchema>
) => void;

export const handleErrors: HandleErrors = (error, options) => {
    const parsedErr = parseError(error);

    if (
        parsedErr.code === formCodes.formValidationFailed &&
        options?.handleFormFieldErrors
    ) {
        options.handleFormFieldErrors(flattenFieldNodes(parsedErr.details));
        return;
    }

    if (
        parsedErr.code === "zod-error" &&
        error instanceof ApplicationError &&
        options?.actionErrors
    ) {
        const result = options.actionErrors.schema.safeParse(error.details);

        if (result.success) {
            options.snackbarQueue?.add({
                supportingText: options.actionErrors.render(result.data),
            });
            return;
        }
    }

    options?.snackbarQueue?.add({
        supportingText: <ErrorMessage err={normalizeError(parsedErr)} />,
    });
};
