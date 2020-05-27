<template>
  <div class="hello">
    <button @click="playNote()">Click me!</button>
  </div>
</template>

<script>
  // import * as Tone from "tone";
  import {playNote} from "./piano"
export default {
  name: 'HelloWorld',
  methods: {
    playNote
  }
}

</script>

<style scoped>
</style>
