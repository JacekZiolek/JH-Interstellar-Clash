<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { collection, query } from 'firebase/firestore'
import type { ICard } from '@/interfaces/ICard'

const { smAndDown } = useDisplay()

const playerOne = usePlayerOne()
const playerTwo = usePlayerTwo()

const db = useFirestore()
const peopleRef = collection(db, 'people')
const starshipsRef = collection(db, 'starships')
const peopleDeck = useCollection<ICard>(query(peopleRef))
const starshipsDeck = useCollection<ICard>(query(starshipsRef))

type DeckType = 'people' | 'starships'
const deckType = ref<DeckType>('people')
let playersCard = reactive<ICard>({
  name: '',
  description: '',
  weapon: '',
  resource: {
    type: '',
    value: 0,
  },
})
let computersCard = reactive<ICard>({
  name: '',
  description: '',
  weapon: '',
  resource: {
    type: '',
    value: 0,
  },
})

const endRoundMessage = ref('')
const getRandomIndex = (deck: ICard[]): number => Math.floor(Math.random() * deck.length)
const declareWinner = (playerOneCard: ICard, playerTwoCard: ICard): string => {
  if (playerOneCard.resource.value > playerTwoCard.resource.value) {
    return `${playerOne.value} has won!`
  } else if (playerOneCard.resource.value < playerTwoCard.resource.value) {
    return `${playerTwo.value} has won!`
  } else {
    return 'It\'s a draw!'
  }
}
const startGame = (): string => {
  const deck = deckType.value === 'people'
    ? peopleDeck.value
    : starshipsDeck.value
  let randomIndex = getRandomIndex(deck)
  playersCard = deck[randomIndex]
  randomIndex = getRandomIndex(deck)
  computersCard = deck[randomIndex]
  endRoundMessage.value = declareWinner(playersCard, computersCard)
}

const isActive = ref(false)
const gameMode = useGameMode()
const quitGame = () => {
  gameMode.value = null
  playerOne.value = ''
  isActive.value = false
}

onMounted(() => playerTwo.value = 'Computer')
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
              @click="startGame"
            ></v-btn>
          </template>
          <template #default="{ isActive }">
            <v-row>
              <v-col>
                <v-card height="600">
                  <v-img src="../public/battle.jpg" height="200" cover></v-img>
                  <v-card-title class="text-h4 text-center mb-4">{{ playerOne }}</v-card-title>
                  <v-card-subtitle class="text-h6 ">Name: {{ playersCard.name }}</v-card-subtitle>
                  <v-card-text>Description: {{ playersCard.description }}</v-card-text>
                  <v-card-text>Weapon: {{ playersCard.weapon }}</v-card-text>
                  <v-card-text class="text-h6">Resource: {{ playersCard.resource.type }} - {{ playersCard.resource.value }}</v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <v-card height="600">
                  <v-img src="../public/battle.jpg" height="200" cover></v-img>
                  <v-card-title class="text-h4 text-center mb-4">Computer</v-card-title>
                  <v-card-subtitle class="text-h6 ">Name: {{ computersCard.name }}</v-card-subtitle>
                  <v-card-text>Description: {{ computersCard.description }}</v-card-text>
                  <v-card-text>Weapon: {{ computersCard.weapon }}</v-card-text>
                  <v-card-text class="text-h6">
                    Resource: {{ computersCard.resource.type }} - {{ computersCard.resource.value }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card>
                  <v-card-title class="text-center text-h4 pa-2">{{ endRoundMessage }}</v-card-title>
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
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>
