import type { FlattenedErrors } from "@adgytec/adgytec-web-utils";
import { useState } from "react";

export function useFormFieldError() {
    const [errors, setErrors] = useState<FlattenedErrors | undefined>(
        undefined
    );

    const clearFormFieldError = () => setErrors(undefined);
    const addFormFieldError = (fieldErrs: FlattenedErrors) =>
        setErrors(fieldErrs);

    return { formFieldError: errors, clearFormFieldError, addFormFieldError };
}
