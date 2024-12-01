"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ConnectButton() {
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && isConnected ? (
        <appkit-button />
      ) : (
        <Button
          onClick={() => open()}
          className="bg-[#00FF66] p-5 text-gray-800 text-md rounded-2xl hover:bg-[#00FF66]/90"
          translate="no"
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
}
