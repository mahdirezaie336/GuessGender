let name_regex = /[\w\s]+/
const url_prefix = "https://api.genderize.io/?name=";

/**
 * Checks the validity of the name by the regex which is defined
 * in this page. This regex is located above.
 * @param {String} name The name to be checked
 * @returns Returns true if name is valid
 */
function checkName(name)
{
    return name_regex.test(name)
}

/**
 * Gets the name which the user wrote in the form input.
 * @returns The input name which is located in html page
 */
function getName()
{
    return document.getElementById("name-field").value.toLowerCase();
}

/**
 * This function is called when the user clicks on submit button.
 * By calling this function the input name will be sent to the defined
 * URL and gets the result back. Then shows the result in the page.
 * @param {Event} event The event which created by clicking on the button
 * @returns null
 */
function submit(event)
{
    let name = getName();

    // Checking validity of name and show proper errors
    if (!checkName(name))
    {
        document.getElementById("form-error").innerHTML = "Invalid input!";
        document.getElementById("form-error").style.visibility = "visible";
        return;
    }
    else
        document.getElementById("form-error").style.visibility = "hidden";

    // Sending request to the server and show result
    fetch(url_prefix + name)
        .then(response => response.json())
        .then((data) => {
                            // If the server does not have anything for the given name
                            if(data['gender'] == null)
                            {
                                document.getElementById('gender-predict').innerHTML = "None";
                                document.getElementById('gender-probability').innerHTML = "None";
                                document.getElementById("result-error").innerHTML = "Not found!";
                                document.getElementById("result-error").style.visibility = 'visible';
                                return;
                            }
                            // If result got without any problems
                            document.getElementById("result-error").style.visibility = "hidden";
                            document.getElementById('gender-predict').innerHTML = data['gender'];
                            document.getElementById('gender-probability').innerHTML = data['probability'];
                        }).catch((error) => {
                            document.getElementById("result-error").innerHTML = "Network Error!";
                            document.getElementById("result-error").style.visibility = 'visible';
                        });
    
    // Loading saved result from local storage
    let saved_gender = localStorage.getItem(name);
    if (saved_gender != null)
        document.getElementById("saved-gender").innerHTML = saved_gender;
    else
        document.getElementById("saved-gender").innerHTML = "None";   
}

/**
 * This function is called when users clicks on the save button.
 * By calling this function, the result will be saved into local
 * storage.
 * This fucntion at first checks if one of radio buttons are checked.
 * If none was checked then tries to save the result which is got from
 * server. If the user was not submitted anything, shows proper error.
 * @param {Event} event The event which created by clicking on the button
 * @returns null
 */
function save(event)
{
    a = document.getElementsByName("gender-radio");
    let gender, name = getName();

    // Checking validty of the name
    if (!checkName(name))
    {
        document.getElementById("form-error").innerHTML = "Invalid input!";
        document.getElementById("form-error").style.visibility = "visible";
        return;
    }
    else
        document.getElementById("form-error").style.visibility = "hidden";

    // If none of radio buttons are checked
    if (!a[0].checked && !a[1].checked)
    {
        let predicted = document.getElementById("gender-predict").innerHTML;
        if (predicted.toLowerCase() == "male" || predicted.toLowerCase() == "female")
            gender = predicted;
        else
        {
            document.getElementById("form-error").innerHTML = "Choose gender or submit.";
            document.getElementById("form-error").style.visibility = "visible";
            return;
        }
        document.getElementById("form-error").style.visibility = "hidden";
    }
    else
    {
        gender = a[0].checked ? a[0].value : a[1].value;
    }

    // Renew the value saved in local storage
    localStorage.removeItem(name);
    localStorage.setItem(name, gender);
    document.getElementById("saved-gender").innerHTML = gender;
}

/**
 * This function is called when user clicked on the clear button.
 * By calling this function the saved result for the given name
 * will be removed from local storage.
 * @param {Event} event The event which created by clicking on the button
 */
function clear(event)
{
    let name = getName();
    localStorage.removeItem(name);
    document.getElementById("saved-gender").innerHTML = "None";
}

document.getElementById("submit-button").onclick = submit;
document.getElementById("save-button").onclick = save;
document.getElementById("clear-button").onclick = clear;
