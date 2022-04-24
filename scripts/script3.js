let meuQuizz =
{
	title: "",
	image: "",
	questions: [],
	levels: []
};

/*
0: main.tela-1
1: main.tela-2
2: main.tela-2
3: main.tela-3
4: main.tela-3
5: main.tela-3
6: main.tela-3
*/

let telaAtual = 0;

let infoTitulo = '';
let infoUrlImg = '';
let infoAskQtd = '';
let infoLvlQtd = '';

//Pega as informacões básicas do quizz
function getInfosBasicas() {
    infoTitulo = document.querySelector('input.titulo');
    infoUrlImg = document.querySelector('input.url-img');
    infoAskQtd = document.querySelector('input.ask-qtd');
    infoLvlQtd = document.querySelector('input.lvl-qtd');
    meuQuizz =
    {
        title: "",
        image: "",
        questions: [],
        levels: []
    };

    if((infoTitulo.value.length < 20 || infoTitulo.value.length > 65) 
        || (infoAskQtd.value < 3 || infoLvlQtd.value < 2)
        || !infoUrlImg.value.startsWith("https://")){
        alert(`(1)O Título do quizz deve ter no mínimo 20 e no máximo 65 caracteres\n(2)URL da Imagem: deve ter formato de URL\n(3)Quantidade de perguntas: no mínimo 3 perguntas\n(4)Quantidade de níveis: no mínimo 2 níveis`);
        return;
    }

    meuQuizz.title = infoTitulo.value;
    meuQuizz.image = infoUrlImg.value;

    telaAtual = trocarDeTela(4);
    renderizarPerguntas();
    renderizarNiveis();
}

let telas = '';
function trocarDeTela(screen){
    telas = document.querySelectorAll('main');
    
    for(let i = 0; i < telas.length; i++){
        telas[i].classList.add('hidden');
    }

    telas[screen].classList.remove('hidden');

    return screen;
}

function openForm(elemento){
    const parent = elemento.parentNode.parentNode;
    const form = parent.querySelector('.form-main');

    if(form.classList.contains('hidden')){
        form.classList.remove('hidden');
    }else {
        form.classList.add('hidden');
    }
}

function renderizarPerguntas(){
    let localPerguntas = document.querySelector('.perguntas');
    for(let i = 2; i <= infoAskQtd.value; i++){
        localPerguntas.innerHTML += `
        <section class="form">
            <div class="form-header">
                <h3>Pergunta ${i}</h3>
                <ion-icon name="create-outline" onclick="openForm(this)"></ion-icon>
            </div>
            <div class="form-main hidden">
                <input type="text" placeholder="Texto da pergunta"></input>
                <input type="url" placeholder="Cor de fundo da pergunta"></input>
                <h4>Resposta correta</h4>
                <input type="text" placeholder="Resposta correta"></input>
                <input type="url" placeholder="URL da imagem"></input>
                <h4>Respostas incorretas</h4>
                <input type="text" placeholder="Resposta incorreta 1"></input>
                <input type="url" placeholder="URL da imagem 1"></input>
                <input type="text" placeholder="Resposta incorreta 2"></input>
                <input type="url" placeholder="URL da imagem 2"></input>
                <input type="text" placeholder="Resposta incorreta 3"></input>
                <input type="url" placeholder="URL da imagem 3"></input>
            </div>
        </section>
        `
    }
    localPerguntas.innerHTML += `
        <button type="button" class="main-button" onclick="getPerguntas()">
            Prosseguir pra criar níveis
        </button>
        `
}

function renderizarNiveis(){
    let localNiveis = document.querySelector('.niveis');
    for(let i = 2; i <= infoLvlQtd.value; i++){
        localNiveis.innerHTML += `
        <section class="form">
            <div class="form-header">
                <h3>Nível ${i}</h3>
                <ion-icon name="create-outline" onclick="openForm(this)"></ion-icon>
            </div>
            <div class="form-main hidden">
                <input placeholder="Título do nível"></input>
                <input type="number" placeholder="% de acerto mínima"></input>
                <input placeholder="URL da imagem do nível"></input>
                <input placeholder="Descrição do nível" class="level-description"></input>
            </div>
        </section>
        `
    }
    localNiveis.innerHTML += `
        <button type="button" class="main-button" onclick="getNiveis()">
            Finalizar Quizz
        </button>
        `
}

let arrayInputs = [];

