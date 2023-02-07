const calculadora = document.querySelector('.corpo');
const resultado = document.querySelector('.resultado .calculo');
const btns = calculadora.querySelector('.botoes');
const nmrAnterior = document.querySelector('.anterior');

btns.addEventListener('click', (tecla) => {
  const btnEspecifico = tecla.target;
  const operacao = btnEspecifico.dataset.acao;
  const btnEspecificoConteudo = btnEspecifico.innerText;
  const nmrAtualNaTela = resultado.innerText;

  if (btnEspecifico.matches('button')) {
    Array.from(btnEspecifico.parentElement.children).forEach((botao) => {
      botao.classList.remove('apertado');
    });
  }
  if (!operacao){
    if (nmrAtualNaTela === '0'){
       resultado.innerText = btnEspecificoConteudo;
    } else {
      resultado.innerText = nmrAtualNaTela + btnEspecificoConteudo;
    }
  }
  if (operacao === 'soma' ||
  operacao === 'subtrai' ||
  operacao === 'multiplica' ||
  operacao === 'divide'){
    btnEspecifico.classList.add('apertado');
    calculadora.dataset.firstValue = nmrAtualNaTela;
    calculadora.dataset.digito = operacao;
    nmrAnterior.innerText = nmrAtualNaTela;
    resultado.innerText = "";
  }
    if (operacao === 'ponto'){
        resultado.innerHTML = nmrAtualNaTela + '.';
      }
    if (operacao === 'limpa'){
      nmrAnterior.innerText = '0';
      resultado.innerHTML = '0';
      }
    if (operacao === 'calcula') {
      const primeiroValor = calculadora.dataset.firstValue;
      const operador = calculadora.dataset.digito;
      const segundoValor = nmrAtualNaTela;
      resultado.innerText = calcular(primeiroValor, operador, segundoValor);
      mostraAnterior(primeiroValor, operador, segundoValor);
      
      }
      function calcular(n1, operador, n2) {
        let retorno;
        if (operador === 'soma') {
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
      function mostraAnterior(n1, operador, n2){
        if (operador === 'soma'){
          nmrAnterior.innerText = n1+' + '+n2;
        }
        if (operador === 'subtrai'){
          nmrAnterior.innerText = n1+' - '+n2;
        }
        if (operador === 'multiplica'){
          nmrAnterior.innerText = n1+' * '+n2;
        }
        if (operador === 'divide'){
          nmrAnterior.innerText = n1+' / '+n2;
        }
      }
  }
)
