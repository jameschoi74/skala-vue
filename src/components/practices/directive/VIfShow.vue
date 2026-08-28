<script setup>
import { ref } from 'vue'

// 84p) v-if / v-else-if / v-else
const isLogged = ref(false)
const score = ref(85)

// 85p) v-show
const isVisible = ref(true)
</script>

<template>
  <div class="practice-section">
    <h2>v-if, v-else-if, v-else 디렉티브 학습</h2>
    <h3>1) 기본 로그인 상태 스위치</h3>
    <p v-if="isLogged">환영합니다! 회원 전용 화면입니다.</p>
    <p v-else>로그인이 필요합니다. 먼저 로그인해 주세요.</p>
    <button @click="isLogged = !isLogged">
      {{ isLogged ? '로그아웃 하기' : '로그인 하기' }}
    </button>
    <br />
    <h3>2) 성적별 학점 등급 측정 (다중 조건문)</h3>
    <label>현재 점수 입력: </label>
    <input type="number" v-model="score" min="0" max="100" step="5" />
    <br />
    <div v-if="score >= 90" style="color: green; font-weight: bold">
      합격 등급: A 학점 (훌륭합니다!)
    </div>
    <div v-else-if="score >= 80" style="color: blue">합격 등급: B 학점 (양호합니다.)</div>
    <div v-else-if="score >= 70" style="color: orange">합격 등급: C 학점 (조금 더 분발하세요.)</div>
    <div v-else style="color: red; font-weight: bold">합격 등급: F 학점 (재시험 대상입니다.)</div>
  </div>

  <div class="practice-section">
    <h2>v-show 디렉티브 학습</h2>
    <button @click="isVisible = !isVisible">화면 토글하기</button>
    <br />
    <div v-show="isVisible" class="box">
      <p>v-show 상자</p>
      <p>조건이 false가 되면 CSS display: none이 붙습니다.</p>
    </div>
  </div>
</template>

<style scoped>
.box {
  padding: 10px;
  margin-top: 5px;
  color: white;
  border-radius: 5px;
  background-color: #3498db;
}
</style>
