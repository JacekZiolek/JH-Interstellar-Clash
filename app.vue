<script lang="ts" setup>
import { signOut } from 'firebase/auth'

const getCurrentYear = computed(() => new Date().getFullYear())

const user = useCurrentUser()
const userPhotoUrl = computed(() => {
  return user.value?.photoURL || undefined
})
const auth = useFirebaseAuth()!
</script>

<template>
  <v-app>
    <v-app-bar color="indigo-lighten-1">
      <v-app-bar-title>
        <NuxtLink :to="{ name: 'index' }">
          <v-btn class="mr-2" variant="flat" density="compact" color="red-darken-4">Home</v-btn>
        </NuxtLink>
        <NuxtLink :to="{ name: 'index' }">
          <v-btn class="mr-2" variant="flat" density="compact" color="red-darken-4">New Game</v-btn>
        </NuxtLink>
        <NuxtLink :to="{ name: 'index' }">
          <v-btn variant="flat" density="compact" color="red-darken-4">High Scores</v-btn>
        </NuxtLink>
      </v-app-bar-title>
      <template v-if="user" #append>
        <v-avatar class="mr-8" icon="mdi-account-circle" :image="userPhotoUrl" variant="outlined"></v-avatar>
        <v-menu activator="parent">
          <v-list>
            <v-list-item>
              <NuxtLink :to="{ name: 'index' }">
                <v-btn>Account</v-btn>
              </NuxtLink>
            </v-list-item>
            <v-list-item>
              <v-btn @click="signOut(auth)">sign out</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else #append>
        <NuxtLink :to="{ name: 'login' }">
          <v-btn class="mr-2" variant="elevated" density="comfortable" color="purple-darken-3">Log In</v-btn>
        </NuxtLink>
        <NuxtLink :to="{ name: 'signup' }">
          <v-btn variant="elevated" color="purple-darken-4">Sign Up</v-btn>
        </NuxtLink>
      </template>
    </v-app-bar>
    <v-main class="app-container">
      <NuxtPage />
    </v-main>
    <v-footer color="indigo-lighten-1" app>
      <v-row align="center" no-gutters>
        <v-col cols="auto">
          <p class="text-no-wrap">
            {{ getCurrentYear }} — <strong>Jack Herby</strong>
          </p>
        </v-col>
        <v-col cols="auto" class="pl-4">
          <v-btn href="https://github.com/JackHerby" icon="mdi-github" class="mr-2" variant="outlined"></v-btn>
          <v-btn href="https://www.linkedin.com/in/jacekziolek/" icon="mdi-linkedin" variant="outlined"></v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style scoped>
.app-container {
  background-image: url('./public/space_battle.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
