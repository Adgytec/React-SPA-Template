import {
    ThemeSelector as AppThemeSelector,
    ModalOverlay,
    SideSheet,
    SideSheetModal,
} from "@adgytec/adgytec-web-ui-components";
import { useTSettings } from "@/hooks/translations";

export const ThemeSelector: React.FC<{
    isOpen: boolean;
    onOpenChange: (val: boolean) => void;
}> = ({ isOpen, onOpenChange }) => {
    const { t } = useTSettings();
    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange} isDismissable>
            <SideSheetModal layout="detached">
                <SideSheet headline={t("theme.heading")}>
                    <AppThemeSelector
                        modeDetails={{
                            heading: t("theme.heading"),
                            description: t("theme.description"),
                            system: t("theme.system"),
                            light: t("theme.light"),
                            dark: t("theme.dark"),
                        }}
                        contrastDetails={{
                            heading: t("contrast.heading"),
                            description: t("contrast.description"),
                            standard: t("contrast.standard"),
                            medium: t("contrast.medium"),
                            high: t("contrast.high"),
                        }}
                        monochromeDetails={{
                            heading: t("monochrome.heading"),
                            description: t("monochrome.description"),
                        }}
                    />
                </SideSheet>
            </SideSheetModal>
        </ModalOverlay>
    );
};
