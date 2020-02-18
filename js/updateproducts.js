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
    $('#updateevent').click(function () {
        const houseName = $('#houseName').val();
        const contactInfo = $('#contactInfo').val();
        const price = $('#price').val();
        const categoryId = $('#categoryId').val();

        if (houseName == "" || contactInfo == "" || price == "" || categoryId == "") {
            alert("Please fill all field");
        }
        else {
            let url = 'http://localhost:3000/houses/v1/';
            let data = {eventid:eventid,eventname: eventname, eventaddress: eventaddress,eventstarttime:eventstarttime,eventendtime:eventendtime, eventdate: eventdate };
            fetch(url, {
                method: 'put',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(function (data) {
                    if (data.status == "success") {
                        alert("Updated Successfully")
                        window.location.href = "viewevents.html"
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