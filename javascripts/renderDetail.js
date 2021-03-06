var ERROR_URL = '../data/404.json'



function init(url) {
    $.ajax({
        url: url,
        dataType: 'JSON',
        success: function (data) { renderDetail(data) },
        error: function (err) {
            init(ERROR_URL)
        }
    })
}

function renderMarkdown(selector, file) {
    $.ajax({
        url: '../markdowns/' + getQueryString('id') + '/' + file,
        dataType: 'text',
        success: function (data) {
            $(selector).html(marked(data)).promise().done(function () {
                $(selector + ' img').attr('class', 'img-responsive')
            })
        }.bind(this),
        error: function (err) {
            $(selector).html('<p style="color: orange;">markdown file not found!</p>')
        }
    })
}

function renderDetail(detail) {
    var innerHtml = '<h1 class="text-center">' + detail[0].title + '</h1>' +
        '<h6 class="text-center text-muted">' + detail[0].date + '</h6>' +
        detail[0].content
    $('#main_content').html(innerHtml)
}

function getQueryString(parameter) {
    var reg = new RegExp("(^|&)" + parameter + "=([^&]*)(&|$)")
    var value = window.location.search.substr(1).match(reg)
    if (value !== null) return unescape(value[2])
    return null
}

window.onload = function () {
    init('../data/' + (getQueryString('id') || 404) + '.json')
}
