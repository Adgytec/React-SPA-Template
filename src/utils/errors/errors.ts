import {
    commonCodes,
    type FormValidationFailed as FormErrorValue,
    flattenFieldNodes,
    formCodes,
    formFieldTypes,
    normalizeError,
    parseError,
} from "@adgytec/adgytec-web-utils";
import type { I18nResources } from "types/i18next-resources";
import i18n from "@/i18n/i18n";

type HandleError = (err: unknown) =>
    | {
          type: "field-error";
          value: Record<string, string[]>;
      }
    | {
          type: "base-error";
          value: string;
          zodError: boolean; // tells if custom error parsing logic can be used or not
      };

type BaseErrorTranslationKey = keyof I18nResources["common/errors/base"];

export const handleError: HandleError = (err) => {
    const errValue = parseError(err);

    if (errValue.code === formCodes.formValidationFailed) {
        const formErrors = handleFormError(errValue);
        return {
            type: "field-error",
            value: formErrors,
        };
    }

    const isZodError = errValue.code === commonCodes.zodError;

    // normalize error
    const normalizedErrValue = normalizeError(errValue);
    const errMessage = i18n.t(
        [
            normalizedErrValue.code,
            "unexpected-error",
        ] as BaseErrorTranslationKey[],
        {
            ...normalizedErrValue,
            ns: "common/errors/base",
        }
    );

    return { type: "base-error", value: errMessage, zodError: isZodError };
};

type HandleFormError = (errValue: FormErrorValue) => Record<string, string[]>;

const handleFormError: HandleFormError = (errValue) => {
    const flattendError = flattenFieldNodes(errValue.details);
    const translatedMessages: Record<string, string[]> = {};

    for (const [key, values] of Object.entries(flattendError)) {
        translatedMessages[key] = values.map((err) => {
            if (err.type === formFieldTypes.invalid) {
                return i18n.t(err.details.cause, {
                    ...err.details,
                    ns: "common/errors/forms",
                });
            }

            if (err.type === formFieldTypes.overflow) {
                if (typeof err.details.max === "number")
                    return i18n.t("overflow-number", {
                        ...err.details,
                        ns: "common/errors/forms",
                    });

                return i18n.t("overflow-date", {
                    ...err.details,
                    ns: "common/errors/forms",
                });
            }

            if (err.type === formFieldTypes.underflow) {
                if (typeof err.details.min === "number")
                    return i18n.t("underflow-number", {
                        ...err.details,
                        ns: "common/errors/forms",
                    });

                return i18n.t("underflow-date", {
                    ...err.details,
                    ns: "common/errors/forms",
                });
            }

            const details = "details" in err ? err.details : {};
            return i18n.t(err.type, {
                ...details,
                ns: "common/errors/forms",
            });
        });
    }

    return translatedMessages;
};
