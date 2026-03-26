import {
    type FormValidationFailed as FormErrorValue,
    flattenFieldNodes,
    formCodes,
    formFieldTypes,
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

export const handleError: HandleError = (err) => {
    const errValue = parseError(err);

    if (errValue.code === formCodes.formValidationFailed) {
        const formErrors = handleFormError(errValue);
        return {
            type: "field-error",
            value: formErrors,
        };
    }

    return { type: "base-error", value: "", zodError: true };
};

type HandleFormError = (errValue: FormErrorValue) => Record<string, string[]>;

type FormErrorTranslationKey = keyof I18nResources["common/errors/forms"];

const handleFormError: HandleFormError = (errValue) => {
    const flattendError = flattenFieldNodes(errValue.details);
    const translatedMessages: Record<string, string[]> = {};

    for (const [key, values] of Object.entries(flattendError)) {
        translatedMessages[key] = values.map((err) => {
            if (err.type === formFieldTypes.invalid) {
                return i18n.exists(err.details.cause, {
                    ns: "common/errors/forms",
                })
                    ? i18n.t(err.details.cause as FormErrorTranslationKey, {
                          ...err.details,
                          ns: "common/errors/forms",
                      })
                    : i18n.t("unknown", { ns: "common/errors/forms" });
            }

            const details = "details" in err ? err.details : {};
            return i18n.exists(err.type, { ns: "common/errors/forms" })
                ? i18n.t(err.type as FormErrorTranslationKey, {
                      ...details,
                      ns: "common/errors/forms",
                  })
                : i18n.t("unknown", { ns: "common/errors/forms" });
        });
    }

    return translatedMessages;
};
