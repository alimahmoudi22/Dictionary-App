const input = document.querySelector("#input");
const button = document.querySelector("#button");
const audio = document.querySelector("#audio");
const resultWrapper = document.querySelector(".result");

function fetchWord() {
    const inputValue = input.value.trim().toLowerCase();

    if (!inputValue) {
        alert("Please enter a word.");
        return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
        .then((res) => res.json())
        .then((data) => {
            const wordData = data[0];
            const meanings = wordData.meanings[0];
            const phonetics = wordData.phonetics;

            
            const audioSrc = phonetics[0]?.audio || '';
            if (audioSrc) {
                audio.setAttribute("src", audioSrc);
            }

            resultWrapper.innerHTML = `
                <div class="word">
                    <h3>${wordData.word}</h3>
                    <button>
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${meanings.partOfSpeech}</p>
                    <p>${phonetics[1]?.text || 'Phonetic not available'}</p>
                </div>
                <p class="word-meaning">${meanings.definitions[0].definition}</p>
                <p class="word-example">${meanings.definitions[0].example || ''}</p>
            `;
        })
        .catch((err) => {
            console.error(err);
            alert("Error fetching the word. Please try again.");
        });
}

button.addEventListener("click", fetchWord);

resultWrapper.addEventListener("click", (event) => {
    if (event.target.closest("i")) {
        audio.play();
    }
});
