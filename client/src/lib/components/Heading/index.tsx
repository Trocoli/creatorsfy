// components/Heading.tsx
import React, { JSX } from "react";

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({
  level = 1,
  className = "",
  children,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={`text-4xl font-bold ${className}`}>{children}</Tag>;
};

export default Heading;
