"use client"

import { useEffect, useState, useRef } from "react"
import { Terminal } from "lucide-react"
import TerminalIntro from "@/components/terminal-intro"
import ObsessionTracker from "@/components/obsession-tracker"
import DreamTeamMatrix from "@/components/dream-team-matrix"
import WorkingLog from "@/components/working-log"
import CommandLine from "@/components/command-line"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.97) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 150)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+G triggers glitch effect
      if (e.ctrlKey && e.key === "g") {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 500)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!mounted) return null

  return (
    <div
      className={`min-h-screen bg-black text-green-500 font-mono p-4 md:p-6 flex flex-col gap-6 relative overflow-hidden ${glitchActive ? "glitch-effect" : ""}`}
      ref={mainRef}
    >
      {/* CRT overlay */}
      <div className="fixed inset-0 pointer-events-none crt-overlay"></div>

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none scanlines"></div>

      {/* Noise texture */}
      <div className="fixed inset-0 pointer-events-none noise-texture"></div>

      {/* Header */}
      <header className="flex items-center justify-between border-b border-green-800 pb-2 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          <h1 className="text-lg">terminal://farza-pitch</h1>
        </div>
        <div className="text-xs text-green-700">
          <span className="mr-2">v0.1.3-alpha</span>
          <span className="animate-pulse">●</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-8 max-w-6xl mx-auto w-full">
        <TerminalIntro />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ObsessionTracker />
          <DreamTeamMatrix />
        </div>

        <WorkingLog />

        <CommandLine />
      </main>

      <footer className="text-xs text-green-700 border-t border-green-800 pt-2 max-w-6xl mx-auto w-full">
        <div className="flex justify-between">
          <div>system: {navigator.userAgent.includes("Mac") ? "darwin" : "linux"}-x64</div>
          <div>
            uptime: {Math.floor(Math.random() * 100) + 24}h {Math.floor(Math.random() * 60)}m
          </div>
          <div>mem: {Math.floor(Math.random() * 1000) + 2000}mb</div>
        </div>
      </footer>
    </div>
  )
}
