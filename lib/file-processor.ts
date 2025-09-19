export interface ProcessedFile {
  content: string
  type: "text" | "document" | "image"
  metadata: {
    name: string
    size: number
    mimeType: string
    extractedText?: string
    imageAnalysis?: {
      dimensions: { width: number; height: number }
      format: string
      hasMetadata: boolean
    }
  }
}

export async function processFile(file: File): Promise<ProcessedFile> {
  const baseMetadata = {
    name: file.name,
    size: file.size,
    mimeType: file.type,
  }

  // Handle images
  if (file.type.startsWith("image/")) {
    return await processImage(file, baseMetadata)
  }

  // Handle text files
  if (file.type === "text/plain") {
    const content = await file.text()
    return {
      content,
      type: "text",
      metadata: {
        ...baseMetadata,
        extractedText: content,
      },
    }
  }

  // Handle PDF files (mock processing)
  if (file.type === "application/pdf") {
    return await processPDF(file, baseMetadata)
  }

  // Handle Word documents (mock processing)
  if (file.type.includes("word") || file.type.includes("document")) {
    return await processDocument(file, baseMetadata)
  }

  // Default fallback
  return {
    content: `File: ${file.name}`,
    type: "document",
    metadata: baseMetadata,
  }
}

async function processImage(file: File, baseMetadata: any): Promise<ProcessedFile> {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)

      // Mock image analysis
      const mockAnalysis = {
        dimensions: { width: img.width, height: img.height },
        format: file.type.split("/")[1].toUpperCase(),
        hasMetadata: Math.random() > 0.5,
      }

      resolve({
        content: `Image analysis: ${img.width}x${img.height} ${mockAnalysis.format} image`,
        type: "image",
        metadata: {
          ...baseMetadata,
          imageAnalysis: mockAnalysis,
        },
      })
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve({
        content: `Image file: ${file.name}`,
        type: "image",
        metadata: baseMetadata,
      })
    }

    img.src = url
  })
}

async function processPDF(file: File, baseMetadata: any): Promise<ProcessedFile> {
  // Mock PDF text extraction
  await new Promise((resolve) => setTimeout(resolve, 500))

  const mockExtractedText = `This is mock extracted text from the PDF document "${file.name}". In a real implementation, this would use a PDF parsing library like pdf-parse or PDF.js to extract actual text content from the PDF file. The extracted text would then be analyzed for AI-generated content patterns.`

  return {
    content: mockExtractedText,
    type: "document",
    metadata: {
      ...baseMetadata,
      extractedText: mockExtractedText,
    },
  }
}

async function processDocument(file: File, baseMetadata: any): Promise<ProcessedFile> {
  // Mock document text extraction
  await new Promise((resolve) => setTimeout(resolve, 300))

  const mockExtractedText = `This is mock extracted text from the document "${file.name}". In a real implementation, this would use libraries like mammoth.js for Word documents to extract actual text content. The extracted text would then be analyzed for AI-generated content patterns and linguistic markers.`

  return {
    content: mockExtractedText,
    type: "document",
    metadata: {
      ...baseMetadata,
      extractedText: mockExtractedText,
    },
  }
}

export function getFileTypeDescription(mimeType: string): string {
  const typeMap: Record<string, string> = {
    "text/plain": "Text Document",
    "application/pdf": "PDF Document",
    "application/msword": "Word Document",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "Word Document",
    "image/jpeg": "JPEG Image",
    "image/jpg": "JPEG Image",
    "image/png": "PNG Image",
    "image/gif": "GIF Image",
    "image/bmp": "BMP Image",
    "image/webp": "WebP Image",
  }

  return typeMap[mimeType] || "Unknown File Type"
}
