<template>
    <div>
      <input type="text" v-if="!waiting" v-model="message" maxlength="240" class="chat-input input is-large has-background-black has-text-white has-text-centered" placeholder="Talk..." @keyup.enter="sendMessage">
      <input type="text" v-else-if="waiting && !replied" maxlength="240" class="chat-input input is-large has-background-black has-text-white has-text-centered" :placeholder="`Wait ${waitingSeconds} seconds for a response...`" readonly disabled>
      <input type="text" v-else-if="replied" maxlength="240" class="chat-input input is-large has-background-black has-text-white has-text-centered" placeholder="The air feels heavy..." readonly disabled>
    </div>
</template>

<script>
export default {
  props: ['player'],
  data() {
    return {
      message: null,
      waiting: false,
      replied: false,
      timeoutId: null,
      waitingSeconds: 0,
      waitingSecondsIntervalId: 0,
    }
  },
  methods: {
    stopTimeout: function(){
      clearTimeout(this.timeoutId)
      clearInterval(this.waitingSecondsIntervalId)
      this.replied = true
      setTimeout(() => {
        this.waiting = false
        this.replied = false
        this.message = null
      }, 15000)

    },
    sendMessage: function(){
      // trim the input
      let theMessage = this.message.trim()
      // if message is empty, do nothing
      if(!theMessage) return
      this.$socket.client.emit('sendMessage',{
        player: this.player,
        message: theMessage,
      })
      this.message = null
      this.waiting = true
      this.waitingSeconds = 120
      this.timeoutId = setTimeout( () => {
        this.$emit('timeout')
        setTimeout( () => {
          this.waiting = false
        }, 5000)
      }, 120000)
      this.waitingSecondsIntervalId = setInterval( () => {
        this.waitingSeconds--
        if(this.waitingSeconds <= 0){
          clearInterval(this.waitingSecondsIntervalId)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>

.chat-input {
  background-color: transparent;
  border: 0;
  color: white;
   &:focus{
    box-shadow: none;
  }
  &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #647079;
    font-style: italic;
  }

  &:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #647079;
    font-style: italic;
  }

  &::-ms-input-placeholder { /* Microsoft Edge */
    color: #647079;
    font-style: italic;
    }
  }
</style>