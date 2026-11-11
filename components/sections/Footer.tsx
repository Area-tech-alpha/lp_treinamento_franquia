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
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 md:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="flex items-center gap-3 text-base text-white/60">
            {brand.schoolOf}
            <AlphaLogo className="h-7 w-auto" />
          </p>
        </div>
        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap gap-x-8 gap-y-4">
            {links.map((l) => (
              <li key={l.label}>
                <SmartLink
                  href={l.href}
                  className="text-base text-white/75 transition-colors hover:text-alpha"
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
          <p className="mx-auto max-w-7xl px-6 py-6 text-sm text-white/50 md:px-10">
            CNPJ {footer.cnpj}
          </p>
        </div>
      )}
    </footer>
  );
}
