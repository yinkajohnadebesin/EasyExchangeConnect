import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const springConfig = { stiffness: 100, damping: 5 };

  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

  const handleMouseMove = (event) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="flex items-center">
      {items.map((item) => (
        <div
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="group relative -ml-4 first:ml-0 z-10"
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{ translateX, rotate }}
                className="absolute -top-20 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-4 py-2 rounded-md text-xs shadow-xl text-center"
              >
                <div className="font-bold text-sm">{item.name}</div>
                <div className="text-xs">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            className={`w-16 h-16 overflow-hidden flex items-center justify-center rounded-full border-[3px] border-white ${
                item.name === "YouTube" ? "bg-[#FF0000]" : "bg-white"
            } shadow-md hover:scale-105 transition z-10`}
            >

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded-full"
            />
          </a>
        </div>
      ))}
    </div>
  );
};
