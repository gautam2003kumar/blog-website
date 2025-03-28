'use client';
import Navbar from '@/components/Navbar/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <div className="bg-gray-50 min-h-screen">
          <Navbar />
          <main>{children}</main>
        </div>
  );
}
