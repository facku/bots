// ==UserScript==
// @name         Sews Bot[cliente]
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Pluggin para automatizar consultas en SEWS
// @author       Facundo N. Lopez <facku.mail@gmail.com>
// @match        https://eco.sintys.gob.ar/cliente.php
// @grant        none
// ==/UserScript==

var $ = window.$
window.bot = false
window.TIEMPO = {
    one:4000,
    two:6000,
}

function hideBot(){
    $('#btnDespertar').hide()
    $('#btnH').hide()
    $('#btnS').show()
    $('#facku').hide()
}

function showBot(){
    $('#btnDespertar').show()
    $('#btnH').show()
    $('#btnS').hide()
    $('#facku').show()
}

function despertar(){
    window.bot = true
    $('#btnDespertar').html('<i class="glyphicon glyphicon-flash"></i>  Bot activo....').attr('disabled','disabled').removeClass('btn-primary').addClass('btn-success')
    $('#facku').attr('disabled','disabled')
    window.socios = $('#facku').val().split("\n")

    if(window.socios[window.socios.length-1].length==0){
        window.socios.pop()
    }

     descargar(window.socios[0].toString())
}

function dormir(){
    window.bot = false
    $('#btnDespertar').html('Activar Bot <i class="glyphicon glyphicon-ok"></i>').removeAttr('disabled').removeClass('btn-success').addClass('btn-primary')
    $('#facku').removeAttr('disabled')
    $('.modal-backdrop.fade.in').hide()
}

function createInterfaz(){
    document.title = "0wned by @B0t"
    $('body').append('<div style="border-radius:8px;background-color:rgba(0,0,0,0.2);padding:20px;z-index:9999;top:310px;left:4px;position:absolute;">'
                     +'<div class="row">'
                     +'<button class="col-xs-10 btn btn-primary outline btn-small" id="btnDespertar">Activar Bot <i class="glyphicon glyphicon-ok"></i></button>'
                     +'<button class="col-xs-2 btn btn-danger btn-small" id="btnH"><i class="glyphicon glyphicon-resize-small"></i></button>'
                     +'<button class="col-xs-3 btn btn-info btn-block btn-small" id="btnS"><i class="glyphicon glyphicon-resize-full"></i></button>'
                     +'</div>'
                     +'<textarea id="facku" style="border-radius:6px;padding:10px 20px;background-color:rgba(0,0,0,0.75);height:250px;width:280px;border:2px solid lime;color:white;font-size:20px" placeholder="Pegar CUIT\'s aca. Solo uno por renglon"></textarea><div>')
    $('#btnDespertar').on('click',function(){despertar()})
    $('#btnH').on('click',function(){hideBot()})
    $('#btnS').on('click',function(){showBot()})
    $('#btnS').hide()
    $('body').append('<style>#facku::placeholder{color:white;font-size:13px;font-wigth:bold;}#facku:focus{outline: none !important;}</style>')
}

function descargar(doc){
    window.stado = {
        dni:0,
        pdf:0
    };
    $( document ).ajaxComplete(function(event, xhr, settings) {
        if(settings.url=='controlador/cliente/consulta.php?metodo=obtenerPersonaFisicaWSFiltros'){
            window.stado.dni++
            $('button.consultarPorSubTipo').click()
        }
        if(settings.url=="controlador/cliente/generarPDF.php"){
            window.stado.pdf++
            if(window.stado.pdf==2 && window.stado.pdf==2){
                $('a.gpdf').click()
                setTimeout(function(){
                    window.document.getElementById('confirmaDescargaPDF').click()
                    window.socios.shift()
                    $('#facku').val( window.socios.join("\n") )
                    if(window.socios.length>0){
                        setTimeout(function(){
                            document.title = "0wned by @B0t 1:" + Math.ceil(Math.random() * (99 - 10) + 10)
                            descargar(window.socios[0])}
                        ,window.TIEMPO.one)
                        dormir()
                        showBot()
                    }
                    document.title = "0wned by @B0t 2:" + Math.ceil(Math.random() * (99 - 10) + 10)
                },window.TIEMPO.two)

            }
        }
    });
    $('#numeroDocumento').val(doc)
    $('#c-obtenerPersonaFisicaWSFiltros').click()
}

(function() {
    'use strict';

    console.clear()

    window.socios = []

    createInterfaz()

})();
