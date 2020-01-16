
/*!
 * Get Products Json 0.0.1
 * JavaScript Extension for Drupal 8
 * https://github.com/PabloGMZILLI/Get-products-JSON
*/


if (!/product list/i.test(document.title)) return

setInterval(startSystem, 3000)


function parseProducts (method, siteId) {
    var arr = document.querySelectorAll('td.views-field-product-id')
    var ids = []
    for (var i = 0; i < arr.length; i++){
        // SPLIT BECAUSE IN PERU CMS HAVE COMENTS IN ID FIELDS
        let clearId = arr[i].innerHTML
        if (clearId.includes("\n")){
            clearId = clearId.split("\n")[5]
        }
        ids.push(clearId)

    }


    return Array.from(new Set(ids)).map(id => ({
        id: id.trim(),
        method: method,
        siteID: siteId
    }))
}

function openWindow(method, siteId) {
    var productsToPush = { products:parseProducts (method, siteId) }
    var toJson = JSON.stringify(productsToPush, null, 2)
    window.open('about:blank', 'Push Products JSON').document.write('<pre>' + toJson + '</pre>')
}

function createDiv(container) {
    var divMaster = document.querySelector('.div-master-cmsJson')
    if (divMaster === null && container != null){
        var div = document.createElement('div')
        div.setAttribute('class', 'div-master-cmsJson')
        div.setAttribute('style', 'position: relative; right: 0px; ')
        container.appendChild(div)
    }
}

function createButton() {
    var div = document.querySelector('.div-master-cmsJson')
    var button = document.createElement('button')

    button.setAttribute('class', 'button js-form-submit form-submit btn-getProducts')
    button.setAttribute('id', 'btn-generate-json')
    button.setAttribute('style', 'margin: 4px;')

    button.textContent = 'Gerar JSON'

    div.appendChild(button)


    button.addEventListener('click', function (evt) {

        var method = document.querySelector('.select-getProducts').value
        var siteId = document.querySelector('.input-getProducts').value
        openWindow(method, siteId)
    })

}

function createSelect() {
    var div = document.querySelector('.div-master-cmsJson')
    var select = document.createElement('select')

    select.setAttribute('style', 'margin: 4px;')
    select.setAttribute('class', 'form-select select-getProducts')

    var selectOptions = ['UPDATE','CREATE','DELETE']

    for (var i = 0; i < selectOptions.length; i++) {
        var option = document.createElement("option");
        option.value = selectOptions[i];
        option.text = selectOptions[i];
        select.appendChild(option);
    }
    div.appendChild(select)

}

function createInput() {

    var div = document.querySelector('.div-master-cmsJson')
    var input = document.createElement('input')

    input.setAttribute('class', 'form-text input-getProducts')
    input.setAttribute('style', 'margin: 4px;')
    input.value = 'natura-site'

    div.appendChild(input)

}

function startSystem() {

    var divMaster = document.querySelector('.div-master-cmsJson')
    var buttonGetProducts = document.querySelector('.btn-getProducts')
    var selectGetProducts = document.querySelector('.select-getProducts')
    var inputGetProducts = document.querySelector('.input-getProducts')
    var container = document.querySelector('.view-filters .form--inline')
    if (divMaster === null && buttonGetProducts === null && selectGetProducts === null && inputGetProducts === null && container != null){
        createDiv(container)
        createInput()
        createSelect()
        createButton()
    }

}
