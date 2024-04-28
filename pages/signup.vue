<script lang="ts" setup>
import { createUserWithEmailAndPassword } from 'firebase/auth'

definePageMeta({
  middleware: 'auth',
})
const router = useRouter()

const isLoading = ref(false)
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)

enum Step {
  email,
  password,
  success,
}
const step = ref<Step>(Step.email)

const currentTitle = computed(() => {
  switch (step.value) {
    case Step.email: return 'Add e-mail address'
    case Step.password: return 'Create a password'
    default: return 'Account created successfully'
  }
})
const nextStepBtnText = computed(() => step.value === Step.password ? 'Create Account' : 'Next')

const snackbar = ref(false)
const timeout = ref(2000)
const message = ref('')

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const auth = useFirebaseAuth()!
const handleCreateUser = async (): Promise<void> => {
  isLoading.value = true
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    step.value = Step.success
  } catch (error) {
    if (error instanceof Error) {
      message.value = error.message
      snackbar.value = true
    }
  } finally {
    isLoading.value = false
    router.push({ name: 'index' })
  }
}
const handleStepChange = (): void => {
  switch (step.value) {
    case Step.email:
      step.value = Step.password
      break
    case Step.password:
      if (!password.value.length) {
        message.value = 'Password is required'
        snackbar.value = true
        break
      }
      if (password.value !== confirmPassword.value) {
        message.value = 'Passwords do no not match!'
        snackbar.value = true
        break
      }
      handleCreateUser()
      break
    default:
      step.value = Step.email
      break
  }
}
</script>

<template>
  <div>
    <h4 class="text-h4 text-center my-8">Sign Up</h4>
    <v-card class="mx-auto" max-width="500" variant="tonal" color="amber-darken-3">
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
      </v-card-title>
      <v-window v-model="step">
        <v-window-item :value="Step.email">
          <v-card-text>
            <v-text-field
              v-model="email"
              label="Email"
              placeholder="john@google.com"
              prepend-inner-icon="mdi-email-outline"
            ></v-text-field>
            <span class="text-caption text-grey-darken-1">
              This is the email you will use to login to your Interstellar Clash account
            </span>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="Step.password">
          <v-card-text>
            <v-text-field
              v-model="password"
              label="Password"
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="isPasswordVisible ? 'text' : 'password'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="isConfirmPasswordVisible ? 'text' : 'password'"
              @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
            ></v-text-field>
            <span class="text-caption text-grey-darken-1">
              Please enter a password for your account
            </span>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="Step.success">
          <div class="pa-4 text-center">
            <h3 class="text-h6 font-weight-light mb-2">
              Welcome to Interstellar Clash
            </h3>
            <span class="text-caption text-grey">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          v-if="step === Step.password || step === Step.success"
          variant="text"
          :loading="isLoading"
          :disabled="isLoading"
          @click="step--"
        >
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="step == Step.email || step === Step.password"
          color="primary"
          variant="flat"
          :loading="isLoading"
          :disabled="isLoading"
          @click="handleStepChange"
        >
          {{ nextStepBtnText }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="red"
      location="top"
      vertical
      multi-line
    >
      {{ message }}
      <template #actions>
        <v-btn color="blue" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
