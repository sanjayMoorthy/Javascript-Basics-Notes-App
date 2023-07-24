let addnotes = document.querySelector(".addnotes")
let heading = document.querySelector(".name")
let description = document.querySelector(".description")
let submitBtn = document.querySelector(".submit")
let inputContainer = document.querySelector(".popUpinputs")
let bodyTag = document.querySelector("body")

let allNotes = document.querySelector(".notes")
let box = document.querySelector(".box")
let addnotesError = document.querySelector(".addNotes")
let inputValue_error = document.querySelector(".inputFeildError")
let selectid = "";
//empty means add
//value means edit

// fetch a notes from database

fetch('http://localhost:3000/posts')
  .then(res => res.json())
  .then(data => {
    addnotesError.style.display = "block"
    for (let i = 0; i < data.length; i++) {
      let title = document.createElement('h3')
      let descript = document.createElement('p')
      let div = document.createElement('div')
      div.setAttribute('class', 'note')


      let BtnDiv = document.createElement('div')
      BtnDiv.setAttribute("class", "buttonDiv")

      let deleteBtn = document.createElement('button')
      deleteBtn.setAttribute("class", "deletebtn")
      deleteBtn.setAttribute("id", data[i].id)
      deleteBtn.innerText = "Delete"

      let editBtn = document.createElement('button')
      editBtn.setAttribute("class", "editBtn")
      editBtn.setAttribute("id", data[i].id)
      editBtn.innerText = "Edit"

      let dropDown_btn = document.createElement("span")
      dropDown_btn.setAttribute("class", "dropBtn")
      dropDown_btn.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`

      title.innerText = data[i].title
      descript.innerText = data[i].body

      div.append(title)
      div.append(descript)
      BtnDiv.append(deleteBtn)
      BtnDiv.append(editBtn)
      div.append(dropDown_btn)
      div.append(BtnDiv)
      allNotes.append(div)

      dropDown_btn.addEventListener("click", () => {
        BtnDiv.classList.toggle("active")

      })


      deleteBtn.addEventListener("click", (e) => handelDelete(e))

      editBtn.addEventListener("click", (e) => handleEdit(e))


    }
  })

setTimeout(() => {
  addnotesError.style.display = "none"
}, 2000);






// container will open and close 

addnotes.addEventListener("click", () => {
  inputContainer.style.display = "block"
  box.style.display = "none"
  bodyTag.style.backgroundColor = "#246074"
})


// click and submit and insert to database
submitBtn.addEventListener("click", (e) => handedsubmit())


function handedsubmit() {
let url = selectid === "" ? 'http://localhost:3000/posts/' : 'http://localhost:3000/posts/' + selectid
  fetch(url, {
    method: selectid === "" ? "POST" : "PUT",
    body: JSON.stringify({
      title: heading.value,
      body: description.value,

    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(res => res.json())
    .then(data => {
      window.location.reload()
    })
    .catch(err => console.log(err))
}





function handelDelete(e) {
  {

  }

  let ids = e.target.id

  console.log("first")

  fetch('http://localhost:3000/posts/' + ids, {


    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },

  })
    .then(res => res.json())
    .then(data => {
      console.log(data, "second")
      window.location.reload()
    })
    .catch(err => console.log(err))
  console.log("third")

}

function handleEdit(e) {

  inputContainer.style.display = "block"
  submitBtn.innerText = "update"
  let editId = e.target.id
  selectid = e.target.id
  fetch('http://localhost:3000/posts/' + editId,)
    .then(ress => ress.json())
    .then(result => {

      heading.value = result.title
      description.value = result.body

    })

}