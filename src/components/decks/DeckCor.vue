<template>
<span>
  <img :class="`icon image is-${size}`" :src="`/static/images/lands/icon_land_${chave}.png`"></span>
</span>
</template>

<script>
export default {
  name: 'deck-cor',
  props: {
    chave: String,
    size: {
      type: String,
      default: '24x24'
    }
  }
}
</script>
