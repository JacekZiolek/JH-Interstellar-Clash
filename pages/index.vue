<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const { smAndUp } = useDisplay()
const isGameRunning = useGameRunning()
</script>

<template>
  <v-container class="fill-height">
    <v-row>
      <v-spacer v-show="smAndUp"></v-spacer>
      <v-col :cols="smAndUp? 10 : 12">
        <v-card class="text-center px-2 py-4" variant="tonal" color="amber-darken-3">
          <GameInstance v-if="isGameRunning" />
          <GameMenu v-else />
        </v-card>
      </v-col>
      <v-spacer v-show="smAndUp"></v-spacer>
    </v-row>
  </v-container>
</template>
