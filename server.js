const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Beispiel-Datenbank mit englischen Sätzen
const sentences = [
    "Working at Andeo is a great experience!",
    "Learning new languages can be fun.",
    "Programming is a valuable skill.",
    "Traveling opens your mind to new cultures.",
    "Reading books enhances knowledge."
];

// Funktion zum Übersetzen eines Satzes
async function translateSentence(sentence, targetLanguage) {
    try {
        const response = await axios.post('https://libretranslate.com/translate', {
            q: sentence,
            source: 'en', // Englisch als Ausgangssprache
            target: targetLanguage, // Zielsprachen-Parameter
            format: 'text'
        });
        return response.data.translatedText;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Funktion zum Erstellen eines Lückentextes
function createGapSentence(translatedSentence) {
    const words = translatedSentence.split(' ');
    const randomIndex = Math.floor(Math.random() * words.length);
    const missingWord = words[randomIndex];
    words[randomIndex] = "______";
    return {
        sentence: words.join(' '),
        missingWord
    };
}

app.get('/sentence', async (req, res) => {
    const lang = req.query.lang || 'de'; // Standardsprache: Deutsch (de)

    // Sprachauswahl: de (Deutsch), fr (Französisch), es (Spanisch), it (Italienisch)
    const languageMap = {
        'DE': 'de',
        'FR': 'fr',
        'ES': 'es',
        'IT': 'it'
    };
    const targetLanguage = languageMap[lang.toUpperCase()] || 'de'; // Fallback auf Deutsch

    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    const translatedSentence = await translateSentence(randomSentence, targetLanguage);

    if (!translatedSentence) {
        return res.status(500).json({ error: "Übersetzung fehlgeschlagen." });
    }

    const gapSentence = createGapSentence(translatedSentence);

    res.json(gapSentence);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
