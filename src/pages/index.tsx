import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useDeedNFT, DeedNFT } from '@/contracts/DeedNFT';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutGrid, List, AlertCircle } from 'lucide-react';

const HomePage = () => {
  const { address } = useAccount();
  const { contract, getDeedBalance, getDeedTokenByIndex, getDeed, getDeedTraits } = useDeedNFT();
  const [deeds, setDeeds] = useState<DeedNFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterPropertyType, setFilterPropertyType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDeeds = async () => {
      if (!address) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const balance = await getDeedBalance(address);
        if (!balance) return;

        const deedPromises = [];
        for (let i = 0; i < Number(balance); i++) {
          const tokenId = await getDeedTokenByIndex(address, i);
          const deed = await getDeed(tokenId.toString());
          const traits = await getDeedTraits(tokenId.toString());
          
          deedPromises.push({
            id: tokenId.toString(),
            owner: address,
            metadata: deed as string,
            traits: {
              propertyType: traits.propertyType as string,
              location: traits.location as string,
              value: traits.value as string,
              status: traits.status as string,
            },
          });
        }

        const fetchedDeeds = await Promise.all(deedPromises);
        setDeeds(fetchedDeeds);
      } catch (err) {
        console.error('Error fetching deeds:', err);
        setError('Failed to fetch deeds. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeeds();
  }, [address, getDeedBalance, getDeedTokenByIndex, getDeed, getDeedTraits]);

  const filteredDeeds = deeds.filter(deed => {
    const matchesPropertyType = filterPropertyType === 'all' || deed.traits.propertyType === filterPropertyType;
    const matchesStatus = filterStatus === 'all' || deed.traits.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      deed.traits.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deed.traits.propertyType.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesPropertyType && matchesStatus && matchesSearch;
  });

  const propertyTypes = Array.from(new Set(deeds.map(deed => deed.traits.propertyType)));
  const statusTypes = Array.from(new Set(deeds.map(deed => deed.traits.status)));

  if (!address) {
    return (
      <div className="container mx-auto p-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Connected</AlertTitle>
          <AlertDescription>
            Please connect your wallet to view your deeds.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">Loading deeds...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-12">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold">My Deeds</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search by location or property type..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select value={filterPropertyType} onValueChange={setFilterPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {propertyTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statusTypes.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {!address ? (
          <Alert>
            <AlertDescription className="text-center">
              Please connect your wallet to view your deeds
            </AlertDescription>
          </Alert>
        ) : filteredDeeds.length === 0 ? (
          <Alert>
            <AlertDescription className="text-center">
              No deeds found matching your criteria
            </AlertDescription>
          </Alert>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredDeeds.map(deed => (
              <Card key={deed.id} className={viewMode === 'list' ? 'flex' : ''}>
                <CardHeader className={viewMode === 'list' ? 'w-1/3' : ''}>
                  <CardTitle>Deed #{deed.id}</CardTitle>
                  <CardDescription>Property Details</CardDescription>
                </CardHeader>
                <CardContent className={viewMode === 'list' ? 'w-2/3' : ''}>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Property Type:</span> {deed.traits.propertyType}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {deed.traits.location}
                    </div>
                    <div>
                      <span className="font-medium">Value:</span> {deed.traits.value}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {deed.traits.status}
                    </div>
                    <div>
                      <span className="font-medium">Metadata:</span> {deed.metadata}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage; 