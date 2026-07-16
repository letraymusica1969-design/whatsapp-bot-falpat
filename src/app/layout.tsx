export const metadata = {
  title: "WhatsApp AI Bot - FALPAT",
  description: "Bot de WhatsApp con IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
