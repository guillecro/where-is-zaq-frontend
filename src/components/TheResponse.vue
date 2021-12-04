<template>
  <div class="the-response is-flex is-flex-direction-row is-justify-content-center is-align-items-center">
    <p class="has-text-centered" v-if="!sticker && !image" :class="{'text-secondary is-size-3': zaq}">{{response}}</p>
    <img :src="`${apiUrl}${response}`" v-else-if="sticker && !image" class="image the-sticker" width="400" alt="">
    <div v-else-if="!sticker && image">
      <img :src="`${apiUrl}${response}`" class="image the-picture" alt="">
      <button @click="downloadImage" class="button mt-2 is-white is-outlined">Download clue...</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['response','zaq','sticker', 'image'],
  methods: {
    downloadImage() {
      const link = document.createElement('a');
      link.href = `${this.apiUrl}${this.response}`;
      link.download = 'image.png';
      // open in a new tab
      link.target = '_blank';
      link.click();
    }
  },
  computed: {
    apiUrl() {
      return process.env.VUE_APP_API_URL
    }
  }
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
.the-sticker{
  // width: 100%;
    // height: 400px;
}
.the-picture{
  // width: auto;
  max-height: 75vh;
}
</style>