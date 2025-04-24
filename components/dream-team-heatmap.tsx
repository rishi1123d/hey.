"use client"

import { useState, useEffect } from "react"

type TeamMember = {
  name: string
  skill: number
  timezone: string
  chaos: number
  role: string
}

export default function DreamTeamHeatmap() {
  const [team, setTeam] = useState<TeamMember[]>([])

  useEffect(() => {
    // Generate fake team data
    const fakeTeam: TeamMember[] = [
      {
        name: "0xfrost",
        skill: 9,
        timezone: "est",
        chaos: 7,
        role: "architect",
      },
      {
        name: "cyph3r",
        skill: 8,
        timezone: "pst",
        chaos: 9,
        role: "hacker",
      },
      {
        name: "void_walker",
        skill: 7,
        timezone: "gmt",
        chaos: 5,
        role: "designer",
      },
      {
        name: "glitch_queen",
        skill: 10,
        timezone: "jst",
        chaos: 10,
        role: "visionary",
      },
    ]

    setTeam(fakeTeam)
  }, [])

  const getChaosLabel = (chaos: number) => {
    if (chaos >= 9) return "explosive"
    if (chaos >= 7) return "volatile"
    if (chaos >= 5) return "unpredictable"
    if (chaos >= 3) return "moderate"
    return "mild"
  }

  const getTimezoneSync = (tz: string) => {
    // EST is our reference timezone
    if (tz === "est") return 10
    if (tz === "pst") return 7 // 3 hours difference
    if (tz === "gmt") return 5 // 5 hours difference
    if (tz === "jst") return 3 // 14 hours difference
    return 0
  }

  const getCellColor = (value: number) => {
    if (value >= 9) return "bg-green-700 text-green-100"
    if (value >= 7) return "bg-green-900 text-green-300"
    if (value >= 5) return "bg-yellow-900 text-yellow-300"
    if (value >= 3) return "bg-red-900 text-red-300"
    return "bg-red-950 text-red-400"
  }

  const getTeamAverage = () => {
    const skillAvg = team.reduce((acc, member) => acc + member.skill, 0) / team.length
    const timezoneAvg = team.reduce((acc, member) => acc + getTimezoneSync(member.timezone), 0) / team.length
    const chaosAvg = team.reduce((acc, member) => acc + member.chaos, 0) / team.length

    return {
      skill: skillAvg.toFixed(1),
      timezone: timezoneAvg.toFixed(1),
      chaos: chaosAvg.toFixed(1),
    }
  }

  return (
    <div className="border border-green-700 bg-black p-4">
      <h2 className="text-lg mb-4 border-b border-green-700 pb-2">dream team heatmap</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-mono text-sm">
          <thead>
            <tr>
              <th className="text-left border border-green-800 px-2 py-1">member</th>
              <th className="text-center border border-green-800 px-2 py-1">skill</th>
              <th className="text-center border border-green-800 px-2 py-1">tz sync</th>
              <th className="text-center border border-green-800 px-2 py-1">chaos</th>
              <th className="text-center border border-green-800 px-2 py-1">role</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member, index) => (
              <tr key={index}>
                <td className="border border-green-800 px-2 py-1">{member.name}</td>
                <td className={`border border-green-800 px-2 py-1 text-center ${getCellColor(member.skill)}`}>
                  {member.skill}/10
                </td>
                <td
                  className={`border border-green-800 px-2 py-1 text-center ${getCellColor(getTimezoneSync(member.timezone))}`}
                >
                  {member.timezone}
                </td>
                <td className={`border border-green-800 px-2 py-1 text-center ${getCellColor(member.chaos)}`}>
                  {getChaosLabel(member.chaos)}
                </td>
                <td className="border border-green-800 px-2 py-1 text-center">{member.role}</td>
              </tr>
            ))}

            {team.length > 0 && (
              <tr className="bg-green-950">
                <td className="border border-green-800 px-2 py-1 font-bold">team avg</td>
                <td className="border border-green-800 px-2 py-1 text-center">{getTeamAverage().skill}</td>
                <td className="border border-green-800 px-2 py-1 text-center">{getTeamAverage().timezone}</td>
                <td className="border border-green-800 px-2 py-1 text-center">{getTeamAverage().chaos}</td>
                <td className="border border-green-800 px-2 py-1 text-center text-yellow-400">balanced</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs">
        <p className="text-green-400">{`> team analysis: high skill, timezone challenges, explosive creativity`}</p>
        <p className="text-yellow-400">{`> recommendation: add one more est timezone builder for stability`}</p>
      </div>
    </div>
  )
}
