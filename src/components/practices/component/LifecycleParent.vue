<script setup>
import { ref } from 'vue'
import LifecycleChild from './LifecycleChild.vue'

// v-if로 자식을 붙였다 떼면서 Mount / Unmount 훅을 관찰한다.
const isVisible = ref(true)
</script>

<template>
  <div class="practice-section">
    <h2>Component Lifecycle Hook 학습</h2>
    <p>
      아래 버튼으로 자식 컴포넌트를 DOM에서 붙였다 뗄 수 있습니다.
      <br />
      브라우저 콘솔(F12)에서 1 → 2 → 3 → 4 순서로 찍히는 로그를 확인하세요.
    </p>
    <button @click="isVisible = !isVisible">
      {{ isVisible ? '자식 컴포넌트 파괴 (unmount)' : '자식 컴포넌트 생성 (mount)' }}
    </button>

    <LifecycleChild v-if="isVisible" />
    <p v-else class="destroyed">자식 컴포넌트가 파괴된 상태입니다. (타이머도 정지됨)</p>
  </div>
</template>

<style scoped>
.destroyed {
  margin-top: 12px;
  padding: 14px;
  border: 1px dashed var(--color-border);
  border-radius: 8px;
  color: gray;
}
</style>
