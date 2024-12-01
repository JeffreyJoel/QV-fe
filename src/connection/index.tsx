'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, base, baseSepolia } from '@reown/appkit/networks'
import { ReactNode } from 'react';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [mainnet, base, baseSepolia],
  projectId,
  features: {
    analytics: true
  }
})



export function AppKit({ children }: { children: ReactNode }) {
  return children;
}