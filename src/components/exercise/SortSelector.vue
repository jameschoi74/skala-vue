<script setup>
// [요구사항 7] 정렬 UI를 별도 컴포넌트로 추가 분리
// [249p] el-select로 교체
defineProps({
  sortKey: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-sort'])

const OPTIONS = [
  { value: 'default', label: '기본 순서' },
  { value: 'temp', label: '기온 높은 순' },
  { value: 'humidity', label: '습도 높은 순' },
]
</script>

<template>
  <el-select
    :model-value="sortKey"
    class="sort-selector"
    @change="(value) => emit('update-sort', value)"
  >
    <el-option v-for="opt in OPTIONS" :key="opt.value" :label="opt.label" :value="opt.value" />
  </el-select>
</template>

<style scoped>
.sort-selector {
  width: 160px;
}
</style>
