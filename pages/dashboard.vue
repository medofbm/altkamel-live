<script setup>
// ── لوحة تحكم شريط الأخبار — Dashboard ──
// صفحة إدارة مخصصة لمسؤولي شبكة التكامل نت
import { ref, computed, onMounted } from 'vue'

useSeoMeta({
  title:       'لوحة التحكم — شبكة التكامل نت',
  description: 'إدارة شريط الأخبار على منصة البث المباشر',
  robots:      'noindex, nofollow',
})

// ── State ──
const isAuthenticated = ref(false)
const password        = ref('')
const loginError      = ref('')
const isSaving        = ref(false)
const saveSuccess     = ref(false)
const saveError       = ref('')

const banner = ref({
  enabled: true,
  text:    '',
  style:   'scroll',
  speed:   60,
})

// Store the password after successful login for API calls
let authPassword = ''

// ── Login ──
async function login() {
  loginError.value = ''
  try {
    // Verify password by making a test POST
    const res = await $fetch('/api/banner', {
      method: 'POST',
      body: { password: password.value, ...banner.value },
    })
    authPassword = password.value
    isAuthenticated.value = true
    // Load current banner data after login
    await loadBanner()
  } catch (err) {
    loginError.value = 'كلمة المرور غير صحيحة'
  }
}

// ── Load current banner ──
async function loadBanner() {
  try {
    const data = await $fetch('/api/banner')
    if (data) banner.value = data
  } catch {
    // Use defaults
  }
}

// ── Save banner ──
async function saveBanner() {
  isSaving.value   = true
  saveSuccess.value = false
  saveError.value  = ''

  try {
    await $fetch('/api/banner', {
      method: 'POST',
      body: {
        password: authPassword,
        ...banner.value,
      },
    })
    saveSuccess.value = true
    setTimeout(() => { saveSuccess.value = false }, 3000)
  } catch (err) {
    saveError.value = 'فشل في الحفظ — تحقق من الاتصال'
    setTimeout(() => { saveError.value = '' }, 4000)
  } finally {
    isSaving.value = false
  }
}

// Speed label
const speedLabel = computed(() => {
  const s = banner.value.speed
  if (s <= 25)  return 'بطيء'
  if (s <= 75)  return 'متوسط'
  if (s <= 130) return 'سريع'
  return 'سريع جداً'
})

// Preview animation duration (same logic as NewsBanner)
const previewDuration = computed(() => {
  const s = banner.value.speed || 60
  return Math.max(4, Math.round(45 - (s * 0.2))) + 's'
})

// Try to load banner on mount (for preview even before login)
onMounted(loadBanner)
</script>

