<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { collection, query } from 'firebase/firestore'
import type { ICard } from '@/interfaces/ICard'
import { EGameMode } from '~/enums/EGameMode'

const { smAndDown } = useDisplay()

const db = useFirestore()
const peopleRef = collection(db, 'people')
const starshipsRef = collection(db, 'starships')
const peopleDeck = useCollection<ICard>(query(peopleRef))
const starshipsDeck = useCollection<ICard>(query(starshipsRef))

const playerOne = usePlayerOne()
const playerTwo = usePlayerTwo()
const deckType = useDeckType()
const gameMode = useGameMode()
const isGameRunning = useGameRunning()

const isActive = ref(false)
const hasPlayerOneWon = ref(false)
const playerOneScore = ref(0)
const playerTwoScore = ref(0)

let playerOneCard = reactive<ICard>({
  name: '',
  description: '',
  weapon: '',
  resource: {
    type: '',
    value: 0,
  },
})
let playerTwoCard = reactive<ICard>({
  name: '',
  description: '',
  weapon: '',
  resource: {
    type: '',
    value: 0,
  },
})

const getDeck = computed(() => deckType.value === 'people' ? peopleDeck.value : starshipsDeck.value)

// Fisher–Yates shuffle algorithm
const shuffleDeck = (deckToShuffle: ICard[]): ICard[] => {
  for (let i = deckToShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = deckToShuffle[i]
    deckToShuffle[i] = deckToShuffle[j]
    deckToShuffle[j] = temp
  }
  return deckToShuffle
}

const playGame = (deck: ICard[]): void => {
  const shuffledDeck = shuffleDeck(deck)
  playerOneCard = shuffledDeck[0]
  playerTwoCard = shuffledDeck[1]
  hasPlayerOneWon.value = playerOneCard.resource.value > playerTwoCard.resource.value
  hasPlayerOneWon.value === true ? playerOneScore.value++ : playerTwoScore.value++
}

const quitGame = () => {
  isActive.value = false
  playerOneScore.value = 0
  playerTwoScore.value = 0
  playerOne.value = ''
  playerTwo.value = ''
  isGameRunning.value = false
}

onMounted(() => {
  if (gameMode.value === EGameMode.onePlayer) {
    playerTwo.value = 'Computer'
  }
})
</script>

<template>
  <div>
    <h4 class="text-h4 mb-6">Player vs. Computer</h4>
    <v-row>
      <v-col>
        <p class="text-h6 text-center mb-4">Choose deck type:</p>
        <v-radio-group v-model="deckType" class="d-flex justify-center mb-4">
          <v-radio label="People" value="people"></v-radio>
          <v-radio label="Starships" value="starships"></v-radio>
        </v-radio-group>
        <p class="text-h6 text-center mb-4">Click the button below to start the game!</p>
      </v-col>
    </v-row>
    <v-row :class="{ 'flex-column': smAndDown }">
      <v-col>
        <v-dialog max-width="800">
          <template #activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              color="surface-variant"
              text="Start Game!"
              variant="flat"
              @click="playGame(getDeck)"
            ></v-btn>
          </template>
          <template #default="{ isActive }">
            <v-row>
              <v-col>
                <v-card>
                  <v-card-title class="text-center">{{ playerOne }} vs. {{ playerTwo }}</v-card-title>
                  <div v-if="gameMode === EGameMode.twoPlayers" class="text-center">
                    <v-card-subtitle>Score:</v-card-subtitle>
                    <v-card-text>{{ playerOneScore }} : {{ playerTwoScore }}</v-card-text>
                  </div>
                  <v-card-text class="text-center text-h4 pa-2">
                    {{ hasPlayerOneWon ? playerOne : playerTwo }} has won!
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <v-btn
                      class="ma-2"
                      text="Play Again"
                      color="surface-variant"
                      variant="flat"
                      @click="isActive.value = false"
                    ></v-btn>
                    <v-btn
                      class="ma-2"
                      text="Quit Game"
                      color="surface-variant"
                      variant="flat"
                      @click="quitGame"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card height="500">
                  <v-img src="../public/battle.jpg" height="200" cover></v-img>
                  <v-card-title>Name: {{ playerOneCard.name }}</v-card-title>
                  <v-card-text>Description: {{ playerOneCard.description }}</v-card-text>
                  <v-card-text>Weapon: {{ playerOneCard.weapon }}</v-card-text>
                  <v-card-text class="text-h6">
                    Resource: {{ playerOneCard.resource.type }} - {{ playerOneCard.resource.value }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <v-card height="500">
                  <v-img src="../public/battle.jpg" height="200" cover></v-img>
                  <v-card-title>Name: {{ playerTwoCard.name }}</v-card-title>
                  <v-card-text>Description: {{ playerTwoCard.description }}</v-card-text>
                  <v-card-text>Weapon: {{ playerTwoCard.weapon }}</v-card-text>
                  <v-card-text class="text-h6">
                    Resource: {{ playerTwoCard.resource.type }} - {{ playerTwoCard.resource.value }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>
