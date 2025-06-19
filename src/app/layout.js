import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import ThemeProvider from '@/context/ThemeProvider';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : "http://localhost:3000";


export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Tiqora",
  description: "Modern healthcare management platform with seamless appointment scheduling and analytics",
  keywords: ["healthcare", "appointments", "hospital management", "medical"],
  authors: [{ name: "Tiqora Team" }],
  creator: "Tiqora",
  publisher: "Tiqora",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/tiqora.ico",
    shortcut: "/tiqora.ico",
    apple: "/tiqora.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
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