<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 246p) userForm Object
const userForm = ref({
  email: '',
  agree: false,
})

// 246p) userForm Validation
const handleRegister = () => {
  if (!userForm.value.email.includes('@')) {
    ElMessage.error('❌ 올바른 이메일 형식이 아닙니다.')
    return
  }
  if (!userForm.value.agree) {
    ElMessage.warning('⚠️ 이용약관에 동의하셔야 합니다.')
    return
  }
  ElMessage.success('🎉 가입 신청이 정상적으로 완료되었습니다!')
}
</script>

<template>
  <el-card class="el-demo" shadow="hover">
    <!-- el-card의 header 슬롯 -->
    <template #header>
      <div class="card-header">
        <span>회원가입</span>
        <el-tag type="info" size="small">246p</el-tag>
      </div>
    </template>

    <el-input v-model="userForm.email" placeholder="이메일 주소를 입력하세요" clearable />

    <div class="row">
      <el-switch v-model="userForm.agree" />
      <span class="label">이용약관에 동의합니다.</span>
    </div>

    <el-button type="primary" @click="handleRegister">회원가입</el-button>

    <!-- 현재 폼 상태를 그대로 노출해 v-model 바인딩을 확인한다 -->
    <template #footer>
      <span class="state">현재 상태: {{ userForm }}</span>
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

.row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 14px 0;
}

.label {
  font-size: 14px;
}

.state {
  font-size: 13px;
  color: gray;
}
</style>
