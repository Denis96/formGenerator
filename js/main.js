
$(document).ready(function(){
	var form = null;
	var legend = null;
	var label = null;
	var addForm = null;
	var delForm = null;
	var addQuestion = null;
	var delQuestion = null;
	var swapQuestion = null;
	var addOption = null;
	var delOption = null;

	updateEvents();

	var questionsCounter = 0;



	function updateEvents() {
		form = $(".form");

		addForm = $("#addForm");
		delForm = $(".delForm");
		addQuestion = $(".addQuestion");
		delQuestion = $(".delQuestion");
		swapQuestion = $(".swapQuestion");
		addOption = $(".addOption");
		delOption = $(".delOption");
		legend = $("legend");
		label = $("label");

		addForm.unbind();
		delForm.unbind();
		addQuestion.unbind();
		delQuestion.unbind();
		swapQuestion.unbind();
		addOption.unbind();
		delOption.unbind();
		legend.unbind();
		label.unbind();

		//addForm.click(generateFormFunction);
		delForm.click(removeParentFunction);
		addQuestion.click(generateQuestionFunction);
		delQuestion.click(removeParentFunction);
		swapQuestion.click(swapOptionsTypeFunction);
		addOption.click(addOptionFunction);
		delOption.click(removeParentFunction);
		legend.dblclick(changeNameFunction);
		label.dblclick(changeNameFunction);
	}

	function generateFormFunction() {/*
						<option value="text">Text</option>
						<option value="password">Password</option>
						<option value="radio">Radio</option>
						<option value="checkbox">Checkbox</option>
						<option value="date">(H5) Date</option>
						<option value="time">(H5) Time</option>
						<option value="datetime">(H5) Datetime</option>
						<option value="month">(H5) Month</option>
						<option value="week">(H5) Week</option>
						<option value="number">(H5) Number</option>
						<option value="range">(H5) Range</option>
						<option value="color">(H5) Color</option>
						<option value="email">(H5) Email</option>
						<option value="file">(H5) File</option>
						<option value="tel">(H5) Tel</option>
						<option value="url">(H5) Url</option>
						<option value="search">(H5) Search</option>*/
						
	}

	function generateQuestionFunction() {
		// create "fieldset" element with id
		var fieldset = document.createElement("fieldset");
		fieldset.setAttribute("id", ("question"+questionsCounter) );

		var legend = document.createElement("legend");
		var legendContent = document.createTextNode("Sample");
		
		$(legend).append(legendContent);
		$(fieldset).append(legend);

		// Create a "div" with 2 options
			var div = document.createElement("div");
			for (var i = 1 ; i <= 2 ; i++) {
				$(div).append( patternRadioFunction(i) );
			}
			$(fieldset).append(div);


		var buttonAdd = document.createElement("button");
		buttonAdd.setAttribute("class", "addOption" );
		var buttonAddContent = document.createTextNode("add");
		$(buttonAdd).append(buttonAddContent);

		var buttonDelete = document.createElement("button");
		buttonDelete.setAttribute("class", "delQuestion" );
		var buttonDeleteContent = document.createTextNode("del");
		$(buttonDelete).append(buttonDeleteContent);

		var buttonSwap = document.createElement("button");
		buttonSwap.setAttribute("class", "swapQuestion" );
		var buttonSwapContent = document.createTextNode("swap");
		$(buttonSwap).append(buttonSwapContent);
		
		var br = document.createElement("br");

		$(fieldset).append(br);
		$(fieldset).append(buttonAdd);
		$(fieldset).append(buttonDelete);
		$(fieldset).append(buttonSwap);

		$(this).parent().append(fieldset);

		questionsCounter++;

		updateEvents();

	}

	function patternRadioFunction(i) {
		var div = document.createElement("div");

		var buttonDelete = document.createElement("button");
		buttonDelete.setAttribute("class", "delOption" );
		var buttonDeleteContent = document.createTextNode("X");
		$(buttonDelete).append(buttonDeleteContent);

		var input = document.createElement("input");
		input.setAttribute("type", "radio" );
		input.setAttribute("name", "sample" );
		input.setAttribute("id", ("opt"+questionsCounter+"-"+i) );
		input.setAttribute("name", ("question"+questionsCounter) );

		var label = document.createElement("label");
		label.setAttribute("for", ("opt"+questionsCounter+"-"+i) );
		var labelContent = document.createTextNode(("Option "+i));
		$(label).append(labelContent);

		var br = document.createElement("br");

			$(div).append(buttonDelete);
			$(div).append(input);
			$(div).append(label);
			$(div).append(br);

		return div;
	}

	function addOptionFunction() {
		$(this).parent().children("div").append( patternRadioFunction(3) );
	}

	function removeParentFunction() {
		$(this).parent().remove();
	}

	function changeNameFunction() {
		var content = prompt("", $(this).html());
		if (content != "") {
			$(this).html(content);
		}
	}
});
