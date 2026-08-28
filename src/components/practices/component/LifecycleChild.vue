<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

const count = ref(0)
let timerId = null // 실시간 타이머 메모리 주소를 담을 변수

// 생성 (Creation) 단계 = <script setup> 본문 그 자체
console.log('1. [setup] 컴포넌트가 메모리에 생성되었습니다. (DOM 접근 불가능)')

// 부착 (Mounting) 단계
onMounted(() => {
  console.log('2. [onMounted] 화면에 완벽히 부착되었습니다! (API 호출/DOM 조작 적기)')

  // 🔥 실무 활용 시뮬레이션: 3초마다 숫자가 자동으로 올라가는 타이머 가동
  timerId = setInterval(() => {
    count.value++
  }, 3000)
})

// 갱신 (Updating) 단계 - count 변수가 바뀌어서 화면이 리렌더링될 때마다 매번 실행된다.
onUpdated(() => {
  console.log(
    `3. [onUpdated] 데이터가 변경되어 화면을 새로 그렸습니다. (현재 count: ${count.value})`,
  )
})

// 소멸 (Unmounting) 단계 - v-if="false" 등으로 이 컴포넌트가 화면에서 파괴될 때 실행된다.
onUnmounted(() => {
  // ❌ 주의: 여기서 타이머를 안 꺼주면 컴포넌트가 사라져도 백그라운드에서 영원히 타이머가 돕니다!
  clearInterval(timerId)
  console.log('4. [onUnmounted] 컴포넌트가 소멸했습니다. 타이머 청소 완료!')
})
</script>

<template>
  <!-- 교재 154p에는 script만 있고 template이 없어 직접 작성한 부분 -->
  <div class="lifecycle-child">
    <h3>👶 자식 컴포넌트 (Lifecycle 대상)</h3>
    <p>
      자동 증가 카운트: <strong>{{ count }}</strong> <small>(3초마다 +1)</small>
    </p>
    <button @click="count++">수동으로 +1 (onUpdated 즉시 확인용)</button>
  </div>
</template>

<style scoped>
.lifecycle-child {
  margin-top: 12px;
  padding: 14px;
  border: 1px solid #42b983;
  border-radius: 8px;
}
</style>
