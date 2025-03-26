import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, TableProperties, LayoutGrid, Settings, LineChart } from 'lucide-react';

interface FilterToolbarProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function FilterToolbar({ view, onViewChange }: FilterToolbarProps) {
  return (
    <div className="sticky z-[1] top-[calc(theme(spacing.sm-top-nav)+theme(spacing.pwa-banner-offset))] lg:top-[calc(theme(spacing.lg-top-nav)+theme(spacing.hero-header-compact)+theme(spacing.14)+theme(spacing.pwa-banner-offset))] z-toolbar">
      <div className="flex flex-col lg:bg-bg-app">
        <div className="flex items-center px-2 scrollbar-hidden h-filter-toolbar overflow-x-scroll lg:overflow-auto">
          <div className="flex w-full gap-3 h-8">
            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <Button variant="outline" size="icon" className="w-8 h-8">
                <TableProperties className="h-5 w-5" />
              </Button>
            </div>

            {/* Search Bar */}
            <div className="flex justify-between w-full gap-3">
              <div className="h-8 max-w-[400px] flex-1">
                <div className="relative flex items-center">
                  <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by item or trait"
                    className="pl-8 h-8"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <Button variant="outline" className="hidden md:flex justify-between">
                  Price low to high
                  <svg className="h-5 w-5 rotate-90 transition duration-200" viewBox="0 -960 960 960">
                    <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
                  </svg>
                </Button>

                {/* View Toggle */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={view === 'list' ? 'bg-accent' : ''}
                    onClick={() => onViewChange('list')}
                  >
                    <TableProperties className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={view === 'grid' ? 'bg-accent' : ''}
                    onClick={() => onViewChange('grid')}
                  >
                    <LayoutGrid className="h-5 w-5" />
                  </Button>
                </div>

                {/* Settings */}
                <Button variant="outline" size="icon" className="hidden md:flex">
                  <Settings className="h-5 w-5" />
                </Button>

                {/* Analytics */}
                <Button variant="outline" size="icon">
                  <LineChart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 