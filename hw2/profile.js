document.addEventListener('DOMContentLoaded', function() {

    var today = new Date();
    var month = (today.getMonth() + 1).toString();
    var day = today.getDate().toString();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var maxDate = [today.getFullYear() - 18, month, day].join('-');
    document.getElementById('birth').setAttribute('max', maxDate);

    document.getElementById("update").addEventListener('click', function() {
        document.getElementById("errorMessage").innerHTML = "";
        if (document.getElementById('password').value !== document.getElementById('confirmPassword').value) {
            window.alert("Passwords Don't Match");
            document.getElementById('password').value = "";
            document.getElementById('confirmPassword').value = "";
            return;
        }
        var updateMessage = "You are updating:";
        var isValid = true;
        Array.prototype.forEach.call(document.getElementsByTagName('input'), function(elem) {

            if (elem.value !== "") {

                if (elem.validity.valid) {
                    updateMessage += elem.previousElementSibling.innerHTML + ":" + elem.value;
                } else {
                    isValid = false;
                    console.log(elem.id);
                    errorMessage(elem.id);
                }
            }
        });
        if (isValid) {

            window.alert(updateMessage);
            Array.prototype.forEach.call(document.getElementsByTagName('input'), function(elem) {

                if (elem.value !== "")
                    elem.nextElementSibling.innerHTML = elem.value;
            });
        }
        Array.prototype.forEach.call(document.getElementsByTagName('input'), function(elem) {

            if (elem.value !== "")
                elem.value = "";
        });

    });

    function errorMessage(inputboxId) {
        switch (inputboxId) {
            case 'displayName':
                document.getElementById('errorMessage').innerHTML += "<p>Display Name:Use Only Numbers and Letters </p>";
                break;
            case 'emailID':
                document.getElementById('errorMessage').innerHTML += "<p>Email ID:Use a Valid Email ID with an @ </p>";
                break;

            case 'phoneNumber':
                document.getElementById('errorMessage').innerHTML += "<p>Phone:Use Valid Phone Number  XXX-XXX-XXXX</p>";
                break;

            case 'zip':
                document.getElementById('errorMessage').innerHTML += "<p>Zip:Five Digit Zip </p>";
                break;
            case 'birth':
                document.getElementById('errorMessage').innerHTML += "<p>Date Of Birth :Must Be Over 18</p>";
                break;


        }
    }



});