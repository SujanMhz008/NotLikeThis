$(document).ready(function () {
    $('#button').click(function () {
        const firstname = $('#firstname').val();
        const email = $('#email').val();
        const address = $('#address').val();
        const phone = $('#phone').val();
        const password = $('#password').val();
        const repassword = $('#repassword').val();
        if (firstname == "" || email == "" || password == "") {
            alert("Please fill all field");
        }

        else if (password != repassword) {
            alert("Password and repassword doesnot match!!!")
        }
        else {
            let url = 'http://localhost:3000/users/v1/registration';
            let data = {fullName: firstname, email: email,address:address,phone:phone,password: password };
            fetch(url, {
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(function (data) {
                    if (data.status == "success") {
                        alert("Registered Successfully")
                       
                    } 
                    alert("Registered Successfully")
                    window.location.href = "login.html"
                    console.log("req succ", data);
                })
                .catch(function (error) {
                    console.log("req failed", error);
                });
        }
    });
});