<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { EGameMode } from '@/enums/EGameMode'

const { smAndUp } = useDisplay()
const gameMode = useGameMode()
</script>

<template>
  <v-container class="fill-height">
    <v-row>
      <v-spacer v-show="smAndUp"></v-spacer>
      <v-col :cols="smAndUp? 10 : 12">
        <v-card class="text-center px-2 py-4" variant="tonal" color="amber-darken-3">
          <OnePlayer v-if="gameMode === EGameMode.onePlayer" />
          <TwoPlayers v-else-if="gameMode === EGameMode.twoPlayers" />
          <NewGame v-else @start-new-game="gameMode = $event" />
        </v-card>
      </v-col>
      <v-spacer v-show="smAndUp"></v-spacer>
    </v-row>
  </v-container>
</template>
