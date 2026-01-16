"use client";

import React, { useRef, useEffect, ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface StarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  lightWidth?: number;
  duration?: number;
  lightColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export function StarButton({
  children,
  lightWidth = 110,
  duration = 3,
  lightColor = "#2E8B9A",
  backgroundColor = "#1E3A5F",
  borderWidth = 2,
  className,
  href,
  target,
  rel,
  ...props
}: StarButtonProps) {
  const pathRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      const el = pathRef.current;
      el.style.setProperty(
        "--path",
        `path('M 0 0 H ${el.offsetWidth} V ${el.offsetHeight} H 0 V 0')`,
      );
    }
  }, []);

  const commonProps = {
    style: {
      "--duration": duration,
      "--light-width": `${lightWidth}px`,
      "--light-color": lightColor,
      "--bg-color": backgroundColor,
      "--border-width": `${borderWidth}px`,
      isolation: "isolate",
    } as CSSProperties,
    className: cn(
      "relative z-[3] overflow-hidden px-8 py-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 group/star-button",
      className,
    ),
  };

  const innerContent = (
    <>
      {/* Animated light sweep */}
      <div
        className="absolute aspect-square inset-0 animate-star-btn bg-[radial-gradient(ellipse_at_center,var(--light-color),transparent,transparent)] opacity-60"
        style={{
          offsetPath: "var(--path)",
          offsetDistance: "0%",
          width: "var(--light-width)",
        } as CSSProperties}
      />
      {/* Solid background */}
      <div
        className="absolute inset-0 z-[4] overflow-hidden rounded-[inherit]"
        style={{
          backgroundColor: "var(--bg-color)",
          borderWidth: "var(--border-width)",
          borderColor: "rgba(255,255,255,0.2)"
        }}
        aria-hidden="true"
      />
      <span className="z-10 relative text-white font-semibold">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={pathRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        {...commonProps}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={pathRef as React.RefObject<HTMLButtonElement>}
      {...commonProps}
      {...props}
    >
      {innerContent}
    </button>
  );
}

export default StarButton;
