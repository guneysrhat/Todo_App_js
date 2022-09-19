//* ======================================================
//*                     TODO APP
//* ======================================================

// const saat = new Date().getTime();
// console.log(saat);

//?Selectors
const addBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");

let todos = [];

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
    todoInput.value = "";
  }
});

const createListElement = (newTodo) => {
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
};

//!
//!
todoUl.addEventListener("click", (e) => {
  console.log(e.target);

  //! event, bir delete butonundan  geldi ise
  if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
  }
  //! event, bir okey butonundan  geldi ise
  if (e.target.classList.contains("fa-check")) {
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
