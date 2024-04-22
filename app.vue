<script lang="ts" setup>
import { collection, doc } from 'firebase/firestore'

const db = useFirestore()
const someTest = useDocument(doc(collection(db, 'test'), 'bAxbVatnWwBMqYFpFPrW'))

onMounted(() => console.log('app', someTest.value?.test))
</script>

<template>
  <v-app>
    <v-app-bar color="grey-lighten-2">
      <template #prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>Photos</v-app-bar-title>
      <template #append>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>
    <v-main class="app-container">
      <NuxtPage />
    </v-main>
    <v-footer app>
      <v-row align="center" no-gutters>
        <v-col cols="auto">
          <p class="text-no-wrap">
            {{ new Date().getFullYear() }} — <strong>Jack Herby</strong>
          </p>
        </v-col>
        <v-col cols="auto" class="pl-4">
          <v-btn icon="mdi-github" class="mr-2" variant="text" />
          <v-btn icon="mdi-linkedin" variant="text" />
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
