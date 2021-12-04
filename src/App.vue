<template>
  <div id="app">
    <div class="hero is-fullheight is-black" style="position:relative;">
    <TheResponse v-if="showResponse" :response="response" :zaq="isZaq" :sticker="isSticker" :image="isImage"/>
      <div class="hero-body">
        <div class="container">
          <img id="the-ouija" v-if="play" src="/ouija-board.png" width="600" class="image mx-auto mb-6" alt="">
          <WhoPlaying v-if="askPlayer" @setName="setName"/>
          <Ouija ref="ouija" @timeout="showTimeout" :player="player" v-if="play"/>
        </div>
      </div>
    </div>
    <inventory v-if="play" :inventory="inventory" :log="log"/>
  </div>
</template>

<script>
import Inventory from './components/Inventory.vue'
import WhoPlaying from './components/WhoPlaying.vue'
import Ouija from './components/Ouija.vue'
import TheResponse from './components/TheResponse.vue'

export default {
  name: 'App',
  data() {
    return {
      player: null,
      askPlayer: true,
      play: false,
      showResponse: false,
      response: null,
      isZaq: false,
      isSticker: false,
      isImage: false,
      audio: null,
      inventory: [],
      log: []
    }
  },
  components: {
    Inventory,
    WhoPlaying,
    Ouija,
    TheResponse
  },
  sockets: {
    connect: function(){
      console.log('🧦 [APP] [SOCKET] Socket is connected 🔌✅')
    },
    disconnect: function(){
      console.log('🧦 [CHAT] [SOCKET] socket disconnected 🔌❌')
    },
    recieveMessage: function(message){
      console.log('🧦 [CHAT] [SOCKET] recieveMessage', message)
      this.$refs.ouija.stopTimeout()
      this.response = message
      this.showResponse = true
      this.isZaq = true
      this.isSticker = false
      this.isImage = false
      let responseAudio = new Audio('/response.mp3')
      responseAudio.volume = 0.25
      responseAudio.play()
      // Get the datetime in a readable format
      let date = new Date()
      let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      // Add the message to the log
      this.log.push(`${time} - "${message}"`)
      setTimeout( () => {
        this.response = null
        this.showResponse = false
        this.isZaq = false
        this.isSticker = false
        this.isImage = false
      }, 15000)
    },
    recieveSticker: function(message){
      console.log('🧦 [CHAT] [SOCKET] recieveSticker', message)
      this.$refs.ouija.stopTimeout()
      this.response = message
      this.showResponse = true
      this.isZaq = true
      this.isSticker = true
      this.isImage = false
      let responseAudio = new Audio('/response.mp3')
      responseAudio.volume = 0.25
      responseAudio.play()
      let date = new Date()
      let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      // Add the message to the log
      this.log.push(`${time} - I recieved a sticker... what does it mean?`)
      setTimeout( () => {
        this.response = null
        this.showResponse = false
        this.isZaq = false
        this.isSticker = false
        this.isImage = false
      }, 15000)
    },
    recieveImage: function(message){
      console.log('🧦 [CHAT] [SOCKET] recieveImage', message)
      this.$refs.ouija.stopTimeout()
      this.response = message
      this.showResponse = true
      this.isZaq = true
      this.isSticker = false
      this.isImage = true
      let responseAudio = new Audio('/response.mp3')
      responseAudio.volume = 0.25
      responseAudio.play()
      let date = new Date()
      let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      // Add the message to the log
      this.log.push(`${time} - I recieved a picture... Is it a clue?`)
      this.inventory.push(message)
      setTimeout( () => {
        this.response = null
        this.showResponse = false
        this.isZaq = false
        this.isSticker = false
        this.isImage = false
      }, 15000)
    }
  },
  methods: {
    setName: function(name){
      this.player = name
      this.askPlayer = false
      this.play = true
      this.audio = new Audio('/ambience.mp3')
      this.audio.volume = 0.3
      this.audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
      this.audio.play()
    },
    showTimeout: function(){
      this.response = 'And there was only silence...'
      this.showResponse = true
        this.isZaq = false
      setTimeout( () => {
        this.response = null
        this.showResponse = false
        this.isZaq = false
      }, 5000)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
  /* Copy this @keyframes block to your CSS*/
  @keyframes ouijaKeys {
      0.0%{
          transform: translate(0px, 0px) rotate(1deg);
      }
      30%{
          transform: translate(0px, -8px) rotate(2deg);
      }
      100%{
          transform: translate(0px, 0px) rotate(1deg);
      }
  }

/* Add the animation: property to whichever element you want to animate */
#the-ouija{
    animation: ouijaKeys 10s ease-in-out 0s infinite normal none;
} 

#app{
  position: relative;
}

</style>
