<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'

// [178p 요구사항 7] 통계 요약을 별도 컴포넌트로 추가 분리
// [249p] el-statistic 2개로 교체
const props = defineProps({
  stats: {
    type: Object,
    default: null,
  },
})

const configStore = useConfigStore()
// el-statistic의 value는 Number를 요구한다.
// stats.average는 toFixed(1)이 만든 문자열이므로 숫자로 되돌려 전달한다.
const displayAverage = computed(() => {
  if (!props.stats) return 0
  const celsius = Number(props.stats.average)
  return configStore.unit === 'fahrenheit' ? configStore.convertTemp(celsius) : celsius
})

// el-statistic의 기본 precision은 0이라 소수점이 잘린다.
// 섭씨는 소수 1자리를 유지하고, 화씨는 convertTemp가 정수로 반올림하므로 0자리로 둔다.
const averagePrecision = computed(() => (configStore.unit === 'fahrenheit' ? 0 : 1))
</script>

<template>
  <el-row v-if="stats" class="stats" :gutter="16">
    <el-col :span="12">
      <el-statistic
        title="평균 기온"
        :value="displayAverage"
        :precision="averagePrecision"
        :suffix="configStore.unitSymbol"
      />
    </el-col>
    <el-col :span="12">
      <el-statistic title="더운 도시" :value="stats.hot" :suffix="`/ ${stats.count}곳`" />
    </el-col>
  </el-row>
</template>

<style scoped>
.stats {
  margin-bottom: 16px;
}
</style>
