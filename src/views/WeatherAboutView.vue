<script setup>
import { RouterLink } from 'vue-router'

// [272p] 빌드 모드별로 어떤 .env 파일이 로드되는지 확인용
console.log('🔧 [환경변수] VITE_API_URL =', import.meta.env.VITE_API_URL)
console.log('🔧 [빌드 모드] MODE =', import.meta.env.MODE)
</script>

<template>
  <div class="about">
    <h2>서비스 소개</h2>
    <p>
      Skala Weather는 Vue 3 학습 과정에서 만든 날씨 대시보드입니다. 현재는 실제 기상청 API 대신 Mock
      Data를 사용하며, 추후 Axios 연동으로 교체할 예정입니다.
    </p>

    <h3>사용된 기술</h3>
    <ul>
      <li>Composition API — <code>ref</code>, <code>computed</code>, <code>watch</code></li>
      <li>Component — props / emits / slot 기반 분리</li>
      <li>Vue Router — 지연 로딩, 동적 경로 매칭, Catch-all Route</li>
    </ul>

    <!-- [요구사항 5] 메인 대시보드로 돌아가기 -->
    <RouterLink class="home-link" to="/">← 메인 대시보드로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.about {
  max-width: 700px;
}

.about p {
  margin-top: 10px;
  font-size: 15px;
  line-height: 1.7;
}

.about h3 {
  margin-top: 20px;
}

.about ul {
  margin: 10px 0 20px 20px;
  font-size: 15px;
}

.about li {
  margin-bottom: 4px;
}

.home-link {
  display: inline-block;
  padding: 8px 14px;
  border: 1px solid #42b983;
  border-radius: 6px;
}
</style>
