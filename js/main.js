
$(document).ready(function(){
	var showForm = null;
	var form = null;
	var formName = null;
	var legend = null;
	var hiddenNames = null;
	var label = null;

	var addTextQuestion = null;
	var addPasswordQuestion = null;
	var addRadioQuestion = null;
	var addCheckboxQuestion = null;
		var addQuestion = null;

	var addOption = null;
		var addSubOption = null;
		var delSubOption = null;

	var delParent = null;
	var delGrandParent = null;

	updateEvents();

	var questionsCounter = 1;



	function updateEvents() {
		// Search all elements
			showForm = 		$("#generateForm");
			form = 			$(".form");
			formName = 		$(".formName > span");
			legend = 		$("legend > span");
			label = 		$("label");
			hiddenNames = 	$(".hiddenName");

			addTextQuestion = 		$(".addTextQuestion");
			addPasswordQuestion = 	$(".addPasswordQuestion");
			addRadioQuestion =		$(".addRadioQuestion");
			addCheckboxQuestion =	$(".addCheckboxQuestion");
				addQuestion =		$(".addQuestion");

			addOption = 		$(".addOption");
				addSubOption =	$(".addSubOption");
				delSubOption =	$(".delSubOption");

			delParent =			$(".delParent");
			delGrandParent =	$(".delGrandParent");

		//	Delete all assigned events 
			formName.unbind();
			legend.unbind();
			label.unbind();
			hiddenNames.unbind();

			addTextQuestion.unbind();
			addPasswordQuestion.unbind();
			addRadioQuestion.unbind();
			addCheckboxQuestion.unbind();
				addQuestion.unbind();

			addOption.unbind();
				addSubOption.unbind();
				delSubOption.unbind();

			delParent.unbind();
			delGrandParent.unbind();

		//	Returns assign events
			showForm.click(		showFormFunction);
			formName.dblclick(	changeNameShowInputFunction);
			legend.dblclick(	changeNameShowInputFunction);
			label.dblclick(		changeNameShowInputFunction);
			hiddenNames.keypress(changeFocusFunction);
			hiddenNames.focusout(changeNameShowTextFunction);

			addTextQuestion.click(		function() {	generateQuestionFunction("text")	});
			addPasswordQuestion.click(	function() {	generateQuestionFunction("password")	});
			addRadioQuestion.click(		function() {	generateQuestionFunction("radio")	});
			addCheckboxQuestion.click(	function() {	generateQuestionFunction("checkbox")	});
				addQuestion.click(		function() {	generateQuestionFunction("others")	});

			addOption.click(		addOptionFunction 		);
				addSubOption.click(	addSubOptionFunction	);
				delSubOption.click(	removeSubOptionFunction	);

			delParent.click(		removeParentFunction 	);
			delGrandParent.click(	removeGrandParentFunction 	);
	}

	function showFormFunction() {
		var formName = $(this).parent().children("#formNameText").val();
		if (formName != "") {
			$("#formName > .showName").text(formName);
			$(this).parent().remove();
			$("#formContainer").removeAttr("hidden");
		}
	}

	function generateQuestionFunction(typeQuestion) {
		//	Create "fieldset" element with id
			var fieldset = document.createElement("fieldset");
			fieldset.setAttribute("id", ("question"+questionsCounter) );

			var legend = document.createElement("legend");
			var legendSpan = document.createElement("span");
			legendSpan.setAttribute("class", "showName legendSpan" );

			var legendContent = document.createTextNode("Question name");

			var buttonDelete = document.createElement("button");
			buttonDelete.setAttribute("class", "delGrandParrent buttonOption buttonColorDel" );
			var buttonDeleteContent = document.createTextNode("X");
			$(buttonDelete).append(buttonDeleteContent);

			var hiddenName = document.createElement("input");
			hiddenName.setAttribute("type", "text" );
			hiddenName.setAttribute("hidden", "true" );
			hiddenName.setAttribute("class", "hiddenName" );
		
				$(legendSpan).append(legendContent);
				$(legend).append(buttonDelete);
				$(legend).append(legendSpan);
				$(legend).append(hiddenName);
			$(fieldset).append(legend);
			$(fieldset).append(		hiddenInputFuntion("questionId", questionsCounter)	);
			$(fieldset).append(		hiddenInputFuntion("optionsNumber", 2)				);
			$(fieldset).append(		hiddenInputFuntion("optionsType", "radio")			);

		///// Añade 1 hijo del tipo de pregunta
			switch (typeQuestion) { 
				case 'text': 
					var div = generateTextFunction();
					break;
				case 'password': 
					var div = generatePasswordFunction();
					break;
				case 'radio': 
					var div = generateRadioFunction();
					break;		
				case 'checkbox': 
					var div = generateCheckboxFunction();
					break;
				default:
					var div = generateRadioFunction(typeQuestion);
			}
			$(fieldset).append(div);


		//	Create a Add, Delete
			var buttonAdd = document.createElement("button");
			buttonAdd.setAttribute("class", "addOption" );
			var buttonAddContent = document.createTextNode("add");
			$(buttonAdd).append(buttonAddContent);

			var buttonDelete = document.createElement("button");
			buttonDelete.setAttribute("class", "buttonColorDel" );
			var buttonDeleteContent = document.createTextNode("delete question");
			$(buttonDelete).append(buttonDeleteContent);

			/*var buttonSwap = document.createElement("button");
			buttonSwap.setAttribute("class", "swapQuestion" );
			var buttonSwapContent = document.createTextNode("swap");
			$(buttonSwap).append(buttonSwapContent);*/
		
		var br = document.createElement("br");

		$(fieldset).append(br);
		$(fieldset).append(buttonAdd);
		//$(fieldset).append(buttonSwap);

		$(form).append(fieldset);

		questionsCounter++;

		updateEvents();

	}

	function generateRadioFunction() {
		//	Create "fieldset" element with id
			var fieldset = document.createElement("fieldset");
			fieldset.setAttribute("id", ("question"+questionsCounter) );

			var legend = document.createElement("legend");
			var legendSpan = document.createElement("span");
			legendSpan.setAttribute("class", "showName legendSpan" );

			var legendContent = document.createTextNode("Question name");

			var buttonDelete = document.createElement("button");
			buttonDelete.setAttribute("class", "delGrandParrent buttonColorDel" );
			var buttonDeleteContent = document.createTextNode("X");
			$(buttonDelete).append(buttonDeleteContent);


			var hiddenName = document.createElement("input");
			hiddenName.setAttribute("type", "text" );
			hiddenName.setAttribute("hidden", "true" );
			hiddenName.setAttribute("class", "hiddenName" );

		
			$(legendSpan).append(legendContent);
			$(legend).append(buttonDelete);
			$(legend).append(legendSpan);
			$(legend).append(hiddenName);
		$(fieldset).append(legend);
		$(fieldset).append(		hiddenInputFuntion("questionId", questionsCounter)	);
		$(fieldset).append(		hiddenInputFuntion("optionsNumber", 2)				);
		$(fieldset).append(		hiddenInputFuntion("optionsType", "radio")			);

		//	Create a "div" with 2 options
			var div = document.createElement("div");
			div.setAttribute("class", "options" );
			for (var i = 1 ; i <= 2 ; i++) {
				$(div).append( patternOptionRadioFunction(i, questionsCounter, "radio") );
			}
			$(fieldset).append(div);

		//	Create a Add, Delete
			var buttonAdd = document.createElement("button");
			buttonAdd.setAttribute("class", "addOption" );
			var buttonAddContent = document.createTextNode("add");
			$(buttonAdd).append(buttonAddContent);

			var buttonDelete = document.createElement("button");
			buttonDelete.setAttribute("class", "buttonColorDel" );
			var buttonDeleteContent = document.createTextNode("delete question");
			$(buttonDelete).append(buttonDeleteContent);

			/*var buttonSwap = document.createElement("button");
			buttonSwap.setAttribute("class", "swapQuestion" );
			var buttonSwapContent = document.createTextNode("swap");
			$(buttonSwap).append(buttonSwapContent);*/
		
		var br = document.createElement("br");

		$(fieldset).append(br);
		$(fieldset).append(buttonAdd);
		//$(fieldset).append(buttonSwap);

		$(form).append(fieldset);

		questionsCounter++;

		updateEvents();

	}

	// Returns a div with 2 options
	function patternOptionRadioFunction(number, currentQuestion, optionType, level) {
		var div = document.createElement("div");

		//	Delete button
			var buttonDelete = document.createElement("button");
			buttonDelete.setAttribute("class", "delOption buttonOption buttonColorDel" );
			var buttonDeleteContent = document.createTextNode("X");
			$(buttonDelete).append(buttonDeleteContent);

			if ( level!=2 ) { ////////////////////////// cambiar cuando se cambie la generacion de preguntas
				//	Delete button
					var buttonDelete = document.createElement("button");
					buttonDelete.setAttribute("class", "delOption buttonOption buttonColorDel" );
					var buttonDeleteContent = document.createTextNode("X");
					$(buttonDelete).append(buttonDeleteContent);

				//	Add button
					var buttonAdd = document.createElement("button");
					buttonAdd.setAttribute("class", "addSubOption buttonOption buttonColorAdd" );
					var buttonAddContent = document.createTextNode("+");
					$(buttonAdd).append(buttonAddContent);
			} else {
				//	Delete button
					var buttonDelete = document.createElement("button");
					buttonDelete.setAttribute("class", "delSubOption buttonOption buttonColorDel" );
					var buttonDeleteContent = document.createTextNode("X");
					$(buttonDelete).append(buttonDeleteContent);
			}

		//	Input (radio or checkbox (+15))
			var input = document.createElement("input");
			input.setAttribute("type", optionType );
			input.setAttribute("disabled", "disabled" );
			input.setAttribute("id", ("opt"+currentQuestion+"-"+number) );
			input.setAttribute("name", ("question"+currentQuestion) );

		//	Label for input
			var label = document.createElement("label");
			label.setAttribute("class", "showName" );
			label.setAttribute("for", ("opt"+currentQuestion+"-"+number) );
			var labelContent = document.createTextNode(("New option"));
			$(label).append(labelContent);

			var hiddenName = document.createElement("input");
			hiddenName.setAttribute("type", "text" );
			hiddenName.setAttribute("hidden", "true" );
			hiddenName.setAttribute("class", "hiddenName" );

		$(div).append(buttonDelete);
		$(div).append(buttonAdd);
		$(div).append(input);
		$(div).append(label);
		$(div).append(hiddenName);

		return div;
	}

	function addOptionFunction() {
		//	Info for greate a option
			var currentQuestion = $(this).parent().children(".questionId").attr("value");
			var optionType = $(this).parent().children(".optionsType").attr("value");

			var optionsNumber = parseInt( $(this).parent().children(".optionsNumber").attr("value") )+1;
			$(this).parent().children(".optionsNumber").attr("value", optionsNumber);


		$(this).parent().children("div").append( patternOptionRadioFunction(optionsNumber, currentQuestion, optionType) );
		updateEvents();
	}

	function addSubOptionFunction() {
		if( !$(this).parent().has(".subOption").length ) {
			var div = document.createElement("div");
			div.setAttribute("class", "subOption" );
			$(this).parent().append( div );

			$(this).parent().children(".subOption").append( hiddenInputFuntion("optionId", 1) );
			$(this).parent().children(".subOption").append( hiddenInputFuntion("optionsNumber", 1) );
		}

		var optionsNumber = $(this).parent().children(".subOption").children(".optionId").val();
		var optionId = $(this).parent().children(".subOption").children(".optionsNumber").val();

		$(this).parent().children(".subOption").append( patternOptionRadioFunction(optionsNumber, optionId, "radio", 2) );
		updateEvents();
	}

	function hiddenInputFuntion(name, value) {
		var hiddenInput = document.createElement("input");
		hiddenInput.setAttribute("type", "hidden" );
		hiddenInput.setAttribute("class", name );
		hiddenInput.setAttribute("name", name );
		hiddenInput.setAttribute("value", value );

		return hiddenInput;
	}



	////// options for remove
		function removeParentFunction() {
			$(this).parent().remove();
		}

		function removeGrandParentFunction() {
			$(this).parent().parent().remove();
		}

		function removeSubOptionFunction() {
			$(this).parent().parent().children("div").length <= 1 ?
					removeGrandParentFunction() :
					removeParentFunction();
		}



	////// change names
		function changeNameShowInputFunction() {
			var hiddenName = $(this).parent().children(".hiddenName");
			hiddenName.val( $(this).text() );
			hiddenName.removeAttr("hidden");
			hiddenName.focus();
			$(this).attr("hidden","true");
		}

		function changeNameShowTextFunction() {
			var hiddenName = $(this).parent().children(".showName");
			$(this).val() != "" ? hiddenName.text( $(this).val() ) : "";
			hiddenName.removeAttr("hidden");
			$(this).attr("hidden","true");
		}

		function changeFocusFunction(e) {
			if (e.key == "Enter") {
				e.preventDefault();
				$(this).blur();
			}
		}

	function camelize(str) {
		return str.replace(/\W+(.)/g, function(match, chr)
			{
				return chr.toUpperCase();
			});
	}


	//////	Functions for download 
		function prepareDownload() {
			var jsonName = $("#jsonName").val();
			var contentJson = generateJSONFunction();
			console.log(contentJson);
			jsonName!="" ? download(jsonName+".json", contentJson) : download("your_json.json", contentJson);
		}
		function download(filename, text) {
			var element = document.createElement('a');
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
			element.setAttribute('download', filename);

			element.style.display = 'none';
			document.body.appendChild(element);

			element.click();

			document.body.removeChild(element);
		}
});