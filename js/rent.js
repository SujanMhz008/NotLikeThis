$(document).ready(function () {
    $("#buttonRent").click(function () {
        let url = 'http://localhost:3000/houses/v1/rent';
        let data = { houseId: $('houseId').val() };
        fetch(url, {
            method: 'post',
            headers: {
                'authorization': localStorage.getItem('token'),
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(function (data) {
                console.log(data);
                if (data.message === "You have rented a house.") {
                    alert("You have rented a house. Thank you for using our service.")

                } else {
                    alert("Something went wrong.")
                    window.location.href = "login.html"
                    localStorage.setItem('token', "Bearer ")
                }
                console.log('Request succeeded with JSON response', data);
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    });
});