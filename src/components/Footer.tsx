import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon, XIcon } from "./icons";
import { navLinks, site } from "@/lib/site";

const socials = [
  { label: "GitHub", href: site.socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedinIcon },
  { label: "X", href: site.socials.x, Icon: XIcon },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
];

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="shell py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight">{site.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {site.role} — building products that stay fast, legible and
              maintainable long after launch.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-subtle-foreground">
              Navigate
            </p>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/projects"
                  className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  All projects
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-subtle-foreground">
              Elsewhere
            </p>
            <ul className="mt-3 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground"
                  >
                    <Icon className="size-[17px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <p className="font-mono text-xs text-subtle-foreground">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a
            href="#main"
            className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
