export default defineNuxtRouteMiddleware(async (to) => {
  const user = await getCurrentUser()
  const router = useRouter()
  if (user && (to.name === 'login' || to.name === 'signup')) {
    router.push({ name: 'index' })
  }
})
