export function playNote() {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure)
}
function onMIDISuccess(midiAccess) {
    console.log(midiAccess)
    for(var input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
    }
}

function getMIDIMessage(midiMessage) {
    console.log(midiMessage.data)
}

function onMIDIFailure(midiAccess) {
    console.log(midiAccess)
}