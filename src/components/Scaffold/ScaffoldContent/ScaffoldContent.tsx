import clsx from "clsx";
import styles from "./scaffoldContent.module.css";

export const ScaffoldContent: React.FC<React.ComponentPropsWithRef<"div">> = ({
    className,
    ...props
}) => {
    return <div className={clsx(styles["content"], className)} {...props} />;
};
