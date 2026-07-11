import type { Request, Response } from 'express'
import { prisma } from '../services/db.js'
import { GnerateScriptService } from '../services/AIServices.js'

export const getScripts = async (req: Request, res: Response) => {
  try {
    const scripts = await prisma.script.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(scripts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error while fetching scripts' })
  }
}

export const getScriptById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const script = await prisma.script.findUnique({
      where: { id }
    })
    if (!script) {
      return res.status(404).json({ message: 'Script not found' })
    }
    res.json(script)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createScript = async (req: Request, res: Response) => {
  const { topic } = req.body as { topic?: string }
  
  if (!topic) {
    return res.status(400).json({ message: 'Topic is required' })
  }

  try {
    const response = await GnerateScriptService(topic)
    if (!response) {
      return res.status(500).json({ message: 'Failed to generate script' })
    }
    const content = (typeof response === 'object' && response !== null && 'content' in response ? (response as any).content : response) as string
    
    const wordCount = content.split(/\s+/).filter(Boolean).length
    const cleanPrompt = topic.trim()
    const generatedTitle = `AI: ${cleanPrompt.split(' ').slice(0, 8).join(' ')}...`
    
    const newScript = await prisma.script.create({
      data: {
        title: generatedTitle,
        content: content,
        category: 'AI Generated',
        editedAt: 'Just now',
        readTime: `${Math.max(1, Math.ceil(wordCount / 130))} min read`
      }
    })

    return res.status(200).json({
      // content: content,
      script: newScript
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateScript = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, content, category } = req.body as { title?: string; content?: string; category?: string }

  try {
    const existing = await prisma.script.findUnique({
      where: { id }
    })

    if (!existing) {
      return res.status(404).json({ message: 'Script not found' })
    }

    const wordCount = (content || existing.content).split(/\s+/).filter(Boolean).length
    const updated = await prisma.script.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existing.title,
        content: content !== undefined ? content : existing.content,
        category: category !== undefined ? category : existing.category,
        editedAt: 'Just now',
        readTime: `${Math.max(1, Math.ceil(wordCount / 130))} min read`
      }
    })

    res.json(updated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteScript = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const existing = await prisma.script.findUnique({
      where: { id }
    })

    if (!existing) {
      return res.status(404).json({ message: 'Script not found' })
    }

    await prisma.script.delete({
      where: { id }
    })

    res.json({ message: 'Script deleted successfully', id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const generateAiScript = async (req: Request, res: Response) => {
  const { prompt, category } = req.body as { prompt?: string; category?: string }

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' })
  }

  try {
    const cleanPrompt = prompt.trim()
    const generatedTitle = `AI: ${cleanPrompt.split(' ').slice(0, 3).join(' ')}...`
    const generatedContent = `Ladies and gentlemen, thank you for being here today. Let's discuss: ${cleanPrompt.toLowerCase().replace(/^(write a speech about|create a|draft a|write a)\s*/i, '')}. 

When we step onto a stage or speak in a meeting, we are not just delivering words; we are sharing ideas. The path of development is filled with variables, complex configurations, and decisions. But standard practice shows that it is the clarity of communication that creates consensus.

To communicate with impact, we must practice with intent. We must understand our rhythm, adjust our pacing, and shape our message to match our audience. In a distraction-free space, we can listen to our own pacing, refine our tone, and construct a compelling narrative.`

    const wordCount = generatedContent.split(/\s+/).filter(Boolean).length
    const newScript = await prisma.script.create({
      data: {
        title: generatedTitle,
        content: generatedContent,
        category: category || 'AI Generated',
        editedAt: 'Just now',
        readTime: `${Math.max(1, Math.ceil(wordCount / 130))} min read`
      }
    })

    res.status(201).json(newScript)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
