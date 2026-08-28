<script setup>
import { ref } from 'vue'

// 89p) v-pre
const message = ref('안녕하세요!')

// 90p) v-cloak
const cloakMessage = ref('느린 네트워크에서도 안전하게 출력되는 메시지!')

// 91p) v-once
const count = ref(1)

// 92p) v-memo
const name = ref('홍길동')
const age = ref(20)
</script>

<template>
  <div class="practice-section">
    <h2>v-pre 디렉티브 학습</h2>
    <p>일반 출력: {{ message }}</p>
    <p v-pre>v-pre 출력: {{ message }}</p>
  </div>

  <div v-cloak class="practice-section">
    <h2>v-cloak 디렉티브 학습</h2>
    <p>{{ cloakMessage }}</p>
  </div>

  <div class="practice-section">
    <h2>v-once 디렉티브 학습</h2>
    <p>일반 변수 (실시간): {{ count }}</p>
    <p v-once>v-once 변수 (최초 고정): {{ count }}</p>
    <button @click="count++">숫자 증가 버튼</button>
  </div>

  <div class="practice-section">
    <h2>v-memo 디렉티브 학습</h2>
    <div v-memo="[name]" style="padding: 20px; border: 1px solid #42b883; margin-bottom: 10px">
      <p>📦 v-memo 적용 영역 (기준: name)</p>
      <p>이름: {{ name }}</p>
      <p>나이: {{ age }} (name이 바뀌어야 얘도 갱신됨)</p>
    </div>
    <button @click="name = '이순신'">1. 이름 변경 (이순신)</button> &nbsp;
    <button @click="age++">2. 나이 한 살 추가 (age++)</button>
  </div>
</template>
