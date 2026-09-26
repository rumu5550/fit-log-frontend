import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog - Workout Library.",
  description: "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0C0D10] text-[#F3F4F6] font-sans">
        <WorkoutProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#15171D",
                color: "#FFFFFF",
                border: "1px solid #222630",
                fontSize: "13px",
              },
              success: {
                iconTheme: {
                  primary: "#C2F800",
                  secondary: "#000000",
                },
              },
            }}
          />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}
