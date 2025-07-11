import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { Analytics } from "@vercel/analytics/next"

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
  // Configurações Open Graph para compartilhamento em redes sociais
  openGraph: {
    title: "Treina-Dev - Transforme sua carreira em programação",
    description: "Aprenda as tecnologias mais demandadas do mercado com uma metodologia prática e eficiente.",
    url: "https://www.treinadev.com.br", // Substitua pelo URL real do seu site
    siteName: "Treina-Dev",
    images: [
      {
        url: "https://www.treinadev.com.br/og-image.jpg", // Substitua pelo URL da sua imagem Open Graph
        width: 1200,
        height: 630,
        alt: "Treina-Dev - Transforme sua carreira em programação",
      },
    ],
    type: "website",
    locale: "pt_BR",
  },
  // Configurações para Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Treina-Dev - Transforme sua carreira em programação",
    description: "Aprenda as tecnologias mais demandadas do mercado com uma metodologia prática e eficiente.",
    images: ["https://www.treinadev.com.br/twitter-image.jpg"], // Substitua pelo URL da sua imagem para Twitter Card
  },
  // Configuração de ícones (favicon) com cache busting
  icons: {
    // Adicione um parâmetro de versão para forçar a atualização do favicon.
    // Altere o valor de 'v' (ex: para a data atual) toda vez que o favicon for atualizado.
    icon: '/favicon.ico?v=20250711', // Exemplo: v=AAAA-MM-DD
    shortcut: '/favicon.ico?v=20250711', // Geralmente o mesmo que o ícone principal
    apple: '/apple-touch-icon.png', // Se você tiver um Apple Touch Icon
  },
};

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
        <Analytics />
      </body>
    </html>
  );
}
