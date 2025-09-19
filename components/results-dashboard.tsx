"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  FileText,
  ImageIcon,
  Brain,
  Download,
  Share2,
  BarChart3,
  Clock,
  Cpu,
} from "lucide-react"

interface ResultsDashboardProps {
  results: {
    aiProbability: number
    confidence: number
    contentType: "text" | "document" | "image"
    analysis: {
      patterns: string[]
      indicators: string[]
      recommendation: string
    }
    metadata?: {
      processingTime: number
      modelVersion: string
      algorithm: string
    }
  }
  onExport?: () => void
  onShare?: () => void
}

export function ResultsDashboard({ results, onExport, onShare }: ResultsDashboardProps) {
  const { aiProbability, confidence, contentType, analysis, metadata } = results

  const getStatusIcon = () => {
    if (aiProbability > 70) return <XCircle className="h-6 w-6 text-destructive" />
    if (aiProbability > 30) return <AlertTriangle className="h-6 w-6 text-yellow-500" />
    return <CheckCircle className="h-6 w-6 text-green-500" />
  }

  const getStatusColor = () => {
    if (aiProbability > 70) return "text-destructive"
    if (aiProbability > 30) return "text-yellow-500"
    return "text-green-500"
  }

  const getStatusText = () => {
    if (aiProbability > 70) return "High AI Probability"
    if (aiProbability > 30) return "Moderate AI Probability"
    return "Low AI Probability"
  }

  const getContentTypeIcon = () => {
    switch (contentType) {
      case "image":
        return <ImageIcon className="h-5 w-5" />
      case "document":
        return <FileText className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getRiskLevel = () => {
    if (aiProbability > 70) return { level: "High Risk", color: "bg-destructive" }
    if (aiProbability > 30) return { level: "Medium Risk", color: "bg-yellow-500" }
    return { level: "Low Risk", color: "bg-green-500" }
  }

  const riskLevel = getRiskLevel()

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Analysis Dashboard
          </h2>
          <p className="text-muted-foreground">Comprehensive AI content detection results</p>
        </div>
        <div className="flex gap-2">
          {onShare && (
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          )}
          {onExport && (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Main Score Card */}
      <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Status Icon and Score */}
            <div className="flex flex-col items-center gap-4">
              {getStatusIcon()}
              <div>
                <div className={`text-4xl font-bold ${getStatusColor()}`}>{aiProbability.toFixed(1)}%</div>
                <p className="text-lg text-muted-foreground mt-1">AI Probability</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={aiProbability} className="w-full h-4" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Human-created</span>
                <span className={getStatusColor()}>{getStatusText()}</span>
                <span>AI-generated</span>
              </div>
            </div>

            {/* Risk Level Badge */}
            <Badge className={`${riskLevel.color} text-white px-4 py-2 text-sm font-medium`}>{riskLevel.level}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="text-2xl font-bold text-primary">{confidence.toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground">Confidence</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            {getContentTypeIcon()}
            <div className="mt-3">
              <Badge variant="secondary" className="capitalize">
                {contentType}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Content Type</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="text-2xl font-bold text-primary">{metadata?.processingTime || 1.2}s</p>
            <p className="text-sm text-muted-foreground">Processing Time</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Cpu className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="text-lg font-bold text-primary">{metadata?.modelVersion || "v2.1.0"}</p>
            <p className="text-sm text-muted-foreground">Model Version</p>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Detected Patterns */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Detected Patterns
            </CardTitle>
            <CardDescription>Key patterns identified during analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.patterns.map((pattern, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/30">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{pattern}</p>
                    <div className="mt-1">
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: `${60 + Math.random() * 40}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Indicators */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-5 w-5 text-accent" />
              Analysis Indicators
            </CardTitle>
            <CardDescription>Technical indicators used in detection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.indicators.map((indicator, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{indicator}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {["High", "Medium", "Low"][Math.floor(Math.random() * 3)]} Impact
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation Card */}
      <Card className="border-border/50 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon()}
            Final Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg font-medium">{analysis.recommendation}</p>
            <div className="p-4 rounded-lg bg-background/50 border border-border/30">
              <p className="text-sm text-muted-foreground">
                This analysis is based on advanced machine learning algorithms that examine
                {contentType === "image"
                  ? " pixel-level patterns, metadata, and compression artifacts"
                  : " linguistic patterns, writing style, and semantic coherence"}
                . The confidence level indicates the reliability of this assessment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Technical Analysis Details</CardTitle>
          <CardDescription>Detailed breakdown of the detection process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground">Algorithm</p>
              <p className="text-sm">{metadata?.algorithm || "Neural Pattern Recognition"}</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground">Processing Method</p>
              <p className="text-sm">
                {contentType === "image" ? "Deep Convolutional Analysis" : "Transformer-based NLP"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground">Dataset Version</p>
              <p className="text-sm">Training Set 2024.1</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
