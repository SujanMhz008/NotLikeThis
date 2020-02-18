let tblBody = $("#tblbody");
let oneRow = "";
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
            data.map(houses => {
                localStorage.setItem('houseName'+houses.houseId, houses.houseName);
                localStorage.setItem('contactInfo'+houses.houseId, houses.contactInfo);
                localStorage.setItem('price'+houses.houseId, houses.price);
                return oneRow += " <tr class='text-light'>" +
                    "<td>" + houses.houseId + "</td>" +
                    "<td>" + houses.houseName + "</td>" +
                    "<td>" + houses.address + "</td>" +
                    "<td>" + houses.contactInfo + "</td>" +
                    "<td>" + houses.price + "</td>	" +
                    "<td>" + houses.categoryCategoryId + "</td>	" +
                    "<td><button type='del' id='buttonTable'  onclick='deletehouse(" + houses.houseId + ")' class='btn-light'>Delete</button></td>" +
                    "<td><button type='del' id='buttonTable'  onclick='updateHouse(" + houses.houseId + ")' class='btn-light'>Update</button></td>" +
                    "</tr>";
            });

            $("#tbodyHouse").html(oneRow);

        }
    })

    .catch(error => {
        console.log(error);
    });

function deletehouse(houseId) {
    console.log(houseId)
    fetch('http://localhost:3000/houses/v1/deleteHouse/' + houseId, {
        method: "DELETE",
        headers: {
            'authorization': localStorage.getItem('token'),
            "Content-Type": "application/json"
        }
    }).then(res => { return res.json() })
        .then(data => {
            if (data.status === "200") {
                alert("Deleted !")
                window.location.href = 'admin_Dashboard.html'
            }
        })
        .catch(error => {
            console.log(error)
            alert("Something went wrong")
        });
}

function updateHouse(houseId) {
    localStorage.setItem('houseId', houseId);
    window.location.href = 'updateProducts.html'
}

$(document).ready(function () {
    $('#buttonAdd').click(function () {
        const houseName = $('#houseName').val();
        const address = $('#address').val();
        const contactInfo = $('#contactInfo').val();
        const price = $('#price').val();
        const categoryId = $('#categoryId').val();
        if (houseName == "" || address == "" || contactInfo == "" || price == "" || categoryId == "") {
            alert("Please fill all field");
        }
        else {
            let url = 'http://localhost:3000/houses/v1/addHouse';
            let data = { houseName: houseName, address: address, contactInfo: contactInfo, price: price, categoryId: categoryId };
            fetch(url, {
                method: 'post',
                headers: {
                    "authorization": localStorage.getItem('token'),
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(function (data) {
                    if (data.status == "200") {
                        alert("Successfully added")
                        window.location.href = "admin_Dashboard.html"
                    } else {
                        alert("Failed to add product")
                    }
                    console.log("req succ", data);
                })
                .catch(function (error) {
                    console.log("req failed", error);
                });
        }
    });
});