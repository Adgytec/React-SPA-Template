"use client";

import type { ErrorDetails } from "@adgytec/adgytec-web-utils";
import { useTCommonErrors } from "@/hooks/translations";

export const ErrorMessage: React.FC<{ err: ErrorDetails }> = ({ err }) => {
    const { t } = useTCommonErrors();
    return <>{t(err.code, { ...err })}</>;
};
