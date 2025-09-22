import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import SiteContainer from '../components/SiteContainer';
import { SidebarProvider } from "@/components/SidebarProvider";
import { ActiveTaskProvider } from "@/components/ActiveTaskProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
// import  from "@/public/";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const roboto = Roboto({
//   subsets: ["latin", "cyrillic"], // если нужен кириллический
//   weight: ["300", "400", "500", "700"], // нужные начертания
// });

export const metadata: Metadata = {
  title: "TickTick",
  description: "Study project – copy of TickTick app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>
            <SidebarProvider>
              <ActiveTaskProvider>
                <ThemeProvider>
                  <SiteContainer>{children}</SiteContainer>
                </ThemeProvider>
              </ActiveTaskProvider>
            </SidebarProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}