function getPerguntas(){
    const perguntas = document.querySelector('.perguntas').querySelectorAll('.form');
    meuQuizz.questions = [];
    arrayInputs = [];
    for(let i = 0; i < perguntas.length; i++){
        arrayInputs[i] = perguntas[i].querySelectorAll('input'); 
    }
    for(let i = 0; i < arrayInputs.length; i++){
        if(arrayInputs[i][0].value.length < 20 ||
            arrayInputs[i][2].value === "" ||
            arrayInputs[i][4].value === "" ||
            !arrayInputs[i][3].value.startsWith("https://") ||
            !arrayInputs[i][5].value.startsWith("https://") ||
            !arrayInputs[i][1].value.startsWith("#") ||
            !(arrayInputs[i][1].value.length === 7)){
                printTelaError();
                return;
        }
        if(!verificaCor(arrayInputs[i][1].value)){
            alert(`Erro no formato das cores\nDeve ser uma cor em hexadecimal (começar em "#", seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)`);
            return;
        }
    }
    for(let i = 0; i < arrayInputs.length; i++){
        meuQuizz.questions.push({
            title: arrayInputs[i][0].value,
            color: arrayInputs[i][1].value,
                answers: [
                {
                    text: arrayInputs[i][2].value,
                    image: arrayInputs[i][3].value,
                    isCorrectAnswer: true
                },
                {
                    text: arrayInputs[i][4].value,
                    image: arrayInputs[i][5].value,
                    isCorrectAnswer: false
                }]
            });
        if(!(arrayInputs[i][6].value === "") &&
            arrayInputs[i][7].value.startsWith("https://")){
                meuQuizz.questions[i].answers.push({
                    text: arrayInputs[i][6].value,
                    image: arrayInputs[i][7].value,
                    isCorrectAnswer: false
                });
            }
        if(!(arrayInputs[i][8].value === "") &&
            arrayInputs[i][9].value.startsWith("https://")){
                meuQuizz.questions[i].answers.push({
                        text: arrayInputs[i][8].value,
                        image: arrayInputs[i][9].value,
                        isCorrectAnswer: false
                    });
            }
    }
    console.log(meuQuizz.questions);
    //telaAtual = trocarDeTela(5);
}

let arrayInputsNiveis = [];
let arrayAcertoMinimo = [];
function getNiveis(){
    const niveis = document.querySelector('.niveis').querySelectorAll('.form');
    arrayAcertoMinimo = [];
    arrayInputsNiveis = [];
    for(let i = 0; i < niveis.length; i++){
        arrayInputsNiveis[i] = niveis[i].querySelectorAll('input'); 
    }
    for(let i = 0; i < arrayInputsNiveis.length; i++){
        if(arrayInputsNiveis[i][0].value.length < 10 ||
            Number(arrayInputsNiveis[i][1].value) < 0 ||
            Number(arrayInputsNiveis[i][1].value) > 100 ||
            !arrayInputsNiveis[i][2].value.startsWith("https://") ||
            arrayInputsNiveis[i][3].value.length < 30){
                printTelaError();
                return;
            }
        arrayAcertoMinimo.push(Number(arrayInputsNiveis[i][1].value));
    }
    if(temZero(arrayAcertoMinimo)){
        for(let i = 0; i < arrayInputsNiveis.length; i++){
            meuQuizz.levels.push({
                title: arrayInputsNiveis[i][0].value,
                image: arrayInputsNiveis[i][2].value,
                text: arrayInputsNiveis[i][3].value,
                minValue: Number(arrayInputsNiveis[i][1].value)
            });
        }
    }else {
        printTelaError();
        return;
    }
    console.log(meuQuizz.levels);
    telaAtual = trocarDeTela(6);
    enviarQuizz();
}

function sucessoDoQuizz(){
    const quizzFeito = document.querySelector('.quizz-feito');

    if(telaAtual === 6) {
        quizzFeito.innerHTML += `
            <img src="${meuQuizz.image}" alt="">
            <div class="gradient"></div>
            <h3>${meuQuizz.title}</h3>
        `;
    }
}

function voltarHome(){
    telaAtual = trocarDeTela(0);
}

function enviarQuizz(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", meuQuizz);
    promise.then(tratarSucesso);
    promise.catch(tratarErro);
}

function tratarSucesso(resposta){
    sucessoDoQuizz();
    console.log(resposta.data);
}

function tratarErro(resposta){
    console.log(resposta.data);
}

function printTelaError(){
    alert('Erro, confira os dados');
}

function temZero(arr){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === 0) return true;
    }
    return false;
}

function verificaCor(str){
    let arr = [];
    const hex = ['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','a','b','c','d','e','f'];
    for(let i = 0; i < str.length; i++){
        arr[i] = str[i];
    }
    arr.shift();
    for(let i = 0; i < arr.length; i++){
      if(!hex.includes(arr[i])) return false;
    }
    return true;
}

trocarDeTela(0);
