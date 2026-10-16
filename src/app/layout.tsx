import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context/app-context";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Webloom — Your corner of the internet.",
  description:
    "Create a beautiful personal page for your links, projects, social profiles, and everything you create online. Build your Webloom and share one link everywhere.",
  keywords: [
    "Webloom",
    "personal website",
    "link in bio",
    "portfolio builder",
    "developer portfolio",
    "digital identity",
    "projects showcase",
  ],
  openGraph: {
    title: "Webloom — Your corner of the internet.",
    description:
      "Bring your links, projects, socials, and online identity together with Webloom.",
    type: "website",
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#08090B] text-[#F4F3F0] min-h-screen antialiased selection:bg-[#A78BFA]/25 selection:text-[#F4F3F0]">
        <AppProvider>
          <ToastProvider>{children}</ToastProvider>
        </AppProvider>
      </body>
    </html>
  );
}
