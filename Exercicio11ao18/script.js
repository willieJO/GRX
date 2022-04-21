class Pessoa{
    constructor(){
        this.id=1; 
        this.arrayPessoa=[];
        this.editId=null;
        this.ordenacao=0;
    }
    salvar(){
        let pessoa=this.lerDados();
        if(this.validaCampo(pessoa)){
            if(this.editId==null){
                this.adicionar(pessoa);
            }else{
                this.atualizar(this.editId,pessoa);
            }
        }
        this.listaTabela(); 
        this.cancelar();
    }

    cancelar(){
        document.getElementById('nome').value='';
        document.getElementById('idade').value='';
        document.getElementById("btn1").innerText='Salvar';
        this.editId=null;
    }

    atualizar(id,pessoa){
        for(let i=0;i<this.arrayPessoa.length;i++){
            if(this.arrayPessoa[i].id==id){
                this.arrayPessoa[i].nomePessoa=pessoa.nomePessoa;
                this.arrayPessoa[i].idadePessoa=pessoa.idadePessoa;
            }
        }
    }

    deletar(id){
        let tbody=document.getElementById("tbody");
        /* Não foi falado que seria necessário de um ID, entretanto,
        Eu criei um sistema de ID para facilitar no momento de deletar,
        dando em vista que pelo método que eu utilizei para deletar,
        se eu usasse somente o nome  acabaria deletando nomes repetidos 
        também.
        */
        if(confirm("Deseja realmente deletar a pessoa com o ID "+id)){
            for(let i=0;i<this.arrayPessoa.length;i++){
                if(id==this.arrayPessoa[i].id){
                    this.arrayPessoa.splice(i,1);
                    tbody.deleteRow(i);
                }
            }
        }
    }

    adicionar(pessoa){
        this.arrayPessoa.push(pessoa);
        this.id++;
    }

    editar(dados){
        this.editId=dados.id;
        document.getElementById("nome").value=dados.nomePessoa;
        document.getElementById("idade").value=dados.idadePessoa;
        document.getElementById("btn1").innerText='atualizar';
    }

    listaTabela(){
        tbody.innerText="";
        for(let i=0;i<this.arrayPessoa.length;i++){
            /*Coloquei o ID para ser mostrado na tabela, mas poderia ser facilmente
            ocultado para seguir exatamnete o layout que foi enviado(apagando a linha
                83, e tirando o ID do html),
            deixei ele amostra para facilitar a visualização. 
            */
            let tr= tbody.insertRow();
            let td_id=tr.insertCell();
            let td_pessoa=tr.insertCell();
            let td_idade=tr.insertCell();
            let td_opcao=tr.insertCell();
            td_id.innerText=this.arrayPessoa[i].id;
            td_pessoa.innerText=this.arrayPessoa[i].nomePessoa;
            td_idade.innerText=this.arrayPessoa[i].idadePessoa;
            td_id.classList.add('center');
            td_pessoa.classList.add('center');
            td_idade.classList.add('center');
            td_opcao.classList.add('center');
            let imgEdit=document.createElement('img');
            imgEdit.setAttribute("onclick","pessoa.editar("+JSON.stringify(this.arrayPessoa[i])+")");

            imgEdit.src='img/editar.png';
            td_opcao.appendChild(imgEdit);
            let imgExcluida=document.createElement('img');
            imgExcluida.setAttribute("onclick","pessoa.deletar("+this.arrayPessoa[i].id+")");
            imgExcluida.src='img/excluir.png';
            td_opcao.appendChild(imgExcluida);
        }
    }

    lerDados(){
        let individo={}
        individo.id=this.id;
        individo.nomePessoa= document.getElementById('nome').value;
        individo.idadePessoa=document.getElementById('idade').value;
        return(individo)
    }

    ordenarIdade(){
        /*  this.ordencao foi o método que desenvolvi para
        mudar a ordem de ordenação
        */
        if(this.ordenacao==0){
            this.ordenaMenorMaior();
        }else{
            this.ordenaMaiorMenor();
        }
    }

    ordenaMaiorMenor(){
        const sortedMaiorMenor=this.arrayPessoa.sort((a,b)=>{
            return b.idadePessoa-a.idadePessoa;
        });
        this.arrayPessoa=sortedMaiorMenor;
        this.listaTabela();
        this.ordenacao=0;
    }
    ordenaMenorMaior(){
        const sortedMenorMaior=this.arrayPessoa.sort((a,b)=>{
            return a.idadePessoa-b.idadePessoa;
        });
        this.arrayPessoa=sortedMenorMaior;
        this.listaTabela();
        this.ordenacao=1;
    }
    
    validaCampo(pessoa){
        let mensagem="";
        if(pessoa.nomePessoa==""){
            mensagem+="Nome não pode ficar em branco \n";
        }
        if(pessoa.idadePessoa==""){
            mensagem+="Idade não pode ficar em branco\n";
        }
        if(mensagem!=''){
            alert(mensagem);
            return false;
        }
        return true;
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

});

//função para não deixa a utilização de numeros no nome
//não sei se o html tem essa opção por nativo,, então fiz ela por javascript
nome.addEventListener("keypress", function(e) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
  
  if (keyCode > 47 && keyCode < 58) {
    e.preventDefault();
  }
});''
var pessoa=new Pessoa();