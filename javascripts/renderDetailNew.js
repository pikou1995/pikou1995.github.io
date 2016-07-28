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

function renderDetail(detail){
	var innerHtml = '<h1 class="text-center">'+detail[0].title+'</h1>' + 
		'<h6 class="text-center text-muted">'+ detail[0].date +'</h6>'+
		'<p>'+detail[0].content+'</p>';
	$('#main_content').html(innerHtml);
}

function GetQueryString(parameter){
	var reg = new RegExp("(^|&)" + parameter + "=([^&]*)(&|$)");
	var value = window.location.search.substr(1).match(reg);
	if(value !== null) return unescape(value[2]);
	return null;
}
window.onload = function(){
	if(GetQueryString('No') === null)
		init(ERROR_URL);
	init('../data/'+GetQueryString('No')+'.json');
};
