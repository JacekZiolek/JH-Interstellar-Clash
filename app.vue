<script lang="ts" setup>
import { collection, doc } from 'firebase/firestore'

const db = useFirestore()
const someTest = useDocument(doc(collection(db, 'test'), 'bAxbVatnWwBMqYFpFPrW'))

onMounted(() => console.log('app', someTest.value?.test))
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
