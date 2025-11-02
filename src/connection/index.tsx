'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { baseSepolia } from '@reown/appkit/networks'
import { ReactNode } from 'react';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const metadata = {
  name: 'QV FE',
  description: 'Room based Quadratic voting application',
  url: 'https://qv-fe.vercel.app',
  icons: ['https://avatars.mywebsite.com/']
}

createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [baseSepolia],
  defaultNetwork:baseSepolia,
  projectId,
  features: {
    analytics: true
  }
})



export function AppKit({ children }: { children: ReactNode }) {
  return children;
}