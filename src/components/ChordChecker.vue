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
      <v-btn text @click="inversion">Inversion</v-btn>
      <v-switch
        v-model="scale"
        label="Minor chords"
        true-value="minor"
        false-value="major"
      ></v-switch>
      <!--      <v-spacer />-->
      <!--      <v-radio-group v-model="inversions" :mandatory="false" row>-->
      <!--        <v-radio label="Root" value="0"></v-radio>-->
      <!--        <v-radio label="1st" value="1"></v-radio>-->
      <!--        <v-radio label="2nd" value="2"></v-radio>-->
      <!--      </v-radio-group>-->
    </v-card-actions>
    <v-card-subtitle>
      <v-chip
        :color="
          checkChord(chords[scale][currentChord]) ? 'success' : 'light-blue'
        "
      >
        {{ showChord(notes) != null ? showChord(notes).replace("b", "♭") : "" }}
      </v-chip>
      <v-chip>
        {{ test() }}
      </v-chip>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { detect } from "@tonaljs/chord-detect";
import { shuffle } from "@tonaljs/array";
import { Chord } from "@tonaljs/tonal";

export default {
  name: "ChordChecker",
  data() {
    return {
      currentChord: 0,
      scale: "major",
      inversions: "0",
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
        inversion: [],
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
    test() {
      if (this.showChord(this.notes) != null) {
        return Chord.transpose(this.showChord(this.notes), "P4").replace(
          "b",
          "♭"
        );
      }
    },

    inversion() {
      let current = "CM";
      this.chords.inversion.push(current);
      for (let i = 0; i < 11; i++) {
        current = Chord.transpose(current, "P5");
        this.chords.inversion.push(current);
      }
      console.log(this.chords.inversion);
      console.log(this.checkChord("F#M"));
    },

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
