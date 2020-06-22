<template>
  <v-container>
    <v-layout row wrap justify-center pa-6>
      <v-row justify="center" align="center">
        <v-label>Notes: {{ noteDisplay }}</v-label>
        <v-label>Chord: {{ chord }}</v-label>
        <v-col cols="12">
          <NoteShuffler />
          <!--          <v-btn @click="playNote()">Note</v-btn>-->
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { midiToNoteName } from "@tonaljs/midi";
import { detect } from "@tonaljs/chord-detect";
import NoteShuffler from "@/components/NoteShuffler";

export default {
  name: "NoteRandomizer",
  components: { NoteShuffler },
  data: () => ({
    activeNotes: [],
    noteName: "",
  }),
  computed: {
    noteDisplay: function () {
      var notes = [];
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      var activeNotes = this.activeNotes.sort();
      for (const note of activeNotes) {
        notes.push(midiToNoteName(note));
      }
      return notes;
    },
    chord: function () {
      return detect(this.noteDisplay);
    },
  },
  methods: {
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
