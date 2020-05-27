<template>
    <div>
    <button  @click="shuffleNotes()">Shuffle</button>
        <ul>
            <li  v-for="note in notes" :key="note">{{note}}</li>
        </ul>
    </div>
</template>

<script>
    import {shuffle} from "@tonaljs/array";

    export default {
        name: "NoteRandomizer",
        data: () => ({
            notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H', 'B']
        }),
        methods: {
            shuffleNotes() {
                this.$set(this.notes, shuffle(this.notes))
            }
        }
    }
</script>

<style scoped>

</style>