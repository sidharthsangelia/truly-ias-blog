import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Truly IAS",
  description:
    "Truly IAS Blog is your daily companion for UPSC preparation — offering insightful articles, current affairs breakdowns, exam strategies, and motivational stories. Crafted for aspirants, inspired by toppers. Stay informed, stay inspired.",
  openGraph: {
    title: "Truly IAS",
    description:
      "Truly IAS Blog is your daily companion for UPSC preparation — offering insightful articles, current affairs breakdowns, exam strategies, and motivational stories. Crafted for aspirants, inspired by toppers. Stay informed, stay inspired.",
    url: "https://truly-ias-blog.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/50bcbbd4-f25b-4805-994f-a012e58e6798.png?token=mthDW_Ca7CyIKdxVcZdHYVNF-BrD7EQUogaNqDUy4bA&height=560&width=1200&expires=33287367565",
        width: 1200,
        height: 560,
        alt: "Truly IAS Blog Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Truly IAS",
    description:
      "Truly IAS Blog is your daily companion for UPSC preparation — offering insightful articles, current affairs breakdowns, exam strategies, and motivational stories. Crafted for aspirants, inspired by toppers. Stay informed, stay inspired.",
    images: [
      "https://opengraph.b-cdn.net/production/images/50bcbbd4-f25b-4805-994f-a012e58e6798.png?token=mthDW_Ca7CyIKdxVcZdHYVNF-BrD7EQUogaNqDUy4bA&height=560&width=1200&expires=33287367565",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
