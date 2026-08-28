<script setup>
// [178p 요구사항 3] 검색어를 props로 받아 표시하고, 입력 시 부모에게 emit
// [249p] 겉모양은 el-input으로 교체하되, 한글 IME 조합 중에도 값이 반영되도록
//        compositionupdate를 함께 잡아 준다.
//        (el-input은 v-model과 마찬가지로 조합이 끝나야 input 이벤트를 흘려보낸다)
defineProps({
  query: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])

const onComposing = (e) => {
  emit('update-query', e.target.value)
}
</script>

<template>
  <div class="search-bar">
    <el-input
      :model-value="query"
      placeholder="도시 이름을 한글로 검색하세요"
      clearable
      @input="(value) => emit('update-query', value)"
      @compositionupdate="onComposing"
    >
      <template #prefix>🔍</template>
    </el-input>
    <p class="echo">
      입력한 도시명: <strong>{{ query }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search-bar {
  min-width: 260px;
}

.echo {
  margin-top: 8px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
</style>
