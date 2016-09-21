document.addEventListener("DOMContentLoaded", function() {
    var today = new Date();

    var month = (today.getMonth() + 1).toString();
    var day = today.getDate().toString();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var maxDate = [today.getFullYear() - 18, month, day].join('-');
    //var dob = document.getElementById('birth');
    document.getElementById('dob').setAttribute('max', maxDate);
});

function validateRegistration() {
    if (document.getElementById('r_password').value === document.getElementById('r_confirmPassword').value) {
        return true;
    }
    else {
        window.alert("Passwords Do Not Match");
        return false;
    }
}

function login() {
    if (document.getElementById('username').value === "" || document.getElementById('login_password').value === "") {
        window.alert("Please Enter the Login Information");
        return;
    }
    window.location.assign("main.html")
}