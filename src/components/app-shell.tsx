"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  LayoutDashboard,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

const navigation = [
  { href: "/", label: "Inicio", icon: LayoutDashboard },
  { href: "/courses", label: "Cursos", icon: BookOpen },
  { href: "/students", label: "Estudiantes", icon: Users },
  { href: "/attendance", label: "Asistencias", icon: ClipboardList },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-frame">
      <aside className="sidebar">
        <Link aria-label="Ir al inicio" className="brand" href="/">
          <span className="brand-mark">
            <ClipboardCheck aria-hidden="true" size={21} strokeWidth={2.3} />
          </span>
          <span className="brand-name">
            lista<span>do</span>
          </span>
        </Link>

        <div className="sidebar-label">MENÚ PRINCIPAL</div>
        <nav aria-label="Navegación principal" className="side-nav">
          {navigation.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`nav-link${active ? " nav-link-active" : ""}`}
                href={href}
                key={href}
              >
                <Icon aria-hidden="true" size={19} strokeWidth={1.9} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-note">
          <div className="note-icon">
            <ClipboardCheck aria-hidden="true" size={18} />
          </div>
          <strong>Un buen día empieza pasando lista.</strong>
          <span>Tu grupo, siempre al día.</span>
        </div>
        <div className="sidebar-footer">
          <span className="online-dot" />
          Sistema de asistencia
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="mobile-brand">
            <span className="brand-mark">
              <ClipboardCheck aria-hidden="true" size={19} />
            </span>
            <span className="brand-name">
              lista<span>do</span>
            </span>
          </div>
          <nav aria-label="Navegación móvil" className="mobile-nav">
            {navigation.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`mobile-nav-link${active ? " mobile-nav-link-active" : ""}`}
                  href={href}
                  key={href}
                  title={label}
                >
                  <Icon aria-hidden="true" size={18} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="topbar-user">
            <span className="teacher-avatar">D</span>
            <span className="topbar-user-name">Docente</span>
          </div>
        </header>

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
