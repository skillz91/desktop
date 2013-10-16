function showLoading(text) {
	$.mobile.loading('show', {
		text: text,
		textVisible: true,
		theme: 'b',
		html: ""
	});
}

function hideLoading() {
	$.mobile.loading('hide');
}

function closeResultPopup() {
	$("#moveResultPopup").popup("close");
}

function initialization() {

	$("#refreshButton1").click(function () {
		loadDocuments();
	});
}

function loadDocuments() {
	var parameters = "{'calcId':'_WFA_NOAU','args':''}";
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		url: "http://192.168.1.136:23222/WebService.asmx/Execute",
		data: parameters,
		success: function (msg) {
			$("#documents").empty();
			fillList();
			showList(msg);
			hideLoading();
			$.mobile.changePage($("#main_page"));
		},
		error: function (msg) {
			alert("Can not connect to web-service.");
		}
	});
	showLoading('�������� ����������');
}

function showList(msg) {
	jsonArray = $.parseJSON(msg.d);
	var types = {};
	for (i = 0; i < jsonArray.length; i++) {
		var document = jsonArray[i];
		var docType = document.ARSO + document.ARSV;
		if (docType in types) {
			types[docType]++;
			refreshCount(docType, types[docType]);
		}
		else {
			types[docType] = 1;
			addDocType(document, docType, types);
		}
		writeInList(document, docType);
	}
}

function refreshCount(docType, count) {
	$('#count' + docType).text(count);
}

function addDocType(document, docType, types) {
	$('<div id="' + docType + '" data-role="collapsible" data-theme="b"/>')
		.append($('<h1>', { text: document.NRSV })
		.append($('<div id="count' + docType + '" class="ui-btn-up-c ui-btn-corner-all custom-count-pos">' + types[docType] + '</div>')))
		.append($('<ul id="list' + docType + '" data-role="listview">'))
		.appendTo($("#documents"));
	$('#documents').trigger('create');
}

function writeInList(document, docType) {
	$('<li/>')
		.attr("data-theme", "c")
		.append($('<a href="#document-details?arso=' + document.ARSO + '&kv=' + document.KEYVALUE + '&kc=' + document.KIDCOPY + '">' + document.NAME + '</a>'))
		.appendTo($('#list' + docType));
	$('#list' + docType).listview().listview('refresh'); 	//TODO: ��� 'refresh' ������� 1 ��� ���� ������� ��� ��������
}

function fillList() {
	$('<div id="type1" data-role="collapsible" data-filter="true" data-theme="b"/>')
	 .append($('<h1>', { text: "Contract-looooooooonnngggg-nnaaaaameeeeee" })
	 .append($('<div id="counttype1" class="ui-btn-up-c ui-btn-corner-all custom-count-pos">3</div>')))
	 .append($('<ul id="listtype1" data-role="listview" data-filter="true">'))
	 .appendTo($("#documents"));
	$('#documents').trigger('create');

	$('<li data-theme="c"/>')
	 .append($('<a href=#>Contract1</a>'))
	 .appendTo($('#listtype1'));
	$('#listtype1').listview().listview('refresh');

	$('<li data-theme="c"/>')
	 .append($('<a href=#>Contract2</a>'))
	 .appendTo($('#listtype1'));
	$('#listtype1').listview().listview('refresh');

	$('<li data-theme="c"/>')
	.append($('<a href=#>Contract3</a>'))
	.appendTo($('#listtype1'));
	$('#listtype1').listview().listview('refresh');
}