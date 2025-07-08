'use client'

import { useState, useRef } from 'react'
import ImageUploadForm from './components/ImageUploadForm'
import Card from './components/ui/Card'
import PromptForm from './components/PromptForm'
import ResultDisplay from './components/ResultDisplay'

export default function Home() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImageUrl(imageUrl)
    setError(null)
  }

  const handleAnalysis = async (prompt: string, schema: string) => {
    if (!uploadedImageUrl) {
      setError('Please upload an image first')
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: uploadedImageUrl,
          prompt,
          schema,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze image')
      }

      const result = await response.json()
      setAnalysisResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Matt Kuperholz Image classifier POC 25070415337
          </h1>
          <p className="text-lg text-gray-400">
            Upload an image and analyze it with OpenAI GPT-4
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 space-y-8">
            {/* Image Upload Section */}
            <Card title="Upload Image">
              <ImageUploadForm onImageUpload={handleImageUpload} />
              {uploadedImageUrl && (
                <div className="mt-4">
                  <img
                    src={uploadedImageUrl}
                    alt="Uploaded"
                    className="max-w-full h-auto max-h-64 rounded-lg shadow-md"
                  />
                </div>
              )}
            </Card>

            {/* Prompt and Schema Section */}
            <Card title="Analysis Configuration">
              <PromptForm onAnalyze={handleAnalysis} isAnalyzing={isAnalyzing} />
            </Card>
          </div>

          {/* Right Column */}
          <div className="flex-1">
            {/* Results Section */}
            {analysisResult && (
              <Card title="Analysis Results" className="h-full">
                <ResultDisplay result={analysisResult} />
              </Card>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
} 