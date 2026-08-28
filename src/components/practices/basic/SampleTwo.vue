<script setup>
// 교재 71p 원문에는 `import { ref } from 'vue'`가 있으나
// welcomeMessage가 일반 const라 실제로 사용되지 않아 제거했다. (274p 요구사항 1: ESLint Error 0)
const welcomeMessage = 'Welcome to Skala-Vue'
</script>
<template>
  <div class="practice-section">
    <h2>{{ welcomeMessage }}</h2>
    <p>{{ welcomeMessage.toUpperCase() }}</p>
    <p>{{ 'Random number: ' + Math.ceil(Math.random() * 100) }}</p>
  </div>
</template>
