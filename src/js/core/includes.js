// Importa a biblioteca jQuery
import $ from 'jquery'


// Cria um arrayvazio chamado loadHtmlSuccessCallbacks
const loadHtmlSuccessCallbacks = []


// Defini a função onLoadHtmlSuccess que recebe um parametro callback.
// verifica tambem se ele foi adicinado ao array, se não ele adiciona.
export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}


//A função loadIncludes é definida sem parâmetros e  verifica se há um parent definido.
//ele busca todos os elementos que possuem um atributo wm-include e para cada um deles, 
//faz uma requisição Ajax para o URL definido no atributo wm-include. 
function loadIncludes(parent) {
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(i, e) {
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            success(data) {
                $(e).html(data)
                $(e).removeAttr('wm-include')

                loadHtmlSuccessCallbacks.forEach(
                    callback => callback(data))
                loadIncludes(e)
            }
        })
    })
}

// A função loadIncludes é chamada sem parâmetros, iniciando o 
// processo de busca e inclusão de conteúdo HTML na página.
loadIncludes()