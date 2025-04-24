"use client"

import { useEffect, useState, useRef } from "react"

export default function TerminalIntro() {
  const [text, setText] = useState("")
  const [subText, setSubText] = useState("")
  const [showCommands, setShowCommands] = useState(false)
  const [currentCommand, setCurrentCommand] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [bootSequence, setBootSequence] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const commands = [
    "git clone obsession",
    "npm install chaos",
    "build --team=4",
    "sudo chmod 777 creativity",
    "ssh future@dreams",
    "cat /dev/random > ideas.txt",
    "docker run -d madness",
    "rm -rf comfort_zone/*",
    "./hack_the_planet.sh",
    "grep 'success' failure.log",
    "curl -X POST api.startup.io/disrupt",
  ]

  // Boot sequence
  useEffect(() => {
    const bootMessages = [
      "initializing system...",
      "loading kernel modules...",
      "mounting /dev/creativity...",
      "checking filesystem integrity...",
      "starting daemon processes...",
      "establishing secure connection...",
      "bypassing corporate firewalls...",
      "system ready.",
    ]

    let index = 0
    const bootInterval = setInterval(() => {
      if (index < bootMessages.length) {
        setBootSequence((prev) => [...prev, bootMessages[index]])
        index++
      } else {
        clearInterval(bootInterval)
        setTimeout(() => {
          startMainSequence()
        }, 500)
      }
    }, 200)

    return () => clearInterval(bootInterval)
  }, [])

  // Start main typing sequence after boot
  const startMainSequence = () => {
    // Type the main greeting
    const mainText = "hey farza"
    let index = 0

    const mainInterval = setInterval(() => {
      setText(mainText.substring(0, index + 1))
      index++

      if (index >= mainText.length) {
        clearInterval(mainInterval)

        // Start typing the subtext after a delay
        setTimeout(() => {
          let subIndex = 0
          const subTextContent = "i don't wait for clarity — i build until it shows up."

          const subInterval = setInterval(() => {
            setSubText(subTextContent.substring(0, subIndex + 1))
            subIndex++

            if (subIndex >= subTextContent.length) {
              clearInterval(subInterval)

              // Show random commands after subtext is complete
              setTimeout(() => {
                setShowCommands(true)
              }, 1000)
            }
          }, 40)
        }, 800)
      }
    }, 100)
  }

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  // Random command animation
  useEffect(() => {
    if (!showCommands) return

    let currentIndex = 0
    let charIndex = 0
    let isTyping = true

    const typeCommand = () => {
      const commandInterval = setInterval(() => {
        if (isTyping) {
          // Type the command character by character
          if (charIndex <= commands[currentIndex].length) {
            setCurrentCommand(commands[currentIndex].substring(0, charIndex))
            charIndex++
          } else {
            isTyping = false
            setTimeout(() => {
              // Clear the command after a delay
              setCurrentCommand("")

              // Move to next command
              currentIndex = (currentIndex + 1) % commands.length
              charIndex = 0
              isTyping = true
            }, 1500)
          }
        }
      }, 50)

      return () => clearInterval(commandInterval)
    }

    const commandAnimation = typeCommand()
    return () => commandAnimation
  }, [showCommands])

  // Scroll to bottom when content changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [bootSequence, text, subText, currentCommand])

  return (
    <div className="border border-green-800 bg-black p-4 font-mono text-green-500 relative overflow-hidden">
      <div className="flex items-center mb-2 border-b border-green-900 pb-2">
        <div className="w-3 h-3 rounded-none bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-none bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-none bg-green-500"></div>
        <div className="ml-4 text-xs text-green-700">terminal - session:0</div>
      </div>

      <div className="font-mono text-sm md:text-base max-h-[300px] overflow-y-auto terminal-content" ref={containerRef}>
        {bootSequence.map((message, index) => (
          <p key={index} className="text-green-700 text-xs mb-1">
            {`[system] ${message}`}
          </p>
        ))}

        {text && (
          <p className="mb-1">
            {`> ${text}`}
            {!subText && cursorVisible ? "█" : ""}
          </p>
        )}

        {subText && (
          <p className="mb-4">
            {`> ${subText}`}
            {!showCommands && cursorVisible ? "█" : ""}
          </p>
        )}

        {showCommands && (
          <p className="text-yellow-400">
            {`> ${currentCommand}`}
            {cursorVisible ? "█" : ""}
          </p>
        )}
      </div>
    </div>
  )
}
