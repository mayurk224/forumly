import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Forumly Sanity Admin",
  description: "Threads That Connect the World.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
