<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore.js'
import { useWeatherStore } from '@/stores/weatherStore.js'

// [요구사항 6] 본인 추가 View — 기준을 바꿔가며 도시 순위를 보는 페이지
const router = useRouter()
const configStore = useConfigStore()

// [230p 요구사항 1] 대시보드와 같은 스토어를 공유한다.
// 이미 받아둔 데이터가 있으면 fetchAll이 재요청하지 않으므로 중복 통신이 없다.
const weatherStore = useWeatherStore()
onMounted(() => weatherStore.fetchAll())

const metric = ref('temp')

const METRICS = {
  temp: { label: '기온', unit: '°C', pick: (city) => city.temp },
  humidity: { label: '습도', unit: '%', pick: (city) => city.humidity },
  wind: { label: '풍속', unit: 'm/s', pick: (city) => city.wind },
}

// 기온 항목만 전역 단위 설정을 반영하도록 덮어쓴다.
const currentMetric = computed(() => {
  const info = METRICS[metric.value]
  if (metric.value !== 'temp') return info
  return {
    ...info,
    unit: configStore.unitSymbol,
    pick: (city) => configStore.convertTemp(city.temp),
  }
})

const rankedList = computed(() => {
  const pick = currentMetric.value.pick
  return [...weatherStore.cities].sort((a, b) => pick(b) - pick(a))
})

const goDetail = (cityId) => {
  router.push({ name: 'WeatherDetail', params: { cityId } })
}
</script>

<template>
  <div class="ranking">
    <h2>도시 랭킹</h2>

    <!-- [249p] el-tabs로 교체 -->
    <el-tabs v-model="metric">
      <el-tab-pane v-for="(info, key) in METRICS" :key="key" :label="info.label" :name="key" />
    </el-tabs>

    <!-- [249p] el-table로 교체. 행 클릭 시 상세로 이동한다. -->
    <el-table
      v-loading="weatherStore.isLoading"
      :data="rankedList"
      stripe
      class="rank-list"
      @row-click="(row) => goDetail(row.id)"
    >
      <el-table-column label="순위" width="80">
        <template #default="{ $index }">
          <el-tag v-if="$index < 3" :type="['warning', 'info', 'danger'][$index]" effect="dark">
            {{ $index + 1 }}
          </el-tag>
          <span v-else>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="도시">
        <template #default="{ row }">
          <span class="city-cell">
            <el-image class="icon" :src="row.icon" :alt="row.status" fit="contain" />
            {{ row.name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="currentMetric.label" align="right">
        <template #default="{ row }"
          >{{ currentMetric.pick(row) }}{{ currentMetric.unit }}</template
        >
      </el-table-column>
    </el-table>
    <el-text class="hint" size="small" type="info">
      항목을 클릭하면 해당 도시 상세 페이지로 이동합니다.
    </el-text>
  </div>
</template>

<style scoped>
.ranking {
  max-width: 700px;
}

.tabs {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}

.tabs button {
  padding: 6px 14px;
  font-size: 14px;
  border: 1px solid #42b983;
  border-radius: 6px;
  background: transparent;
  color: #42b983;
  cursor: pointer;
}

.tabs button.active {
  background-color: #42b983;
  color: #fff;
}

.rank-list {
  list-style: none;
  padding: 0;
}

.rank-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
}

.rank-list li:hover {
  border-color: #42b983;
}

.rank {
  width: 24px;
  font-weight: bold;
  color: #42b983;
}

.city-cell {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.icon {
  width: 32px;
  height: 32px;
}

.rank-list {
  cursor: pointer;
}

.name {
  font-size: 16px;
}

.value {
  margin-left: auto;
  font-size: 16px;
  font-weight: bold;
}

.hint {
  margin-top: 8px;
  font-size: 13px;
  color: gray;
}
</style>
