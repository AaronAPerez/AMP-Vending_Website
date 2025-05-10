"use client";

import React from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * MovingBorderButton Component
 * 
 * An animated button with a moving border effect
 * Inspired by Aceternity UI
 */
export function MovingBorderButton({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 2000,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%" className={borderClassName}>
          <div className="h-20 w-20 opacity-[0.8] bg-[#FD5A1E]" />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-[#000000] text-[#F5F5F5] border border-[#a4acac]/20 backdrop-blur-xl",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
}) => {
  const pathRef = React.useRef<SVGPathElement>(null);
  const progress = React.useRef<number>(0);

  useAnimationFrame((time) => {
    if (pathRef.current) {
      progress.current = (time % duration) / duration;
      
      // Update the position of the path
      const x = (Math.cos(progress.current * Math.PI * 2) + 1) / 2;
      const y = (Math.sin(progress.current * Math.PI * 2) + 1) / 2;
      
      pathRef.current.setAttributeNS(null, "cx", `${x * 100}%`);
      pathRef.current.setAttributeNS(null, "cy", `${y * 100}%`);
    }
  });

  return (
    <svg
      className={cn("h-full w-full absolute inset-0", className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        overflow: "visible",
      }}
    >
      <defs>
        <radialGradient
          id="moving-border-gradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#FD5A1E" stopOpacity="1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <mask id="moving-border-mask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="white"
          />
          <ellipse
            cx="50%"
            cy="50%"
            rx={rx}
            ry={ry}
            fill="black"
          />
        </mask>
      </defs>

      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#moving-border-gradient)"
        mask="url(#moving-border-mask)"
      />
      {children}
    </svg>
  );
};