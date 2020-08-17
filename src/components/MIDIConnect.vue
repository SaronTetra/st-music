<template>
  <v-container>
    <v-layout row wrap justify-center pa-6>
      <v-row justify="center" align="center">
        <v-label>Notes: {{ noteDisplay }}</v-label>
        <v-label>Chord: {{ chord }}</v-label>
        <v-btn @click="playNote()" block>MIDI</v-btn>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { midiToNoteName } from "@tonaljs/midi";
import { detect } from "@tonaljs/chord-detect";
import { EventBus } from "@/store/store";

export default {
  name: "MIDIConnect",
  data: () => ({
    activeNotes: [],
    noteName: "",
  }),
  computed: {
    noteDisplay: function () {
      const notes = [];
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      const activeNotes = this.activeNotes.sort();
      for (const note of activeNotes) {
        notes.push(midiToNoteName(note));
      }
      this.setNotes(notes);
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
      for (let input of midiAccess.inputs.values()) {
        input.onmidimessage = this.getMIDIMessage;
      }
    },
    getMIDIMessage(midiMessage) {
      const command = midiMessage.data[0];
      const note = midiMessage.data[1];
      const velocity = midiMessage.data.length > 2 ? midiMessage.data[2] : 0;
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
      // console.log(this.activeNotes);
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
    setNotes(notes) {
      this.$store.commit("setNotes", notes);
      EventBus.$emit("note-played");
    },
  },
};
</script>
