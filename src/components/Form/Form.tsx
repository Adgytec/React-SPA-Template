import {
    type FlattenedErrors,
    formFieldTypes,
} from "@adgytec/adgytec-web-utils";
import { Form as AriaForm } from "react-aria-components";
import { useTFormErrors } from "@/hooks/translations";

export type ValidationErrors = Record<string, string | string[]>;

export const Form: React.FC<
    Omit<React.ComponentPropsWithRef<typeof AriaForm>, "validationErrors"> & {
        fieldValidationErrors?: FlattenedErrors;
    }
> = ({ fieldValidationErrors, ...props }) => {
    const { t } = useTFormErrors();

    const validationErrors: ValidationErrors = {};
    if (fieldValidationErrors) {
        for (const [key, values] of Object.entries(fieldValidationErrors)) {
            validationErrors[key] = values.map((err) => {
                if (err.type === formFieldTypes.invalid) {
                    return t(err.details.cause, {
                        ...err.details,
                        ns: "common/errors/forms",
                    });
                }

                if (err.type === formFieldTypes.overflow) {
                    if (typeof err.details.max === "number")
                        return t("overflow-number", {
                            ...err.details,
                            ns: "common/errors/forms",
                        });

                    return t("overflow-date", {
                        ...err.details,
                        ns: "common/errors/forms",
                    });
                }

                if (err.type === formFieldTypes.underflow) {
                    if (typeof err.details.min === "number")
                        return t("underflow-number", {
                            ...err.details,
                            ns: "common/errors/forms",
                        });

                    return t("underflow-date", {
                        ...err.details,
                        ns: "common/errors/forms",
                    });
                }

                const details = "details" in err ? err.details : {};
                return t(err.type, {
                    ...details,
                    ns: "common/errors/forms",
                });
            });
        }
    }
    return <AriaForm validationErrors={validationErrors} {...props} />;
};
