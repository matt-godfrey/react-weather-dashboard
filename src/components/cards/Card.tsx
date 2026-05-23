import clsx from "clsx";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  className?: string;
  childrenClassName?: string;
};

export default function Card({
  children,
  title,
  className,
  childrenClassName,
}: Props) {
  return (
    <div
      className={clsx(
        "p-4 rounded-xl bg-linear-to-br from-card to-card/60 shadow-md flex flex-col gap-4 2xl:h-full",
        className,
      )}
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      {/* use clsx to conditionally apply the fade-in animation class */}
      {/* use fade-in_1s_ease-out_forwards class to slightly delay cards appearance */}
      <div
        className={clsx(
          childrenClassName,
          "fade-in_1s_ease-out_forwards] 2xl:flex-1",
        )}
      >
        {children}
      </div>
    </div>
  );
}
