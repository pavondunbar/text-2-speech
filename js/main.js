// Begin Speech Synthesis API
const synth = window.speechSynthesis;

// Set DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// Set Voices
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    // Loop Through Voices. Create Options For Each One
    voices.forEach(voice => {
        // Create Option Element
        const option = document.createElement('option');
        // Fill Option With Voice & Language
        option.textContent = voice.name + '(' + voice.lang + ')';
        // Set Needed Option Attribute
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {   
    synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
    // Check If Speaking
    if (synth.speaking) {
        console.error('Already speaking...');
        return;
    }
    if (textInput.value !== '') {
        // Add Background Wave Animation
        body.style.background = '#000000 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        // Get Speak Text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        // Speak End
        speakText.onend = e => {
            console.log('Done speaking...');
            body.style.background = '#000000';
        }
        // Speak Error
        speakText.onerror = e => {
            console.error('Something went wrong.');
        }
        // Selected Voice Output
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
        // Loop Through Voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });
        
        // Set Pitch & Rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // Speak
        synth.speak(speakText);
    }
};

// EVENT LISTENERS

// Text Form Submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.getBoundingClientRect();
});

// Rate Value Change
rate.addEventListener('change', e => rateValue.textContent = rate.value)

// Pitch Value Change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value )

// Voice Select Change
voiceSelect.addEventListener('change', e => speak());