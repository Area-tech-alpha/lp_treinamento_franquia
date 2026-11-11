"use client";

import { useEffect, useState } from "react";
import { menu } from "@/content/abs";
import { Logo } from "@/components/ui/Brand";
import { Icon } from "@/components/ui/Icon";
import { Button, SmartLink } from "@/components/ui/primitives";

/** Seção 0 — Menu fixo com âncoras + hambúrguer abaixo de 1280px. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/90 backdrop-blur-md"
          : "bg-gradient-to-b from-ink/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 md:px-10">
        <SmartLink href="/#inicio" aria-label="Alpha Business School — início">
          <Logo />
        </SmartLink>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-9">
            {menu.links.map((l) => (
              <li key={l.href}>
                <SmartLink
                  href={l.href}
                  className="text-base text-white/80 transition-colors hover:text-alpha"
                >
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <Button href={menu.cta.href} size="menu" className="max-xl:hidden">
          {menu.cta.label}
        </Button>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="grid size-12 place-items-center rounded-full text-white hover:bg-white/10 xl:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="size-7" />
        </button>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu mobile"
          className="border-t border-white/10 px-6 pt-4 pb-8 md:px-10 xl:hidden"
        >
          <ul className="flex flex-col">
            {menu.links.map((l) => (
              <li key={l.href}>
                <SmartLink
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-4 text-lg text-white/90 hover:bg-white/5 hover:text-alpha"
                >
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
          <div onClick={() => setOpen(false)} className="mt-4">
            <Button href={menu.cta.href} size="ctaFull">
              {menu.cta.label}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
