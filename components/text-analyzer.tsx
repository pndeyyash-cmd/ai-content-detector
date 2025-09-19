"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileText, Zap, BarChart3 } from "lucide-react"

interface TextAnalyzerProps {
  onAnalyze: (text: string) => void
  isAnalyzing: boolean
}

export function TextAnalyzer({ onAnalyze, isAnalyzing }: TextAnalyzerProps) {
  const [text, setText] = useState("")

  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
  const charCount = text.length
  const sentenceCount = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length

  const handleAnalyze = () => {
    if (text.trim()) {
      onAnalyze(text)
    }
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Text Analysis
        </CardTitle>
        <CardDescription>Paste or type your text content for AI detection analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your text here for analysis. The more text you provide, the more accurate the detection will be..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-40 bg-input border-border/50 focus:border-primary/50 resize-none"
        />

        {/* Text Statistics */}
        {text && (
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              <BarChart3 className="h-3 w-3 mr-1" />
              {wordCount} words
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {charCount} characters
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {sentenceCount} sentences
            </Badge>
          </div>
        )}

        <Button
          onClick={handleAnalyze}
          disabled={!text.trim() || isAnalyzing}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
              Analyzing Text...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Analyze Text
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
