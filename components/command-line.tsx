"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Terminal } from "lucide-react"

type CommandResponse = {
  text: string
  type: "success" | "error" | "info"
}

export default function CommandLine() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [commandHistory, setCommandHistory] = useState<{ command: string; response: CommandResponse }[]>([])
  const [showCursor, setShowCursor] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Available commands
  const commands: Record<string, () => CommandResponse> = {
    help: () => ({
      text: "available commands: help, clear, about, skills, contact, projects, easteregg",
      type: "info",
    }),
    clear: () => {
      setCommandHistory([])
      return { text: "terminal cleared", type: "success" }
    },
    about: () => ({
      text: "i'm a builder obsessed with creating things that matter. i don't wait for clarity — i build until it shows up.",
      type: "info",
    }),
    skills: () => ({
      text: "software: typescript, react, node.js\ndesign: figma, ui/ux\ncontent: storytelling, copywriting\nfilmmaking: direction, editing",
      type: "info",
    }),
    contact: () => ({
      text: "email: hello@example.com\ntwitter: @builderobsessed\ngithub: github.com/builderobsessed",
      type: "info",
    }),
    projects: () => ({
      text: "1. chaos engine - ai-powered creativity tool\n2. builder's block - community for makers\n3. ship30 - accountability platform for builders",
      type: "info",
    }),
    easteregg: () => ({
      text: "you found the easter egg! you're the kind of person who explores. we should work together.",
      type: "success",
    }),
  }

  // Process command
  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    if (trimmedCmd === "") return

    // Add to history
    setHistory((prev) => [...prev, trimmedCmd])
    setHistoryIndex(-1)

    // Process command
    let response: CommandResponse

    if (trimmedCmd in commands) {
      response = commands[trimmedCmd]()
    } else if (trimmedCmd.startsWith("echo ")) {
      response = {
        text: trimmedCmd.substring(5),
        type: "info",
      }
    } else {
      response = {
        text: `command not found: ${trimmedCmd}. type 'help' for available commands.`,
        type: "error",
      }
    }

    // Add to command history
    setCommandHistory((prev) => [...prev, { command: trimmedCmd, response }])

    // Clear input
    setInput("")

    // Scroll to bottom
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight
      }
    }, 10)
  }

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  // Focus input on click
  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  // Initial help message
  useEffect(() => {
    setCommandHistory([
      {
        command: "help",
        response: {
          text: "type 'help' for available commands",
          type: "info",
        },
      },
    ])
  }, [])

  return (
    <div className="border border-green-800 bg-black">
      <div className="flex items-center justify-between border-b border-green-800 p-2">
        <h2 className="text-lg flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          terminal
        </h2>
        <div className="text-xs text-green-700">interactive</div>
      </div>

      <div
        className="font-mono text-sm p-2 h-48 overflow-y-auto terminal-content"
        onClick={handleContainerClick}
        ref={containerRef}
      >
        {commandHistory.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center">
              <span className="text-green-500 mr-1">&gt;</span>
              <span>{item.command}</span>
            </div>
            <div
              className={`ml-2 whitespace-pre-line ${
                item.response.type === "error"
                  ? "text-red-400"
                  : item.response.type === "success"
                    ? "text-yellow-400"
                    : "text-green-300"
              }`}
            >
              {item.response.text}
            </div>
          </div>
        ))}

        <div className="flex items-center">
          <span className="text-green-500 mr-1">&gt;</span>
          <span>{input}</span>
          {showCursor && <span className="ml-0.5 w-2.5 h-4 bg-green-500 inline-block"></span>}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="opacity-0 absolute w-0 h-0"
          autoFocus
        />
      </div>
    </div>
  )
}
