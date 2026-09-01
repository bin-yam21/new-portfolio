"use client";

import { motion } from "framer-motion";
import { createContext, useContext, type ReactNode } from "react";
import { ease, stagger, viewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Set by a `as="group"` Reveal. Nested Reveals read it and drop their own
 * `initial`/`whileInView` so framer-motion propagates the parent's variants —
 * which is what actually produces the stagger. Without this the children would
 * each trigger independently and arrive together.
 */
const GroupContext = createContext(false);

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before this element animates in. Ignored inside a group. */
  delay?: number;
  /** Stagger direct children instead of animating as a single block. */
  as?: "item" | "group";
  /** Spacing between staggered children, in seconds. */
  gap?: number;
  /** Travel distance of the entrance, in px. */
  y?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "item",
  gap = 0.08,
  y = 18,
}: RevealProps) {
  const insideGroup = useContext(GroupContext);
  const isGroup = as === "group";

  // A group nested in another group inherits too, so only a top-level element
  // owns the viewport trigger.
  const owid = !insideGroup;

  const node = (
    <motion.div
      className={cn(className)}
      variants={
        isGroup
          ? stagger(gap, delay)
          : {
              hidden: { opacity: 0, y },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease, delay: owid ? delay : 0 },
              },
            }
      }
      {...(owid
        ? { initial: "hidden" as const, whileInView: "show" as const, viewport }
        : {})}
    >
      {children}
    </motion.div>
  );

  return isGroup ? (
    <GroupContext.Provider value={true}>{node}</GroupContext.Provider>
  ) : (
    node
  );
}

export default Reveal;
