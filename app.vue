<script lang="ts" setup>
import { getFirestore, collection } from 'firebase/firestore'
// init services
const db = getFirestore()

// collection ref
const testRef = collection(db, 'test')

onMounted(() => console.log('app', testRef))
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
