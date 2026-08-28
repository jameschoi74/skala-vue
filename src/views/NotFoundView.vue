<script setup>
import { useRoute, RouterLink } from 'vue-router'

// Catch-all Route가 잡아낸 경로를 그대로 보여준다.
const route = useRoute()
</script>

<template>
  <div class="not-found">
    <h2>404 — 페이지를 찾을 수 없습니다</h2>
    <p class="path">
      요청한 경로: <code>{{ route.fullPath }}</code>
    </p>
    <RouterLink class="home-link" to="/">← 메인 대시보드로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  max-width: 700px;
}

.path {
  margin: 12px 0 20px;
  font-size: 15px;
}

.home-link {
  display: inline-block;
  padding: 8px 14px;
  border: 1px solid #42b983;
  border-radius: 6px;
}
</style>
