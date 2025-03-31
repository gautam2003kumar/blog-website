'use client';
import Navbar from '@/components/Navbar/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <>
          <Navbar/>
          <div className="bg-gray-50 min-h-screen">
          <main>{children}</main>
        </div>
        </>
  );
}
