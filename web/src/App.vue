<template>
  <div id="app">
    <player />
  </div>
</template>

<script>
import Player from '@/views/Player'

export default {
  name: 'app',
  components: {
    Player
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
