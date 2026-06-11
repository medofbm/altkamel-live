<script setup>
// ✅ AppNavbar - شريط التنقل (شفاف → أبيض عند Scroll)
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { label: 'الرئيسية',   href: '/',        isRoute: true },
  { label: 'نبذة عنا',   href: '/about',   isRoute: true },
  { label: 'خدماتنا',    href: '/#services', isRoute: false },
  { label: 'باقاتنا',    href: '/#packages', isRoute: false },
  { label: 'تواصل معنا', href: '/#contact',  isRoute: false },
]

onMounted(() => {
  const onScroll = () => { isScrolled.value = window.scrollY > 20 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

const closeMenu = () => { isMobileMenuOpen.value = false }
</script>

<template>
  <header
    class="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'"
  >
    <nav class="container mx-auto px-4 md:px-8 flex items-center justify-between">

      <!-- الشعار -->
      <NuxtLink href="/" class="flex items-center gap-3 group">
        <img
          src="/images/logo/logo.png"
          alt="شعار التكامل نت"
          class="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
        />
        <div class="flex flex-col leading-tight">
          <span
            class="font-extrabold text-lg transition-colors duration-300"
            :class="isScrolled ? 'text-indigo-700' : 'text-white'"
          >التكامل نت</span>
          <span
            class="text-xs font-medium transition-colors duration-300"
            :class="isScrolled ? 'text-cyan-600' : 'text-cyan-300'"
          >للاتصالات وتقنية المعلومات</span>
        </div>
      </NuxtLink>

      <!-- روابط Desktop -->
      <ul class="hidden md:flex items-center gap-1">
        <li v-for="link in navLinks" :key="link.href">
          <NuxtLink
            v-if="link.isRoute"
            :to="link.href"
            class="relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 group"
            :class="isScrolled
              ? 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50'
              : 'text-white/90 hover:text-white hover:bg-white/10'"
          >
            {{ link.label }}
            <span class="absolute bottom-1 right-4 left-4 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
          </NuxtLink>
          <a
            v-else
            :href="link.href"
            class="relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 group"
            :class="isScrolled
              ? 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50'
              : 'text-white/90 hover:text-white hover:bg-white/10'"
          >
            {{ link.label }}
            <span class="absolute bottom-1 right-4 left-4 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
          </a>
        </li>
      </ul>

      <!-- أزرار البوابات Desktop -->
      <div class="hidden md:flex items-center gap-2">
        <!-- زر البث المباشر - كأس العالم -->
        <NuxtLink
          to="/live"
          class="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl font-bold transition-all duration-200"
          :class="isScrolled
            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
            : 'text-indigo-200 border border-indigo-500/25 hover:border-indigo-400/40 hover:text-white'"
          :style="!isScrolled ? 'background: rgba(67,56,202,0.12);' : ''"
        >
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
          </span>
          بث مباشر
        </NuxtLink>
        <!-- زر بوابة الفنيين -->
        <NuxtLink
          to="/technician"
          class="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl font-bold transition-all duration-200 border"
          :class="isScrolled
            ? 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 hover:shadow-sm'
            : 'bg-teal-500/15 text-teal-200 border-teal-400/30 hover:bg-teal-500/25 hover:text-white'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
          </svg>
          بوابة الفنيين
        </NuxtLink>
        <!-- زر بوابة المشتركين -->
        <NuxtLink
          to="/portal/login"
          class="inline-flex items-center gap-2 btn-primary text-sm px-5 py-2.5"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          بوابة المشتركين
        </NuxtLink>
      </div>

      <!-- زر Hamburger Mobile -->
      <button
        class="md:hidden p-2 rounded-lg transition-colors duration-200"
        :class="isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'"
        aria-label="تبديل القائمة"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <svg
          class="w-6 h-6 transition-transform duration-300"
          :class="isMobileMenuOpen ? 'rotate-90' : ''"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- قائمة Mobile المنسدلة -->
    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white/97 backdrop-blur-md border-t border-gray-100 shadow-lg">
        <ul class="container mx-auto px-4 py-4 flex flex-col gap-1">
          <li v-for="link in navLinks" :key="link.href">
            <NuxtLink
              v-if="link.isRoute"
              :to="link.href"
              class="block px-4 py-3 rounded-xl font-semibold text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition-colors duration-200"
              @click="closeMenu"
            >{{ link.label }}</NuxtLink>
            <a
              v-else
              :href="link.href"
              class="block px-4 py-3 rounded-xl font-semibold text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition-colors duration-200"
              @click="closeMenu"
            >{{ link.label }}</a>
          </li>
          <li class="pt-2 space-y-2">
            <!-- زر البث المباشر موبايل -->
            <NuxtLink
              to="/live"
              class="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors"
              @click="closeMenu"
            >
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60" />
                <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              🏆 البث المباشر — كأس العالم
            </NuxtLink>
            <!-- زر بوابة الفنيين موبايل -->
            <NuxtLink
              to="/technician"
              class="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-sm text-teal-700 bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-colors"
              @click="closeMenu"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
              </svg>
              بوابة الفنيين / إعداد الأنتينا
            </NuxtLink>
            <!-- زر بوابة المشتركين موبايل -->
            <NuxtLink
              to="/portal/login"
              class="btn-primary w-full justify-center gap-2"
              @click="closeMenu"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              بوابة المشتركين
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.mobile-menu-enter-active, .mobile-menu-leave-active { transition: all 0.25s ease; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
