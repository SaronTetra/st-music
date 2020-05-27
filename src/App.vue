<template>
  <div id="app">
    <HelloWorld />
      <NoteRandomizer/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import NoteRandomizer from "@/components/NoteRandomizer";

export default {
  name: 'App',
  components: {
    NoteRandomizer,
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
