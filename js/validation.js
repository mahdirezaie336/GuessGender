let name_regex = /[\w\s]/i;
const url_prefix = "https://api.genderize.io/?name=";

function checkName(event)
{
    
}

function getName()
{
    return document.getElementById("name-field").value.toLowerCase();
}

function submit(event)
{
    let name = getName();
    fetch(url_prefix + name)
        .then(response => response.json())
        .then((data) => {
                            if(data['gender'] == null)
                            {
                                document.getElementById('gender-predict').innerHTML = "None";
                                document.getElementById('gender-probability').innerHTML = "None";
                                document.getElementById("result-error").innerHTML = "Not found!";
                                document.getElementById("result-error").style.visibility = 'visible';
                                return;
                            }
                            document.getElementById("result-error").style.visibility = "hidden";
                            document.getElementById('gender-predict').innerHTML = data['gender'];
                            document.getElementById('gender-probability').innerHTML = data['probability'];
                        });
    
    let saved_gender = localStorage.getItem(name);
    if (saved_gender != null)
        document.getElementById("saved-gender").innerHTML = saved_gender;
    else
        document.getElementById("saved-gender").innerHTML = "None";   
}

function save(event)
{
    a = document.getElementsByName("gender-radio");
    let name, gender;
    // TODO: Name validation
    name = getName();

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
    document.getElementById("saved-gender").innerHTML = gender;
}

function clear(event)
{
    let name = getName();
    localStorage.removeItem(name);
    document.getElementById("saved-gender").innerHTML = "None";
}

document.getElementById("submit-button").onclick = submit;
document.getElementById("save-button").onclick = save;
document.getElementById("clear-button").onclick = clear;
