"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { header } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { Button, Logo } from "@/components/ui/primitives";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="#inicio" aria-label="Alpha Assessoria — início">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {header.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/75 transition-colors hover:text-alpha"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href={header.studentLink.href}
            className="text-sm font-medium text-white/75 transition-colors hover:text-white"
          >
            {header.studentLink.label}
          </Link>
          <Button href={header.cta.href} className="px-5 py-2.5">
            {header.cta.label}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="grid size-10 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="size-6" />
        </button>
      </div>

      {open && (
        <div id="menu-mobile" className="border-t border-white/10 lg:hidden">
          <nav aria-label="Menu mobile" className="px-4 py-6 sm:px-6">
            <ul className="flex flex-col gap-1">
              {header.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-white/85 hover:bg-white/5 hover:text-alpha"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <Button href={header.cta.href} className="w-full" arrow>
                {header.cta.label}
              </Button>
              <Button
                href={header.studentLink.href}
                variant="ghost"
                className="w-full"
              >
                {header.studentLink.label}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
