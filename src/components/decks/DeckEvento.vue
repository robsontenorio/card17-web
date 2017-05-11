<template>
<span>
  <span class="icon" style="width: 15px; font-size: 8pt;">
    <i :style="`color: ${ evento == '1' ? 'GREEN' : 'RED' }`"  class="fa fa-circle"></i>
  </span>
</span>
</template>

<script>
export default {
  name: 'deck-evento',
  props: ['evento']
}
</script>

<style scoped>
</style>
