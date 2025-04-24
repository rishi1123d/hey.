"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowRight, Github, Loader, BarChart, Twitter, Code, Zap } from "lucide-react"

export default function ObsessionTracker() {
  const [handle, setHandle] = useState("")
  const [platform, setPlatform] = useState("github")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStage, setAnalysisStage] = useState(0)
  const [result, setResult] = useState<null | {
    score: number
    tier: string
    activity: number[]
    metrics: {
      frequency: number
      intensity: number
      consistency: number
    }
  }>(null)

  // Analysis stages
  const analysisStages = [
    `analyzing ${platform} activity...`,
    `scraping data...`,
    `calculating metrics...`,
    `generating obsession score...`,
    `finalizing results...`,
  ]

  // Progress through analysis stages
  useEffect(() => {
    if (!isAnalyzing) return

    let stage = 0
    const stageInterval = setInterval(() => {
      if (stage < analysisStages.length - 1) {
        stage++
        setAnalysisStage(stage)
      } else {
        clearInterval(stageInterval)
      }
    }, 600)

    return () => clearInterval(stageInterval)
  }, [isAnalyzing, platform])

  const analyzeObsession = (e: React.FormEvent) => {
    e.preventDefault()
    if (!handle) return

    setIsAnalyzing(true)
    setAnalysisStage(0)
    setResult(null)

    // Simulate analysis with timeout
    setTimeout(() => {
      // Generate fake score between 65 and 98
      const score = Math.floor(Math.random() * 34) + 65

      // Determine tier based on score
      let tier = ""
      if (score > 90) tier = "manic creative"
      else if (score > 80) tier = "obsessive builder"
      else if (score > 70) tier = "consistent shipper"
      else tier = "casual maker"

      // Generate fake activity data for ASCII chart (12 months)
      const activity = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10))

      // Generate metrics
      const frequency = Math.floor(Math.random() * 5) + 5
      const intensity = Math.floor(Math.random() * 5) + 5
      const consistency = Math.floor(Math.random() * 5) + 5

      setResult({
        score,
        tier,
        activity,
        metrics: {
          frequency,
          intensity,
          consistency,
        },
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  const renderAsciiChart = (data: number[]) => {
    const max = Math.max(...data, 1) // Ensure max is at least 1
    const rows = []

    // Create rows from top to bottom (10 to 0)
    for (let i = 10; i >= 0; i--) {
      let row = i === 0 ? "    " : i % 5 === 0 ? `${i.toString().padStart(2, " ")} |` : "   |"

      // Add bars for each data point
      for (const val of data) {
        const normalizedVal = Math.ceil((val / max) * 10)
        row += normalizedVal >= i ? "█" : " "
      }

      rows.push(
        <div key={i} className="text-xs">
          {row}
        </div>,
      )
    }

    // Add x-axis
    rows.push(
      <div key="x-axis" className="text-xs">
        {"    " + "-".repeat(data.length)}
      </div>,
    )

    // Add months
    rows.push(
      <div key="months" className="text-xs">
        {"    j f m a m j j a s o n d"}
      </div>,
    )

    return <div className="font-mono mt-2">{rows}</div>
  }

  const renderMetricBar = (value: number, label: string, color: string) => {
    return (
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span>{label}</span>
          <span>{value}/10</span>
        </div>
        <div className="w-full bg-gray-900 h-2">
          <div className={`h-full ${color}`} style={{ width: `${value * 10}%` }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-green-800 bg-black p-4 h-full">
      <div className="flex items-center justify-between mb-4 border-b border-green-800 pb-2">
        <h2 className="text-lg flex items-center gap-2">
          <BarChart className="w-4 h-4" />
          obsession tracker
        </h2>
        <div className="text-xs text-green-700">v2.1.0</div>
      </div>

      <form onSubmit={analyzeObsession} className="mb-4">
        <div className="flex flex-col gap-2 mb-2">
          {/* Platform selector */}
          <div className="flex">
            <button
              type="button"
              onClick={() => setPlatform("github")}
              className={`px-3 py-1 border ${
                platform === "github" ? "border-green-500 text-green-500" : "border-green-900 text-green-900"
              } flex items-center gap-1`}
            >
              <Github className="w-4 h-4" />
              <span>github</span>
            </button>
            <button
              type="button"
              onClick={() => setPlatform("twitter")}
              className={`px-3 py-1 border ${
                platform === "twitter" ? "border-green-500 text-green-500" : "border-green-900 text-green-900"
              } flex items-center gap-1`}
            >
              <Twitter className="w-4 h-4" />
              <span>twitter</span>
            </button>
          </div>

          {/* Handle input and analyze button */}
          <div className="flex w-full">
            <div className="bg-green-900 text-green-300 px-2 py-1 flex items-center">@</div>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder={`enter ${platform} handle`}
              className="flex-1 bg-black border border-green-800 text-green-500 px-2 py-1 focus:outline-none focus:border-green-500"
            />

            <button
              type="submit"
              disabled={isAnalyzing || !handle}
              className="bg-green-900 text-green-300 px-3 py-1 border border-green-800 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isAnalyzing ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  analyze <ArrowRight className="ml-1 w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="font-mono text-sm">
        {isAnalyzing && (
          <div>
            {analysisStages.slice(0, analysisStage + 1).map((stage, index) => (
              <p key={index} className={index === analysisStage ? "animate-pulse" : ""}>
                {`> ${stage}`}
              </p>
            ))}
          </div>
        )}

        {result && (
          <div>
            <p>{`> analysis complete`}</p>

            <div className="mt-4 flex items-center">
              <div className="text-3xl text-yellow-400 mr-3">{result.score}</div>
              <div>
                <div className="text-green-400">builder tier:</div>
                <div className="text-yellow-400">{result.tier}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="mb-2 text-green-400 flex items-center gap-1">
                  <Code className="w-4 h-4" /> metrics:
                </p>
                {renderMetricBar(result.metrics.frequency, "frequency", "bg-blue-500")}
                {renderMetricBar(result.metrics.intensity, "intensity", "bg-yellow-500")}
                {renderMetricBar(result.metrics.consistency, "consistency", "bg-green-500")}
              </div>

              <div>
                <p className="mb-2 text-green-400 flex items-center gap-1">
                  <Zap className="w-4 h-4" /> activity pattern:
                </p>
                {renderAsciiChart(result.activity)}
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-green-900">
              <p className="text-red-400">
                {`> recommendation: ${
                  result.score > 85
                    ? "keep the momentum. you're in the zone."
                    : "increase shipping cadence. build in public more."
                }`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
