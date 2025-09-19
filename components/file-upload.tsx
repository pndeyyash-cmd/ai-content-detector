"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card } from "@/components/ui/card"
import { Upload, FileIcon, ImageIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
}

export function FileUpload({ onFileSelect, selectedFile }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
    },
    [onFileSelect],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"],
    },
    maxFiles: 1,
  })

  const removeFile = () => {
    onFileSelect(null)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8 text-primary" />
    }
    return <FileIcon className="h-8 w-8 text-primary" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (selectedFile) {
    return (
      <Card className="p-4 border-border/50 bg-card/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getFileIcon(selectedFile)}
            <div>
              <p className="font-medium text-sm">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card
      {...getRootProps()}
      className={`p-8 border-2 border-dashed cursor-pointer transition-colors ${
        isDragActive ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/50 bg-card/50"
      }`}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? "text-primary" : "text-muted-foreground"}`} />
        <p className="text-lg font-medium mb-2">{isDragActive ? "Drop your file here" : "Upload a file"}</p>
        <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to select</p>
        <p className="text-xs text-muted-foreground">Supports: PDF, DOC, DOCX, TXT, PNG, JPG, JPEG, GIF, BMP, WEBP</p>
      </div>
    </Card>
  )
}
