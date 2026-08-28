<script setup>
// [178p 요구사항 2] 검색박스/리스트박스의 공통 디자인 껍데기.
// [249p] 직접 만든 테두리 대신 el-card로 교체. header 슬롯도 el-card의 것을 쓴다.
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <el-card class="dashboard-card" shadow="never">
    <template #header>
      <span class="card-title">{{ title }}</span>
    </template>
    <slot>
      <el-empty description="표시할 내용이 없습니다." :image-size="80" />
    </slot>
  </el-card>
</template>

<style scoped>
.dashboard-card {
  margin-bottom: 16px;
}

.card-title {
  font-size: 15px;
  font-weight: bold;
}
</style>
