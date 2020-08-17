<template>
  <v-container>
    <NoteShuffler />
    <chord-checker />
    <note-display />
  </v-container>
</template>

<script>
import NoteShuffler from "@/components/NoteShuffler";
import ChordChecker from "@/components/ChordChecker";
import NoteDisplay from "@/components/NoteDisplay";
export default {
  components: { NoteDisplay, ChordChecker, NoteShuffler },
  name: "Music",
};
</script>

<style scoped></style>
