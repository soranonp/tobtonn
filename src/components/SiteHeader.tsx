"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const calculatorLinks = [
  { href: "/", label: "คำนวณดอกเบี้ยทบต้น" },
  { href: "/dca-calculator", label: "คำนวณ DCA" },
  { href: "/savings-calculator", label: "คำนวณเงินออม" },
  { href: "/retirement-calculator", label: "คำนวณเกษียณ" },
  { href: "/loan-calculator", label: "คำนวณสินเชื่อ" },
];

const navLinks = [
  { href: "/blog", label: "บทความ" },
  { href: "/about", label: "เกี่ยวกับ" },
  { href: "/contact", label: "ติดต่อ" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-display text-lg font-bold text-white">
            ฿
          </span>
          <span className="font-display text-lg font-semibold text-ink">
            คำนวณดอกเบี้ยทบต้น
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* Tools dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/5 ${
                calculatorLinks.some((l) => isActive(l.href))
                  ? "text-accent-bright"
                  : "text-ink-soft"
              }`}
            >
              เครื่องมือ
              <svg
                className={`h-4 w-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {toolsOpen && (
              <div className="absolute left-0 top-full mt-1 w-56 rounded-xl border border-line bg-bg/95 py-1 shadow-lg backdrop-blur-md">
                {calculatorLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setToolsOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors hover:bg-accent/5 ${
                      isActive(link.href)
                        ? "font-medium text-accent-bright"
                        : "text-ink-soft"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/5 ${
                isActive(link.href) ? "text-accent-bright" : "text-ink-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-ink-soft hover:bg-accent/5 md:hidden"
          aria-label="เมนู"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-line bg-bg/95 backdrop-blur-md md:hidden">
          <div className="px-4 py-3">
            <button
              onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              className="flex w-full items-center justify-between py-2 text-sm font-medium text-ink-soft"
            >
              เครื่องมือ
              <svg
                className={`h-4 w-4 transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileToolsOpen && (
              <div className="ml-3 border-l-2 border-line pl-3">
                {calculatorLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-2 text-sm ${
                      isActive(link.href) ? "font-medium text-accent-bright" : "text-ink-soft"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-sm ${
                  isActive(link.href) ? "font-medium text-accent-bright" : "text-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
