<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'
import { useFavoriteStore } from '@/stores/favoriteStore.js'

// [178p 요구사항 4] 도시 객체를 props로 받아 표시하고, 두 종류의 이벤트를 부모에게 emit
// [249p] el-card / el-tag / el-button / el-image로 교체
const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()
const favoriteStore = useFavoriteStore()

const displayTemp = computed(() => configStore.convertTemp(props.city.temp))

// 더움/선선함 판정은 항상 섭씨 25도 기준이지만, 화면 임계값은 현재 단위로 환산한다.
const HOT_THRESHOLD_CELSIUS = 25
const displayThreshold = computed(() => configStore.convertTemp(HOT_THRESHOLD_CELSIUS))
const isHot = computed(() => props.city.temp >= HOT_THRESHOLD_CELSIUS)
</script>

<template>
  <el-card class="card" :class="{ selected }" shadow="hover" @click="emit('select-card', city)">
    <div class="card-head">
      <el-image class="icon" :src="city.icon" :alt="city.status" fit="contain" />
      <span class="name">{{ city.name }}</span>
      <span class="temp">{{ displayTemp }}{{ configStore.unitSymbol }}</span>
    </div>

    <p class="status">{{ city.status }}</p>
    <p class="detail">습도 {{ city.humidity }}% · 풍속 {{ city.wind }}m/s</p>

    <el-tag :type="isHot ? 'danger' : 'primary'" effect="light" size="small">
      {{ isHot ? '🔥 더움' : '❄️ 선선함' }}
      ({{ displayThreshold }}{{ configStore.unitSymbol }} {{ isHot ? '이상' : '미만' }})
    </el-tag>

    <div class="card-actions">
      <!-- .stop으로 카드 선택 이벤트로의 버블링 차단 -->
      <el-button type="primary" plain size="small" @click.stop="emit('click-detail', city)">
        상세보기
      </el-button>
      <el-button
        :type="favoriteStore.isFavorite(city.id) ? 'warning' : 'info'"
        :plain="!favoriteStore.isFavorite(city.id)"
        size="small"
        circle
        @click.stop="favoriteStore.toggleFavorite(city.id)"
      >
        {{ favoriteStore.isFavorite(city.id) ? '★' : '☆' }}
      </el-button>
    </div>
  </el-card>
</template>

<style scoped>
.card {
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.card.selected {
  border-color: var(--el-color-primary);
}

.card-head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  width: 40px;
  height: 40px;
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
  margin: 6px 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}
</style>
