import type { Request, Response } from 'express'
import { mockScripts } from '../models/scriptModel.js'
import type { Script } from '../types/script.js'
import { GnerateScriptService } from '../services/AIServices.js'

let scripts: Script[] = [...mockScripts]

export const getScripts = (req: Request, res: Response) => {
  res.json(scripts)
}

export const getScriptById = (req: Request, res: Response) => {
  const { id } = req.params
  const script = scripts.find(s => s.id === id)
  if (!script) {
    return res.status(404).json({ message: 'Script not found' })
  }
  res.json(script)
}

export const createScript = async (req: Request, res: Response) => {
  const { topic } = req.body
  
  if (!topic) {
    return res.status(400).json({ message: 'Topic is required' })
  }

  try {
    const response = await GnerateScriptService(topic)
    if (!response) {
      return res.status(500).json({ message: 'Failed to generate script' })
    }
    const content = typeof response === 'object' && 'content' in response ? response.content : response
    return res.status(200).json({
      content: content
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateScript = (req: Request, res: Response) => {
  const { id } = req.params
  const { title, content, category } = req.body

  const scriptIndex = scripts.findIndex(s => s.id === id)
  if (scriptIndex === -1) {
    return res.status(404).json({ message: 'Script not found' })
  }

  const existing = scripts[scriptIndex]
  if (!existing) {
    return res.status(404).json({ message: 'Script not found' })
  }

  const wordCount = (content || existing.content).split(/\s+/).filter(Boolean).length
  const updated: Script = {
    ...existing,
    title: title !== undefined ? title : existing.title,
    content: content !== undefined ? content : existing.content,
    category: category !== undefined ? category : existing.category,
    editedAt: 'Just now',
    readTime: `${Math.max(1, Math.ceil(wordCount / 130))} min read`
  }

  scripts[scriptIndex] = updated
  res.json(updated)
}

export const deleteScript = (req: Request, res: Response) => {
  const { id } = req.params
  const initialLength = scripts.length
  scripts = scripts.filter(s => s.id !== id)

  if (scripts.length === initialLength) {
    return res.status(404).json({ message: 'Script not found' })
  }

  res.json({ message: 'Script deleted successfully', id })
}

export const generateAiScript = (req: Request, res: Response) => {
  const { prompt, category } = req.body

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' })
  }

  const cleanPrompt = prompt.trim()
  const generatedTitle = `AI: ${cleanPrompt.split(' ').slice(0, 3).join(' ')}...`
  const generatedContent = `Ladies and gentlemen, thank you for being here today. Let's discuss: ${cleanPrompt.toLowerCase().replace(/^(write a speech about|create a|draft a|write a)\s*/i, '')}. 

When we step onto a stage or speak in a meeting, we are not just delivering words; we are sharing ideas. The path of development is filled with variables, complex configurations, and decisions. But standard practice shows that it is the clarity of communication that creates consensus.

To communicate with impact, we must practice with intent. We must understand our rhythm, adjust our pacing, and shape our message to match our audience. In a distraction-free space, we can listen to our own pacing, refine our tone, and construct a compelling narrative.`

  const wordCount = generatedContent.split(/\s+/).filter(Boolean).length
  const newScript: Script = {
    id: `script-${Date.now()}`,
    title: generatedTitle,
    content: generatedContent,
    editedAt: 'Just now',
    readTime: `${Math.max(1, Math.ceil(wordCount / 130))} min read`,
    category: category || 'AI Generated'
  }

  scripts.unshift(newScript)
  res.status(201).json(newScript)
}
