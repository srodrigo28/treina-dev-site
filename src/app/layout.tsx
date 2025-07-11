import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Treina-Dev - Transforme sua carreira em programação",
  description: "Aprenda as tecnologias mais demandadas do mercado com uma metodologia prática e eficiente. Mais de 200.000 pessoas já mudaram suas vidas conosco.",
  keywords: "programação, flutterflow, android, react-expo, react-native, desenvolvimento, cursos, tecnologia, javascript, react, node.js, python, java",
  authors: [{ name: "Treina-Dev" }],
  openGraph: {
    title: "Treina-Dev - Transforme sua carreira em programação",
    description: "Aprenda as tecnologias mais demandadas do mercado com uma metodologia prática e eficiente.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Treina-Dev - Transforme sua carreira em programação",
    description: "Aprenda as tecnologias mais demandadas do mercado com uma metodologia prática e eficiente.",
  },
};

// export const metadata: Metadata = {
//   title: "Cursos de Desenvolvimento de Apps - Transforme Suas Ideias em Realidade",
//   description: "Aprenda a desenvolver aplicativos profissionais do zero ao avançado. Domine as tecnologias mais demandadas do mercado e construa sua carreira tech.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
