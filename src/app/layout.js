import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AuthProvider from "@/service/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollProvider from "@/service/ScrollProvider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Reduan Haider Rifat",
  description:
    "Reduan Portfolio Reduan Haider Rifat mahigonj,rangpur bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ScrollProvider>
            <Navbar />
            <div className="min-h-[calc(100vh-236px)]">{children}</div>
            <ToastContainer
              position="bottom-right"
              style={{ marginBottom: "0" }}
            />
            <Footer />
          </ScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
