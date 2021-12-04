<template>
  <div class="is-flex is-flex-direction-row inventory-container">
    <img src="/log.png" @click="openLog" class="image the-clue" alt="">
    <img src="/clue.png" @click="openImageModal(image)" v-for="(image,i) in inventory" :key="`image-${i}`" class="image the-clue" alt="">
    <b-modal v-model="isImageModalActive">
      <img :src="`${apiUrl}${imageUrl}`" class="image the-image-clue">
    </b-modal>
    <b-modal v-model="isLogModalActive">
      <p class="is-size-2">Ouija archive</p>
      <div class="content" v-if="log.length">
      <p v-for="(l,j) in log" :key="`log-${j}`">{{l}}</p>
      </div>
      <div class="content" v-else>
        <p>Nothing has been said... yet...</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    inventory: {
      type: Array,
      required: true
    },
    log: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isImageModalActive: false,
      isLogModalActive: false,
      imageUrl: null,
    }
  },
  methods: {
    openImageModal(image) {
      this.imageUrl = image
      this.isImageModalActive = true;
    },
    openLog() {
      this.isLogModalActive = true;
    }
  },
  computed: {
    apiUrl() {
      return process.env.VUE_APP_API_URL
    }
  }
}
</script>

<style lang="scss" scoped>
.inventory-container{
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 10px;
  height: auto;
  
}
.the-clue{
  max-height: 40px;
  margin: 0 10px;
  opacity: 0.5;
  &:hover{
    opacity: 1;
    cursor: pointer;
  }
}

.the-image-clue{
max-height: 75vh;
margin: 0 auto;
}
</style>