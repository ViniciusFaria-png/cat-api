'use strict'

const buscarBtn = document.getElementById('buscarBtn')

const API_KEY = 'live_S35fh490uZx6azDIgD1nCo6sEPPNIHvd2xG85WD622nnViDuQT5Vya5UebwpxP2D'

async function buscarImagens() {
    const racaInput = document.getElementById('racaInput')
    const raca = racaInput.value.trim().toLowerCase()

    const urlRaca = `https://api.thecatapi.com/v1/breeds/search?q=${raca}&api_key=${API_KEY}`
    const respostaRaca = await fetch(urlRaca)
    const dadosRaca = await respostaRaca.json()
    const racaId = dadosRaca[0].id

    const urlImagens = `https://api.thecatapi.com/v1/images/search?breed_ids=${racaId}&limit=10&api_key=${API_KEY}`
    const respostaImagens = await fetch(urlImagens)
    const dadosImagens = await respostaImagens.json()

    return dadosImagens.map(gato => gato.url)
}

function criarCard(imagem) {
    const card = document.createElement('div')
    card.classList.add('card')
    const foto = document.createElement('img')
    foto.src = imagem
    card.appendChild(foto)

    return card
}

async function preencherGaleria() {
    const galeria = document.getElementById('galeria-container')
    const imagens = await buscarImagens()
    const cards = imagens.map(criarCard)

    galeria.replaceChildren(...cards)
}

buscarBtn.onclick = preencherGaleria