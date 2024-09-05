const sentences = [
    { original: "Working at Andeo is a great experience!", translated: "Bei Andeo zu arbeiten ist eine grossartige ________!", answer: "Erfahrung" },
    { original: "I love learning new languages every day.", translated: "Ich liebe es, jeden Tag neue Sprachen zu ________.", answer: "lernen" },
    { original: "Traveling opens up new opportunities.", translated: "Reisen eröffnet neue ________.", answer: "Möglichkeiten" },
    { original: "Reading books expands your knowledge.", translated: "Bücher lesen erweitert dein ________.", answer: "Wissen" },
    { original: "Technology is constantly evolving.", translated: "Technologie entwickelt sich ständig ________.", answer: "weiter" },
    { original: "Exercise is good for your health.", translated: "Sport ist gut für deine ________.", answer: "Gesundheit" },
    { original: "Cooking is a creative activity.", translated: "Kochen ist eine ________ Tätigkeit.", answer: "kreative" },
    { original: "Music can be very soothing.", translated: "Musik kann sehr ________ sein.", answer: "beruhigend" },
    { original: "Art can express deep emotions.", translated: "Kunst kann tiefe ________ ausdrücken.", answer: "Emotionen" },
    { original: "Education is the key to success.", translated: "Bildung ist der Schlüssel zum ________.", answer: "Erfolg" }
];

let currentSentenceIndex = 0;

function checkAnswer() {
    const currentSentence = sentences[currentSentenceIndex];
    const userInput = document.getElementById('user-input').value.trim();
    const result = document.getElementById('result');

    if (userInput.toLowerCase() === currentSentence.answer.toLowerCase()) {
        result.textContent = "Richtig!";
        result.style.color = "green";
    } else {
        result.textContent = `Leider falsch. Die richtige Antwort wäre: ${currentSentence.answer}.`;
        result.style.color = "red";
    }
}

function nextSentence() {
    currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
    const sentence = sentences[currentSentenceIndex];

    document.getElementById('sentence').textContent = sentence.original;
    document.getElementById('translated-sentence').textContent = sentence.translated;
    document.getElementById('user-input').value = '';
    document.getElementById('result').textContent = '';
}

nextSentence();
