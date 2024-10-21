// Função para carregar e exibir músicas na página
function displayMusic() {
    const musicListElement = document.getElementById('musicList');
    musicListElement.innerHTML = ''; // Limpa a lista de músicas antes de atualizar

    const storedMusic = JSON.parse(localStorage.getItem('musicList')) || []; // Recupera a lista de músicas

    storedMusic.forEach((music, index) => {
        const musicItem = document.createElement('li');
        musicItem.innerHTML = `
            <strong>Título:</strong> ${music.title}<br>
            <strong>Artista:</strong> ${music.artist}<br>
            <strong>Gênero:</strong> ${music.genre}<br>
            <strong>Duração:</strong> ${music.duration} min<br>
            <a href="${music.link}" target="_blank">Ouvir Música</a><br>
            <button onclick="deleteMusic(${index})">Excluir</button>
            <hr>
        `;
        musicListElement.appendChild(musicItem);
    });
}

// Função para cadastrar nova música
function addMusic(event) {
    event.preventDefault();

    // Obtém os valores do formulário
    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const genre = document.getElementById('genre').value;
    const duration = document.getElementById('duration').value;
    const link = document.getElementById('link').value;

    // Cria objeto de música
    const newMusic = {
        title: title,
        artist: artist,
        genre: genre,
        duration: duration,
        link: link
    };

    // Recupera a lista de músicas do localStorage
    const musicList = JSON.parse(localStorage.getItem('musicList')) || [];

    // Adiciona a nova música à lista
    musicList.push(newMusic);

    // Armazena a lista atualizada no localStorage
    localStorage.setItem('musicList', JSON.stringify(musicList));

    // Limpa o formulário
    document.getElementById('musicForm').reset();

    // Atualiza a exibição da lista de músicas
    displayMusic();
}

// Função para excluir uma música
function deleteMusic(index) {
    const musicList = JSON.parse(localStorage.getItem('musicList')) || [];
    musicList.splice(index, 1); // Remove a música pelo índice
    localStorage.setItem('musicList', JSON.stringify(musicList));
    displayMusic();
}

// Inicializa a exibição da lista ao carregar a página
window.onload = function () {
    displayMusic();
}

// Adiciona evento ao formulário para cadastrar música
document.getElementById('musicForm').addEventListener('submit', addMusic);