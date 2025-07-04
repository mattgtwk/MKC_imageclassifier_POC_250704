'use client'

import { useState, useRef } from 'react'
import { Upload, Send, Download } from 'lucide-react'
import ImageUploadForm from './components/ImageUploadForm'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Matt Kuperholz Image classifier POC 25070415337
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Upload an image and analyze it with OpenAI GPT-4
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Image Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Upload className="w-6 h-6 mr-2" />
              Upload Image
            </h2>
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
          </div>

          {/* Prompt and Schema Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Send className="w-6 h-6 mr-2" />
              Analysis Configuration
            </h2>
            <PromptForm onAnalyze={handleAnalysis} isAnalyzing={isAnalyzing} />
          </div>

          {/* Results Section */}
          {analysisResult && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Download className="w-6 h-6 mr-2" />
                Analysis Results
              </h2>
              <ResultDisplay result={analysisResult} />
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 