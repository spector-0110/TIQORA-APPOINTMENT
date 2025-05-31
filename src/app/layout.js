import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import { checkServerStatus } from '@/lib/patientAPI';
import { Spinner } from "@/components/ui/spinner";
import ThemeProvider from '@/context/ThemeProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TEMPUS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false} // disable following user's OS theme
          disableTransitionOnChange
        >
          <div className="fixed bottom-4 right-4 z-50">
            {/* <ThemeToggle /> */}
          </div>
          <main className="min-h-[calc(100vh-64px)]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}