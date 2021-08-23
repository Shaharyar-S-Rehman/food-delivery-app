let logout = () => {

  try {

      firebase.auth().signOut();
      alert("logout hogya")
      window.location.href="admin.html";


  } catch (error) {
      console.log(error);
  }

}

let dashboard = () => {
  let itemname = document.getElementById("itemname");
  let price = document.getElementById("price");
  let category1 = document.getElementById("category1");
  let category2 = document.getElementById("category2");
  let category3 = document.getElementById("category3");
  let diltype1 = document.getElementById("diltype1");
  let diltype2 = document.getElementById("diltype2");

  var key = firebase.database().ref('items').push().key;
  let food = {
    itemname: itemname.value,
    price: price.value,
    category1: category1.value,
    category2: category2.value,
    category3: category3.value,

    // imgName: imgName.value,
    diltype1: diltype1.value,
    diltype2: diltype2.value,
    key: key
  }
  firebase.database().ref(`items/${key}`).set(food);
  itemname.value = "";
  price.value = "";
  category1.value = "";
  category2.value = "";
  category3.value = "";

  // imgName.value="";
  diltype1.value = ""
  diltype2.value = ""
  console.log(food)
}
const dash = () => {

  firebase.database().ref(`items`).on('child_added', (data) => {
    let list = document.getElementById("list");
    let li = document.createElement("li");
    li.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="bakery.jpg" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title"> ${data.val().itemname}</h5>
        <p class="card-text">${data.val().price}</p>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Category
            </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="#">${data.val().category1}</a>
        <a class="dropdown-item" href="#">${data.val().category2}</a>
        <a class="dropdown-item" href="#">${data.val().category3}</a>
        </div>
        </li>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Category
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <select>
        <option class="dropdown-item" >${data.val().diltype1}</option>
        <option class="dropdown-item" >${data.val().diltype2}</option>
        </select>
        </div>
        </li>
      </div>
      <div class="card-body">
      <button class="card-link" onclick="dltitm(this)">Delete</button>
      </div>
    </div>`

    li.setAttribute("class", "card")
    list.appendChild(li);
    console.log(data.val())
  })
}
// const dltitm=(e)=>{
//   firebase.database().ref(`items`).child(e.id).remove();
//   e.parentNode.parentNode.remove();
// }

let dltitm=(e)=>{
//   // console.log("abc")
  firebase.database().ref(`items${e.id}`).remove();
  e.parentNode.parentNode.remove();
  // console.log(e.parentNode.parentNode)

}

const userdash = () => {

  firebase.database().ref(`items`).on('child_added', (data) => {
    let list = document.getElementById("list");
    let li = document.createElement("li");
    li.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="bakery.jpg" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title"> ${data.val().itemname}</h5>
        <p class="card-text">${data.val().price}</p>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Category
            </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="#">${data.val().category1}</a>
        <a class="dropdown-item" href="#">${data.val().category2}</a>
        <a class="dropdown-item" href="#">${data.val().category3}</a>
        </div>
        </li>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Category
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <select>
        <option class="dropdown-item" >${data.val().diltype1}</option>
        <option class="dropdown-item" >${data.val().diltype2}</option>
        </select>
        </div>
        </li>
      </div>
      <div class="card-body">
      <button class="card-link formBtn" id="${data.val().key}" onclick="pending(this)">Order Now</button>
      </div>
    </div>`

    li.setAttribute("class", "card")
    list.appendChild(li);
    console.log(data.val())
  })
}
const pending=(e)=>{
  firebase.database().ref(`items/${e.id}`).once("value",(data)=>{
    var key=firebase.database().ref('pending').push().key;
    let pending = {
      itemname:data.val().itemname,
      price:data.val(). price,
      category1:data.val().category1,
      category2:data.val().category2,
      diltype1:data.val().diltype1,
      diltype2:data.val().diltype2,
      key:key
  }
  firebase.database().ref(`pending/${key}`).set(pending)    
    alert("Order Successfully")
    // console.log(e.id)
  })
}
const order = () => {

  firebase.database().ref(`pending`).on('child_added', (data) => {
    let list2 = document.getElementById("list2");
    let li = document.createElement("li");
    li.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="bakery.jpg" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title"> ${data.val().itemname}</h5>
        <p class="card-text">${data.val().price}</p>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Category
            </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="#">${data.val().category1}</a>
        <a class="dropdown-item" href="#">${data.val().category2}</a>
        <a class="dropdown-item" href="#">${data.val().category3}</a>
        </div>
        </li>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Category
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <select>
        <option class="dropdown-item" >${data.val().diltype1}</option>
        <option class="dropdown-item" >${data.val().diltype2}</option>
        </select>
        </div>
        </li>
      </div>
      <div class="card-body">
      <button class="card-link" id="${data.val().key}"  onclick="post(this)">receive</button>
      </div>
    </div>`

    li.setAttribute("class", "card")
    list2.appendChild(li);
    console.log(data.val())
  })
}
const post=(e)=>{
  firebase.database().ref(`pending/${e.id}`).once("value",(data)=>{
    var key=firebase.database().ref('order').push().key;
    let pending = {
      itemname:data.val().itemname,
      price:data.val(). price,
      category1:data.val().category1,
      category2:data.val().category2,
      diltype1:data.val().diltype1,
      diltype2:data.val().diltype2,
      key:key
  }
  firebase.database().ref(`order/${key}`).set(pending)    
    alert("Order Successfully")
    // console.log(e.id)
  })
}

const receive = () => {

  firebase.database().ref(`order`).on('child_added', (data) => {
    let list3 = document.getElementById("list3");
    let li = document.createElement("li");
    li.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="bakery.jpg" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title"> ${data.val().itemname}</h5>
        <p class="card-text">${data.val().price}</p>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Category
            </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="#">${data.val().category1}</a>
        <a class="dropdown-item" href="#">${data.val().category2}</a>
        <a class="dropdown-item" href="#">${data.val().category3}</a>
        </div>
        </li>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Category
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <select>
        <option class="dropdown-item" >${data.val().diltype1}</option>
        <option class="dropdown-item" >${data.val().diltype2}</option>
        </select>
        </div>
        </li>
      </div>
      <div class="card-body">
      <button class="card-link" id="${data.val().key}"  onclick="post2(this)">deliver</button>
      </div>
    </div>`

    li.setAttribute("class", "card")
    list3.appendChild(li);
    console.log(data.val())
  })
}
const post2=(e)=>{
  firebase.database().ref(`order/${e.id}`).once("value",(data)=>{
    var key=firebase.database().ref('delivery').push().key;
    let pending = {
      itemname:data.val().itemname,
      price:data.val(). price,
      category1:data.val().category1,
      category2:data.val().category2,
      diltype1:data.val().diltype1,
      diltype2:data.val().diltype2,
      key:key
  }
  firebase.database().ref(`delivery/${key}`).set(pending)    
    alert("Order Successfully")
    // console.log(e.id)
  })
}

const deliver = () => {

  firebase.database().ref(`delivery`).on('child_added', (data) => {
    let list4 = document.getElementById("list4");
    let li = document.createElement("li");
    li.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="bakery.jpg" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title"> ${data.val().itemname}</h5>
        <p class="card-text">${data.val().price}</p>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Category
            </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="#">${data.val().category1}</a>
        <a class="dropdown-item" href="#">${data.val().category2}</a>
        <a class="dropdown-item" href="#">${data.val().category3}</a>
        </div>
        </li>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Category
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <select>
        <option class="dropdown-item" >${data.val().diltype1}</option>
        <option class="dropdown-item" >${data.val().diltype2}</option>
        </select>
        </div>
        </li>
      </div>
      <div class="card-body">
      <button class="card-link" id="${data.val().key}"  onclick="postdelete(this)">delete</button>
      </div>
    </div>`

    li.setAttribute("class", "card")
    list4.appendChild(li);
    console.log(data.val())
  })
}
let postdelete=(e)=>{
  //   // console.log("abc")
    firebase.database().ref(`delivery${e.id}`).remove();
    e.parentNode.parentNode.remove();
    // console.log(e.parentNode.parentNode)
  
  }
  