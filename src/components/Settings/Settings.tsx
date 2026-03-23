import {
    type ColorTheme,
    ComponentShapeSwitcher,
    PopoverDialog,
    SolidCard,
    TextButton,
    ThemeSwitcher,
} from "@adgytec/adgytec-web-ui-components";
import clsx from "clsx";
import { Settings as SettingsIcon } from "lucide-react";
import { useTSettings } from "@/hooks/translations/useT";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import styles from "./settings.module.css";
import type { SettingItem } from "./types";

export const Settings = () => {
    const { t: tSettings } = useTSettings();
    const itemTheme: ColorTheme = "secondary";

    const settingItems: SettingItem[] = [
        {
            id: "theme",
            component: (
                <ThemeSwitcher
                    displayValue={{
                        system: tSettings("theme.selection.system"),
                        light: tSettings("theme.selection.light"),
                        dark: tSettings("theme.selection.dark"),
                    }}
                    theme={itemTheme}
                />
            ),
            heading: tSettings("theme.heading"),
            description: tSettings("theme.description"),
        },
        {
            id: "shape",
            component: (
                <ComponentShapeSwitcher
                    displayValue={{
                        sharp: tSettings("shape.selection.sharp"),
                        round: tSettings("shape.selection.round"),
                    }}
                    theme={itemTheme}
                />
            ),
            heading: tSettings("shape.heading"),
            description: tSettings("shape.description"),
        },
        {
            id: "language",
            component: <LanguageSelector theme={itemTheme} />,
            heading: tSettings("language.heading"),
            description: tSettings("language.description"),
        },
    ];

    return (
        <PopoverDialog
            trigger={
                <TextButton
                    shape="square"
                    description={tSettings("popover")}
                    theme="inverse-surface"
                >
                    <SettingsIcon />
                </TextButton>
            }
        >
            <SolidCard className={clsx(styles["settings"])}>
                {settingItems.map((item) => (
                    <div
                        className={clsx(styles["settings-item"])}
                        key={item.id}
                    >
                        <div>
                            <h3>{item.heading}</h3>

                            {item.description && <p>{item.description}</p>}
                        </div>

                        {item.component}
                    </div>
                ))}
            </SolidCard>
        </PopoverDialog>
    );
};
