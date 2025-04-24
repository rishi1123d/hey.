"use client"

import { useState, useEffect } from "react"
import { Users, Zap, Clock, Palette, Film, Code, Lightbulb } from "lucide-react"

type TeamMember = {
  role: "software" | "designer" | "content" | "filmmaker"
  name: string
  skill: number
  timezone: string
  chaos: number
  superpower: string
}

export default function DreamTeamMatrix() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  useEffect(() => {
    // Generate team data for the 4 specific roles
    const teamData: TeamMember[] = [
      {
        role: "software",
        name: "0xfrost",
        skill: 9,
        timezone: "est",
        chaos: 8,
        superpower: "systems thinking",
      },
      {
        role: "designer",
        name: "void_walker",
        skill: 8,
        timezone: "pst",
        chaos: 6,
        superpower: "visual storytelling",
      },
      {
        role: "content",
        name: "word_hacker",
        skill: 7,
        timezone: "gmt",
        chaos: 9,
        superpower: "audience empathy",
      },
      {
        role: "filmmaker",
        name: "reel_vision",
        skill: 9,
        timezone: "est",
        chaos: 7,
        superpower: "narrative structure",
      },
    ]

    setTeam(teamData)
  }, [])

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "software":
        return <Code className="w-4 h-4" />
      case "designer":
        return <Palette className="w-4 h-4" />
      case "content":
        return <Lightbulb className="w-4 h-4" />
      case "filmmaker":
        return <Film className="w-4 h-4" />
      default:
        return <Code className="w-4 h-4" />
    }
  }

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
    if (tz === "cst") return 8 // 1 hour difference
    if (tz === "mst") return 7 // 2 hours difference
    if (tz === "pst") return 6 // 3 hours difference
    if (tz === "gmt") return 5 // 5 hours difference
    if (tz === "cet") return 4 // 6 hours difference
    if (tz === "jst") return 2 // 14 hours difference
    return 0
  }

  const getCellColor = (value: number, type: string) => {
    if (type === "chaos") {
      if (value >= 9) return "bg-red-900 text-red-300"
      if (value >= 7) return "bg-orange-900 text-orange-300"
      if (value >= 5) return "bg-yellow-900 text-yellow-300"
      if (value >= 3) return "bg-green-900 text-green-300"
      return "bg-blue-900 text-blue-300"
    } else {
      if (value >= 9) return "bg-green-900 text-green-300"
      if (value >= 7) return "bg-green-950 text-green-400"
      if (value >= 5) return "bg-yellow-900 text-yellow-300"
      if (value >= 3) return "bg-orange-900 text-orange-300"
      return "bg-red-900 text-red-300"
    }
  }

  const getTeamSynergy = () => {
    // Calculate team synergy based on skill, timezone sync, and chaos balance
    const avgSkill = team.reduce((acc, member) => acc + member.skill, 0) / team.length
    const timezoneSync = team.reduce((acc, member) => acc + getTimezoneSync(member.timezone), 0) / team.length
    const chaosBalance = team.reduce((acc, member) => acc + member.chaos, 0) / team.length

    // Synergy formula: higher skill and timezone sync is good, chaos should be balanced (not too low, not too high)
    const synergyScore = avgSkill * 0.4 + timezoneSync * 0.3 + (Math.abs(7 - chaosBalance) < 2 ? 3 : 1)

    return {
      score: Math.min(10, Math.round(synergyScore * 10) / 10),
      skillAvg: Math.round(avgSkill * 10) / 10,
      timezoneAvg: Math.round(timezoneSync * 10) / 10,
      chaosAvg: Math.round(chaosBalance * 10) / 10,
    }
  }

  const synergy = getTeamSynergy()

  return (
    <div className="border border-green-800 bg-black p-4 h-full">
      <div className="flex items-center justify-between mb-4 border-b border-green-800 pb-2">
        <h2 className="text-lg flex items-center gap-2">
          <Users className="w-4 h-4" />
          dream team matrix
        </h2>
        <div className="text-xs text-green-700">4 archetypes</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-mono text-sm">
          <thead>
            <tr>
              <th className="text-left border border-green-900 px-2 py-1">role</th>
              <th className="text-center border border-green-900 px-2 py-1">skill</th>
              <th className="text-center border border-green-900 px-2 py-1">tz</th>
              <th className="text-center border border-green-900 px-2 py-1">chaos</th>
              <th className="text-center border border-green-900 px-2 py-1">power</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member, index) => (
              <tr
                key={index}
                className={`${selectedRole === member.role ? "bg-green-950" : ""} hover:bg-green-950 cursor-pointer transition-colors`}
                onClick={() => setSelectedRole(selectedRole === member.role ? null : member.role)}
              >
                <td className="border border-green-900 px-2 py-1">
                  <div className="flex items-center gap-1">
                    {getRoleIcon(member.role)}
                    <span>{member.name}</span>
                  </div>
                </td>
                <td className={`border border-green-900 px-2 py-1 text-center ${getCellColor(member.skill, "skill")}`}>
                  {member.skill}/10
                </td>
                <td
                  className={`border border-green-900 px-2 py-1 text-center ${getCellColor(getTimezoneSync(member.timezone), "timezone")}`}
                >
                  {member.timezone}
                </td>
                <td className={`border border-green-900 px-2 py-1 text-center ${getCellColor(member.chaos, "chaos")}`}>
                  {getChaosLabel(member.chaos)}
                </td>
                <td className="border border-green-900 px-2 py-1 text-center text-yellow-400">{member.superpower}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-green-900 p-2">
          <div className="text-xs text-green-700 mb-1 flex items-center gap-1">
            <Zap className="w-3 h-3" /> team synergy
          </div>
          <div className="text-2xl text-yellow-400">{synergy.score}/10</div>
          <div className="w-full bg-green-950 h-2 mt-1">
            <div className="bg-yellow-500 h-full" style={{ width: `${synergy.score * 10}%` }}></div>
          </div>
        </div>

        <div className="border border-green-900 p-2">
          <div className="text-xs text-green-700 mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3" /> timezone coverage
          </div>
          <div className="text-xs grid grid-cols-2 gap-x-4">
            <div>est: {team.filter((m) => m.timezone === "est").length}</div>
            <div>pst: {team.filter((m) => m.timezone === "pst").length}</div>
            <div>gmt: {team.filter((m) => m.timezone === "gmt").length}</div>
            <div>other: {team.filter((m) => !["est", "pst", "gmt"].includes(m.timezone)).length}</div>
          </div>
        </div>

        <div className="border border-green-900 p-2">
          <div className="text-xs text-green-700 mb-1">chaos/creativity balance</div>
          <div className="text-xs">{synergy.chaosAvg}/10 (optimal: 6-8)</div>
          <div className="w-full bg-green-950 h-2 mt-1">
            <div className="bg-red-500 h-full" style={{ width: `${synergy.chaosAvg * 10}%` }}></div>
          </div>
        </div>
      </div>

      {selectedRole && (
        <div className="mt-4 border border-green-900 p-2">
          <div className="text-xs text-green-700 mb-1">role analysis: {selectedRole}</div>
          <div className="text-xs">
            {selectedRole === "software" &&
              "the architect. builds systems that scale. thinks in code and infrastructure. essential for technical execution."}
            {selectedRole === "designer" &&
              "the visionary. creates interfaces and experiences. translates ideas into visual language. essential for user connection."}
            {selectedRole === "content" &&
              "the storyteller. crafts narratives and messaging. connects with audience emotions. essential for market resonance."}
            {selectedRole === "filmmaker" &&
              "the director. creates compelling visual stories. thinks in scenes and emotions. essential for brand identity."}
          </div>
        </div>
      )}

      <div className="mt-4 text-xs border-t border-green-900 pt-2">
        <p className="text-green-700">{`> team analysis: ${
          synergy.score >= 8
            ? "elite composition. ship anything."
            : synergy.score >= 6
              ? "solid team. needs alignment."
              : "potential issues. review roles."
        }`}</p>
      </div>
    </div>
  )
}
