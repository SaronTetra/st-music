<template>
  <v-card max-width="700px">
    <v-card-title>Note Display</v-card-title>
    <v-card-text ref="display" id="display"></v-card-text>
    <v-card-actions>
      <v-card-actions>
        <v-btn text @click="display">Test</v-btn>
      </v-card-actions>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vex from "vexflow";
import { EventBus } from "@/store/store";

export default {
  name: "NoteDisplay",
  data() {
    return {};
  },
  mounted() {
    EventBus.$on("note-played", this.display);
  },
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
  },
  methods: {
    display() {
      const staff = document.getElementById("display");
      if (staff.hasChildNodes()) {
        staff.removeChild(staff.lastChild);
      }

      const vf = new Vex.Flow.Factory({
        renderer: { elementId: "display", height: "250" },
      });
      const score = vf.EasyScore();
      const system = vf.System();

      const trebleNotes = this.notes.filter((note) => /[4-9]/.test(note));
      const bassNotes = this.notes.filter((note) => /[0-3]/.test(note));

      system
        .addStave({
          voices: [
            score.voice(
              score.notes(
                trebleNotes.length === 0
                  ? "(C4)/w"
                  : trebleNotes.length > 1
                  ? "(" + trebleNotes.join(" ") + ")/w"
                  : trebleNotes[0] + "/w"
              )
            ),
          ],
        })
        .addClef("treble")
        .addTimeSignature("4/4");

      system
        .addStave({
          voices: [
            score.voice(
              score.notes(
                bassNotes.length === 0
                  ? "(C3)/w"
                  : bassNotes.length > 1
                  ? "(" + bassNotes.join(" ") + ")/w"
                  : bassNotes[0] + "/w",
                { clef: "bass" }
              )
            ),
          ],
        })
        .addClef("bass")
        .addTimeSignature("4/4");

      system.addConnector();

      vf.draw();
    },
  },
};
</script>

<style scoped></style>
