import type React from "react";

export type SettingItem = {
    id: string;
    component: React.ReactElement;
    heading: string;
    description?: string;
};
