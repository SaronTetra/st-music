<template>
  <v-card max-width="700px">
    <v-card-title>Note Shuffler</v-card-title>
    <v-card-text>
      <v-chip class="ma-2" v-for="note in notes" :key="note">
        {{ note }}
      </v-chip>
      <v-card-actions>
        <v-btn text @click="shuffleNotes">Shuffle</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>
<script>
import { shuffle } from "@tonaljs/array";

export default {
  name: "NoteShuffler",
  props: {
    notes: {
      default: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "B", "H"],
    },
  },
  methods: {
    shuffleNotes() {
      this.$set(this.notes, shuffle(this.notes));
    },
  },
};
</script>
