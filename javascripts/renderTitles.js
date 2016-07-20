const TITLES_URL = 'data/titles.json';
var titles = [{"title":"No data!","date":"2016/7/19","src":"500"}];



window.onload = function(){
	$.ajax({
		type : 'GET',
		url : TITLES_URL,
		dataType : 'JSON',
		success : function(data){renderTitles(data)},
		error : function(err){
			alert(err);
			renderTitles(titles);
		}
	});
};

function renderTitles(titles){
	for(let src = 0; src < titles.length; src++){
		let innerHtml = '<a src="details/'+src+'.html"><h3></h3></a>' + 
			'<h5 class="date">'+ titles[src].date +'</h5>'
		let item = $('<div></div>');
		item.html(innerHtml);
		$('#main_content').append(item);
	}

}
