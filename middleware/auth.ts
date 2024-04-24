export default defineNuxtRouteMiddleware(async (to) => {
  const user = await getCurrentUser()
  if (user && (to.name === 'login' || to.name === 'signup')) {
    return navigateTo({ name: 'index' })
  }
})
