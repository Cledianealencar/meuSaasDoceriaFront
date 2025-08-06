document.addEventListener('DOMContentLoaded', function() {
  
  const botaoUm = document.querySelector('.botaoUm');
  
  const botaoDois = document.querySelector('.botaoDois');

 
  botaoUm.addEventListener('click', function() {
    const numero = '5584996103521'; 
    const mensagem = 'Olá! Me encantei com a Doceria Erza e gostaria de fazer uma encomenda personalizada. '; 

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');
  });

  botaoDois.addEventListener('click', function() {
        window.location.href = './Produto.html';

    });

});