<template>
  <div
    class="min-h-screen font-cairo"
    dir="rtl"
    style="
      background: #07091a;
      background-image:
        radial-gradient(ellipse at 80% 0%,   rgba(67,56,202,0.14) 0%, transparent 55%),
        radial-gradient(ellipse at 10% 100%, rgba(6,182,212,0.08)  0%, transparent 50%);
    "
  >
    <!-- ════ Header ════ -->
    <header
      class="sticky top-0 z-50 border-b border-white/5"
      style="background: rgba(7,9,26,0.90); backdrop-filter: blur(22px);"
    >
      <nav class="container mx-auto px-5 md:px-8 py-3 flex items-center justify-between">
        <a href="/" class="flex items-center gap-3 group">
          <img
            src="/images/logo/logo.png"
            alt="التكامل نت"
            class="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <div class="hidden sm:flex flex-col leading-none">
            <span class="font-black text-sm text-white">التكامل نت</span>
            <span class="text-[10px] text-cyan-400/70 font-medium tracking-wide">لوحة التحكم</span>
          </div>
        </a>

        <a
          href="/"
          class="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors text-xs font-medium"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
          </svg>
          العودة للبث
        </a>
      </nav>
    </header>

    <main class="container mx-auto px-4 md:px-6 lg:px-8 pt-8 pb-12">

      <!-- ════════════════════════════════════════════════
           LOGIN SCREEN
           ════════════════════════════════════════════════ -->
      <Transition name="page" mode="out-in">
        <div v-if="!isAuthenticated" key="login" class="flex items-center justify-center min-h-[60vh]">
          <div
            class="w-full max-w-sm rounded-3xl p-8"
            style="
              background: rgba(255,255,255,0.03);
              border: 1px solid rgba(255,255,255,0.08);
              box-shadow: 0 25px 80px rgba(0,0,0,0.5);
            "
          >
            <!-- Lock icon -->
            <div class="flex justify-center mb-6">
              <div
                class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style="background: linear-gradient(135deg, rgba(67,56,202,0.2), rgba(6,182,212,0.15)); border: 1px solid rgba(99,102,241,0.25);"
              >🔐</div>
            </div>

            <h1 class="text-xl font-black text-white text-center mb-1">لوحة التحكم</h1>
            <p class="text-white/30 text-xs text-center mb-6">أدخل كلمة المرور للوصول</p>

            <form @submit.prevent="login">
              <div class="relative mb-4">
                <input
                  v-model="password"
                  type="password"
                  placeholder="كلمة المرور"
                  autofocus
                  class="w-full px-4 py-3 rounded-xl text-sm text-white font-medium placeholder-white/25 outline-none transition-all focus:ring-2 focus:ring-indigo-500/50"
                  style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10);"
                />
              </div>

              <!-- Error -->
              <Transition name="fade-overlay">
                <p v-if="loginError" class="text-red-400 text-xs font-bold text-center mb-3">
                  {{ loginError }}
                </p>
              </Transition>

              <button
                type="submit"
                class="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style="background: linear-gradient(135deg, #3820d0, #0094b0); box-shadow: 0 4px 20px rgba(67,56,202,0.4);"
              >
                تسجيل الدخول
              </button>
            </form>
          </div>
        </div>

        <!-- ════════════════════════════════════════════════
             DASHBOARD
             ════════════════════════════════════════════════ -->
        <div v-else key="dashboard" class="max-w-3xl mx-auto">

          <!-- Title -->
          <div class="mb-6">
            <h1 class="text-2xl font-black text-white">
              <span
                class="text-transparent bg-clip-text"
                style="background-image: linear-gradient(to left, #22d3ee, #818cf8);"
              >⚙️ إدارة شريط الأخبار</span>
            </h1>
            <p class="text-white/30 text-xs mt-1">التغييرات تظهر مباشرةً على البث خلال 30 ثانية</p>
          </div>

          <!-- ══════════ Controls Card ══════════ -->
          <div
            class="rounded-3xl overflow-hidden mb-6"
            style="
              background: rgba(255,255,255,0.025);
              border: 1px solid rgba(255,255,255,0.08);
              box-shadow: 0 20px 60px rgba(0,0,0,0.4);
            "
          >
            <div class="p-6 space-y-6">

              <!-- 1. Toggle -->
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-white font-bold text-sm">تفعيل الشريط</p>
                  <p class="text-white/30 text-[11px]">إظهار أو إخفاء شريط الأخبار على البث</p>
                </div>
                <button
                  @click="banner.enabled = !banner.enabled"
                  class="relative w-12 h-7 rounded-full transition-colors duration-300"
                  :style="banner.enabled
                    ? 'background: linear-gradient(135deg, #3820d0, #0094b0);'
                    : 'background: rgba(255,255,255,0.10);'"
                >
                  <span
                    class="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300"
                    :style="banner.enabled ? 'right: 4px;' : 'right: calc(100% - 24px);'"
                  />
                </button>
              </div>

              <div class="h-px bg-white/5" />

              <!-- 2. Text -->
              <div>
                <label class="text-white font-bold text-sm block mb-2">نص الشريط</label>
                <textarea
                  v-model="banner.text"
                  rows="3"
                  maxlength="500"
                  placeholder="اكتب نص الشريط هنا..."
                  class="w-full px-4 py-3 rounded-xl text-sm text-white font-medium placeholder-white/20 outline-none resize-none transition-all focus:ring-2 focus:ring-indigo-500/50"
                  style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);"
                />
                <p class="text-white/20 text-[10px] mt-1 text-left" dir="ltr">
                  {{ banner.text.length }} / 500
                </p>
              </div>

              <div class="h-px bg-white/5" />

              <!-- 3. Style -->
              <div>
                <label class="text-white font-bold text-sm block mb-3">نوع العرض</label>
                <div class="flex gap-3">
                  <button
                    @click="banner.style = 'scroll'"
                    class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
                    :class="banner.style === 'scroll' ? 'text-white' : 'text-white/40 hover:text-white/60'"
                    :style="banner.style === 'scroll'
                      ? 'background: linear-gradient(135deg, #3820d0, #0094b0); border: 1px solid rgba(99,102,241,0.4); box-shadow: 0 4px 20px rgba(67,56,202,0.35);'
                      : 'background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);'"
                  >
                    <span>🎬</span>
                    <span>متحرك</span>
                  </button>
                  <button
                    @click="banner.style = 'static'"
                    class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
                    :class="banner.style === 'static' ? 'text-white' : 'text-white/40 hover:text-white/60'"
                    :style="banner.style === 'static'
                      ? 'background: linear-gradient(135deg, #3820d0, #0094b0); border: 1px solid rgba(99,102,241,0.4); box-shadow: 0 4px 20px rgba(67,56,202,0.35);'
                      : 'background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);'"
                  >
                    <span>📌</span>
                    <span>ثابت</span>
                  </button>
                </div>
              </div>

              <!-- 4. Speed (only for scroll mode) -->
              <Transition name="fade-overlay">
                <div v-if="banner.style === 'scroll'">
                  <div class="h-px bg-white/5 mb-6" />
                  <div class="flex items-center justify-between mb-2">
                    <label class="text-white font-bold text-sm">سرعة التمرير</label>
                    <span
                      class="text-xs font-bold px-2.5 py-1 rounded-full"
                      style="background: rgba(99,102,241,0.15); color: #a5b4fc;"
                    >{{ speedLabel }}</span>
                  </div>
                  <input
                    v-model.number="banner.speed"
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    class="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div class="flex justify-between text-[10px] text-white/20 mt-1">
                    <span>بطيء</span>
                    <span>سريع</span>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Save bar -->
            <div
              class="px-6 py-4 flex items-center justify-between gap-3"
              style="background: rgba(255,255,255,0.02); border-top: 1px solid rgba(255,255,255,0.06);"
            >
              <!-- Status messages -->
              <div class="flex-1 min-w-0">
                <Transition name="fade-overlay" mode="out-in">
                  <p v-if="saveSuccess" key="ok" class="text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                    <span>✓</span> تم الحفظ بنجاح
                  </p>
                  <p v-else-if="saveError" key="err" class="text-red-400 text-xs font-bold">
                    {{ saveError }}
                  </p>
                  <p v-else key="hint" class="text-white/20 text-[11px]">
                    اضغط حفظ لتطبيق التغييرات
                  </p>
                </Transition>
              </div>

              <button
                @click="saveBanner"
                :disabled="isSaving"
                class="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.97] disabled:opacity-50"
                style="background: linear-gradient(135deg, #3820d0, #0094b0); box-shadow: 0 4px 20px rgba(67,56,202,0.4);"
              >
                <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 13l4 4L19 7"/>
                </svg>
                {{ isSaving ? 'جارٍ الحفظ...' : 'حفظ التغييرات' }}
              </button>
            </div>
          </div>

          <!-- ══════════ Live Preview ══════════ -->
          <div
            class="rounded-3xl overflow-hidden"
            style="
              background: rgba(255,255,255,0.025);
              border: 1px solid rgba(255,255,255,0.08);
            "
          >
            <div
              class="px-6 py-3 flex items-center gap-2 border-b border-white/5"
            >
              <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span class="text-white/40 text-[10px] font-bold tracking-widest uppercase">معاينة حية</span>
            </div>

            <!-- Preview area (simulates the player) -->
            <div
              class="relative mx-6 my-6 rounded-2xl overflow-hidden"
              style="
                aspect-ratio: 16/9;
                background: #000;
                border: 1px solid rgba(255,255,255,0.06);
              "
            >
              <!-- Fake video bg -->
              <div class="absolute inset-0 flex items-center justify-center">
                <p class="text-white/10 text-sm font-bold">منطقة البث المباشر</p>
              </div>

              <!-- Preview banner -->
              <Transition name="fade-overlay">
                <div
                  v-if="banner.enabled && banner.text"
                  class="absolute z-10"
                  style="bottom: 8%; left: 50%; transform: translateX(-50%); width: 60%; max-width: 500px;"
                >
                  <div
                    style="
                      background: rgba(0,0,0,0.70);
                      backdrop-filter: blur(10px);
                      border: 1px solid rgba(255,255,255,0.08);
                      border-radius: 10px;
                      padding: 6px 14px;
                      overflow: hidden;
                    "
                  >
                    <!-- Scroll -->
                    <div v-if="banner.style === 'scroll'" style="display:flex; white-space:nowrap; overflow:hidden;">
                      <span
                        class="preview-scroll-text"
                        :style="{ animationDuration: previewDuration }"
                      >{{ banner.text }}</span>
                      <span
                        class="preview-scroll-text"
                        :style="{ animationDuration: previewDuration }"
                        aria-hidden="true"
                      >{{ banner.text }}</span>
                    </div>
                    <!-- Static -->
                    <div v-else style="text-align:center;">
                      <span class="text-white/90 text-xs font-bold">{{ banner.text }}</span>
                    </div>
                  </div>
                </div>
              </Transition>

              <!-- Preview: banner disabled overlay -->
              <div
                v-if="!banner.enabled"
                class="absolute inset-0 flex items-center justify-center z-10"
              >
                <p class="text-white/20 text-xs font-bold">الشريط معطّل حالياً</p>
              </div>
            </div>
          </div>

        </div>
      </Transition>
    </main>
  </div>
</template>

<style scoped>
/* ── Transitions ── */
.fade-overlay-enter-active,
.fade-overlay-leave-active { transition: opacity 0.35s ease; }
.fade-overlay-enter-from,
.fade-overlay-leave-to     { opacity: 0; }

.page-enter-active,
.page-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.page-enter-from   { opacity: 0; transform: translateY(10px); }
.page-leave-to     { opacity: 0; transform: translateY(-10px); }

/* ── Preview scroll ── */
.preview-scroll-text {
  display: inline-block;
  padding-left: 100%;
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.90);
  animation: preview-scroll-rtl linear infinite;
  will-change: transform;
}

@keyframes preview-scroll-rtl {
  0%   { transform: translateX(0); }
  100% { transform: translateX(100%); }
}
</style>
