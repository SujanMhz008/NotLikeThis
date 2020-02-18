let houseId = "";
let houseDetails = "";
fetch('http://localhost:3000/houses/v1/getAllHouses', {
    headers: {
        'authorization': localStorage.getItem('token')
    }
})
    .then(res => { return res.json() })
    .then(data => {
        if (data.name === "JsonWebTokenError") {
            alert('please login first')
            window.location.href = 'login.html'
        }
        else {
            console.log(data)
            data.forEach(houses => {
                return houseDetails +=
                    "<div class='div_contents'>" +
                    "<img src='" + "http://localhost:3000/uploads/" + houses.houseImage + "' alt='' style='width:200px;height:120px;'></img> " +
                    "</br>" + "</br>" +
                    "<i id='houseId'>" + "House Id: " + "</i>" +
                    "<i>" + houses.houseId + "</i>" +
                    "</br>" +
                    "<i>" + "House Name: " + "</i>" +
                    "<i>" + houses.houseName + "</i>" +
                    "</br>" +
                    "<i>" + "Price: " + "</i>" +
                    "<i>" + houses.price + "</i>" +
                    "</br>" +
                    "<i>" + "Address: " + "</i>" +
                    "<i>" + houses.address + "</i>" +
                    "</br>" + "</br>" +
                    "<button type='login' id='buttonRent' onclick='rent_house(" + houses.houseId + ")'" + ">Rent" + "</button>" +
                    
                    "</div>"
            });
            $("#houseDetails").append(houseDetails);
        }
    })

    .catch(error => {
        console.log(error);
    })

function rent_house(houseId) {
    console.log(houseId)
    let data = { housesId: houseId };
    fetch('http://localhost:3000/houses/v1/rent/', {
        method: "POST",
        headers: {
            "authorization": localStorage.getItem('token'),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(function (data) {
            console.log(data);
            if (data.message === "You have rented a house.") {
                alert("You have rented a house. Thank you for using our service.")

            } else {
                alert("Something went wrong.")
                window.location.href = "login.html"
                localStorage.setItem('token', "Bearer ")
            } console.log('Request succeeded with JSON response', data);
        })
        .catch(error => {
            console.log(error)
            alert("Something went wrong")
        });
}