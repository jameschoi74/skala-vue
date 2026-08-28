<script setup>
import { ref } from 'vue'

// 77p) 기본 바인딩
const dynamicUrl = 'https://www.naver.com'
const logoImgSrc = 'https://vuejs.org/images/logo.png'
const isButtonDisabled = ref(true)

// 79p) 클래스 바인딩
const isWarning = ref(false) // 객체 바인딩용 스위치
const themeClass = ref('bg-dark') // 배열 바인딩용 고정 클래스

// 81p) 스타일 바인딩
const textColor = ref('purple')
const boxWidth = ref(150)
const baseBoxStyle = ref({
  backgroundColor: '#42b883',
  height: '100px',
  transition: 'all 0.3s ease',
})

// 83p) same-name shorthand (Vue 3.4+)
const id = 'user-profile-card'
const src = 'https://vuejs.org/images/logo.png'
</script>

<template>
  <div class="practice-section">
    <h2>v-bind 디렉티브 기본 (축약형: 콜론)</h2>
    <h3>1) 동적 링크 연결</h3>
    <a :href="dynamicUrl">여기를 클릭하면 네이버로 이동합니다</a>
    <br />
    <h3>2) 동적 이미지 연결</h3>
    <img :src="logoImgSrc" alt="Vue 로고" style="width: 100px" />
    <br />
    <h3>3) 버튼 비활성화 제어</h3>
    <p>현재 버튼 사용 불가능 상태: {{ isButtonDisabled }}</p>
    <button :disabled="isButtonDisabled">동의해야 클릭할 수 있는 버튼</button>&nbsp;
    <button @click="isButtonDisabled = !isButtonDisabled">위 버튼 잠금 해제/토글하기</button>
  </div>

  <div class="practice-section">
    <h2>v-bind 디렉티브 고급 (클래스 바인딩)</h2>
    <h3>클래스 바인딩 (객체 형식)</h3>
    <p :class="{ 'text-danger': isWarning }">현재 경고 상태: {{ isWarning }}</p>
    <button @click="isWarning = !isWarning">경고 상태 토글</button>
    <br />
    <h3>클래스 바인딩 (배열 형식)</h3>
    <div :class="[themeClass, isWarning ? 'border-red' : 'border-gray']">
      다중 클래스가 조립된 박스 구역입니다.
    </div>
  </div>

  <div class="practice-section">
    <h2>v-bind 디렉티브 고급 (스타일 바인딩)</h2>
    <h3>1) 인라인 스타일 변수 조작 (객체 형식)</h3>
    <p :style="{ color: textColor, fontWeight: 'bold' }">이 글자의 색상은 실시간으로 바뀝니다.</p>
    <button @click="textColor = textColor === 'purple' ? 'blue' : 'purple'">글자 색상 토글</button>
    <br />
    <h3>2) 다중 스타일 객체 조립 (배열 형식)</h3>
    <label>박스 가로 크기(px): </label>
    <input type="number" v-model="boxWidth" step="50" />
    <br />
    <div :style="[baseBoxStyle, { width: boxWidth + 'px' }]">
      <p style="color: white; padding: 10px; text-align: center">
        가로 크기: {{ boxWidth }}px 박스
      </p>
    </div>
  </div>

  <div class="practice-section">
    <h2>v-bind 디렉티브 고급 (단축 문법)</h2>
    <div :id>
      <img :src alt="Vue 로고" style="width: 50px" />
    </div>
  </div>
</template>

<style scoped>
.text-danger {
  color: red;
  font-weight: bold;
}
.bg-dark {
  background-color: #333;
  color: white;
  padding: 15px;
}
.border-red {
  border: 3px solid red;
}
.border-gray {
  border: 3px solid #ccc;
}
</style>
