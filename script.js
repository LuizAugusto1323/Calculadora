// seleciona o corpo da calc
const calculadora = document.querySelector('.corpo');
//seleciona a span onde fica o resultado
const resultado = document.querySelector('.resultado .calculo');
//seleciona todos os botoes
const btns = calculadora.querySelector('.botoes');
// adicionamos o evento de clique para todos os botoes
btns.addEventListener('click', (tecla) => {
  // seleciona o botao especiofico
  const btnEspecifico = tecla.target;
  // texto do atributo dataset de cada botao
  const operacao = btnEspecifico.dataset.acao;
  // conteudo do botao especifico
  const btnEspecificoConteudo = btnEspecifico.innerText;
  // captura o conteudo atual no span
  const nmrAtualNaTela = resultado.innerText;
  // se for um botao remova a classe "apertado dele
  if (btnEspecifico.matches('button')) {
    Array.from(btnEspecifico.parentElement.children).forEach((botao) => {
      botao.classList.remove('apertado');
    });
  }
  // se nao for uma operacao matematica
  if (!operacao){
    if (nmrAtualNaTela === '0'){
      // muda o numero 0 para o primeiro botao clicado
      resultado.innerText = btnEspecificoConteudo;
    } else {
      // se nao for 0, contate com os numero existente
      resultado.innerText = nmrAtualNaTela + btnEspecificoConteudo;
    }
  }
  if (operacao === 'soma' ||
  operacao === 'subtrai' ||
  operacao === 'multiplica' ||
  operacao === 'divide'){
    // somente para adicionar um estilo no operador selecionado o diferenciando dos demais
    btnEspecifico.classList.add('apertado');
    // cria um atributo que captura o primeiro valor
    calculadora.dataset.firstValue = nmrAtualNaTela;
    // cria um atributo que captura o valor do operador selecionado
    calculadora.dataset.digito = operacao;
    // altera o conteudo atual para o novo inserido apos clicar em um operador
    resultado.innerText = "";
  }
  // só insere o ponto para ser usado em numeros flutuantes
    if (operacao === 'ponto'){
        resultado.innerHTML = nmrAtualNaTela + '.';
      }
      // retorna o primeiro valor para 0
    if (operacao === 'limpa'){
      resultado.innerHTML = '0';
      }
      // caso aperte em calcular
    if (operacao === 'calcula') {
      const primeiroValor = calculadora.dataset.firstValue;
      const operador = calculadora.dataset.digito;
      const segundoValor = nmrAtualNaTela;
      // chamamos a funcao que calcula e colocamos o retorno dela no resultado
      resultado.innerText = calcular(primeiroValor, operador, segundoValor);
      }
      function calcular(n1, operador, n2) {
        let retorno;
        if (operador === 'soma') {
          //parseFloat para retornar um numero flutuante
          retorno = parseFloat(n1) + parseFloat(n2);
        } else if (operador === 'subtrai') {
          retorno = parseFloat(n1) - parseFloat(n2);
        } else if (operador === 'multiplica') {
          retorno = parseFloat(n1) * parseFloat(n2);
        } else if (operador === 'divide') {
          retorno = parseFloat(n1) / parseFloat(n2);
        }
        return retorno;
      }
      
    }
)
