import type { Request, Response } from 'express'
import { prisma } from '../services/db.js'

export const createSupportMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, category, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' })
    }

    const supportMessage = await prisma.supportMessage.create({
      data: {
        name,
        email,
        subject: subject || '',
        category: category || 'support',
        message,
      }
    })

    res.status(201).json({ message: 'Message sent successfully', supportMessage })
  } catch (error) {
    console.error('Error creating support message:', error)
    res.status(500).json({ message: 'Internal server error while creating support message' })
  }
}
