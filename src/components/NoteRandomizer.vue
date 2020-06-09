<template>
  <v-container>
    <v-layout row wrap justify-center pa-6>
      <v-row justify="center" align="center">
        <v-label>Notes: {{noteDisplay}}</v-label>
        <v-col cols="2">
          <v-list>
            <v-list-item v-for="note in notes" :key="note">{{
              note
            }}</v-list-item>
          </v-list>
          <v-btn @click="shuffleNotes()">Shuffle</v-btn>
          <v-btn @click="playNote()">Note</v-btn>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { shuffle } from "@tonaljs/array";
import {midiToNoteName} from "@tonaljs/midi";

export default {
  name: "NoteRandomizer",
  data: () => ({
    notes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "B", "H"],
    activeNotes: [],
    noteName: "",
  }),
  computed: {
    noteDisplay: function() {
      var notes = []
      for (const note of  this.activeNotes) {
        notes.push(midiToNoteName(note))
      }
      return notes
    }
  },
  methods: {
    shuffleNotes() {
      this.$set(this.notes, shuffle(this.notes));
    },
    playNote() {
      navigator
        .requestMIDIAccess()
        .then(this.onMIDISuccess, this.onMIDIFailure);
    },
    onMIDISuccess(midiAccess) {
      console.log(midiAccess);
      for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = this.getMIDIMessage;
      }
    },
    getMIDIMessage(midiMessage) {
      var command = midiMessage.data[0];
      var note = midiMessage.data[1];
      var velocity = midiMessage.data.length > 2 ? midiMessage.data[2] : 0;
      switch (command) {
        case 144: // noteON
          if (velocity > 0) {
            this.noteOn(note, velocity);
          }
          break;
        case 128: // noteOff
          this.noteOff(note);
          break;
      }
      console.log(this.activeNotes);
      // console.log(midiMessage.data)
    },

    noteOn(note) {
      this.activeNotes.push(note);
    },

    noteOff(note) {
      this.activeNotes.splice(this.activeNotes.indexOf(note), 1);
    },

    onMIDIFailure(midiAccess) {
      console.log(midiAccess);
    },
  },
};
</script>

<style scoped></style>
