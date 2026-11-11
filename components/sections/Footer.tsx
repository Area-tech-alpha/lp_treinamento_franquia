import { brand, footer } from "@/content/abs";
import { AlphaLogo, Logo } from "@/components/ui/Brand";
import { SmartLink } from "@/components/ui/primitives";

/** Seção 14 — Rodapé. Instagram e CNPJ só aparecem quando preenchidos. */
export function Footer() {
  const links = footer.instagram
    ? [...footer.links, { label: "Instagram", href: footer.instagram }]
    : footer.links;

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="flex items-center gap-2.5 text-sm text-white/60">
            {brand.schoolOf}
            <AlphaLogo className="h-6 w-auto" />
          </p>
        </div>
        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((l) => (
              <li key={l.label}>
                <SmartLink
                  href={l.href}
                  className="inline-flex min-h-10 items-center text-sm text-white/75 transition-colors hover:text-alpha md:text-base"
                >
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {footer.cnpj && (
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-white/50 md:px-8">
            CNPJ {footer.cnpj}
          </p>
        </div>
      )}
    </footer>
  );
}
