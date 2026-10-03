import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro de Asistencia",
  description: "Sistema web para registrar asistencia de estudiantes por curso.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
