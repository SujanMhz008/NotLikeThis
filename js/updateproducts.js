$(document).ready(function () {
    const houseName = localStorage.getItem('houseName' + localStorage.getItem('houseId'));
    const contactInfo = localStorage.getItem('contactInfo' + localStorage.getItem('houseId'));
    const price = localStorage.getItem('price' + localStorage.getItem('houseId'));
    console.log(houseName);
    console.log(contactInfo);
    console.log(price);

    $("#houseName").val(houseName);
    $("#contactInfo").val(contactInfo);
    $("#price").val(price);
});

$(document).ready(function () {
    $('#buttonUpdate').click(function () {
        const houseId = localStorage.getItem('houseId');
        const houseName = $('#houseName').val();
        const contactInfo = $('#contactInfo').val();
        const price = $('#price').val();
        const categoryId = $('#categoryId').val();

        if (houseName == "" || contactInfo == "" || price == "" || categoryId == "") {
            alert("Please fill all field");
        }
        else {
            let url = 'http://localhost:3000/houses/v1/updateHouse/' + houseId;
            let data = {houseName: houseName, contactInfo: contactInfo, price:price, categoryId:categoryId};
            fetch(url, {
                method: 'put',
                headers: {
                    "authorization": localStorage.getItem('token'),
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(function (data) {
                    console.log(data)
                    if (data.status == "200") {
                        alert(data.message)
                        window.location.href = "admin_Dashboard.html"
                    } else {
                        alert("failed")
                    }
                    console.log("req succ", data);
                })
                .catch(function (error) {
                    console.log("req failed", error);
                });
        }
    });
});