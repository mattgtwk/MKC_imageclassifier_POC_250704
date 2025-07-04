import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { imageUrl, prompt, schema } = await request.json()

    if (!imageUrl || !prompt || !schema) {
      return NextResponse.json(
        { error: 'Missing required fields: imageUrl, prompt, or schema' },
        { status: 400 }
      )
    }

    // Validate JSON schema
    let parsedSchema
    try {
      parsedSchema = JSON.parse(schema)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON schema' },
        { status: 400 }
      )
    }

    // Construct the full prompt with schema
    const escapedSchema = JSON.stringify(parsedSchema, null, 2).replace(/"/g, '\\"')
    const fullPrompt = `${prompt}

<OUTPUT> Always respond in JSON according to this schema: ${escapedSchema}</OUTPUT>

Ensure your response is ONLY valid JSON with no additional text or formatting.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: fullPrompt,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      temperature: 0.1, // Low temperature for more consistent JSON output
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    // Try to parse the response as JSON
    let result
    try {
      result = JSON.parse(content)
    } catch (error) {
      // If parsing fails, try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          result = JSON.parse(jsonMatch[0])
        } catch (parseError) {
          return NextResponse.json(
            { 
              error: 'Failed to parse OpenAI response as JSON',
              rawResponse: content 
            },
            { status: 500 }
          )
        }
      } else {
        return NextResponse.json(
          { 
            error: 'OpenAI response is not valid JSON',
            rawResponse: content 
          },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    )
  }
} 