<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created(){
      this.$router.push('/yypd_index')
    }
  }
</script>

<style>

</style>
