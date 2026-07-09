import type { Metadata } from "next";
import "../styles/globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "VisaKit - Smart Visa Form Autofill Extension",
  description: "Smart Visa Form Autofill Extension - securely save your profile locally and autofill online Indian visa applications.",
  openGraph: {
    title: "VisaKit - Smart Visa Form Autofill Extension",
    description: "Securely save your visa profile locally and autofill online Indian visa forms.",
    type: "website",
    url: "https://visakit.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "VisaKit - Smart Visa Form Autofill Extension",
    description: "Securely save your visa profile locally and autofill online Indian visa forms.",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen flex flex-col justify-between bg-[#F8FAFC]">
        {/* Navbar */}
        <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-base shadow-sm">
                V
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">VisaKit</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
              <Link href="/" className="hover:text-[#2563EB] transition-colors">Home</Link>
              <Link href="/docs" className="hover:text-[#2563EB] transition-colors">Docs</Link>
              <Link href="/faq" className="hover:text-[#2563EB] transition-colors">FAQ</Link>
              <a 
                href="https://github.com/masudul2002/visakit" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#2563EB] transition-colors"
              >
                GitHub
              </a>
            </nav>

            <Link 
              href="/download" 
              className="py-2 px-4 bg-[#2563EB] hover:bg-[#1E40AF] text-white font-semibold rounded-[12px] text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              Download
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200/60 bg-white py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} VisaKit. Released under the MIT License.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-slate-800 transition-colors">Privacy Policy</Link>
              <a 
                href="https://github.com/masudul2002/visakit" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-slate-800 transition-colors"
              >
                GitHub
              </a>
              <span className="flex items-center gap-1">Made with ❤️</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
