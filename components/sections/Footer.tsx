import Link from "next/link";
import { footer } from "@/content/home";
import { isExternal, Logo } from "@/components/ui/primitives";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_2fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {footer.tagline}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-alpha">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      {...(isExternal(l.href) && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="text-sm text-white/70 transition-colors hover:text-alpha"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-dark sm:px-6 lg:px-8">
          {footer.legal}
        </p>
      </div>
    </footer>
  );
}
