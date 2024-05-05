<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const { smAndUp } = useDisplay()
</script>

<template>
  <v-container class="fill-height">
    <v-row>
      <v-spacer v-show="smAndUp"></v-spacer>
      <v-col :cols="smAndUp? 10 : 12">
        <v-card class="text-center px-2 py-4" variant="tonal" color="amber-darken-3">
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
              <tr>
                <td>foo</td>
                <td>2 - 4</td>
              </tr>
              <tr>
                <td>bar</td>
                <td>1 - 0</td>
              </tr>
              <tr>
                <td>baz</td>
                <td>3 - 2</td>
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
        </v-card>
      </v-col>
      <v-spacer v-show="smAndUp"></v-spacer>
    </v-row>
  </v-container>
</template>
