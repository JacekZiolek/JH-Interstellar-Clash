<script lang="ts" setup>
const isGameRunning = useGameRunning()
</script>

<template>
  <div>
    <GameInstance v-if="isGameRunning" />
    <GameMenu v-else />
  </div>
</template>
