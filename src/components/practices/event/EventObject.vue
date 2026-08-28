<script setup>
import { ref } from 'vue'

const position = ref('')
const tagName = ref('')

// 1) 함수명만 넘기면 첫 번째 인자로 이벤트 객체가 묵시적으로 전달된다
const getOnlyEvent = (e) => {
  position.value = `좌표: X=${e.clientX}, Y=${e.clientY}`
}

// 2) 인자를 직접 넘길 때는 $event를 명시적으로 적어야 이벤트 객체가 함께 온다
const getWithParam = (name, e) => {
  tagName.value = `대상: ${name} / 클릭된 태그: ${e.target.tagName}`
}
</script>

<template>
  <div class="practice-section">
    <h2>v-on 이벤트 객체($event) 활용</h2>
    <p>좌표: {{ position }}</p>
    <p>태그: {{ tagName }}</p>
    <button @click="getOnlyEvent">클릭 좌표 알아내기</button>
    <button @click="getWithParam('회원A', $event)">회원 정보와 태그 확인</button>
  </div>
</template>
