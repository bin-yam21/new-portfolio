"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import type { ComponentProps } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      {/*
        The reduced-motion rule in globals.css only neutralises CSS
        animations and transitions. Framer Motion animates in JavaScript, so
        without this every entrance, marquee and layout animation still played
        for someone who asked the OS to stop them. `reducedMotion="user"`
        makes Framer respect the same setting.
      */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}

export default ThemeProvider;
