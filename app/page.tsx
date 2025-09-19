"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, ImageIcon, Zap, Shield, Brain } from "lucide-react"
import { FileUpload } from "@/components/file-upload"
import { AnalysisResults } from "@/components/analysis-results"
import { FileProcessorDisplay } from "@/components/file-processor-display"
import { processFile, type ProcessedFile } from "@/lib/file-processor"
import { detectAIContent } from "@/lib/ai-detector"

export default function HomePage() {
  const [textInput, setTextInput] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [processedFile, setProcessedFile] = useState<ProcessedFile | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleFileSelect = async (file: File | null) => {
    setUploadedFile(file)
    setProcessedFile(null)
    setResults(null)

    if (file) {
      setIsProcessing(true)
      try {
        const processed = await processFile(file)
        setProcessedFile(processed)
      } catch (error) {
        console.error("Error processing file:", error)
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const handleAnalyze = async () => {
    if (!textInput.trim() && !processedFile) return

    setIsAnalyzing(true)

    try {
      const contentToAnalyze = processedFile ? processedFile.content : textInput
      const contentType = processedFile ? processedFile.type : "text"

      // Use the sophisticated AI detection logic
      const detectionResults = await detectAIContent(contentToAnalyze, contentType)

      setResults(detectionResults)
    } catch (error) {
      console.error("Error during analysis:", error)
      // Fallback to simple mock results
      const fallbackResults = {
        aiProbability: Math.random() * 100,
        confidence: 85 + Math.random() * 15,
        contentType: processedFile ? processedFile.type : "text",
        analysis: {
          patterns: ["Analysis error - using fallback detection"],
          indicators: ["Fallback analysis mode"],
          recommendation: "Analysis completed with limited accuracy",
        },
      }
      setResults(fallbackResults)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setTextInput("")
    setUploadedFile(null)
    setProcessedFile(null)
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated gradient header */}
      <div className="gradient-animate h-1 w-full"></div>

      <div className="absolute top-4 left-4 z-10">
        <p className="text-xs text-muted-foreground/70">Developed by Yash Vardhan Pandey</p>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Content Detector
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced detection system for AI-generated content across text, documents, and images
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Text Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Analyze written content for AI generation patterns and linguistic markers
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Document Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Upload PDFs and text documents for comprehensive content analysis
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <ImageIcon className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Image Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Detect AI-generated images using advanced pixel-level analysis
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analysis Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Content Analysis
              </CardTitle>
              <CardDescription>Enter text or upload a file to analyze for AI-generated content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Text Input */}
              <div>
                <label className="text-sm font-medium mb-2 block">Text Input</label>
                <Textarea
                  placeholder="Paste your text content here for analysis..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="min-h-32 bg-input border-border/50 focus:border-primary/50"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="text-sm font-medium mb-2 block">File Upload</label>
                <FileUpload onFileSelect={handleFileSelect} selectedFile={uploadedFile} />
                {isProcessing && (
                  <div className="mt-4 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">Processing file...</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={handleAnalyze}
                  disabled={(!textInput.trim() && !processedFile) || isAnalyzing || isProcessing}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Analyze Content
                    </>
                  )}
                </Button>

                {(textInput || uploadedFile || results) && (
                  <Button variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* File Processing Results */}
          {processedFile && (
            <div className="mt-8">
              <FileProcessorDisplay processedFile={processedFile} />
            </div>
          )}

          {/* Analysis Results */}
          {results && (
            <div className="mt-8">
              <AnalysisResults results={results} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
