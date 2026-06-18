// server/api/banner.get.ts — GET /api/banner
// Returns the current banner configuration
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const DATA_PATH = resolve(process.cwd(), 'server/data/banner.json')

const DEFAULT_BANNER = {
  enabled: true,
  text: 'مرحباً بكم في البث المباشر — شبكة التكامل نت',
  style: 'scroll',
  speed: 60,
}

export default defineEventHandler(() => {
  try {
    if (!existsSync(DATA_PATH)) return DEFAULT_BANNER
    const raw = readFileSync(DATA_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return DEFAULT_BANNER
  }
})
