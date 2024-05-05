<script lang="ts" setup>
import { signOut } from 'firebase/auth'
import { useDisplay } from 'vuetify'

const { smAndUp } = useDisplay()

const getCurrentYear = computed(() => new Date().getFullYear())

const user = useCurrentUser()
const userPhotoUrl = computed(() => {
  return user.value?.photoURL || undefined
})
const auth = useFirebaseAuth()!
</script>

<template>
  <v-app full-height>
    <v-app-bar color="blue-grey-darken-3">
      <template #prepend>
        <div class="d-block d-sm-none">
          <v-menu>
            <template #activator="{ props }">
              <v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
            </template>
            <v-list>
              <v-list-item>
                <NuxtLink class="text-decoration-none" :to="{ name: 'index' }">
                  <v-list-item-title>Home</v-list-item-title>
                </NuxtLink>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <NuxtLink class="text-decoration-none" :to="{ name: 'high-scores' }">
                  <v-list-item-title>High Scores</v-list-item-title>
                </NuxtLink>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
      <v-app-bar-title class="d-none d-sm-block">
        <NuxtLink :to="{ name: 'index' }">
          <v-btn class="mr-2" variant="flat" density="compact" color="red-darken-4">Home</v-btn>
        </NuxtLink>
        <NuxtLink :to="{ name: 'high-scores' }">
          <v-btn variant="flat" density="compact" color="red-darken-4">High Scores</v-btn>
        </NuxtLink>
      </v-app-bar-title>
      <template v-if="user" #append>
        <span class="mr-2">Your account: </span>
        <v-avatar class="mr-8" icon="mdi-account-circle" :image="userPhotoUrl" variant="plain"></v-avatar>
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
      <v-container class="fill-height">
        <v-row>
          <v-spacer v-show="smAndUp"></v-spacer>
          <v-col :cols="smAndUp? 10 : 12">
            <v-card class="text-center px-2 py-4" variant="tonal" color="amber-darken-3">
              <slot />
            </v-card>
          </v-col>
          <v-spacer v-show="smAndUp"></v-spacer>
        </v-row>
      </v-container>
    </v-main>
    <!-- HACK: fixes hydration mismatch for v-footer -->
    <v-footer style="z-index: 1006;" class="d-flex justify-center align-items-center pa-0" app>
      <p class="text-no-wrap mr-4">
        {{ getCurrentYear }} — <strong>Jack Herby</strong>
      </p>
      <v-btn href="https://github.com/JackHerby" icon="mdi-github" class="mr-2" variant="plain"></v-btn>
      <v-btn href="https://www.linkedin.com/in/jacekziolek/" icon="mdi-linkedin" variant="plain"></v-btn>
    </v-footer>
  </v-app>
</template>

<style scoped>
.app-container {
  background-image: url('../public/spaceship.jpg');
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
