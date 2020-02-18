$(document).ready(function () {
    $("#button1").click(function () {
        const email = $('#phone').val();
        const password = $('#password').val();
        console.log(email)
        console.log(password)

        if (phone == "" || password == "") {
            alert("All fields are Required !")

        } else {
            let url = 'http://localhost:3000/users/v1/login';
            let data = { email: email, password: password };
            fetch(url, {
                method: 'post',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)

            })

                .then(response => response.json())
                .then(function (data) {
                    if (data.status == "200") {
                        localStorage.setItem('status', data.status)
                        localStorage.setItem('token', "Bearer " + data.token)
                        alert("Successfully Logged in.")
                        fetch('http://localhost:3000/users/v1/getCurrentUser', {
                            method: 'get',
                            headers: {
                                "authorization": localStorage.getItem('token')
                            }
                        })
                        .then(res => { return res.json() })
                        .then(data => {
                            console.log(data.admin)
                            if(data.admin === 1){
                                window.location.href = "admin_Dashboard.html"
                            }
                            else{
                                window.location.href = "Dashboard.html"
                            }
                        })    
                   
                        .catch(function (err){
                            console.log(err);
                        })
                    } else {
                        alert("Email or Password doesn't match.")
                    }
                    // console.log('Request succeeded with JSON response', data);
                })
                .catch(function (error) {
                    console.log('Request failed', error);
                });


        }
    });
});