import { Router } from 'express'
import {
  getScripts,
  getScriptById,
  createScript,
  updateScript,
  deleteScript,
  generateAiScript
} from '../controllers/scriptController.js'

const router = Router()

router.get('/', getScripts)
router.get('/:id', getScriptById)
router.post('/', createScript)
router.put('/:id', updateScript)
router.delete('/:id', deleteScript)
router.post('/generate', generateAiScript)

export default router
