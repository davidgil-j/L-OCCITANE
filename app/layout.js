import './globals.css';

export const metadata = {
  title: "L'Occitane × Vänster — Propuesta de merchandising corporativo",
  description:
    "Propuesta de Vänster para L'Occitane: agendas, calendarios y bidones de agua personalizados para tiendas, trabajadores y clientes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
