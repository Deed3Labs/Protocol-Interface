import { useRouter } from 'next/router';
import Link from 'next/link';
import { ConnectWallet } from "@/components/ui/connect-wallet";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-foreground">
              DeedNFT
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link 
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  router.pathname === '/' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/mint"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  router.pathname === '/mint'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
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