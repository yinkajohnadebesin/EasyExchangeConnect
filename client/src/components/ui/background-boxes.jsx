"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const BoxesCore = ({ className, rows = 60, cols = 60, ...rest }) => {
  const rowArray = new Array(rows).fill(1);
  const colArray = new Array(cols).fill(1);

  const getGradientColor = (index, total) => {
    const ratio = index / total;
    if (ratio < 0.5) {
      const blend = ratio / 0.5;
      return `rgb(${255}, ${Math.round(69 + (165 - 69) * blend)}, 0)`;
    } else {
      const blend = (ratio - 0.5) / 0.5;
      return `rgb(${255}, ${Math.round(165 + (255 - 165) * blend)}, 0)`;
    }
  };

  return (
    <div
      style={{
        transform:
          "translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)",
        pointerEvents: "none",
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex -translate-x-1/2 -translate-y-1/2 p-4",
        className
      )}
      {...rest}
    >
      {rowArray.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className="relative h-8 w-16 border-l border-slate-700"
        >
          {colArray.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getGradientColor(j, colArray.length - 1),
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col-${j}`}
              className="relative h-8 w-16 border-t border-r border-slate-700 pointer-events-auto"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
