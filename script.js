let musicas = [
    {titulo:"J'ai le coeur en joie",artista:"Chantal Goya",img:"imagens/chantal.jpg",src:"audios/Chantal-Goya-Jai-Le-Cœur-En-Joie-Jai-Le-Cœur-En-Peine-1967-.mp3"},
    {titulo:"Valse Sentimentale",artista:"Tchaikovsky",img:"imagens/tchaikovsky.jpg",src:"audios/Tchaikovsky-Valse-Sentimentale.mp3"},
    {titulo:"Lacrimosa",artista:"Mozart",img:"imagens/mozart.jpg",src:"audios/Mozart-Lacrimosa.mp3"},
]

let audio = document.querySelector("audio");
let img = document.querySelector("img");
let nomeMusica = document.querySelector(".descricao h2");
let nomeArtista = document.querySelector(".descricao em");
let indexMusica = 0;
let fim = document.querySelector(".fim");

renderizarMusica(indexMusica);


audio.addEventListener("timeupdate",atualizarPlayer)
document.querySelector("#btn-play").addEventListener("click",iniciarMusica);
document.querySelector("#btn-pause").addEventListener("click",pausarMusica);

let voltar = document.querySelector("#btn-backward");
voltar.addEventListener("click",() => {
    indexMusica--;
    if(indexMusica < 0) {
        indexMusica = 2
    }

    renderizarMusica(indexMusica);
})

let avancar = document.querySelector("#btn-forward");
avancar.addEventListener("click",() => {
    indexMusica++;
    if(indexMusica > 2){
        indexMusica = 0
    }

    renderizarMusica(indexMusica);
})

function renderizarMusica(index) {
    audio.setAttribute("src",musicas[index].src);
    audio.addEventListener("loadeddata",() => {
        img.setAttribute("src",musicas[index].img);
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        fim.textContent = conversorSegundos(Math.floor(audio.duration));
        document.querySelector("#btn-play").style.display = "block";
        document.querySelector("#btn-pause").style.display = "none";
    })
}
function iniciarMusica() {
    audio.play()
    document.querySelector("#btn-play").style.display = "none";
    document.querySelector("#btn-pause").style.display = "block";
}

function pausarMusica() {
    audio.pause()
    document.querySelector("#btn-play").style.display = "block";
    document.querySelector("#btn-pause").style.display = "none";
}

function atualizarPlayer() {
    let barra = document.querySelector("progress");
    barra.style.width = Math.floor((audio.currentTime/ audio.duration)*100)+"%";
    let minutagem = document.querySelector(".inicio");
    minutagem.textContent = conversorSegundos(Math.floor(audio.currentTime))
}

function conversorSegundos(seg) {
    let minutos = Math.floor(seg/60);
    let segundos = seg % 60;
    if(segundos < 10) {
        segundos = "0"+segundos;
    }

    return minutos+":"+segundos;
}

