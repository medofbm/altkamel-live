// nuxt.config.ts — منصة البث المباشر — شبكة التكامل نت
// On-Premise · Nginx · SSG (SPA Fallback)
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  // ── وضع التوليد: SSG + SPA fallback ──
  // يولّد ملفات HTML ثابتة جاهزة لـ Nginx
  // وضع ssr: false يجعله SPA حقيقياً (لا SSR على الخادم)
  // وضع ssr: false يجعله SPA حقيقياً (لا SSR على الخادم)

  // ── تعريف صفحات التطبيق ──
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'ar', dir: 'rtl' },
      title: 'البث المباشر — كأس العالم 2026 | التكامل نت',
      meta: [
        { name: 'description', content: 'شاهد مباريات كأس العالم 2026 بثاً مباشراً وحصرياً عبر شبكة التكامل نت — جودة HD بدون انقطاع.' },
        { name: 'theme-color', content: '#07091a' },
        { name: 'robots', content: 'noindex, nofollow' }, // منصة داخلية
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ar_LY' },
      ],
      link: [
        // خط Cairo من Google Fonts
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap',
        },
        { rel: 'icon', type: 'image/png', href: '/images/logo/logo.png' },
      ],
    },
    // تأثير انتقال بين الصفحات
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  // ── الوحدات (Modules) ──
  modules: [
    '@nuxtjs/tailwindcss',
  ],

  // ── إعدادات Tailwind ──
  tailwindcss: {
    configPath: './tailwind.config.js',
    cssPath: '~/assets/css/main.css',
    exposeConfig: false,
  },

  // ── إعدادات وقت التشغيل ──
  runtimeConfig: {
    // Server-only secret — set via NUXT_BANNER_PASSWORD env variable
    bannerPassword: process.env.NUXT_BANNER_PASSWORD || 'altkamel2026',
    public: {
      streamBaseUrl: process.env.STREAM_BASE_URL || 'http://tv.altkamel.ly',
    },
  },

  // ── تعطيل devtools في الإنتاج ──
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
})
