<script lang="ts" setup>
import { collection, query, where, getDocs } from 'firebase/firestore'
import type { IGame, IHighScores } from '@/interfaces/IHighScores'

const user = useCurrentUser()

const db = useFirestore()

const userHighScores = computedAsync(async (): Promise<IHighScores> => {
  const userHighScoresRef = collection(db, 'highScores')
  const userHighScoresQuery = query(userHighScoresRef, where('userId', '==', user.value?.uid))
  const userHighScoresQuerySnapshot = await getDocs(userHighScoresQuery)
  const userHighScoresData = userHighScoresQuerySnapshot.docs[0].data()
  return userHighScoresData as IHighScores
}, null)

const gamesWon = computed(() => {
  if (!userHighScores.value) {
    return 0
  }
  return userHighScores.value?.games.filter((game: IGame) => game.userScore > game.oponentScore).length
})

const gamesLost = computed(() => {
  if (!userHighScores.value) {
    return 0
  }
  return userHighScores.value?.games.filter((game: IGame) => game.oponentScore > game.userScore).length
})

const roundsWon = computed(() => {
  if (!userHighScores.value) {
    return 0
  }
  return userHighScores.value?.games.reduce((acc: number, cur: IGame) => acc + cur.userScore, 0)
})

const roundsLost = computed(() => {
  if (!userHighScores.value) {
    return 0
  }
  return userHighScores.value?.games.reduce((acc: number, cur: IGame) => acc + cur.oponentScore, 0)
})
</script>

<template>
  <div v-if="!!user">
    <h4 class="text-h4 mb-6">High Scores</h4>
    <h6 class="text-h6 mb-6">{{ user?.displayName }}</h6>
    <v-table class="mb-4">
      <thead>
        <tr>
          <th class="text-center text-h6">Oponent</th>
          <th class="text-center text-h6">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(game, index) in userHighScores?.games" :key="index">
          <td>{{ user.displayName ? user.displayName : 'player' }} vs. {{ game.vs }}</td>
          <td>{{ game.userScore }} - {{ game.oponentScore }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-table>
      <thead>
        <tr>
          <th class="text-center text-h6">Games won</th>
          <th class="text-center text-h6">Games lost</th>
          <th class="text-center text-h6">Rounds won</th>
          <th class="text-center text-h6">Rounds lost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ gamesWon }}</td>
          <td>{{ gamesLost }}</td>
          <td>{{ roundsWon }}</td>
          <td>{{ roundsLost }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div v-else>
    <h4 class="text-h4 mb-6">Log in to view high scores.</h4>
  </div>
</template>
