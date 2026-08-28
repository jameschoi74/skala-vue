<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import SortSelector from '@/components/exercise/SortSelector.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'
import WeatherStats from '@/components/exercise/WeatherStats.vue'
import { useWeatherStore } from '@/stores/weatherStore.js'

const router = useRouter()

// [230p 요구사항 1] 목 데이터 대신 OpenWeatherMap 실측값을 스토어에서 받아 쓴다.
const weatherStore = useWeatherStore()
const weatherList = computed(() => weatherStore.cities)

const searchQuery = ref('')
const selectedCityInfo = ref(null)
const sortKey = ref('default')

const filteredWeatherList = computed(() =>
  weatherList.value.filter((city) => city.name.includes(searchQuery.value)),
)

const sortedWeatherList = computed(() => {
  const list = [...filteredWeatherList.value]
  if (sortKey.value === 'temp') return list.sort((a, b) => b.temp - a.temp)
  if (sortKey.value === 'humidity') return list.sort((a, b) => b.humidity - a.humidity)
  return list
})

const weatherStats = computed(() => {
  const list = filteredWeatherList.value
  if (list.length === 0) return null
  const total = list.reduce((sum, city) => sum + city.temp, 0)
  return {
    count: list.length,
    average: (total / list.length).toFixed(1),
    hot: list.filter((city) => city.temp >= 25).length,
  }
})

const statusMessage = computed(() =>
  selectedCityInfo.value
    ? `${withSubjectParticle(selectedCityInfo.value.name)} 선택되었습니다.`
    : '도시를 선택해 주세요.',
)

watch(selectedCityInfo, (newCity, oldCity) => {
  console.log(`🏙️ [선택 변경] ${oldCity?.name ?? '없음'} ➡️ ${newCity?.name ?? '없음'}`)
})

watchEffect(() => {
  console.log(
    `🔍 [검색어 추적] "${searchQuery.value}" (결과 ${filteredWeatherList.value.length}건)`,
  )
})

// 화면 진입 시 실제 날씨를 받아온다. (152p — API 호출은 onMounted가 적기)
onMounted(() => weatherStore.fetchAll())

const handleRefresh = () => weatherStore.fetchAll(true)

const handleUpdateQuery = (value) => {
  searchQuery.value = value
}

const handleUpdateSort = (value) => {
  sortKey.value = value
}

const handleSelectCard = (city) => {
  selectedCityInfo.value = city
}

// [요구사항 3] window.alert 제거 → Programmatic Navigation으로 상세 페이지 이동
const handleClickDetail = (city) => {
  router.push(`/weather/${city.id}`)
}

function withSubjectParticle(word) {
  const lastCode = word.charCodeAt(word.length - 1)
  const isHangul = lastCode >= 0xac00 && lastCode <= 0xd7a3
  if (!isHangul) return `${word}가`
  return word + ((lastCode - 0xac00) % 28 !== 0 ? '이' : '가')
}
</script>

<template>
  <div class="weather-home">
    <h2>날씨 대시보드</h2>

    <BaseDashboardCard title="도시 검색">
      <div class="search-row">
        <SearchBar :query="searchQuery" @update-query="handleUpdateQuery" />
        <SortSelector :sort-key="sortKey" @update-sort="handleUpdateSort" />
      </div>
    </BaseDashboardCard>

    <el-alert :title="statusMessage" type="info" :closable="false" show-icon class="status-bar" />

    <BaseDashboardCard title="날씨 현황">
      <!-- [230p] 통신 상태 표시 — [249p] Element Plus로 교체 -->
      <div class="api-bar">
        <el-button
          type="primary"
          size="small"
          :loading="weatherStore.isLoading"
          @click="handleRefresh"
        >
          새로고침
        </el-button>
        <el-text v-if="weatherStore.lastUpdated" size="small" type="info">
          {{ weatherStore.lastUpdated }} 기준 실측값 (OpenWeatherMap)
        </el-text>
      </div>
      <el-alert
        v-if="weatherStore.errorMessage"
        :title="weatherStore.errorMessage"
        type="error"
        show-icon
        :closable="false"
        class="api-error"
      />

      <p v-if="searchQuery === ''" class="result-info">
        전체 도시 {{ weatherList.length }}곳입니다.
      </p>
      <p v-else-if="filteredWeatherList.length > 0" class="result-info">
        "{{ searchQuery }}" 검색 결과 {{ filteredWeatherList.length }}건입니다.
      </p>
      <p v-else class="result-info empty">"{{ searchQuery }}"와 일치하는 도시가 없습니다.</p>

      <WeatherStats :stats="weatherStats" />

      <div v-loading="weatherStore.isLoading" class="list-wrap">
        <div v-if="sortedWeatherList.length > 0" class="card-list">
          <WeatherCard
            v-for="city in sortedWeatherList"
            :key="city.id"
            :city="city"
            :selected="selectedCityInfo?.id === city.id"
            @select-card="handleSelectCard"
            @click-detail="handleClickDetail"
          />
        </div>
        <el-empty
          v-else-if="!weatherStore.isLoading"
          :description="
            searchQuery
              ? `\u0022${searchQuery}\u0022와 일치하는 도시가 없습니다.`
              : '표시할 날씨가 없습니다.'
          "
          :image-size="90"
        />
      </div>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.weather-home {
  max-width: 900px;
}

.search-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: flex-start;
}

.status-bar {
  margin: 12px 0;
  padding: 10px 14px;
  background-color: var(--color-background-mute);
  border-left: 4px solid #42b983;
  border-radius: 4px;
  font-size: 14px;
}

.result-info {
  font-size: 14px;
  margin-bottom: 4px;
}

.api-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.updated {
  font-size: 13px;
  color: gray;
}

.api-error {
  font-size: 14px;
  color: #e17055;
  margin-bottom: 8px;
}

.result-info.empty {
  color: #e17055;
  font-weight: bold;
}

.list-wrap {
  min-height: 120px;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}
</style>
