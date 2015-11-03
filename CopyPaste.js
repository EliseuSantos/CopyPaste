/** 
  * @ plugin CopyPaste fornece uma maneira fácil de copiar texto para a área de transferência
  * @Autor Eliseu dos Santos | s.eliseu.santos@gmail.com | https://github.com/EliseuSantos
  * Modo de Uso: 
  * var copypaste = new CopyPaste('#trigger','.texto');
  *@Parametros
   O primeiro parâmetro é o botão ou elemento onde será dado o trigger para cópia.
   O segundo parâmetro é o elemento(input,text-area ou tag) onde tem o texto a ser copiado.
  *Opcional: Caso o elemento a ser copiado seja uma tag exemplo: <p> Texto a ser copiado </p>,
    e o você deseja um conteudo mas específico basta adicionar um data-copy ao elemento sendo assim o plugin 
    ignora seu value ou textontent pegando o valor que está no data-copy.
*/

'use strict';
var elemento,trigger,data_atributo,_this;
 
function CopyPaste(trigger,elemento) {
  this.init(trigger,elemento);
}
 
CopyPaste.prototype.init = function (trigger,elemento) {
  trigger = document.querySelector(trigger);
  _this = this;
  trigger.addEventListener('click', function (){
    data_atributo = document.querySelector(elemento).getAttribute('data-copy');
    if (data_atributo != null) {
      _this.copiaTexto(data_atributo);
    } else {
      var conteudo = document.querySelector(elemento);
      if (_this.verificaInputTextArea(conteudo)) {
        if (conteudo.type === 'hidden') {
          _this.copiaTexto(conteudo.value);
        } else {
          _this.copiaInput(conteudo);
        }
      } else {
        _this.copiaEstrutura(conteudo);
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