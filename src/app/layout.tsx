import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zenith-Guard | Premium Roblox Security & Anti-Cheat",
    template: "%s | Zenith-Guard"
  },
  description: "Advanced cybersecurity, real-time moderation, and powerful analytics platform for Roblox developers. Protect your games from exploiters effortlessly.",
  keywords: ["Roblox", "Security", "Moderation", "Analytics", "Anti-Cheat", "Roblox Exploit Protection", "Game Security", "Zenith-Guard", "Roblox Developer"],
  authors: [{ name: "Zenith-Guard Team" }],
  creator: "Zenith-Guard",
  publisher: "Zenith-Guard",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Zenith-Guard | Premium Roblox Security",
    description: "Advanced cybersecurity, real-time moderation, and powerful analytics platform for Roblox developers.",
    url: "https://zenith-guard.com", // Replace with actual domain
    siteName: "Zenith-Guard",
    images: [
      {
        url: "/og-image.png", // Ensure you have this image in public directory
        width: 1200,
        height: 630,
        alt: "Zenith-Guard Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenith-Guard | Premium Roblox Security",
    description: "Advanced cybersecurity, real-time moderation, and powerful analytics platform for Roblox developers.",
    creator: "@ZenithGuard",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
