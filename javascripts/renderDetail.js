const ERROR_URL = 'data/500.json';



function init(url=ERROR_URL){
	$.ajax({
		type : 'GET',
		url : url,
		dataType : 'JSON',
		success : function(data){renderDetail(data)},
		error : function(err){
			alert(err);
		}
	});
};

function renderDetail(detail){
	let innerHtml = '<h3>'+detail[0].title+'</h3>' + 
		'<h5 class="date">'+ detail[0].date +'</h5>'+
		'<p>'+detail[0].content+'</p';
	$('#main_content').html(innerHtml);
}


