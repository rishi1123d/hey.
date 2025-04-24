"use client"

import { useState, useEffect, useRef } from "react"
import { Terminal, AlertCircle, CheckCircle, Info, Clock } from "lucide-react"

type LogEntry = {
  timestamp: string
  message: string
  type: "build" | "idea" | "error" | "success"
}

export default function WorkingLog() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [showCursor, setShowCursor] = useState(true)
  const [expanded, setExpanded] = useState(true)
  const logContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate fake log entries
    const fakeLogs: LogEntry[] = [
      {
        timestamp: "04.22 03:17",
        message: "started terminal ui project. no sleep till brooklyn.",
        type: "build",
      },
      {
        timestamp: "04.22 04:42",
        message: "obsession tracker prototype working. need to fix the algorithm.",
        type: "build",
      },
      {
        timestamp: "04.22 05:15",
        message: "ERROR: css is a nightmare. why do i do this to myself?",
        type: "error",
      },
      {
        timestamp: "04.22 05:23",
        message: "fixed. i am a god.",
        type: "success",
      },
      {
        timestamp: "04.22 06:58",
        message: "idea: what if the entire site glitches when you hover?",
        type: "idea",
      },
      {
        timestamp: "04.22 07:30",
        message: "dream team matrix complete. need to add more chaos.",
        type: "build",
      },
      {
        timestamp: "04.22 08:15",
        message: "added working log. meta. i'm watching myself code.",
        type: "build",
      },
      {
        timestamp: "04.22 09:01",
        message: "ready to ship. farza will either love this or think i'm insane.",
        type: "success",
      },
      {
        timestamp: "04.22 10:14",
        message: "added interactive terminal. users can now type commands.",
        type: "build",
      },
      {
        timestamp: "04.22 11:27",
        message: "idea: what if we add a real-time collab feature?",
        type: "idea",
      },
      {
        timestamp: "04.22 12:33",
        message: "ERROR: glitch effect causing seizures. toned it down.",
        type: "error",
      },
      {
        timestamp: "04.22 13:45",
        message: "final polish. this is either brilliant or career suicide.",
        type: "success",
      },
    ]

    setLogs(fakeLogs)

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    // Scroll to bottom
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }

    return () => clearInterval(cursorInterval)
  }, [])

  const getLogIcon = (type: string) => {
    switch (type) {
      case "build":
        return <Terminal className="w-3 h-3" />
      case "idea":
        return <Info className="w-3 h-3" />
      case "error":
        return <AlertCircle className="w-3 h-3" />
      case "success":
        return <CheckCircle className="w-3 h-3" />
      default:
        return <Terminal className="w-3 h-3" />
    }
  }

  const getLogColor = (type: string) => {
    switch (type) {
      case "build":
        return "text-green-500"
      case "idea":
        return "text-purple-400"
      case "error":
        return "text-red-400"
      case "success":
        return "text-yellow-400"
      default:
        return "text-green-500"
    }
  }

  return (
    <div className="border border-green-800 bg-black">
      <div
        className="flex items-center justify-between border-b border-green-800 p-2 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="text-lg flex items-center gap-2">
          <Clock className="w-4 h-4" />
          working log
        </h2>
        <div className="text-xs text-green-700">{expanded ? "[-]" : "[+]"}</div>
      </div>

      {expanded && (
        <div className="font-mono text-sm p-2 h-48 overflow-y-auto terminal-content" ref={logContainerRef}>
          {logs.map((log, index) => (
            <div key={index} className="mb-1 flex">
              <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
              <span className={`${getLogColor(log.type)} flex items-center gap-1`}>
                {getLogIcon(log.type)}
                <span>{log.message}</span>
              </span>
            </div>
          ))}

          <div className="flex">
            <span className="text-gray-500 mr-2">
              [
              {new Date()
                .toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
                .replace(",", "")}
              ]
            </span>
            <span className="text-green-500 flex items-center gap-1">
              <Terminal className="w-3 h-3" />
              <span>_</span>
              {showCursor && <span className="ml-0.5 w-2.5 h-4 bg-green-500 inline-block"></span>}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
