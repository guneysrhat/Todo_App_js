//* ======================================================
//*                     TODO APP
//* ======================================================

// const saat = new Date().getTime();
// console.log(saat);

//?Selectors
const addBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");

// todos dizisinde LocalStorage'daki veriler ile guncelle
//! eger localStroge'de todos adinda bir item bulunmaz ise bos array atamasi yap.
let todos = JSON.parse(localStorage.getItem("TODOS")) || [];

const renderSavedTodes = () => {
  todos.forEach((todo) => {
    createListElement(todo);
  });
};
renderSavedTodes();

addBtn.addEventListener("click", () => {
  if (todoInput.value.trim() === "") {
    alert("PLease enter new todo");
  } else {
    const newTodo = {
      id: new Date().getTime(),
      completed: false,
      text: todoInput.value,
    };

    //! yeni bir li elementi olusturup bunu DOM'a bas
    createListElement(newTodo);

    //? Yeni olsuturulan todo'yu diziye sakla
    todos.push(newTodo);

    localStorage.setItem("TODOS", JSON.stringify(todos));
    console.log(todos);
    todoInput.value = "";
  }
});

function createListElement(newTodo) {
  const { id, completed, text } = newTodo; //! destr.

  //? yeni bir li elementi olustur ve bu elemente obje icerisindeki
  //? id degerini ve completed class'ini ata
  const li = document.createElement("li");
  // li.id = newTodo.id;
  li.setAttribute("id", id);

  //   newTodo.completed ? li.classList.add("completed") : "";
  completed && li.classList.add("completed");
  
  //? okey ikonu olustur ve li elementine bagla
  const okIcon = document.createElement("i");
  okIcon.setAttribute("class", "fas fa-check");
  li.appendChild(okIcon);

  //? todo basligi icin bir p elementi ve yazi dugumu olusturarak li'ye bagla
  const p = document.createElement("p");
  const pTextNode = document.createTextNode(text);
  p.appendChild(pTextNode);
  li.appendChild(p);

  //? delete ikonu olustur ve li elementine bagla
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash");
  li.appendChild(deleteIcon);

  console.log(li);
  //? meydana gelen li elementini ul'ye child olarak ata
  todoUl.appendChild(li);
}

//! Ul elementinin cocuklarindan herhangi birisinden bir event gelirse
//! bunu tespit et ve gerekini yap. (Capturing)
todoUl.addEventListener("click", (e) => {
  console.log(e.target);

  const id = e.target.parentElement.getAttribute("id");
  //! event, bir delete butonundan  geldi ise
  if (e.target.classList.contains("fa-trash")) {
    //? delete butonunun parent'ini DOM'dan sil
    e.target.parentElement.remove();

    //? Dizinin ilgili elementini sil
    todos = todos.filter((todo) => todo.id !== Number(id));

    //? todos dizisinin son halini localStorage'e sakla
    localStorage.setItem("TODOS", JSON.stringify(todos));
  } else if (e.target.classList.contains("fa-check")) {
    //! event, bir okey butonundan  geldi ise
    //? ilgili li elementinde checked adinda bir class'i varsa bunu sil
    //? aksi takdirdce ekle (DOM)
    e.target.parentElement.classList.toggle("completed");
  }
});

//? Enter tusu ele ekleme mumkun olsun
todoInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    addBtn.click();
  }
});

//? Baslangicta input aktif olsun
window.onload = function () {
  todoInput.focus();
};
