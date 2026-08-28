<script setup>
// [249p] 내비게이션을 Element Plus의 el-menu로 교체.
// router 모드를 켜면 index가 곧 경로가 되어 RouterLink 없이도 라우팅된다.
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import UnitToggler from './components/exercise/UnitToggler.vue'

const route = useRoute()
// 상세 페이지(/weather/:cityId)에서도 대시보드 탭이 활성으로 보이게 한다.
const activeIndex = computed(() => (route.path.startsWith('/weather/') ? '/' : route.path))
</script>

<template>
  <el-container class="app-shell">
    <el-header class="nav-bar">
      <span class="brand">⛅ Skala Weather</span>

      <el-menu :default-active="activeIndex" mode="horizontal" router :ellipsis="false">
        <el-menu-item index="/">대시보드</el-menu-item>
        <el-menu-item index="/ranking">랭킹</el-menu-item>
        <el-menu-item index="/about">소개</el-menu-item>
        <el-menu-item index="/practices">교재 예제</el-menu-item>
      </el-menu>

      <UnitToggler />
    </el-header>

    <el-main class="content">
      <RouterView />
    </el-main>

    <!-- 스크롤이 길어지는 목록 화면용 -->
    <el-backtop :right="24" :bottom="24" />
  </el-container>
</template>

<style scoped>
.app-shell {
  padding: 0;
}

.nav-bar {
  display: flex;
  align-items: center;
  gap: 20px;
  height: auto;
  padding: 8px 20px;
  border-bottom: 1px solid var(--el-border-color);
}

.brand {
  font-size: 17px;
  font-weight: bold;
  white-space: nowrap;
}

/* el-menu의 기본 하단 테두리를 헤더 테두리와 중복되지 않게 제거 */
.nav-bar :deep(.el-menu) {
  border-bottom: none;
  background: transparent;
}

/* 토글러를 오른쪽 끝으로 */
.nav-bar > :last-child {
  margin-left: auto;
}

.content {
  padding: 20px;
}
</style>
