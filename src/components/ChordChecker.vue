<template>
  <v-card max-width="700px">
    <v-card-title>Chord Checker</v-card-title>
    <v-card-subtitle>
      <v-chip
        class="ma-2"
        v-for="chord in chords[scale]"
        :key="chord"
        :color="chord === chords[scale][currentChord] ? 'warning' : 'gray'"
      >
        {{ chord.replace("b", "♭") }}
      </v-chip>
    </v-card-subtitle>
    <v-card-actions>
      <v-btn text @click="shuffleChords">Shuffle</v-btn>
      <v-switch
        v-model="scale"
        label="Minor chords"
        true-value="minor"
        false-value="major"
      ></v-switch>
    </v-card-actions>
    <v-card-subtitle>
      <v-chip
        :color="
          checkChord(chords[scale][currentChord]) ? 'success' : 'light-blue'
        "
      >
        {{ showChord(notes) != null ? showChord(notes).replace("b", "♭") : "" }}
      </v-chip>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { detect } from "@tonaljs/chord-detect";
import { shuffle } from "@tonaljs/array";

export default {
  name: "ChordChecker",
  data() {
    return {
      currentChord: 0,
      scale: "major",
      chords: {
        major: [
          "CM",
          "DbM",
          "DM",
          "EbM",
          "EM",
          "FM",
          "GbM",
          "GM",
          "AbM",
          "AM",
          "BbM",
          "BM",
        ],
        minor: [
          "Cm",
          "Dbm",
          "Dm",
          "Ebm",
          "Em",
          "Fm",
          "Gbm",
          "Gm",
          "Abm",
          "Am",
          "Bbm",
          "Bm",
        ],
      },
    };
  },

  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
    chord(notes) {
      return detect(notes)[0];
    },
  },
  methods: {
    showChord(notes) {
      return detect(notes)[0];
    },
    checkChord(chord) {
      const result = chord === detect(this.notes)[0];
      if (result === true) {
        this.currentChord++;
        this.currentChord = this.clamp(
          this.currentChord,
          0,
          this.chords.length
        );
      }
      return result;
    },
    shuffleChords() {
      this.currentChord = 0;
      this.$set(this.chords[this.scale], shuffle(this.chords[this.scale]));
    },
    clamp(num, min, max) {
      return num <= min ? min : num >= max ? max : num;
    },
  },
};
</script>

<style scoped></style>
