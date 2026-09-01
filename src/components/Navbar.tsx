"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { GithubIcon, ResumeIcon } from "./icons";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Condense the bar once the page has moved off the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section currently occupies the middle of the viewport.
  useEffect(() => {
    if (!isHome) {
      setActive("");
      return;
    }
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // Lock scroll behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="shell">
        <nav
          className={cn(
            "flex items-center justify-between gap-3 rounded-full border px-2.5 py-2 transition-all duration-300",
            scrolled
              ? "border-border bg-background/80 shadow-[var(--shadow-soft)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="flex shrink-0 items-center gap-2.5 rounded-full pl-1 pr-3"
          >
            <span className="relative grid size-8 place-items-center overflow-hidden rounded-full ring-1 ring-border">
              <Image
                src="/img/brandLogo.png"
                alt=""
                width={32}
                height={32}
                className="size-full object-cover"
              />
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              {site.name}
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id} className="relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "relative block rounded-full px-3.5 py-1.5 text-sm transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full bg-muted"
                      />
                    ) : null}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle />

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <GithubIcon className="size-[17px]" />
                </a>
              </TooltipTrigger>
              <TooltipContent>GitHub</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={site.resume}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download résumé"
                  className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <ResumeIcon className="size-[18px]" />
                </a>
              </TooltipTrigger>
              <TooltipContent>Résumé</TooltipContent>
            </Tooltip>

            <Button asChild size="sm" className="ml-1 hidden sm:inline-flex">
              <Link href="/#contact">Get in touch</Link>
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="shell mt-2 md:hidden"
          >
            <ul className="card-surface overflow-hidden p-2 backdrop-blur-xl">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-[0.95rem] transition-colors",
                      active === link.id
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="p-2 pt-3">
                <Button asChild className="w-full">
                  <Link href="/#contact" onClick={() => setOpen(false)}>
                    Get in touch
                  </Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
