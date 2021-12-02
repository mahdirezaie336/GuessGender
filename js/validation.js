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
                                document.getElementById("prediction-error").style.visibility = 'visible'
                                return
                            }
                            document.getElementById('gender-predict').innerHTML = data['gender'];
                            document.getElementById('gender-probability').innerHTML = JSON.stringify(data['probability'])
                        })
    
}

document.getElementById("submit-button").onclick = submit;
