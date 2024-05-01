<script lang="ts" setup>
import { EGameMode } from '@/enums/EGameMode'

const form = ref()

const playerOne = usePlayerOne()
const playerTwo = usePlayerTwo()
const gameMode = useGameMode()
const isGameRunning = useGameRunning()

const startNewGame = () => {
  form.value.validate()
  if (form.value.isValid) {
    isGameRunning.value = true
  }
}
</script>

<template>
  <div>
    <div class="pb-10">
      <h1 class="text-h3 pb-8">Welcome to Intestellar Clash!</h1>
      <p class="text-body-1 pb-4">
        Fight an epic battle between two well known sci-fi heroes or starships.
      </p>
      <p class="text-body-1 text-center">
        Start a new game below:
      </p>
    </div>
    <v-form ref="form" class="w-75 mx-auto">
      <v-radio-group v-model="gameMode" inline required>
        <v-radio label="One player" :value="EGameMode.onePlayer"></v-radio>
        <v-radio label="Two players" :value="EGameMode.twoPlayers"></v-radio>
      </v-radio-group>
      <div class="d-flex align-items-center">
        <v-text-field
          v-model="playerOne"
          class="mr-2"
          :rules="[v => !!v || `Player's name is required`]"
          label="player one name"
          variant="outlined"
          required
        ></v-text-field>
        <v-text-field
          v-if="gameMode === EGameMode.twoPlayers"
          v-model="playerTwo"
          :rules="[v => !!v || `Player's name is required`]"
          label="player two name"
          variant="outlined"
          required
        ></v-text-field>
      </div>
      <v-btn
        class="mx-auto mt-4"
        color="grey-darken-3"
        size="x-large"
        variant="flat"
        @click="startNewGame"
      >
        New Game
      </v-btn>
    </v-form>
  </div>
</template>
