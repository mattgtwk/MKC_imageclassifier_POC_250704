'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

interface PromptFormProps {
  onAnalyze: (prompt: string, schema: string) => void
  isAnalyzing: boolean
}

export default function PromptForm({ onAnalyze, isAnalyzing }: PromptFormProps) {
  const [prompt, setPrompt] = useState('')
  const [schema, setSchema] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim() && schema.trim()) {
      onAnalyze(prompt, schema)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          PROMPT
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your analysis prompt here..."
          className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
          required
          disabled={isAnalyzing}
        />
      </div>

      <div>
        <label htmlFor="schema" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          OUTPUT SCHEMA (JSON)
        </label>
        <textarea
          id="schema"
          value={schema}
          onChange={(e) => setSchema(e.target.value)}
          placeholder='Enter your JSON schema here... e.g., {"type": "object", "properties": {"description": {"type": "string"}, "tags": {"type": "array", "items": {"type": "string"}}}}'
          className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none font-mono text-sm"
          required
          disabled={isAnalyzing}
        />
      </div>

      <button
        type="submit"
        disabled={isAnalyzing || !prompt.trim() || !schema.trim()}
        className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Send className="w-5 h-5 mr-2" />
        {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
      </button>
    </form>
  )
} 