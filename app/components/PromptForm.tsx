'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

interface PromptFormProps {
  onAnalyze: (prompt: string, schema: string) => void
  isAnalyzing: boolean
}

export default function PromptForm({ onAnalyze, isAnalyzing }: PromptFormProps) {
  const [prompt, setPrompt] = useState('Please examine the image below and provide a detailed description using the following five dimensions—background, content, colours, theme, and layout—in a format that conforms exactly to the MultiDimensionalObjectDescription JSON schema. Be precise and thorough in each dimension.')
  const [schema, setSchema] = useState(`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "MultiDimensionalObjectDescription",
  "type": "object",
  "description": "A schema for describing an object across five descriptive dimensions.",
  "properties": {
    "background": {
      "type": "string",
      "description": "Context or setting in which the object exists or is presented."
    },
    "content": {
      "type": "string",
      "description": "Main subject matter or focal elements of the object."
    },
    "colours": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "A colour name, code, or descriptor."
      },
      "minItems": 1,
      "description": "List of dominant colours or palette used by the object."
    },
    "theme": {
      "type": "string",
      "description": "Overarching concept, mood, or narrative tying the object together."
    },
    "layout": {
      "type": "string",
      "description": "Spatial arrangement or structural organization of the object's elements."
    }
  },
  "required": ["background", "content", "colours", "theme", "layout"],
  "additionalProperties": false,
  "examples": [
    {
      "background": "A misty forest at dawn, with pale light filtering through trees.",
      "content": "A lone stag standing on a moss-covered rock.",
      "colours": ["#2E3A2F", "#A3B18A", "#F0E5D8"],
      "theme": "Solitude and renewal in nature.",
      "layout": "Central composition with the stag in the foreground and trees receding into the distance."
    }
  ]
}`)

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
          placeholder="Describe what you want to analyze in the image. For example: 'Analyze this image and describe its visual elements, mood, and composition.'"
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
          placeholder="The JSON schema is pre-populated with a comprehensive image analysis schema. You can modify it if needed."
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