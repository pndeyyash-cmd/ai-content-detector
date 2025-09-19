export interface DetectionResult {
  aiProbability: number
  confidence: number
  contentType: "text" | "document" | "image"
  analysis: {
    patterns: string[]
    indicators: string[]
    recommendation: string
  }
  metadata: {
    processingTime: number
    modelVersion: string
    algorithm: string
    wordCount?: number
    sentenceCount?: number
  }
}

export async function detectAIContent(
  content: string,
  contentType: "text" | "document" | "image" = "text",
): Promise<DetectionResult> {
  // Simulate processing time
  const processingTime = 1.0 + Math.random() * 2.0
  await new Promise((resolve) => setTimeout(resolve, processingTime * 1000))

  // Analyze content characteristics for more realistic results
  const analysis = analyzeContentCharacteristics(content, contentType)

  return {
    aiProbability: analysis.aiProbability,
    confidence: analysis.confidence,
    contentType,
    analysis: {
      patterns: getPatterns(contentType, analysis.aiProbability),
      indicators: getIndicators(contentType),
      recommendation: getRecommendation(analysis.aiProbability),
    },
    metadata: {
      processingTime,
      modelVersion: "v2.1.0",
      algorithm: getAlgorithm(contentType),
      ...analysis.textMetrics,
    },
  }
}

function analyzeContentCharacteristics(content: string, contentType: "text" | "document" | "image") {
  let aiProbability: number
  let confidence: number
  let textMetrics = {}

  if (contentType === "image") {
    // Image analysis simulation
    aiProbability = 20 + Math.random() * 60 // 20-80% range
    confidence = 75 + Math.random() * 20
  } else {
    // Text analysis simulation
    const words = content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
    const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0)
    const avgWordsPerSentence = words.length / Math.max(sentences.length, 1)

    textMetrics = {
      wordCount: words.length,
      sentenceCount: sentences.length,
    }

    // Simulate AI detection based on text characteristics
    let baseScore = Math.random() * 100

    // Adjust based on content patterns (mock heuristics)
    if (content.includes("Furthermore") || content.includes("Moreover") || content.includes("Additionally")) {
      baseScore += 15 // Formal connectors often used by AI
    }

    if (avgWordsPerSentence > 20) {
      baseScore += 10 // Very long sentences might indicate AI
    }

    if (content.includes("I believe") || content.includes("In my opinion") || content.includes("personally")) {
      baseScore -= 15 // Personal opinions less likely in AI text
    }

    if (words.length < 50) {
      baseScore -= 10 // Short texts are harder to detect
      confidence = 60 + Math.random() * 25
    } else {
      confidence = 80 + Math.random() * 15
    }

    // Check for repetitive patterns
    const uniqueWords = new Set(words.map((w) => w.toLowerCase()))
    const vocabularyDiversity = uniqueWords.size / words.length

    if (vocabularyDiversity < 0.6) {
      baseScore += 12 // Low vocabulary diversity might indicate AI
    }

    aiProbability = Math.max(0, Math.min(100, baseScore))
  }

  return { aiProbability, confidence, textMetrics }
}

function getPatterns(contentType: "text" | "document" | "image", aiProbability: number): string[] {
  if (contentType === "image") {
    const imagePatterns = [
      "Pixel-level inconsistencies detected",
      "Unnatural lighting gradients",
      "Compression artifact anomalies",
      "Frequency domain irregularities",
      "Metadata signature analysis",
      "Color distribution patterns",
      "Edge detection anomalies",
    ]
    return shuffleArray(imagePatterns).slice(0, 3 + Math.floor(Math.random() * 2))
  }

  const textPatterns = [
    "Repetitive sentence structure patterns",
    "Formal tone consistency throughout",
    "Limited vocabulary variation detected",
    "Predictable transition word usage",
    "Uniform paragraph length distribution",
    "Consistent punctuation patterns",
    "Lack of colloquial expressions",
    "Systematic argument structure",
    "Balanced sentence complexity",
    "Minimal stylistic inconsistencies",
  ]

  // Select patterns based on AI probability
  const patternCount = aiProbability > 70 ? 4 : aiProbability > 40 ? 3 : 2
  return shuffleArray(textPatterns).slice(0, patternCount)
}

function getIndicators(contentType: "text" | "document" | "image"): string[] {
  if (contentType === "image") {
    return shuffleArray([
      "Deep convolutional neural network analysis",
      "Generative adversarial network detection",
      "Pixel-level statistical analysis",
      "Metadata forensic examination",
      "Frequency domain transformation",
      "Compression pattern analysis",
    ]).slice(0, 3)
  }

  return shuffleArray([
    "Transformer-based language model analysis",
    "Syntactic pattern recognition",
    "Semantic coherence evaluation",
    "Writing style fingerprinting",
    "N-gram frequency analysis",
    "Perplexity score calculation",
    "Linguistic feature extraction",
    "Stylometric analysis",
  ]).slice(0, 4)
}

function getRecommendation(aiProbability: number): string {
  if (aiProbability > 75) {
    return "High likelihood of AI generation. Content exhibits strong patterns consistent with machine-generated text/media."
  } else if (aiProbability > 50) {
    return "Moderate likelihood of AI generation. Some patterns suggest possible machine assistance in content creation."
  } else if (aiProbability > 25) {
    return "Low to moderate likelihood of AI generation. Content shows mixed indicators requiring further analysis."
  } else {
    return "Low likelihood of AI generation. Content exhibits characteristics typical of human-created material."
  }
}

function getAlgorithm(contentType: "text" | "document" | "image"): string {
  const algorithms = {
    text: "Neural Pattern Recognition (NPR)",
    document: "Document Analysis Framework (DAF)",
    image: "Visual Content Detection (VCD)",
  }
  return algorithms[contentType]
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Additional utility functions for realistic mock behavior
export function generateRealisticScore(contentHints: {
  hasPersonalPronouns?: boolean
  hasEmotionalLanguage?: boolean
  hasTypos?: boolean
  isVeryFormal?: boolean
  isVeryLong?: boolean
}): number {
  let baseScore = 30 + Math.random() * 40 // Base range 30-70%

  if (contentHints.hasPersonalPronouns) baseScore -= 15
  if (contentHints.hasEmotionalLanguage) baseScore -= 10
  if (contentHints.hasTypos) baseScore -= 20
  if (contentHints.isVeryFormal) baseScore += 15
  if (contentHints.isVeryLong) baseScore += 10

  return Math.max(5, Math.min(95, baseScore))
}
