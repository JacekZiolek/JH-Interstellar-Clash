<script lang="ts" setup>
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { EStep } from '@/enums/EStep'

definePageMeta({
  middleware: 'auth',
})

const isLoading = ref(false)
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const step = ref<EStep>(EStep.email)

const snackbar = ref(false)
const timeout = ref(2000)
const message = ref('')

const emailForm = ref()
const passwordForm = ref()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const currentTitle = computed(() => {
  switch (step.value) {
    case EStep.email: return 'Add e-mail address'
    case EStep.password: return 'Create a password'
    default: return 'Account created successfully'
  }
})
const nextStepBtnText = computed(() => step.value === EStep.password ? 'Create Account' : 'Next')

const auth = useFirebaseAuth()!
const handleCreateUser = async (): Promise<void> => {
  isLoading.value = true
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    step.value = EStep.success
  } catch (error) {
    if (error instanceof Error) {
      message.value = error.message
      snackbar.value = true
    }
  } finally {
    isLoading.value = false
  }
}
const handleStepChange = (): void => {
  switch (step.value) {
    case EStep.email:
      emailForm.value.validate()
      if (emailForm.value.isValid) {
        step.value = EStep.password
      }
      break
    case EStep.password:
      passwordForm.value.validate()
      if (passwordForm.value.isValid) {
        handleCreateUser()
      }
      break
    default:
      step.value = EStep.email
      break
  }
}
</script>

<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <h4 class="text-h4 text-center my-8">Sign Up</h4>
        <v-card class="mx-auto" max-width="500" variant="tonal" color="amber-darken-3">
          <v-card-title class="text-h6 font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
          </v-card-title>
          <v-window v-model="step">
            <v-window-item :value="EStep.email">
              <v-form ref="emailForm">
                <v-card-text>
                  <v-text-field
                    v-model="email"
                    :rules="[v => !!v || `E-mail is required`]"
                    label="Email"
                    placeholder="john@google.com"
                    prepend-inner-icon="mdi-email-outline"
                  ></v-text-field>
                  <span class="text-caption text-grey-darken-1">
                    This is the email you will use to login to your Interstellar Clash account
                  </span>
                </v-card-text>
              </v-form>
            </v-window-item>
            <v-window-item :value="EStep.password">
              <v-form ref="passwordForm">
                <v-card-text>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    :rules="[v => !!v && password === confirmPassword || 'Password is required and passwords must match']"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  ></v-text-field>
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password"
                    :rules="
                      [v => !!v && password === confirmPassword || 'Password confirmation is required and passwords must match']
                    "
                    :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="isConfirmPasswordVisible ? 'text' : 'password'"
                    @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                  ></v-text-field>
                  <span class="text-caption text-grey-darken-1">
                    Please enter a password for your account
                  </span>
                </v-card-text>
              </v-form>
            </v-window-item>
            <v-window-item :value="EStep.success">
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
              v-if="step === EStep.password"
              variant="flat"
              :loading="isLoading"
              :disabled="isLoading"
              @click="step--"
            >
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="step == EStep.email || step === EStep.password"
              color="purple-darken-3"
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
      </v-col>
    </v-row>
  </v-container>
</template>
