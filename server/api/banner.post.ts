// server/api/banner.post.ts — POST /api/banner
// Updates the banner configuration (password-protected)
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'

const DATA_PATH = resolve(process.cwd(), 'server/data/banner.json')

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // ── Password check ──
  const password = config.bannerPassword || 'altkamel2026'
  if (!body?.password || body.password !== password) {
    throw createError({ statusCode: 401, statusMessage: 'كلمة المرور غير صحيحة' })
  }

  // ── Validate & sanitize input ──
  const banner = {
    enabled: typeof body.enabled === 'boolean' ? body.enabled : true,
    text:    typeof body.text === 'string' ? body.text.slice(0, 500) : '',
    style:   body.style === 'static' ? 'static' : 'scroll',
    speed:   Math.max(10, Math.min(200, Number(body.speed) || 60)),
  }

  // ── Write to disk ──
  try {
    const dir = dirname(DATA_PATH)
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(DATA_PATH, JSON.stringify(banner, null, 2), 'utf-8')
    return { success: true, banner }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: 'فشل في حفظ البيانات: ' + err.message })
  }
})
