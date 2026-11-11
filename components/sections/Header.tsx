"use client";

import { useEffect, useState } from "react";
import { menu } from "@/content/abs";
import { Logo } from "@/components/ui/Brand";
import { Icon } from "@/components/ui/Icon";
import { Button, SmartLink } from "@/components/ui/primitives";

/** Seção 0 — Menu fixo. Abaixo de lg vira hambúrguer com drawer de tela cheia. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Trava o scroll da página com o drawer aberto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? "border-b border-white/10 bg-ink/95 backdrop-blur-md"
            : "bg-gradient-to-b from-ink/80 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8 lg:h-18">
          <SmartLink
            href="/#inicio"
            aria-label="Alpha Business School — início"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </SmartLink>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {menu.links.map((l) => (
                <li key={l.href}>
                  <SmartLink
                    href={l.href}
                    className="text-sm text-white/80 transition-colors hover:text-alpha xl:text-base"
                  >
                    {l.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <Button href={menu.cta.href} size="menu" className="max-lg:hidden">
            {menu.cta.label}
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid size-12 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="size-7" />
          </button>
        </div>
      </header>

      {/* Drawer de tela cheia (mobile/tablet). Fica fora do <header>: o backdrop-blur
          do header criaria um containing block e prenderia o "fixed" à altura dele. */}
      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu mobile"
          className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto bg-ink px-5 pt-6 pb-8 md:px-8 lg:hidden"
        >
          <ul className="flex flex-col">
            {menu.links.map((l) => (
              <li key={l.href} className="border-b border-white/10">
                <SmartLink
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-16 items-center text-2xl font-medium text-white hover:text-alpha"
                >
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
          <div onClick={() => setOpen(false)} className="mt-auto pt-8">
            <Button href={menu.cta.href} size="ctaFull">
              {menu.cta.label}
            </Button>
          </div>
        </nav>
      )}
    </>
  );
}
