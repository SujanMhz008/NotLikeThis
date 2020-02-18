$(document).ready(function () {
    fetch('http://localhost:3000/users/v1/getCurrentUser', {
        method: 'get',
        headers: {
            'authorization': localStorage.getItem('token')
        }
    })
        .then(res => { return res.json() })
        .then(data => {
            console.log(data);
            $("#fullName").val(data.fullName);
            $("#address").val(data.address);
            $("#phone").val(data.phone);
        })
});

$(document).ready(function () {
    $("#buttonUpdate").click(function () {
        const fullName = $("fullName").val();
        const address = $("address").val();
        const phone = $("phone").val();
        let data = {fullName: fullName, address: address, phone:phone};

        fetch('http://localhost:3000/users/v1/userUpdate', {
            method: 'put',
            headers: {
                'authorization': localStorage.getItem('token'),
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(function (data){
            console.log(data)
            if (data.status == 200) {
                alert(data.message)
                window.location.href = "profile.html"
            } else {
                alert("failed")
            }
            console.log("req", data);
        })
        .catch(function (error) {
            console.log("req failed", error);
        });

    })
})