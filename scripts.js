console.log("Js aplicado")

const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click",() =>{
    inputUpload.click();
});

function LerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
            leitor.onload =() => {
                resolve({url: leitor.result, nome: arquivo.name})
            }

            leitor.onerror =() =>{
                reject(`Erro na leitura do arquivo ${arquivo.name}`)
            }

            leitor.readAsDataURL(arquivo)
    })
}

// adicionar tag de arquivo adicionado. 

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags")


// user remover tags

listaTags.addEventListener("click", (evento) =>{
    if (evento.target.classList.contains("remove-tag")){
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
})

// definições das tags

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "Javascript"];
async function verificaTagasDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve(tagsDisponiveis.includes(tagTexto))
        })
    })
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter"){
        evento.preventDefault();
        const tagtexto = inputTags.value.trim();
        if (tagtexto !== ""){
            try{
            const tagExiste = await verificaTagasDisponiveis(tagtexto)
            if(tagExiste){
            const tagNova = document.createElement("li");
            tagNova.innerHTML = `<p>${tagtexto}</p> <img src="./img/close-black.svg" class="remove-tag" />`
            listaTags.appendChild(tagNova);
            inputTags.value = "";
            } else{
                alert("Erro ao verificar a existência da tag, verifique o console") 
            }
            } catch (error){
                console.error("Erro ao verificar a existência da tag");
            }

        }
    }
})

const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            const deuCerto = Math.random() > 0.5;

            if (deuCerto){
                resolve("projeto publicado com sucesso.")
            }else{
                reject("Erro ao publicar o projeto.")
            }
        }, 2000)
    })
}

botaoPublicar.addEventListener("click", async (evento) =>{
    evento.preventDefault();
    
    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try{
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado)
        alert("Deu tudo certo")
    } catch (error){
        console.log("Deu errado: ", error);
        alert("Deu tudo errado!");
    }

});

