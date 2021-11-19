<template>
  <div>
    <input type="text" v-model="theName" class="chat-input input is-large has-background-black has-text-white has-text-centered" placeholder="Who is playing?..." @keyup.enter="setName">
  </div>
</template>

<script>
export default {
  data() {
    return {
      theName: null,
    }
  },
  methods: {
    setName: function(e){
      this.$emit('setName',e.target.value)
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