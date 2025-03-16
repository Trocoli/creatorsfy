import classNames from "classnames";
import React from "react";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fluid?: boolean | "sm" | "md" | "lg" | "xl";
  flex?: boolean;
  grow?: boolean;
  column?: boolean;
  justifyContent?: string;
  alignItems?: string;
  margin?: string;
  padding?: string;
}

const Container = (props: ContainerProps) => {
  const {
    children,
    className,
    fluid,
    flex,
    grow,
    column,
    justifyContent,
    alignItems,
    margin,
    padding,
    ...rest
  } = props;

  let containerClass = "";

  containerClass = `${
    fluid === true
      ? "w-full"
      : !!fluid
      ? "max-w-screen-" + fluid + " mx-auto"
      : ""
  }  `;

  const classes = classNames(className, containerClass, margin, padding, {
    flex: flex,
    "flex-col": column,
    grow: grow,
    [`justify-${justifyContent}`]: !!justifyContent,
    [`items-${alignItems}`]: !!alignItems,
  });

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export default Container;
