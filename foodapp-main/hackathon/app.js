//----------------------signup------------------//
let userSignup = () => {
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let country = document.getElementById("country");
    let city = document.getElementById("city");
    let password = document.getElementById("password");


    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            let user = {
                username: username.value,
                email: email.value,
                phone: phone.value,
                country: country.value, 
                city: city.value,
                password: password.value
            }

            firebase.database().ref(`users/${res.user.uid}`).set(user)
                .then(() => {
                    alert("User register hogaya")
                    window.location = "userLogin.html"
                })

        })
        .catch((err) => {
            console.log(err.message)
        })
}
//-------------------------login---------------//

let login = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)

    .then((res) => {
            firebase.database().ref(`users/${res.user.uid}`).once('value', (data) => {
                localStorage.setItem("userBio",data.val().username);
                // console.log(data.val())
                alert("successfully")
                window.location.href="userview.html";
            })
        })
        .catch((err) => {
            alert("enter correct email and password",err)
        })

}
//-------------logout --------------------//
let logout = () => {

    try {

        firebase.auth().signOut();
        alert("logout hogya")


    } catch (error) {
        console.log(error);
    }

}
// ---------------adminsignup-------------------
let adminSignup = () => {
    let adminName = document.getElementById("adminname");
    let adminEmail = document.getElementById("adminemail");
    let adminCountry = document.getElementById("admincountry");
    let adminCity = document.getElementById("admincity");
    let adminPassword = document.getElementById("adminpassword");
    


    firebase.auth().createUserWithEmailAndPassword(adminEmail.value, adminPassword.value)
        .then((res) => {
            let admin = {
                adminName: adminName.value,
                adminEmail: adminemail.value,
                adminCountry :adminCountry.value,
                adminCity : adminCity.value,
                adminPassword: adminpassword.value
            }

            firebase.database().ref(`admin/${res.user.uid}`).set(admin)
                .then(() => {
         
                    alert("welcome Admin")
                    window.location = "adminlogin.html"
                   
                })

        })
        .catch((err) => {
            alert("enter correct email",err)
        })
}
//-------------------------login---------------//

let adminlogin = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)

    .then((res) => {
            firebase.database().ref(`admin/${res.user.uid}`).once('value', (data) => {
                // localStorage.setItem("adminBio",data.val().username);
                // console.log(data.val())
                alert("successfully")
                window.location.href="dashboard.html";
            })
        })
        .catch((err) => {
            alert("enter correct email and password",err)
        })

}
