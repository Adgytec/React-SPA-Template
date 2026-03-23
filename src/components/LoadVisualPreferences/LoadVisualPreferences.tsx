import {
    ComponentShapeSwitcher,
    ThemeSwitcher,
} from "@adgytec/adgytec-web-ui-components";

export const LoadVisualPreferences = () => {
    return (
        <>
            <ThemeSwitcher ui={false} />
            <ComponentShapeSwitcher ui={false} />
        </>
    );
};
