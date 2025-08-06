const botoesDiminuir = document.querySelectorAll('.btn-menor');
const botoesAumentar = document.querySelectorAll('.btn-maior');
const botoesAdicionar = document.querySelectorAll('.btn-adicionar');
const cardItens = document.querySelector('.cardItens');
const cardTotal = document.querySelector('.cardTotal');
const botaoFechar = document.querySelector('.fecharCarrinho');
const carrinho = document.querySelector('.cardCarrinho');
const botaoCarrinhoFooter = document.querySelector('.btn-carrinho');
const totalCarrinhoFooter = document.querySelector('.total-carrinho-footer');

let itensNoCarrinho = [];

botoesAumentar.forEach(botao => {
  botao.addEventListener('click', () => {
    const quantidadeSpan = botao.parentElement.querySelector('.quantidade');
    if (quantidadeSpan) {
      let qtd = parseInt(quantidadeSpan.innerText);
      qtd++;
      quantidadeSpan.innerText = qtd;
    }
  });
});

botoesDiminuir.forEach(botao => {
  botao.addEventListener('click', () => {
    const quantidadeSpan = botao.parentElement.querySelector('.quantidade');
    if (quantidadeSpan) {
      let qtd = parseInt(quantidadeSpan.innerText);
      if (qtd > 1) {
        qtd--;
        quantidadeSpan.innerText = qtd;
      }
    }
  });
});

function atualizarTotalFooter() {
  const somaTotal = itensNoCarrinho.reduce((acc, item) => acc + item.subtotal, 0);
  totalCarrinhoFooter.innerText = `R$ ${somaTotal.toFixed(2).replace('.', ',')}`;
}

function atualizarCarrinhoLateral() {
  cardItens.innerHTML = '';

  itensNoCarrinho.forEach((item, index) => {
    const divItem = document.createElement('div');
    divItem.classList.add('item-carrinho');

    divItem.innerHTML = `
      <span class="nome-item">${item.nome}</span>
      <div class="controle-quantidade">
        <button class="btn-menor-carrinho" data-index="${index}">–</button>
        <span class="quantidade-carrinho">${item.quantidade}</span>
        <button class="btn-maior-carrinho" data-index="${index}">+</button>
      </div>
      <span class="subtotal-item">R$ ${item.subtotal.toFixed(2).replace('.', ',')}</span>
      <button class="btn-remover" data-index="${index}" title="Remover item">🗑️</button>
    `;

    cardItens.appendChild(divItem);
  });

  const somaTotal = itensNoCarrinho.reduce((acc, item) => acc + item.subtotal, 0);
  cardTotal.innerText = `Total: R$ ${somaTotal.toFixed(2).replace('.', ',')}`;

  document.querySelectorAll('.btn-menor-carrinho').forEach(botao => {
    botao.addEventListener('click', () => {
      const idx = parseInt(botao.dataset.index);
      if (itensNoCarrinho[idx].quantidade > 1) {
        const precoUnitario = itensNoCarrinho[idx].subtotal / itensNoCarrinho[idx].quantidade;
        itensNoCarrinho[idx].quantidade--;
        itensNoCarrinho[idx].subtotal = itensNoCarrinho[idx].quantidade * precoUnitario;
        atualizarCarrinhoLateral();
        atualizarTotalFooter();
      }
    });
  });

  document.querySelectorAll('.btn-maior-carrinho').forEach(botao => {
    botao.addEventListener('click', () => {
      const idx = parseInt(botao.dataset.index);
      const precoUnitario = itensNoCarrinho[idx].subtotal / itensNoCarrinho[idx].quantidade;
      itensNoCarrinho[idx].quantidade++;
      itensNoCarrinho[idx].subtotal = itensNoCarrinho[idx].quantidade * precoUnitario;
      atualizarCarrinhoLateral();
      atualizarTotalFooter();
    });
  });

  document.querySelectorAll('.btn-remover').forEach(botao => {
    botao.addEventListener('click', () => {
      const idx = parseInt(botao.dataset.index);
      itensNoCarrinho.splice(idx, 1);
      atualizarCarrinhoLateral();
      atualizarTotalFooter();
    });
  });
}

function adicionarItemAoCarrinho(nome, quantidade, precoUnitario) {
  const itemExistente = itensNoCarrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade += quantidade;
    itemExistente.subtotal = itemExistente.quantidade * precoUnitario;
  } else {
    itensNoCarrinho.push({ nome, quantidade, subtotal: quantidade * precoUnitario });
  }
  atualizarCarrinhoLateral();
  atualizarTotalFooter();
}

botoesAdicionar.forEach(botao => {
  botao.addEventListener('click', () => {
    const produto = botao.closest('.produto-item');
    if (!produto) return;

    const nome = produto.querySelector('h3')?.innerText;
    const precoTexto = produto.querySelector('.preco')?.innerText;
    const quantidadeSpan = produto.querySelector('.quantidade');

    if (!nome || !precoTexto || !quantidadeSpan) return;

    const quantidade = parseInt(quantidadeSpan.innerText);
    const precoUnitario = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));

    adicionarItemAoCarrinho(nome, quantidade, precoUnitario);
    quantidadeSpan.innerText = '1';
  });
});

botaoCarrinhoFooter.addEventListener('click', () => {
  carrinho.classList.add('ativo');
  document.body.classList.add('carrinho-aberto');
});

botaoFechar.addEventListener('click', () => {
  carrinho.classList.remove('ativo');
  document.body.classList.remove('carrinho-aberto');
});

const botaoEnviarWhats = document.querySelector('.cardBotao');

botaoEnviarWhats.addEventListener('click', () => {
  if (itensNoCarrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const numeroWhats = '5584996103521';

  let mensagem = '*Olá! Gostaria de fazer um pedido na Doceria Erza:*\n\n';

  itensNoCarrinho.forEach((item, index) => {
    mensagem += `${index + 1}. ${item.nome}\n`;
    mensagem += `   Quantidade: ${item.quantidade}\n`;
    mensagem += `   Subtotal: R$ ${item.subtotal.toFixed(2).replace('.', ',')}\n\n`;
  });

  const total = itensNoCarrinho.reduce((acc, item) => acc + item.subtotal, 0);
  mensagem += `Total do pedido: R$ ${total.toFixed(2).replace('.', ',')}\n\n`;
  mensagem += 'Aguardo seu retorno para confirmar o pedido.';

  const url = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
});





