import { useRouter } from 'next/router';
import Link from 'next/link';
import { ConnectWallet } from "@/components/ui/connect-wallet";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              DeedNFT
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link 
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  router.pathname === '/' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/mint"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  router.pathname === '/mint'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Mint
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 