"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
// import { useToast } from "@/components/ui/use-toast"
import { Loader2, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type React from "react" // Added import for React

export function SignUpForm() {
  const [loading, setLoading] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
//   const { toast } = useToast()
  const router = useRouter()

//   const connectWallet = async () => {
//     if (typeof window.ethereum !== "undefined") {
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         })
//         setWalletAddress(accounts[0])
//         setWalletConnected(true)
//         toast({
//           title: "Wallet Connected",
//           description: "Your wallet has been connected successfully.",
//         })
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to connect wallet. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } else {
//       toast({
//         title: "Error",
//         description: "Please install MetaMask to continue.",
//         variant: "destructive",
//       })
//     }
//   }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!walletConnected) {
    //   toast({
    //     title: "Error",
    //     description: "Please connect your wallet first.",
    //     variant: "destructive",
    //   })
      return
    }

    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const matNo = formData.get("matNo") as string

    try {
      // Add API call to create user here
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    //   toast({
    //     title: "Success",
    //     description: "Your account has been created successfully.",
    //   })
      router.push("/")
    } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to create account. Please try again.",
    //     variant: "destructive",
    //   })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="matNo" className="text-left">
              Matriculation Number
            </Label>
            <Input
              id="matNo"
              name="matNo"
              placeholder="Enter your matriculation number"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              className="bg-zinc-900/50 border-zinc-800"
              required
              pattern="[0-9]{8}"
              title="Please enter a valid 8-digit matriculation number"
            />
          </div>
          <Button type="submit" disabled={loading || !walletConnected}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Creating Account..." : "Continue with Matriculation Number"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      {walletConnected ? (
        <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
          <code className="text-sm text-muted-foreground">{`${walletAddress.slice(0, 6)}...${walletAddress.slice(
            -4,
          )}`}</code>
          <Button type="button" variant="ghost" size="sm" >
            Change
          </Button>
        </div>
      ) : (
        <Button variant="outline" type="button" className="bg-zinc-900/50 border-zinc-800" >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      )}
    </div>
  )
}

