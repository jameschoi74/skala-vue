<script setup>
import { ref } from 'vue'

// 74p) v-html
const rawHtmlData =
  '이 글자는 <span style="color: red; font-weight: bold;">빨간색 굵은 글자</span>이다.'

// 75p) v-html XSS
const inputValue = ref('')
const message = ref('')
function showMessage() {
  message.value = inputValue.value
}

// 76p) v-text
const content = '안녕하세요! <strong>Skala-Vue</strong> 강의입니다.'
</script>

<template>
  <div class="practice-section">
    <h2>v-html 디렉티브 학습</h2>
    <h3 v-pre>일반 보간법 {{}} 사용 결과:</h3>
    <p>{{ rawHtmlData }}</p>
    <br />
    <h3>v-html 디렉티브 사용 결과:</h3>
    <p v-html="rawHtmlData"></p>
  </div>

  <div class="practice-section">
    <h2>v-html XSS 학습</h2>
    <input v-model="inputValue" placeholder="내용을 입력하세요" />
    <button @click="showMessage">확인</button>
    <div v-html="message"></div>
  </div>

  <div class="practice-section">
    <h2>v-text 디렉티브 학습</h2>
    <h3 v-pre>1) 일반 보간법 {{}} 결과:</h3>
    <p>출력: {{ content }}</p>
    <br />
    <h3>2) v-text 디렉티브 결과:</h3>
    <p v-text="'출력: ' + content"></p>
    <br />
    <h3>3) v-html 결과 비교:</h3>
    <p v-html="content"></p>
  </div>
</template>
