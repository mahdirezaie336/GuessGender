let name_regex = /[\w\s]/i;
const url_prefix = "https://api.genderize.io/?name=";

function checkName(event)
{
    
}

function submit(event)
{
    let name = document.getElementById("name-field").value;
    fetch(url_prefix + name)
        .then(response => response.json())
        .then((data) => {
                            if(data['gender'] == null)
                            {
                                document.getElementById('gender-predict').innerHTML = "None";
                                document.getElementById('gender-probability').innerHTML = "None";
                                document.getElementById("result-error").style.visibility = 'visible'
                                return
                            }
                            document.getElementById("result-error").style.visibility = 'hidden'
                            document.getElementById('gender-predict').innerHTML = data['gender'];
                            document.getElementById('gender-probability').innerHTML = data['probability'];
                        })
    
}

function save(event)
{

}

document.getElementById("submit-button").onclick = submit;
document.getElementById("save-button").onclick = save;
