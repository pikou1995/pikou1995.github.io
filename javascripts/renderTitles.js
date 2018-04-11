var TITLES_URL = 'data/titles.json'
var titles = [{ "title": "No data!", "date": "2016/7/19", "src": "500" }]

window.onload = function () {
    $.ajax({
        url: TITLES_URL,
        dataType: 'JSON',
        success: function (data) {
            $('#main_content').empty()
            renderTitles(data)
        },
        error: function (xhr) {
            alert('获取目录出错')
            renderTitles(titles)
        }
    })
}

function renderTitles(titles) {
    var items = []
    for (var src = 0; src < titles.length; src++) {
        var innerHtml = '<a href="details/template.html?id=' + src + '"><h3>' + titles[src].title + '<small class="pull-right">' + titles[src].date + '</small></h3></a>'
        var item = $('<article></article>')
        item.html(innerHtml)
        items.push(item)
    }
    $('#main_content').append(items)
}
