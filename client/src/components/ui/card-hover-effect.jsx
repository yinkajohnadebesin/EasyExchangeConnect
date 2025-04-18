import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10", className)}>
      {items.map((item, idx) => (
        <Link
          to={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full no-underline"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card backgroundImage={item.image}>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({ className, children, backgroundImage }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden relative z-20 bg-cover bg-center flex flex-col justify-between",
        className
      )}
      style={{
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-10 rounded-2xl" />
      {/* Top Content (Title) */}
      <div className="relative z-20 p-4">
        {children[0]} {/* CardTitle */}
      </div>

      {/* Bottom Content (Location + Buttons) */}
      <div className="relative z-20 p-4 mt-auto flex flex-col gap-2">
        {children[1]}
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4 line-clamp-2", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ className, children }) => {
  return (
    <div className={cn("mt-1 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
      {children}
    </div>
  );
};