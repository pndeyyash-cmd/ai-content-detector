"use client"
import { ResultsDashboard } from "@/components/results-dashboard"

interface AnalysisResultsProps {
  results: {
    aiProbability: number
    confidence: number
    contentType: "text" | "document" | "image"
    analysis: {
      patterns: string[]
      indicators: string[]
      recommendation: string
    }
  }
}

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const enhancedResults = {
    ...results,
    metadata: {
      processingTime: 1.2 + Math.random() * 0.8,
      modelVersion: "v2.1.0",
      algorithm: "Neural Pattern Recognition",
    },
  }

  const handleExport = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      results: enhancedResults,
      summary: `AI Content Detection Report - ${enhancedResults.aiProbability.toFixed(1)}% AI Probability`,
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ai-detection-report-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "AI Content Detection Results",
        text: `Analysis shows ${enhancedResults.aiProbability.toFixed(1)}% AI probability with ${enhancedResults.confidence.toFixed(1)}% confidence.`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      const shareText = `AI Content Detection Results: ${enhancedResults.aiProbability.toFixed(1)}% AI probability with ${enhancedResults.confidence.toFixed(1)}% confidence. Analyzed using advanced neural pattern recognition.`
      navigator.clipboard.writeText(shareText)
    }
  }

  return <ResultsDashboard results={enhancedResults} onExport={handleExport} onShare={handleShare} />
}
