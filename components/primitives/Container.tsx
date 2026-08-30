import { cn } from "@/lib/utils";
import type { ElementType, ComponentPropsWithoutRef } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Comp = as || "div";
  return (
    <Comp
      className={cn(
        "mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
