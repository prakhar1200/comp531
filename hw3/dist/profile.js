document.addEventListener('DOMContentLoaded', function() {


    document.getElementById('update').addEventListener('click', function() {
        
        document.getElementById('errorMessage').innerHTML = "";
        document.getElementById('errorMessage').classList.add('hide');
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
                    updateMessage += elem.previousElementSibling.innerHTML + ":" + elem.nextElementSibling.innerHTML+ "-->" + elem.value;
                } else {
                    document.getElementById('errorMessage').classList.remove('hide');
                    isValid = false;
                    errorMessage(elem.id);
                }
            }
        });
        if (isValid) {

            //window.alert(updateMessage);
            Array.prototype.forEach.call(document.getElementsByTagName('input'), function(elem) {

                if (elem.value !== "") {
                    var correspondingID = elem.id+"Val";
                    document.getElementById(correspondingID).innerHTML = elem.value;
                }
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