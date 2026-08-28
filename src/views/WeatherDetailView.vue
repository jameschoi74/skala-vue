<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findTargetById } from '@/data/weatherData'
import { fetchCurrentWeather, fetchAirPollution, fetchDailyForecast } from '@/api/weatherApi'
import { useConfigStore } from '@/stores/configStore.js'

// [요구사항 4] 동적 경로 매칭으로 넘어온 :cityId 수신
const route = useRoute()
const router = useRouter()

const city = ref(null)

// [212p 요구사항 3] 상세 화면에도 전역 단위 설정을 적용
const configStore = useConfigStore()
const displayTemp = computed(() => (city.value ? configStore.convertTemp(city.value.temp) : null))
const displayFeelsLike = computed(() =>
  city.value ? configStore.convertTemp(city.value.detail.feelsLike) : null,
)

// [230p] 요구사항 2·3 — 대기오염(OpenWeather)과 일별 예보(Open-Meteo)를 함께 조회
const airQuality = ref(null)
const forecast = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  const cityId = route.params.cityId
  const target = findTargetById(cityId)
  console.log(`📍 [상세 진입] path=${route.path} / cityId=${cityId}`)

  if (!target) return // 없는 도시 코드는 아래 v-else 분기가 처리한다.

  isLoading.value = true
  try {
    // 서로 의존하지 않는 3개 요청이므로 순차 대기 대신 동시에 보낸다.
    const [current, air, daily] = await Promise.all([
      fetchCurrentWeather(target),
      fetchAirPollution(target),
      fetchDailyForecast(target),
    ])
    city.value = current
    airQuality.value = air
    forecast.value = daily
    console.log('🌐 [상세 수신]', { current, air, daily })
  } catch (error) {
    errorMessage.value = `데이터를 불러오지 못했습니다: ${error.message}`
    console.error('상세 조회 실패:', error)
  } finally {
    isLoading.value = false
  }
})

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="weather-detail">
    <template v-if="city">
      <!-- [249p] el-page-header / el-descriptions / el-tag / el-table로 교체 -->
      <el-page-header @back="goBack">
        <template #content>
          <span class="page-title">
            <el-image class="title-icon" :src="city.icon" :alt="city.status" fit="contain" />
            {{ city.name }} 상세 기상관측
          </span>
        </template>
      </el-page-header>
      <p class="sub">도시 코드: {{ route.params.cityId }} · {{ city.detail.observedAt }} 기준</p>

      <div class="hero">
        <span class="temp">{{ displayTemp }}{{ configStore.unitSymbol }}</span>
        <el-tag size="large" effect="plain">{{ city.status }}</el-tag>
      </div>

      <el-descriptions :column="2" border label-width="100" class="obs">
        <el-descriptions-item label="체감온도">
          {{ displayFeelsLike }}{{ configStore.unitSymbol }}
        </el-descriptions-item>
        <el-descriptions-item label="습도">{{ city.humidity }}%</el-descriptions-item>
        <el-descriptions-item label="풍속">{{ city.wind }}m/s</el-descriptions-item>
        <el-descriptions-item label="기압">{{ city.detail.pressure }}hPa</el-descriptions-item>
        <el-descriptions-item label="최저 / 최고">
          {{ city.detail.tempMin }} / {{ city.detail.tempMax }}℃
        </el-descriptions-item>
      </el-descriptions>

      <!-- [요구사항 2] OpenWeatherMap Air Pollution API -->
      <section v-if="airQuality" class="extra">
        <h3>대기질 (OpenWeatherMap Air Pollution API)</h3>
        <div class="aqi-row">
          <el-tag :type="airQuality.aqi <= 2 ? 'success' : 'danger'" effect="dark">
            통합지수 {{ airQuality.aqi }}단계 · {{ airQuality.label }}
          </el-tag>
          <el-text size="small" type="info">
            PM10 {{ airQuality.pm10 }} · PM2.5 {{ airQuality.pm25 }} ㎍/㎥
          </el-text>
        </div>
      </section>

      <!-- [요구사항 3] Open-Meteo — 키가 필요 없는 다른 제공사 API -->
      <section v-if="forecast.length > 0" class="extra">
        <h3>일별 예보 (Open-Meteo API)</h3>
        <el-table :data="forecast" size="small" stripe>
          <el-table-column prop="date" label="날짜" />
          <el-table-column label="최저">
            <template #default="{ row }">{{ row.min }}℃</template>
          </el-table-column>
          <el-table-column label="최고">
            <template #default="{ row }">{{ row.max }}℃</template>
          </el-table-column>
        </el-table>
      </section>
    </template>

    <template v-else-if="isLoading">
      <el-skeleton :rows="5" animated />
    </template>

    <template v-else>
      <el-result
        icon="error"
        :title="errorMessage ? '데이터를 불러오지 못했습니다' : '존재하지 않는 도시입니다'"
        :sub-title="errorMessage || `요청한 도시 코드: ${route.params.cityId}`"
      />
    </template>

    <div class="actions">
      <el-button type="primary" @click="goHome">메인 대시보드로</el-button>
      <el-button @click="goBack">이전 화면으로</el-button>
    </div>
  </div>
</template>

<style scoped>
.weather-detail {
  max-width: 700px;
}

.sub {
  margin-top: 6px;
  font-size: 14px;
  color: gray;
}

.hero {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin: 16px 0;
}

.page-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  width: 36px;
  height: 36px;
}

.extra {
  margin-top: 24px;
  max-width: 560px;
}

/* 라벨이 글자 단위로 쪼개지는 것을 막는다 */
.obs :deep(.el-descriptions__label) {
  white-space: nowrap;
}

.obs {
  max-width: 560px;
}

.extra h3 {
  font-size: 14px;
  color: #42b983;
  margin-bottom: 8px;
}

.aqi {
  font-size: 14px;
}

.aqi-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.forecast {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.forecast li {
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 13px;
  text-align: center;
}

.forecast .date {
  display: block;
  color: gray;
}

.temp {
  font-size: 44px;
  font-weight: bold;
}

.status {
  font-size: 18px;
}

.obs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.obs > div {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 10px 12px;
}

.obs dt {
  font-size: 13px;
  color: gray;
}

.obs dd {
  font-size: 17px;
  margin-top: 4px;
}

.actions {
  display: flex;
  gap: 8px;
}

button {
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #42b983;
  background-color: #42b983;
  color: #fff;
  cursor: pointer;
}

button.ghost {
  background: transparent;
  color: #42b983;
}
</style>
