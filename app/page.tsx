"use client"

import { useState } from "react"
import { LandingModal } from "@/components/LandingModal"
import { UploadScreen } from "@/components/UploadScreen"
import { ReplyScreen } from "@/components/ReplyScreen"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"landing" | "upload" | "reply">("landing")

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-purple-100 md:p-8">
      {currentScreen === "landing" && <LandingModal onGetStarted={() => setCurrentScreen("upload")} />}
      {currentScreen === "upload" && (
        <UploadScreen onBack={() => setCurrentScreen("landing")} onSubmit={() => setCurrentScreen("reply")} />
      )}
      {currentScreen === "reply" && <ReplyScreen onBack={() => setCurrentScreen("upload")} />}
      <Toaster />
    </main>
  )
}

