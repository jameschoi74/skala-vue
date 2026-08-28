<script setup>
import { ref, onUnmounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 248p) 반응형 Data
const downloadProgress = ref(0)
const isDownloading = ref(false)
let intervalId = null

// 248p) 파일삭제 Confirm
const confirmDelete = () => {
  ElMessageBox.confirm('서버에서 해당 파일을 영구히 삭제하시겠습니까?', '🔥 최종 경고', {
    confirmButtonText: '네, 삭제합니다',
    cancelButtonText: '취소',
    // 교재 원문은 type: 'danger'이지만 Element Plus가 지원하는 값은
    // success / info / warning / error 4가지뿐이라 아이콘이 표시되지 않는다.
    type: 'error',
  })
    .then(() => {
      ElMessage.success('🗑️ 파일이 안전하게 파쇄되었습니다.')
    })
    .catch(() => {
      ElMessage.info('❌ 삭제 작업이 취소되었습니다.')
    })
}

// 248p) 게이지 바 애니메이션
const startDownload = () => {
  // 교재 원문은 `if (isDownloading.value) return (isDownloading.value = true)`로
  // 두 줄이 한 줄로 합쳐져 있어, 진행 중일 때 오히려 플래그를 다시 켜는 코드가 된다.
  // 의도대로 "이미 진행 중이면 무시하고, 아니면 시작" 두 문장으로 분리했다.
  if (isDownloading.value) return
  isDownloading.value = true
  downloadProgress.value = 0

  intervalId = setInterval(() => {
    downloadProgress.value += 20
    if (downloadProgress.value >= 100) {
      clearInterval(intervalId)
      intervalId = null
      isDownloading.value = false
      ElMessage.success('💾 대용량 데이터 로드가 완료되었습니다!')
    }
  }, 400)
}

// 155p에서 배운 대로, 컴포넌트가 사라질 때 타이머를 정리한다.
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <el-card class="el-demo" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>파일 관리</span>
        <el-tag type="info" size="small">248p</el-tag>
      </div>
    </template>

    <el-button type="danger" @click="confirmDelete">삭제 테스트</el-button>
    <el-button type="primary" :disabled="isDownloading" @click="startDownload">
      {{ isDownloading ? '동기화 중...' : '동기화 시작' }}
    </el-button>

    <el-progress :percentage="downloadProgress" :stroke-width="14" style="margin-top: 16px" />

    <template #footer>
      <span class="state">진행률 {{ downloadProgress }}%</span>
    </template>
  </el-card>
</template>

<style scoped>
.el-demo {
  max-width: 460px;
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.state {
  font-size: 13px;
  color: gray;
}
</style>
