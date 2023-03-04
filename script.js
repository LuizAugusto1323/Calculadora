const calculadora = document.querySelector('.corpo');
const resultado = document.querySelector('.resultado .calculo');
const btns = calculadora.querySelector('.botoes');
const nmrAnterior = document.querySelector('.anterior');
const cronometro = document.querySelector('.cronometro');
const btnsCron = document.querySelectorAll('.btns button');
const horas = document.getElementById('Horas');
const minutos = document.getElementById('Minutos');
const segundos = document.getElementById('Segundos');
const centesimos = document.getElementById('Centesimos');
const nameClass = 'ativo';
let hora = 0;
let minuto = 0;
let segundo = 0;
let centesimas = 0;
let cron = 0;

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
  if (!operacao) {
    if (nmrAtualNaTela === '0') {
      resultado.innerText = btnEspecificoConteudo;
    } else {
      resultado.innerText =
        nmrAtualNaTela.length < 15
          ? nmrAtualNaTela + btnEspecificoConteudo
          : nmrAtualNaTela;
    }
  }
  if (
    operacao === 'soma' ||
    operacao === 'subtrai' ||
    operacao === 'multiplica' ||
    operacao === 'divide'
  ) {
    btnEspecifico.classList.add('apertado');
    calculadora.dataset.firstValue = nmrAtualNaTela;
    calculadora.dataset.digito = operacao;
    nmrAnterior.innerText = nmrAtualNaTela;
    resultado.innerText = '';
  }
  if (operacao === 'ponto') {
    resultado.innerHTML = nmrAtualNaTela + '.';
  }
  if (operacao === 'limpa') {
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
  function mostraAnterior(n1, operador, n2) {
    if (operador === 'soma') {
      nmrAnterior.innerText = n1 + ' + ' + n2;
    }
    if (operador === 'subtrai') {
      nmrAnterior.innerText = n1 + ' - ' + n2;
    }
    if (operador === 'multiplica') {
      nmrAnterior.innerText = n1 + ' * ' + n2;
    }
    if (operador === 'divide') {
      nmrAnterior.innerText = n1 + ' / ' + n2;
    }
  }
});
function handleClick() {
  const result = document.querySelectorAll('.resultado span');
  const cron = document.querySelector('.resultado #contador');
  result.forEach((span) => {
    if (span.classList.contains(nameClass)) {
      span.classList.remove(nameClass);
      cron.classList.add(nameClass);
    } else {
      span.classList.add(nameClass);
      cron.classList.remove(nameClass);
      parar();
    }
  });
}
function iniciar() {
  parar();
  cron = setInterval(() => {
    relogio();
  }, 10);
}
function parar() {
  clearInterval(cron);
}
function reinicio() {
  clearInterval(cron);
  hora = 0;
  minuto = 0;
  segundo = 0;
  centesimas = 0;
  horas.innerText = '0';
  minutos.innerText = '0';
  segundos.innerText = '0';
  centesimos.innerText = '0';
}
function relogio() {
  if (centesimas < 99) {
    centesimas++;
    if (centesimas < 10) {
      centesimas = '0' + centesimas;
    }
    centesimos.innerText = centesimas;
  }
  if (centesimas == 99) {
    centesimas = 0;
  }
  if (centesimas == 0) {
    segundo++;
    if (segundo < 10) {
      segundo = '0' + segundo;
    }
    segundos.innerText = segundo;
  }
  if (segundo == 59) {
    segundo = 0;
    minuto++;
    if (minuto < 10) {
      minuto = '0' + minuto;
    }
  }
  if (minuto == 60) {
    minuto = 0;
    hora++;
    if (hora < 10) {
      hora + '0' + hora;
    }
    minutos.innerText = minuto;
  }
  horas.innerText = hora;
}
btnsCron.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.id === 'inicio') {
      iniciar();
    } else if (btn.id === 'parar') {
      parar();
    } else if (btn.id === 'reinicio') {
      reinicio();
    }
  });
});
cronometro.addEventListener('click', handleClick);
