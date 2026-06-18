import { AppBarStateContext } from "@adgytec/adgytec-web-ui-components";
import clsx from "clsx";
import { type ReactNode, useContext } from "react";
import styles from "./scaffold.module.css";

export const Scaffold: React.FC<{
    children?: ReactNode;
    navigation?: ReactNode;
    appBar?: ReactNode;
    isNavigationDocked?: boolean;
    variant?: "standard" | "decorative";
    footer?: ReactNode;
}> = ({
    children,
    navigation,
    appBar,
    footer,
    isNavigationDocked = false,
    variant = "standard",
}) => {
    const appBarState = useContext(AppBarStateContext);

    return (
        <div
            className={clsx(styles["scaffold"])}
            onScroll={(e) => {
                appBarState?.updateScrolling(e.currentTarget.scrollTop > 24);
            }}
            data-docked-navigation={isNavigationDocked || undefined}
            data-variant={variant}
        >
            {variant === "decorative" && (
                <div aria-hidden className={styles["blob3"]} />
            )}

            {isNavigationDocked && navigation && (
                <aside className={clsx(styles["docked-navigation"])}>
                    {navigation}
                </aside>
            )}

            <div className={clsx(styles["main"])}>
                {appBar}

                {children}

                {footer}
            </div>
        </div>
    );
};
