//scrolltop

var linkTop = document.querySelector('.scrollTop');

window.addEventListener('scroll', function () {
    linkTop.classList.toggle('active', window.scrollY > 450)
})

function backTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

//modal + xml

const modal = document.querySelector('.containerModal');

        // Função para carregar e processar o arquivo XML
        function loadXMLDoc(dados) {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    displayReceita(this);
                }
            };
            xhttp.open("GET", dados, true);
            xhttp.send();
        }

        // Função para exibir a receita
        function displayReceita(xml) {
            const xmlDoc = xml.responseXML;
            const receita = xmlDoc.getElementsByTagName('receita')[0]; // Apenas pega a primeira receita

            const nome = receita.getElementsByTagName('nome')[0].textContent;
            const imagem = receita.getElementsByTagName('imagem')[0].textContent;
            const ingredientes = receita.getElementsByTagName('ingrediente');
            const modoDePreparo = receita.getElementsByTagName('passo');

            // Atualiza os elementos HTML existentes
            document.querySelector('.modal .comida').src = imagem;
            document.querySelector('.modal .txt h1').textContent = nome;

            const ingredientesList = document.querySelector('.modal .ingredientes');
            ingredientesList.innerHTML = ''; // Limpa a lista atual
            for (let i = 0; i < ingredientes.length; i++) {
                const li = document.createElement('li');
                li.textContent = ingredientes[i].textContent;
                ingredientesList.appendChild(li);
            }

            const modoDePreparoList = document.querySelector('.modal .modoDePreparo');
            modoDePreparoList.innerHTML = ''; // Limpa a lista atual
            for (let j = 0; j < modoDePreparo.length; j++) {
                const li = document.createElement('li');
                li.textContent = modoDePreparo[j].textContent;
                modoDePreparoList.appendChild(li);
            }

            // Exibe o modal após carregar a receita
            modal.classList.add('active');
        }

        // Carrega o XML e exibe a receita ao carregar a página
        loadXMLDoc('receitas.xml');

        function onClose() {
            modal.classList.remove('active');
        }