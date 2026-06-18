<script setup>
// ── NewsBanner — شريط الأخبار المتحرك على المشغّل ──
// Fetches banner config from /api/banner and displays
// a scrolling or static text overlay on the video player.
import { ref, onMounted, onUnmounted, computed } from 'vue'

const banner = ref({
  enabled: false,
  text: '',
  style: 'scroll',
  speed: 60,
})

const isLoaded = ref(false)
let pollTimer = null

async function fetchBanner() {
  try {
    // Add ?t= timestamp to prevent the browser from caching the response
    const data = await $fetch(`/api/banner?t=${Date.now()}`)
    if (data && typeof data.text === 'string') {
      banner.value = data
    }
  } catch {
    // Silently fail — banner just won't show
  } finally {
    isLoaded.value = true
  }
}

// Animation duration — inversely proportional to speed
const animationDuration = computed(() => {
  // speed range: 10–200.  Lower speed = slower scroll = longer duration
  // Map: speed 10 → 40s, speed 60 → 18s, speed 200 → 6s
  const s = banner.value.speed || 60
  return Math.max(4, Math.round(45 - (s * 0.2))) + 's'
})

onMounted(() => {
  fetchBanner()
  // Poll every 5 seconds for near-instant live updates from the dashboard
  pollTimer = setInterval(fetchBanner, 5000)
})

onUnmounted(() => {
  clearInterval(pollTimer)
})
</script>

<template>
  <Transition name="banner-fade">
    <div
      v-if="isLoaded && banner.enabled && banner.text"
      class="news-banner-wrapper"
    >
      <div class="news-banner-inner">
        <!-- Scrolling marquee mode -->
        <div v-if="banner.style === 'scroll'" class="news-banner-scroll">
          <span
            class="news-banner-text"
            :style="{ animationDuration }"
          >{{ banner.text }}</span>
          <!-- Duplicate for seamless loop -->
          <span
            class="news-banner-text"
            :style="{ animationDuration }"
            aria-hidden="true"
          >{{ banner.text }}</span>
        </div>

        <!-- Static mode -->
        <div v-else class="news-banner-static">
          <span class="news-banner-text-static">{{ banner.text }}</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* ── Banner wrapper — positioned by parent (absolute within player) ── */
.news-banner-wrapper {
  position: absolute;
  bottom: clamp(0.5rem, 2vh, 1.5rem);
  left: 50%;
  transform: translateX(-50%);
  z-index: 19; /* below watermark (z-20) but above video */
  width: clamp(200px, 60%, 700px);
  pointer-events: none;
  user-select: none;
}

.news-banner-inner {
  background: rgba(0, 0, 0, 0.70);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: clamp(8px, 1vw, 14px);
  padding: clamp(4px, 0.5vh, 8px) clamp(10px, 1.5vw, 20px);
  overflow: hidden;
}

/* ── Scrolling mode ── */
.news-banner-scroll {
  display: flex;
  white-space: nowrap;
  overflow: hidden;
}

.news-banner-text {
  display: inline-block;
  padding-left: 100%; /* start offscreen */
  font-size: clamp(11px, 1.2vw, 18px);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.90);
  animation: scroll-rtl linear infinite;
  will-change: transform;
}

@keyframes scroll-rtl {
  0%   { transform: translateX(0); }
  100% { transform: translateX(100%); }
}

/* ── Static mode ── */
.news-banner-static {
  text-align: center;
}

.news-banner-text-static {
  font-size: clamp(11px, 1.2vw, 18px);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.90);
}

/* ── Fullscreen sizing overrides ── */
:fullscreen .news-banner-wrapper,
:-webkit-full-screen .news-banner-wrapper {
  width: clamp(300px, 50%, 900px);
  bottom: clamp(1rem, 3vh, 2.5rem);
}
:fullscreen .news-banner-text,
:fullscreen .news-banner-text-static,
:-webkit-full-screen .news-banner-text,
:-webkit-full-screen .news-banner-text-static {
  font-size: clamp(14px, 1.5vw, 24px);
}

/* Pseudo-fullscreen (iOS / Smart TV) */
.pseudo-fullscreen .news-banner-wrapper {
  width: clamp(300px, 50%, 900px);
  bottom: clamp(1rem, 3vh, 2.5rem);
}
.pseudo-fullscreen .news-banner-text,
.pseudo-fullscreen .news-banner-text-static {
  font-size: clamp(14px, 1.5vw, 24px);
}

/* ── Transition ── */
.banner-fade-enter-active,
.banner-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.banner-fade-enter-from,
.banner-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}
</style>
