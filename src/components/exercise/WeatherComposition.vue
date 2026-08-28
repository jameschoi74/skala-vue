<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

// ── [요구사항 1] 반응형 상태 정의 ────────────────────────────────
// weatherList는 1일차(WeatherMockup)와 동일한 데이터를 사용한다.
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

// [요구사항 5] 추가 반응형 상태: 정렬 기준
const sortKey = ref('default')

// ── [요구사항 2] computed 로 검색 결과 필터링 ────────────────────
const filteredWeatherList = computed(() =>
  weatherList.value.filter((city) => city.name.includes(searchQuery.value)),
)

// [요구사항 5] 추가 computed 1: 정렬 (원본 훼손을 막으려 복사 후 정렬)
const sortedWeatherList = computed(() => {
  const list = [...filteredWeatherList.value]
  if (sortKey.value === 'temp') return list.sort((a, b) => b.temp - a.temp)
  if (sortKey.value === 'humidity') return list.sort((a, b) => b.humidity - a.humidity)
  return list
})

// [요구사항 5] 추가 computed 2: 검색 결과 요약 통계
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

// 상태바 문구도 computed 로 파생시킨다.
const statusMessage = computed(() =>
  selectedCityInfo.value
    ? `${withSubjectParticle(selectedCityInfo.value.name)} 선택되었습니다.`
    : '도시를 선택해 주세요.',
)

// ── [요구사항 3-1] selectedCityInfo 감시 (watch) ─────────────────
watch(selectedCityInfo, (newCity, oldCity) => {
  console.log(`🏙️ [선택 변경] ${oldCity?.name ?? '없음'} ➡️ ${newCity?.name ?? '없음'}`)
  console.log(`   상태바 문구: ${statusMessage.value}`)
})

// ── [요구사항 3-2] searchQuery 감시 (watchEffect) ────────────────
// 감시 대상을 적지 않아도 콜백 내부에서 읽은 searchQuery를 자동 추적한다.
watchEffect(() => {
  console.log(
    `🔍 [검색어 추적] "${searchQuery.value}" (결과 ${filteredWeatherList.value.length}건)`,
  )
})

// [요구사항 5] 추가 watcher: 검색어와 정렬 기준을 동시 감시 (Multi-Source)
watch([searchQuery, sortKey], ([newQuery, newSort], [oldQuery, oldSort]) => {
  console.log(`⚙️ [조건 변경] 검색 "${oldQuery}"→"${newQuery}" / 정렬 ${oldSort}→${newSort}`)
})

// ── 이벤트 핸들러 ────────────────────────────────────────────────
// 한글 IME 조합 중에도 반영되도록 v-model 대신 :value + @input 사용
const onSearchInput = (e) => {
  searchQuery.value = e.target.value
}

const selectCity = (city) => {
  selectedCityInfo.value = city
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

// 받침 유무에 따라 주격 조사 이/가를 고른다. (WeatherMockup과 동일 로직)
function withSubjectParticle(word) {
  const lastCode = word.charCodeAt(word.length - 1)
  const isHangul = lastCode >= 0xac00 && lastCode <= 0xd7a3
  if (!isHangul) return `${word}가`
  return word + ((lastCode - 0xac00) % 28 !== 0 ? '이' : '가')
}
</script>

<template>
  <div class="weather-composition">
    <h2>날씨 컴포지션 (Weather Composition)</h2>

    <div class="controls">
      <input
        type="text"
        :value="searchQuery"
        @input="onSearchInput"
        placeholder="도시 이름을 한글로 검색하세요"
      />
      <select v-model="sortKey">
        <option value="default">기본 순서</option>
        <option value="temp">기온 높은 순</option>
        <option value="humidity">습도 높은 순</option>
      </select>
    </div>

    <!-- [1일차 요구사항 유지] 입력한 도시명 그대로 출력 -->
    <p class="echo">
      입력한 도시명: <strong>{{ searchQuery }}</strong>
    </p>

    <p class="status-bar">{{ statusMessage }}</p>

    <!-- [요구사항 4] 검색 상태에 따른 3분기 안내 -->
    <p v-if="searchQuery === ''" class="result-info">전체 도시 {{ weatherList.length }}곳입니다.</p>
    <p v-else-if="filteredWeatherList.length > 0" class="result-info">
      "{{ searchQuery }}" 검색 결과 {{ filteredWeatherList.length }}건입니다.
    </p>
    <p v-else class="result-info empty">"{{ searchQuery }}"와 일치하는 도시가 없습니다.</p>

    <!-- [요구사항 5] 추가 computed 결과 -->
    <p v-if="weatherStats" class="stats">
      평균 기온 {{ weatherStats.average }}°C · 더운 도시 {{ weatherStats.hot }}/{{
        weatherStats.count
      }}곳
    </p>

    <ul v-if="sortedWeatherList.length > 0" class="card-list">
      <li
        v-for="city in sortedWeatherList"
        :key="city.id"
        class="card"
        :class="{ selected: selectedCityInfo?.id === city.id }"
        @click="selectCity(city)"
      >
        <div class="card-head">
          <span class="icon">{{ city.icon }}</span>
          <span class="name">{{ city.name }}</span>
          <span class="temp">{{ city.temp }}°C</span>
        </div>
        <p class="status">{{ city.status }}</p>
        <p class="detail">습도 {{ city.humidity }}% · 풍속 {{ city.wind }}m/s</p>
        <p v-if="city.temp >= 25" class="label hot">🔥 더움 (25도 이상)</p>
        <p v-else class="label cool">❄️ 선선함 (25도 미만)</p>
        <button class="detail-btn" @click.stop="showDetail(city.name, city.status)">
          상세보기
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.weather-composition {
  max-width: 900px;
}

.controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.controls input,
.controls select {
  padding: 8px 12px;
  font-size: 15px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

.controls input {
  width: 260px;
}

.echo {
  margin-top: 8px;
  font-size: 14px;
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

.stats {
  font-size: 13px;
  color: #42b983;
  margin-bottom: 12px;
}

.card-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 14px;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.card:hover {
  border-color: #42b983;
}

.card.selected {
  border-color: #42b983;
  background-color: var(--color-background-mute);
}

.card-head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 24px;
}

.name {
  font-size: 17px;
  font-weight: bold;
}

.temp {
  margin-left: auto;
  font-size: 17px;
}

.status,
.detail {
  margin-top: 6px;
  font-size: 14px;
}

.label {
  margin: 10px 0;
  font-size: 14px;
  font-weight: bold;
}

.hot {
  color: #e17055;
}

.cool {
  color: #0984e3;
}

.detail-btn {
  padding: 6px 12px;
  font-size: 13px;
  border: 1px solid #42b983;
  border-radius: 5px;
  background: transparent;
  color: #42b983;
  cursor: pointer;
}

.detail-btn:hover {
  background-color: #42b983;
  color: #fff;
}
</style>
