/* Creates a simple form bringing the information from the JSON file as a drop list (select list) */
function getProjectIdeas(){
    /* This is a standard XMLHttp Request with a fallout for Miscrosoft Internet Explorer */
	var xmlhttp;
	if (window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	} else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
	xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    		var jsondata = JSON.parse(xmlhttp.responseText); //retrieve result as a JavaScript object
            
            var projects = jsondata.projects;

            /* Creates a Form Select element to allow choosing the Project to display the information*/
			var output='<form>';
            output +='<select id="project_select" onchange="projectSelect()" >';
            output += '<option value="choose">Choose Project</option>';
            for (var i=0; i < projects.length; i++){
                output += '<option value="'+i+'">'+ projects[i].name+'</option>';
            }
			output += '</select>';
            output += '</form>';
            
            document.getElementById("project-name").innerHTML=output;
        }
    }
	xmlhttp.open("GET","projects.json",true);
	xmlhttp.send();
}

/* Takes the name of the project from the selection chosen in order to be used to display its info */
function projectSelect(){
	var selectBox = document.getElementById("project_select");
	var projectIndex = selectBox.options[selectBox.selectedIndex].value;
	getProjectInfo(projectIndex);
}

/* Displays the whole info brought from the JSON file */
function getProjectInfo(i){
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
        /* AJAX Response stuff */
        /* See: https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp */
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var jsondata = JSON.parse(xmlhttp.responseText); //retrieve result as an JavaScript object

            var projects = jsondata.projects;
            
            var output='';
            output += '<table><thead><tr><th>Project Name</th><th>Description</th><th>Status</th></tr></thead>';
            output += '<tbody><tr><td>' + projects[i].name + '</td>';
            output += '<td>' + projects[i].description + '</td>';
            output += '<td>' + projects[i].status+ '</td></tr></tbody></table>';

            document.getElementById("project-info").innerHTML=output;
        }
    }
    /* AJAX Response stuff */
    /* See: https://www.w3schools.com/xml/ajax_xmlhttprequest_send.asp */
    xmlhttp.open("GET","projects.json",true);
    xmlhttp.send();
}

