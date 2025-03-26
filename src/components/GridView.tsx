import React from 'react';
import { DeedNFT } from '@/types/deed';
import Image from 'next/image';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';

interface GridViewProps {
  deeds: DeedNFT[];
}

export function GridView({ deeds }: GridViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {deeds.map((deed) => (
        <div key={deed.uniqueId} className="group cursor-pointer">
          <div className="w-full h-[391px] p-2.5 border border-white border-opacity-10 flex-col justify-start items-start gap-2.5 inline-flex bg-[#0e0e0e]">
            {/* Image Container */}
            <div className="self-stretch h-60 bg-white bg-opacity-5 flex-col justify-start items-start flex relative">
              {deed.image?.cachedUrl ? (
                <Image
                  src={deed.image.cachedUrl}
                  alt={deed.name || 'NFT Image'}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-sm"
                />
              ) : (
                <div className="w-full h-full bg-[#141414] rounded-sm" />
              )}
              <div className="w-7 h-7 p-1 bg-zinc-900 bg-opacity-40 rounded-3xl border border-white border-opacity-10 flex-col justify-center items-center flex absolute bottom-0 right-0 m-2">
                <CheckBadgeIcon className="text-white w-5 h-5" />
              </div>
            </div>

            {/* Content Container */}
            <div className="self-stretch h-32 flex-col justify-center items-start gap-3 flex">
              {/* Title and Owner */}
              <div className="self-stretch px-2 flex-col justify-center items-start gap-0.5 flex">
                <div className="pr-16 justify-start items-center inline-flex">
                  <div className="justify-start items-center gap-1 flex">
                    <div className="h-5 flex-col justify-center items-start inline-flex">
                      <div className="flex items-center gap-1 text-white text-opacity-60 text-[9px] sm:text-[9px] font-normal leading-none tracking-wider">
                        <CheckBadgeIcon className="text-white w-4 h-4 sm:w-[18px] sm:h-[18px] mb-[-1px]" />
                        <span className="truncate">{deed.contract.contractDeployer || 'Unknown'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch justify-start items-center w-full">
                  <div className="text-white text-sm sm:text-base font-normal w-full leading-snug line-clamp-2">
                    {deed.name || `Deed #${deed.tokenId}`}
                  </div>
                </div>
              </div>

              {/* Stats Container */}
              <div className="self-stretch h-14 sm:h-16 px-2.5 sm:px-3 pt-2.5 pb-2.5 bg-[#141414] border border-white border-opacity-10 flex-col justify-center items-start flex">
                <div className="self-stretch justify-between items-start gap-2.5 inline-flex">
                  <div className="flex-col justify-start items-start inline-flex">
                    <div className="self-stretch h-4 flex-col justify-start items-start flex">
                      <div className="text-white text-opacity-60 text-[1.8vw] sm:text-[0.68vw] font-normal leading-none tracking-wider">
                        PRICE
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-start gap-0.5 inline-flex">
                      <div className="text-white text-[2vw] sm:text-[0.74vw] font-medium uppercase leading-none">
                        3.93 RON
                      </div>
                    </div>
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <div className="self-stretch h-4 flex-col justify-start items-start flex">
                      <div className="text-white text-opacity-60 text-[1.8vw] sm:text-[0.68vw] font-normal leading-none tracking-wider">
                        LAST SALE
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-start inline-flex">
                      <div className="text-white text-[1.8vw] sm:text-[0.68vw] font-medium uppercase leading-none">
                        3.96 RON
                      </div>
                    </div>
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <div className="self-stretch h-4 flex-col justify-start items-start flex">
                      <div className="text-white text-opacity-60 text-[1.8vw] sm:text-[0.68vw] font-normal leading-none tracking-wider">
                        LISTED
                      </div>
                    </div>
                    <div className="justify-start items-start inline-flex">
                      <div className="text-white text-[1.8vw] sm:text-[0.68vw] font-medium uppercase leading-none">
                        2m ago
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 