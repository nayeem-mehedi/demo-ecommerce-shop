import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Digital Depot",
  description: "We will make your wallet cry",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="main_body">
          <Navbar />
          <main className="main_body m-auto max-h-full min-w-[300px] max-w-full p-4">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
