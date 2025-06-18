import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { useProtocolSDK } from '../../hooks/useProtocolSDK';

export default function Settings() {
  const { sdk, isLoading, error } = useProtocolSDK({
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 1,
    contracts: {
      protocol: process.env.NEXT_PUBLIC_PROTOCOL_ADDRESS as `0x${string}`,
      token: process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`,
    },
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-xl">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-xl text-red-600">Error: {error.message}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Settings</h2>

        {/* Network Settings */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Network Settings</h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="rpc-url" className="block text-sm font-medium text-gray-700">
                  RPC URL
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="rpc-url"
                    id="rpc-url"
                    defaultValue={process.env.NEXT_PUBLIC_RPC_URL}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="chain-id" className="block text-sm font-medium text-gray-700">
                  Chain ID
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="chain-id"
                    id="chain-id"
                    defaultValue={process.env.NEXT_PUBLIC_CHAIN_ID}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Settings */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Contract Settings</h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="protocol-address" className="block text-sm font-medium text-gray-700">
                  Protocol Contract Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="protocol-address"
                    id="protocol-address"
                    defaultValue={process.env.NEXT_PUBLIC_PROTOCOL_ADDRESS}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="token-address" className="block text-sm font-medium text-gray-700">
                  Token Contract Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="token-address"
                    id="token-address"
                    defaultValue={process.env.NEXT_PUBLIC_TOKEN_ADDRESS}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </AdminLayout>
  );
} 