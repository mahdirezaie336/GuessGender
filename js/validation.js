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
    
    let saved_gender = localStorage.getItem(name);
    if (saved_gender != null)
        document.getElementById("saved-gender").innerHTML = saved_gender;
}

function save(event)
{
    a = document.getElementsByName("gender-radio");
    let name, gender;
    // TODO: Name validation
    name = document.getElementById("name-field").value;

    if (!a[0].checked && !a[1].checked)
    {
        let predicted = document.getElementById("gender-predict").innerHTML;
        if (predicted.toLowerCase() == "male" || predicted.toLowerCase() == "female")
            gender = predicted;
        else
            return;
    }
    else
    {
        gender = a[0].checked ? a[0].value : a[1].value;
    }

    localStorage.removeItem(name);
    localStorage.setItem(name, gender);
}

function clear(event)
{

}

document.getElementById("submit-button").onclick = submit;
document.getElementById("save-button").onclick = save;
