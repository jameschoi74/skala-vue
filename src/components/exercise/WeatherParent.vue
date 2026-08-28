<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import SortSelector from './SortSelector.vue'
import WeatherCard from './WeatherCard.vue'
import WeatherStats from './WeatherStats.vue'

// ── [요구사항 1] 모든 반응형 데이터는 부모가 보유 ──────────────
const weatherList = ref([
  { id: 'city_01', name: '제주', temp: 29, status: '맑음', icon: '☀️', humidity: 68, wind: 3.2 },
  { id: 'city_02', name: '대전', temp: 27, status: '소나기', icon: '🌦️', humidity: 80, wind: 2.4 },
  {
    id: 'city_03',
    name: '강릉',
    temp: 26,
    status: '구름많음',
    icon: '⛅',
    humidity: 55,
    wind: 4.1,
  },
  { id: 'city_04', name: '춘천', temp: 23, status: '흐림', icon: '☁️', humidity: 62, wind: 1.8 },
  { id: 'city_05', name: '속초', temp: 21, status: '비', icon: '🌧️', humidity: 88, wind: 5.6 },
])
const searchQuery = ref('')
const selectedCityInfo = ref(null)
const sortKey = ref('default')

// ── computed ────────────────────────────────────────────────────
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

// ── watch / watchEffect ─────────────────────────────────────────
watch(selectedCityInfo, (newCity, oldCity) => {
  console.log(`🏙️ [선택 변경] ${oldCity?.name ?? '없음'} ➡️ ${newCity?.name ?? '없음'}`)
  console.log(`   상태바 문구: ${statusMessage.value}`)
})

watchEffect(() => {
  console.log(
    `🔍 [검색어 추적] "${searchQuery.value}" (결과 ${filteredWeatherList.value.length}건)`,
  )
})

watch([searchQuery, sortKey], ([newQuery, newSort], [oldQuery, oldSort]) => {
  console.log(`⚙️ [조건 변경] 검색 "${oldQuery}"→"${newQuery}" / 정렬 ${oldSort}→${newSort}`)
})

// ── 자식 컴포넌트가 올려보낸 이벤트 핸들러 ──────────────────────
const handleUpdateQuery = (value) => {
  searchQuery.value = value
}

const handleUpdateSort = (value) => {
  sortKey.value = value
}

const handleSelectCard = (city) => {
  selectedCityInfo.value = city
}

const handleClickDetail = (city) => {
  window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
}

// 받침 유무에 따라 주격 조사 이/가를 고른다.
function withSubjectParticle(word) {
  const lastCode = word.charCodeAt(word.length - 1)
  const isHangul = lastCode >= 0xac00 && lastCode <= 0xd7a3
  if (!isHangul) return `${word}가`
  return word + ((lastCode - 0xac00) % 28 !== 0 ? '이' : '가')
}
</script>

<template>
  <div class="weather-parent">
    <h2>날씨 컴포넌트 (Weather Component)</h2>

    <!-- [요구사항 6] slot 내부의 자식이지만 부모 스코프에서 평가되므로
         WeatherParent의 데이터/핸들러와 직접 바인딩된다. -->
    <BaseDashboardCard title="도시 검색">
      <div class="search-row">
        <SearchBar :query="searchQuery" @update-query="handleUpdateQuery" />
        <SortSelector :sort-key="sortKey" @update-sort="handleUpdateSort" />
      </div>
    </BaseDashboardCard>

    <p class="status-bar">{{ statusMessage }}</p>

    <BaseDashboardCard title="날씨 현황">
      <p v-if="searchQuery === ''" class="result-info">
        전체 도시 {{ weatherList.length }}곳입니다.
      </p>
      <p v-else-if="filteredWeatherList.length > 0" class="result-info">
        "{{ searchQuery }}" 검색 결과 {{ filteredWeatherList.length }}건입니다.
      </p>
      <p v-else class="result-info empty">"{{ searchQuery }}"와 일치하는 도시가 없습니다.</p>

      <WeatherStats :stats="weatherStats" />

      <ul v-if="sortedWeatherList.length > 0" class="card-list">
        <WeatherCard
          v-for="city in sortedWeatherList"
          :key="city.id"
          :city="city"
          :selected="selectedCityInfo?.id === city.id"
          @select-card="handleSelectCard"
          @click-detail="handleClickDetail"
        />
      </ul>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.weather-parent {
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

.result-info.empty {
  color: #e17055;
  font-weight: bold;
}

.card-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}
</style>
