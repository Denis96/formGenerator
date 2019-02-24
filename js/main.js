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

	var exportForm = null;

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

			exportForm =	$(".generateForm");

			delParent =			$(".delParent");
			delGrandParent =	$(".delGrandParent");

		//	Delete all assigned events 
			$("*").unbind();

		//	Returns assign events
			showForm.click(		GenerateFormFunction);
			formName.dblclick(	changeNameShowInputFunction);
			legend.dblclick(	changeNameShowInputFunction);
			label.dblclick(		changeNameShowInputFunction);
			hiddenNames.keypress(changeFocusFunction);
			hiddenNames.focusout(changeNameShowTextFunction);

			addTextQuestion.click(		function() {	generateQuestionFunction($(this), "text")	});
			addPasswordQuestion.click(	function() {	generateQuestionFunction($(this), "password")	});
			addRadioQuestion.click(		function() {	generateQuestionFunction($(this), "radio")	});
			addCheckboxQuestion.click(	function() {	generateQuestionFunction($(this), "checkbox")	});
				addQuestion.click(		function() {	generateQuestionFunction($(this), "others")	});

			addOption.click(		addOptionFunction 		);
				addSubOption.click(	addSubOptionFunction	);
				delSubOption.click(	removeSubOptionFunction	);

			exportForm.click(	function() {	prepareDownload($(this)) }	);

			delParent.click(		removeParentFunction 	);
			delGrandParent.click(	removeGrandParentFunction 	);
	}

	function GenerateFormFunction() {
		var formName = $(this).next().val();
		if ( formName == "" ) {
			alert("Add form name.");
		} else {

			var form = "";

			form += "<div class='divForm'>";
				form += "<div class='headerForm'>";
					form += "<h2 class='formName'>Form Name: ";
						form += "<span class='showName'>"+formName+"</span>";
						form += "<input type='text' class='hiddenName' hidden='hidden'>";
					form += "</h2>";
					form += "<h3>";
						form += "<span class='formName'>Action: ";
							form += "<span class='showName'>google.es</span>";
							form += "<input type='text' class='hiddenName' hidden='hidden'>";
						form += "</span>";
						form += " // ";
						form += "<span class='formName'>Method: ";
							form += "<select class='input uniquePos'>";
								form += "<option value='get'>get</option>";
								form += "<option value='post'>post</option>";
							form += "</select>";
						form += " // ";
						form += "<span class='formName'>Method: ";
							form += "<select class='input uniquePos'>";
								form += "<option value='blank'>_blank</option>";
								form += "<option value='self'>_self</option>";
								form += "<option value='parent'>_parent</option>";
								form += "<option value='top'>_top</option>";
							form += "</select>";
						form += "</span>";
					form += "</h3>";
				form += "</div>";
				form += "<hr>";
					form += "<div class='form'>";
					form += "</div>";
				form += "<hr>";
				form += "<div class='menuOptions'>";
					form += "<p>";
						form += "<span class='h2'>Options: </span>";

						form += "<button class='addTextQuestion buttonColorAdd leftPos'>add text</button> ";
						form += "<button class='addPasswordQuestion buttonColorAdd middlePos'>add password</button> ";
						form += "<button class='addRadioQuestion buttonColorAdd middlePos'>add radio</button> ";
						form += "<button class='addCheckboxQuestion buttonColorAdd rightPos'>add checkbox</button> ";

/*						form += "<button id='addQuestion' class='leftPos'>add other type</button> ";
						form += "<select class='input rightPos'>";
							form += "<option value='date'>(H5) Date</option>";
							form += "<option value='time'>(H5) Time</option>";
							form += "<option value='datetime'>(H5) Datetime</option>";
							form += "<option value='month'>(H5) Month</option>";
							form += "<option value='week'>(H5) Week</option>";
							form += "<option value='number'>(H5) Number</option>";
							form += "<option value='range'>(H5) Range</option>";
							form += "<option value='color'>(H5) Color</option>";
							form += "<option value='email'>(H5) Email</option>";
							form += "<option value='file'>(H5) File</option>";
							form += "<option value='tel'>(H5) Tel</option>";
							form += "<option value='url'>(H5) Url</option>";
							form += "<option value='search'>(H5) Search</option>";
						form += "</select>";*/
					form += "</p>";
					form += "<div class='middleContent'>";
						form += "<input type='text' class='leftPos' id='jsonName' name='jsonName' placeholder='Filename'>";
						form += "<button class='generateForm rightPos'>Export form</button>";
					form += "</div>";
				form += "</div>";
			form += "</div>";

			$("#formContainer > .main").append(form);
			$("#formContainer").removeAttr("hidden");
			updateEvents();
		}
	}

	function generateQuestionFunction(thisButton, typeQuestion) {
		//	Create "fieldset" element with id
			var fieldset = document.createElement("fieldset");
			fieldset.setAttribute("id", ("question"+questionsCounter) );

			var legend = document.createElement("legend");
			var legendSpan = document.createElement("span");
			legendSpan.setAttribute("class", "showName legendSpan" );

			var legendContent = document.createTextNode("Question name");

			var buttonDelete = document.createElement("button");
			buttonDelete.setAttribute("class", "delGrandParent buttonOption buttonColorDel" );
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
					var div = generateOtherQuestionFunction(typeQuestion);
			}
			$(fieldset).append(div);


		//	Create a Add, Delete


		var br = document.createElement("br");

		$(fieldset).append(br);
		if (typeQuestion == "checkbox" || typeQuestion == "radio" ) {
			var buttonAdd = document.createElement("button");
			buttonAdd.setAttribute("class", "addOption" );
			var buttonAddContent = document.createTextNode("add");
			$(buttonAdd).append(buttonAddContent);

			$(fieldset).append(buttonAdd);
		}

		$(thisButton).parentsUntil(".main", ".divForm").children(".form").append(fieldset);

		questionsCounter++;

		updateEvents();

	}

	function generateTextFunction() {
			var div = document.createElement("div");
			div.setAttribute("class", "options" );
			$(div).append( patternOptionRadioFunction(1, questionsCounter, "text") );
			return div;
	}

	function generatePasswordFunction() {
			var div = document.createElement("div");
			div.setAttribute("class", "options" );
			$(div).append( patternOptionRadioFunction(1, questionsCounter, "password") );
			return div;
	}

	function generateRadioFunction() {
			var div = document.createElement("div");
			div.setAttribute("class", "options" );
			for (var i = 1 ; i <= 2 ; i++) {
				$(div).append( patternOptionRadioFunction(i, questionsCounter, "radio") );
			}
			return div;
	}

	function generateCheckboxFunction() {
			var div = document.createElement("div");
			div.setAttribute("class", "options" );
			for (var i = 1 ; i <= 2 ; i++) {
				$(div).append( patternOptionRadioFunction(i, questionsCounter, "checkbox") );
			}
			return div;
	}

	// Returns a div with 2 options
	function patternOptionRadioFunction(number, currentQuestion, optionType, level) {
		var div = document.createElement("div");

			if ( optionType=="radio" || optionType=="checkbox" ) { ////////////////////////// cambiar cuando se cambie la generacion de preguntas

			//	Delete button
				var buttonDelete = document.createElement("button");
				buttonDelete.setAttribute("class", "delParent buttonOption buttonColorDel" );
				var buttonDeleteContent = document.createTextNode("X");
				$(buttonDelete).append(buttonDeleteContent);

				//	Add button
					var buttonAdd = document.createElement("button");
					buttonAdd.setAttribute("class", "addSubOption buttonOption buttonColorAdd" );
					var buttonAddContent = document.createTextNode("+");
					$(buttonAdd).append(buttonAddContent);

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

			} else if ( optionType=="text" || optionType=="password" ) {

				var input = document.createElement("input");
				input.setAttribute("type", optionType );
				input.setAttribute("id", ("opt"+currentQuestion+"-"+number) );
				input.setAttribute("name", ("question"+currentQuestion) );
				
				$(div).append(input);

			}

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
		function generateFormFunction(event) {
			var formContent = "";

				formContent = $(event).parentsUntil(".main", ".divForm").children(".form").html();

			return formContent;
		}
		function prepareDownload(event) {
			var jsonName = $("#jsonName").val();
			var contentJson = generateFormFunction(event);
			jsonName!="" ? download(jsonName+".html", contentJson) : download("your_form.html", contentJson);
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