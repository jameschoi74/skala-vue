<script setup>
// [요구사항 1] 단위 설정을 변경하는 UI 버튼과 영역.
// [249p] el-switch / el-badge / el-tooltip으로 교체.
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'
import { useFavoriteStore } from '@/stores/favoriteStore.js'

const configStore = useConfigStore()
const favoriteStore = useFavoriteStore()

// el-switch는 Boolean을 다루므로 스토어의 문자열 상태와 이어 붙인다.
const isFahrenheit = computed({
  get: () => configStore.unit === 'fahrenheit',
  set: () => configStore.toggleUnit(),
})
</script>

<template>
  <div class="unit-toggler">
    <el-tooltip content="섭씨 / 화씨 전환" placement="bottom">
      <el-switch v-model="isFahrenheit" active-text="℉" inactive-text="℃" />
    </el-tooltip>

    <el-tooltip content="즐겨찾기한 도시 수" placement="bottom">
      <el-badge :value="favoriteStore.favoriteCount" :hidden="favoriteStore.favoriteCount === 0">
        <el-button circle text>★</el-button>
      </el-badge>
    </el-tooltip>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 14px;
}
</style>
