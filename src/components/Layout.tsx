import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0e0e0e]">
      <Navbar />
      <main className="container mx-auto px-4">
        {children}
      </main>
    </div>
  );
};

export default Layout; 