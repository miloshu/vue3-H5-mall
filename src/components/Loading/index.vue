<template>
  <div class="loading">
    <img src="../../assets/imgs/loading.gif" alt="" />
  </div>
</template>
 
<script lang="ts">
  export default {
    name: 'Loading',
    setup () {
      return {}
    }
  }
</script>
<style lang="scss"scoped>
.loading{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(0,0,0,.7);
  img {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 5rem;
    height: 5rem;
    margin: auto;
  }
}
