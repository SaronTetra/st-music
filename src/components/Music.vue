<template>
  <v-container>
    <NoteShuffler />
    <chord-checker />
  </v-container>
</template>

<script>
import NoteShuffler from "@/components/NoteShuffler";
import ChordChecker from "@/components/ChordChecker";
export default {
  components: { ChordChecker, NoteShuffler },
  name: "Music",
};
</script>

<style scoped></style>
