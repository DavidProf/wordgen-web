import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import words from './words.json';
import logo from './logo512.png';


toast.configure({
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
});

function App() {
    const [randomWords, setRandomWords] = React.useState('');
    const [allowAdjective, setAllowAdjective] = React.useState(true);
    const [allowAdverb, setAllowAdverb] = React.useState(true);
    const [allowNoun, setAllowNoun] = React.useState(true);
    const [allowVerb, setAllowVerb] = React.useState(true);
    const [allowCompound, setAllowCompound] = React.useState(false);

    function setRandomWord() {
        const allWords = [];
        if (allowAdjective)
            allWords.push(...words.adjective);
        if (allowAdverb)
            allWords.push(...words.adverb);
        if (allowNoun)
            allWords.push(...words.noun);
        if (allowVerb)
            allWords.push(...words.verb);

        if (!allowCompound) {
            const filtered = allWords.filter(w => !/\s/g.test(w));
            allWords.length = 0;
            allWords.push(...filtered);
        }

        let index = Math.round(Math.random() * allWords.length - 1);

        setRandomWords(allWords[index]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => { setRandomWord() }, []);

    return (
        <div className="App">
            <div className="principal">
                <img src={logo} alt="Word generator" title="Word generator" />
                <button
                    title="click to generate a new word"
                    className="generate"
                    onClick={setRandomWord}>
                    generate word(s)
                </button>
                <p
                    id="random_word"
                    onClick={() => {
                        const elementToCopy = document.createElement('textarea');
                        elementToCopy.innerText = randomWords;
                        document.body.appendChild(elementToCopy);
                        elementToCopy.select();
                        document.execCommand('copy');
                        elementToCopy.remove();
                        toast.dark('Copied');
                    }}>
                    {randomWords}
                </p>

                <div className="options">
                    <button
                        title="enable/disable adjectives"
                        aria-pressed={allowAdjective}
                        onClick={() => setAllowAdjective(!allowAdjective)}>
                        adjective
                    </button>
                    <button
                        title="enable/disable adverb"
                        aria-pressed={allowAdverb}
                        onClick={() => setAllowAdverb(!allowAdverb)}>
                        adverb
                    </button>
                    <button
                        title="enable/disable noun"
                        aria-pressed={allowNoun}
                        onClick={() => setAllowNoun(!allowNoun)}>
                        noun
                    </button>
                    <button
                        title="enable/disable verb"
                        aria-pressed={allowVerb}
                        onClick={() => setAllowVerb(!allowVerb)}>
                        verb
                    </button>
                    <button
                        title="enable/disable compound"
                        aria-pressed={allowCompound}
                        onClick={() => setAllowCompound(!allowCompound)}>
                        compound
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
