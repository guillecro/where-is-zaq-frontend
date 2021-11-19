<template>
  <div class="the-response is-flex is-flex-direction-row is-justify-content-center is-align-items-center">
    <p class="has-text-centered" :class="{'text-secondary is-size-1': zaq}">{{response}}</p>
  </div>
</template>

<script>
export default {
  props: ['response','zaq']
}
</script>

<style lang="scss">
.the-response{
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.8);
  z-index: 200;
  p{
    max-width: 90%;
    line-height: normal;
  }
}
</style>