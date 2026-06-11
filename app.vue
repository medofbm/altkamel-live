<!-- app.vue — نقطة دخول التطبيق — شبكة التكامل نت -->
<template>
  <!-- NuxtPage: يعرض الصفحة الحالية مع تأثير انتقال سلس -->
  <NuxtPage />
</template>

<style>
/* ── انتقالات الصفحات ── */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
