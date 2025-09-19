"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, ImageIcon, FileIcon, Info } from "lucide-react"
import type { ProcessedFile } from "@/lib/file-processor"

interface FileProcessorDisplayProps {
  processedFile: ProcessedFile
}

export function FileProcessorDisplay({ processedFile }: FileProcessorDisplayProps) {
  const { content, type, metadata } = processedFile

  const getTypeIcon = () => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-primary" />
      case "document":
        return <FileText className="h-5 w-5 text-primary" />
      default:
        return <FileIcon className="h-5 w-5 text-primary" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getTypeIcon()}
          File Processing Results
        </CardTitle>
        <CardDescription>Extracted content and metadata from uploaded file</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Metadata */}
        <div className="grid md:grid-cols-2 gap-4 p-4 rounded-lg bg-muted/20 border border-border/30">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">File Name</p>
            <p className="text-sm font-mono">{metadata.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">File Size</p>
            <p className="text-sm">{formatFileSize(metadata.size)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">File Type</p>
            <Badge variant="secondary" className="text-xs">
              {metadata.mimeType}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Content Type</p>
            <Badge variant="outline" className="text-xs capitalize">
              {type}
            </Badge>
          </div>
        </div>

        {/* Image-specific metadata */}
        {type === "image" && metadata.imageAnalysis && (
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Image Analysis
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-muted-foreground mb-1">Dimensions</p>
                <p>
                  {metadata.imageAnalysis.dimensions.width} × {metadata.imageAnalysis.dimensions.height}
                </p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground mb-1">Format</p>
                <p>{metadata.imageAnalysis.format}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground mb-1">Metadata</p>
                <p>{metadata.imageAnalysis.hasMetadata ? "Present" : "None"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Extracted Content Preview */}
        <div>
          <h4 className="font-semibold mb-2">{type === "image" ? "Analysis Content" : "Extracted Text"}</h4>
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30 max-h-40 overflow-y-auto">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {content.length > 500 ? `${content.substring(0, 500)}...` : content}
            </p>
          </div>
          {content.length > 500 && (
            <p className="text-xs text-muted-foreground mt-2">
              Showing first 500 characters. Full content will be analyzed.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
