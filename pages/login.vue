<script lang="ts" setup>
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInAnonymously } from 'firebase/auth'
import { EAuthMethod } from '@/enums/EAuthMethod'

definePageMeta({
  middleware: 'auth',
})
const router = useRouter()

const form = ref()

const snackbar = ref(false)
const timeout = ref(3000)
const message = ref('')

const isLoading = ref(false)
const isPasswordVisible = ref(false)
const email = ref('')
const password = ref('')

const googleAuthProvider = new GoogleAuthProvider()
const auth = useFirebaseAuth()!

const handleSignIn = async (authMethod: EAuthMethod): Promise<void> => {
  if (authMethod === EAuthMethod.emailAndPassword) {
    form.value.validate()
  }
  isLoading.value = true
  try {
    switch (authMethod) {
      case EAuthMethod.emailAndPassword:
        if (form.value.isValid) {
          await signInWithEmailAndPassword(auth, email.value, password.value)
        }
        break
      case EAuthMethod.popUp:
        await signInWithPopup(auth, googleAuthProvider)
        break
      default:
        await signInAnonymously(auth)
        break
    }
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
</script>

<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <v-form ref="form">
          <h4 class="text-h4 text-center my-8">Log In</h4>
          <v-card
            class="mx-auto pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
            variant="tonal"
            color="amber-darken-3"
          >
            <div class="text-subtitle-1 text-medium-emphasis">Username</div>
            <v-text-field
              v-model="email"
              :rules="[v => !!v || `E-mail is required`]"
              density="compact"
              placeholder="Email address"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
            ></v-text-field>
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
              Password
              <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
                Forgot login password?
              </a>
            </div>
            <v-text-field
              v-model="password"
              :rules="[v => !!v || `Password is required`]"
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="isPasswordVisible ? 'text' : 'password'"
              density="compact"
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>
            <v-btn
              class="mb-8"
              color="blue"
              size="large"
              variant="tonal"
              block
              :loading="isLoading"
              :disabled="isLoading"
              @click="handleSignIn(EAuthMethod.emailAndPassword)"
            >
              Log In
            </v-btn>
            <v-btn
              class="mb-2"
              size="large"
              variant="flat"
              block
              :loading="isLoading"
              :disabled="isLoading"
              @click="handleSignIn(EAuthMethod.popUp)"
            >
              <v-icon class="mr-2" icon="mdi-google"></v-icon> Google
            </v-btn>
            <v-btn
              class="mb-8"
              size="large"
              variant="flat"
              block
              :loading="isLoading"
              :disabled="isLoading"
              @click="handleSignIn(EAuthMethod.anonymously)"
            >
              <v-icon class="mr-2" icon="mdi-incognito"></v-icon> Anonymous User
            </v-btn>
            <v-card-text class="text-center">
              <NuxtLink class="text-blue text-decoration-none" :to="{ name: 'signup' }" rel="noopener noreferrer">
                Sign up now
                <v-icon icon="mdi-chevron-right"></v-icon>
              </NuxtLink>
            </v-card-text>
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
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
