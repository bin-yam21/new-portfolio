import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle-foreground">
        Error 404
      </p>
      <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The link may be out of date, or the project moved. Everything that does
        exist is one click away.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg" className="group">
          <Link href="/">
            <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
            Back home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/projects">Browse projects</Link>
        </Button>
      </div>
    </div>
  );
}
