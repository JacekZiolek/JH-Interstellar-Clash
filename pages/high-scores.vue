<script lang="ts" setup>
import { collection, query } from 'firebase/firestore'

const db = useFirestore()
const highScoresRef = collection(db, 'highScores')
const highScores = useCollection(query(highScoresRef))

onMounted(() => console.log(highScores.value))
</script>

<template>
  <div>
    <h4 class="text-h4 mb-6">High Scores</h4>
    <h6 class="text-h6 mb-6">Player's nick name</h6>
    <v-table class="mb-4">
      <thead>
        <tr>
          <th class="text-center text-h6">VS.</th>
          <th class="text-center text-h6">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(game, index) in highScores[0].games" :key="index">
          <td>{{ game.vs }}</td>
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
          <td>2</td>
          <td>1</td>
          <td>6</td>
          <td>6</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
