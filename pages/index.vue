<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const { smAndUp } = useDisplay()

const form = ref()

const playerOne = ref('')
const playerTwo = ref('')

enum GameMode {
  onePlayer,
  twoPlayers,
}
const gameMode = ref<GameMode>(GameMode.onePlayer)

const startNewGame = () => {
  form.value.validate()
  if (form.value.isValid) {
    console.log(playerOne.value, playerTwo.value, gameMode.value)
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-spacer v-show="smAndUp"></v-spacer>
      <v-col :cols="smAndUp? 8 : 12">
        <v-card class="text-center px-2 py-4" variant="tonal" color="amber-darken-3">
          <div class="pb-16">
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
              <v-radio label="One player" :value="GameMode.onePlayer"></v-radio>
              <v-radio label="Two players" :value="GameMode.twoPlayers"></v-radio>
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
                v-if="gameMode === GameMode.twoPlayers"
                v-model="playerTwo"
                :rules="[v => !!v || `Player's name is required`]"
                label="player two name"
                variant="outlined"
                required
              ></v-text-field>
            </div>
            <v-btn
              class="mx-auto mt-4"
              color="primary"
              size="x-large"
              variant="tonal"
              @click="startNewGame"
            >
              New Game
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-spacer v-show="smAndUp"></v-spacer>
    </v-row>
  </v-container>
</template>
