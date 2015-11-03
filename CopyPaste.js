'use strict';
var elemento,trigger,data_atributo;
 
function CopyPaste(trigger,elemento) {
  this.init(trigger,elemento);
}
 
CopyPaste.prototype.init = function (trigger,elemento) {
  trigger = document.querySelector(trigger);
  trigger.addEventListener('click', function (){
    data_atributo = document.querySelector(elemento).getAttribute('data-copy');
    if (data_atributo != null) {
      this.copiaTexto(data_atributo);
    } else {
      var conteudo = document.querySelector(elemento);
      if (this.verificaInputTextArea(conteudo)) {
        if (conteudo.type === 'hidden') {
          this.copiaTexto(conteudo.value);
        } else {
          this.copiaInput(conteudo);
        }
      } else {
        this.copiaEstrutura(conteudo);
      }
    }
  });
};

//Cria Estrutura Temporária para ser usada na proxima função.
CopyPaste.prototype.criaEstrutura = function (texto) {
  var tag = document.createElement('pre');
  tag.textContent = texto;
  return tag;
};

//Caso não seja input cria um range no texto e executa a cópia.
CopyPaste.prototype.copiaEstrutura = function (texto) {
  var selecao = getSelection();
  selecao.removeAllRanges();

  var range = document.createRange();
  range.selectNodeContents(texto);
  selecao.addRange(range);

  document.execCommand('copy');
  selecao.removeAllRanges();
};

//Verifica se o elemento é input ou textarea
CopyPaste.prototype.verificaInputTextArea = function (elemento) {
  return elemento.nodeName === 'INPUT' || elemento.nodeName === 'TEXTAREA';
};

//Caso seja input copia seu valor
CopyPaste.prototype.copiaInput = function (texto) {
  texto.select();
  document.execCommand('copy');
  getSelection().removeAllRanges();
};

//Copia texto contido no elmento passado
CopyPaste.prototype.copiaTexto = function(texto) {
  var tag = this.criaEstrutura(texto);
  document.body.appendChild(tag);
  this.copiaEstrutura(tag);
  document.body.removeChild(tag);
};

