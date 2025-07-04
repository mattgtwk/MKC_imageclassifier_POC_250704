'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface ResultDisplayProps {
  result: any
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(result, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const renderValue = (value: any): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-gray-500 italic">null</span>
    }
    
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return (
          <div className="space-y-1">
            {value.map((item, index) => (
              <div key={index} className="ml-4">
                • {renderValue(item)}
              </div>
            ))}
          </div>
        )
      } else {
        return (
          <div className="space-y-1">
            {Object.entries(value).map(([key, val]) => (
              <div key={key} className="ml-4">
                <span className="font-medium text-blue-600 dark:text-blue-400">{key}:</span> {renderValue(val)}
              </div>
            ))}
          </div>
        )
      }
    }
    
    if (typeof value === 'string') {
      return <span className="text-green-700 dark:text-green-400">"{value}"</span>
    }
    
    if (typeof value === 'number') {
      return <span className="text-purple-600 dark:text-purple-400">{value}</span>
    }
    
    if (typeof value === 'boolean') {
      return <span className="text-orange-600 dark:text-orange-400">{value.toString()}</span>
    }
    
    return <span className="text-gray-600 dark:text-gray-400">{String(value)}</span>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Analysis Results
        </h3>
        <button
          onClick={copyToClipboard}
          className="flex items-center px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copy JSON
            </>
          )}
        </button>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
        <div className="space-y-3">
          {Object.entries(result).map(([key, value]) => (
            <div key={key} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
              <div className="font-medium text-gray-900 dark:text-white mb-1">
                {key}
              </div>
              <div className="text-sm">
                {renderValue(value)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <details className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
        <summary className="cursor-pointer font-medium text-gray-900 dark:text-white mb-2">
          Raw JSON
        </summary>
        <pre className="text-xs bg-white dark:bg-gray-800 p-3 rounded border overflow-x-auto">
          <code className="text-gray-800 dark:text-gray-200">
            {JSON.stringify(result, null, 2)}
          </code>
        </pre>
      </details>
    </div>
  )
} 