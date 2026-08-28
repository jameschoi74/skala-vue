<script setup>
import { ref } from 'vue'

// 247p) 반응형 Data
const productQuantity = ref(1) // 수량 카운터 기본값
const productRate = ref(4) // 별점 기본값 (별 4개)
</script>

<template>
  <el-card class="el-demo" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>상품 옵션</span>
        <el-tag type="info" size="small">247p</el-tag>
      </div>
    </template>

    <div class="row">
      <span class="label">구매 수량</span>
      <el-input-number v-model="productQuantity" :min="1" :max="10" />
    </div>

    <div class="row">
      <span class="label">만족도</span>
      <el-rate v-model="productRate" show-score />
    </div>

    <template #footer>
      <span class="state">수량 {{ productQuantity }}개 · 별점 {{ productRate }}점</span>
    </template>
  </el-card>
</template>

<style scoped>
.el-demo {
  max-width: 460px;
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}

.label {
  font-size: 14px;
  min-width: 70px;
}

.state {
  font-size: 13px;
  color: gray;
}
</style>
