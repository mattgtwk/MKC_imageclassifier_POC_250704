# Matt Kuperholz Image classifier POC 25070415337

A React website hosted on Vercel that allows users to upload images, analyze them with OpenAI GPT-4 Vision, and receive structured JSON responses based on custom prompts and schemas.

## Features

- 🖼️ **Image Upload**: Drag & drop or click to upload images to Vercel Blob storage
- 🤖 **AI Analysis**: Analyze images using OpenAI GPT-4 Vision with custom prompts
- 📋 **Structured Output**: Force JSON responses based on user-defined schemas
- 🎨 **Modern UI**: Beautiful, responsive interface with dark mode support
- 📊 **Results Display**: View analysis results in both table and raw JSON formats
- 📋 **Copy to Clipboard**: Easy copying of analysis results

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Vercel Blob
- **AI**: OpenAI GPT-4 Vision
- **Icons**: Lucide React
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ 
- Vercel account
- OpenAI API key

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd image-ai-analyzer
npm install
```

### 2. Set Up Vercel Blob Storage

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (or create a new one)
3. Go to the **Storage** tab
4. Click **Connect Database**
5. Select **Blob** and click **Continue**
6. Name your store (e.g., "images") and click **Create**
7. Copy the `BLOB_READ_WRITE_TOKEN` from the environment variables

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your_openai_key_here
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
```

### 4. Update Next.js Config

Update `next.config.js` with your blob store URL:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-store-id.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 6. Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variables in Vercel dashboard
4. Deploy!

## Usage

1. **Upload Image**: Drag and drop or click to upload an image
2. **Enter Prompt**: Describe what you want to analyze in the image
3. **Define Schema**: Specify the JSON structure you want as output
4. **Analyze**: Click "Analyze Image" to get results
5. **View Results**: See the structured data in table format or raw JSON

## Example Schema

```json
{
  "type": "object",
  "properties": {
    "description": {
      "type": "string"
    },
    "objects": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "colors": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "mood": {
      "type": "string"
    }
  }
}
```

## API Endpoints

- `POST /api/upload` - Upload image to Vercel Blob
- `POST /api/analyze` - Analyze image with OpenAI GPT-4 Vision

## File Structure

```
├── app/
│   ├── api/
│   │   ├── upload/
│   │   │   └── route.ts
│   │   └── analyze/
│   │       └── route.ts
│   ├── components/
│   │   ├── ImageUploadForm.tsx
│   │   ├── PromptForm.tsx
│   │   └── ResultDisplay.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob read/write token | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License 