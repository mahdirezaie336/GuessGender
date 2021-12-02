let name_regex = /[\w\s]/i;
const url_prefix = "https://api.genderize.io/?name=";

function checkName(event)
{
    
}

function submit()
{
    let name = document.getElementById("name-field").value;
    fetch(url + name)
        .then(response => response.json())
        .then((data) => {
                            if(data['gender'] == null)
                            {
                                document.getElementById("prediction-error").style.visibility = 'visible'
                                return
                            }
                            document.getElementById('gender').innerHTML = JSON.stringify(data['gender']);
                            document.getElementById('percentage').innerHTML = JSON.stringify(data['probability'])
                        })
    
}
