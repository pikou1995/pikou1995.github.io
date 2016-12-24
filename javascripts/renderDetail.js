var ERROR_URL = '../data/404.json';



function init(url){
	$.ajax({
		type : 'GET',
		url : url,
		dataType : 'JSON',
		success : function(data){renderDetail(data);},
		error : function(err){
			init(ERROR_URL);
		}
	});
}

function renderMarkdown(selector, file){
	$.ajax({
		type : 'GET',
		url : '../markdowns/' + GetQueryString('No') + '/' + file,
		dataType : 'text',
		success : function(data){
			var html = marked(data);
			$(selector).html(html);
			$(selector + ' img').attr('class', 'img-responsive');
		}.bind(this),
		error : function(err){
			$(selector).html('<p style="color: orange;">markdown file not found!</p>');
		}
	});
	
}
function renderDetail(detail){
	var innerHtml = '<h1 class="text-center">'+detail[0].title+'</h1>' + 
		'<h6 class="text-center text-muted">'+ detail[0].date +'</h6>'+
		detail[0].content;
	$('#main_content').html(innerHtml);
}

function GetQueryString(parameter){
	var reg = new RegExp("(^|&)" + parameter + "=([^&]*)(&|$)");
	var value = window.location.search.substr(1).match(reg);
	if(value !== null) return unescape(value[2]);
	return null;
}

window.onload = function(){
	console.log(1);
	init('../data/' + (GetQueryString('No') || 404) + '.json');
};
