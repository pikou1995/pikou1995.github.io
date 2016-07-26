var TITLES_URL = 'data/titles.json';
var titles = [{"title":"No data!","date":"2016/7/19","src":"500"}];



window.onload = function(){
	$.ajax({
		type : 'GET',
		url : TITLES_URL,
		dataType : 'JSON',
		success : function(data){renderTitles(data);},
		error : function(err){
			alert(err);
			renderTitles(titles);
		}
	});
};

function renderTitles(titles){
	for(var src = 0; src < titles.length; src++){
		var innerHtml = '<a href="details/template.html?No='+src+'"><h3>'+titles[src].title+'</h3></a>' + '<small>'+ titles[src].date +'</small>';
		var item = $('<div></div>');
		item.html(innerHtml);
		$('#main_content').append(item);
	}

}
