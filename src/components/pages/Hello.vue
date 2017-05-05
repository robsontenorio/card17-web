<template>
<div>

  <dropdown>
    <button class="button is-primary">Basic Dropdown!</button>
    <div slot="content">
      <menus>
        <menu-item icon="user" to="/components/menu/submenu2">Members</menu-item>
        <menu-item icon="ticket">Tickets</menu-item>
        <menu-item icon="lock">Settings</menu-item>
        <div class="divider"></div>
        <menu-item icon="">Sign out</menu-item>
      </menus>
    </div>
  </dropdown>
</div>
</template>

<script>
export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
