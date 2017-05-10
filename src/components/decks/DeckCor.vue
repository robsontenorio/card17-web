<template>
<span>
  <!-- //TODO reduzir tamano das imagens da pasta -->
  <img class="icon image is-24x24" :src="`/static/images/lands/icon_land_${chave}.png`"></span>
</span>
</template>

<script>
export default {
  name: 'deck-cor',
  props: ['chave']
}
</script>
