import React, { useState, useEffect } from 'react';

function App() {
    const [sentence, setSentence] = useState('');
    const [missingWord, setMissingWord] = useState('');
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [language, setLanguage] = useState('DE');

    // Fetch sentence on component mount and when language changes
    useEffect(() => {
        fetchSentence();
    }, [language]);

    // Fetch sentence based on selected language
    const fetchSentence = async () => {
        try {
            const response = await fetch(`/sentence?lang=${language}`);
            const data = await response.json();
            setSentence(data.sentence);
            setMissingWord(data.missingWord);
            setFeedback('');  // Reset feedback
            setUserInput('');  // Clear user input
        } catch (error) {
            console.error('Fehler beim Laden des Satzes:', error);
        }
    };

    // Handle form submission and check the user's answer
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim().toLowerCase() === missingWord.trim().toLowerCase()) {
            setFeedback('Richtig!');  // If correct
        } else {
            setFeedback(`Falsch! Die richtige Antwort war: ${missingWord}`);  // If incorrect
        }
    };

    return (
        <div className="container">
            <h1>Sprachen lernen</h1>

            {/* Language selection dropdown */}
            <label>Sprache auswählen: </label>
            <select onChange={(e) => setLanguage(e.target.value)} value={language}>
                <option value="DE">Deutsch</option>
                <option value="FR">Französisch</option>
                <option value="ES">Spanisch</option>
                <option value="IT">Italienisch</option>
            </select>

            {/* Display sentence with missing word */}
            <p>{sentence}</p>

            {/* Form for user input */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Füge das fehlende Wort ein"
                />
                <button type="submit">Prüfen</button>
            </form>

            {/* Feedback message */}
            <p>{feedback}</p>

            {/* Button for fetching a new sentence */}
            <button onClick={fetchSentence}>Nächster Satz</button>
        </div>
    );
}

export default App;
