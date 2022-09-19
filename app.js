//* ======================================================
//*                     TODO APP
//* ======================================================

// const saat = new Date().getTime();
// console.log(saat);

//?Selectors
const addBtn = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");

addBtn.addEventListener("click", () => {
  if (todoInput.value.trim() === "") {
    alert("PLease enter new todo");
  } else {
    const newTodo = {
      id: new Date().getTime(),
      completed: false,
      text: todoInput.value,
    };

    createListElement(newTodo);
  }
});

const createListElement = (newTodo) => {
  //? yeni bir li elementi olustur ve bu elemente obje icerisindeki
  //? id degerini ve completed class'ini ata
  const li = document.createElement("li");
  // li.id = newTodo.id;
  li.setAttribute("id", newTodo.id);

  //? okey ikonu olustur ve li elementine bagla
  const okIcon = document.createElement("i");
  okIcon.setAttribute("class", "fas fa-check");
  li.appendChild(okIcon);

  //? todo basligi icin bir p elementi ve yazi dugumu olusturarak li'ye bagla

  const p = document.createElement("p");
  const pTextNode = document.createTextNode(newTodo.text);
  p.appendChild(pTextNode);
  li.appendChild(p);

  //? delete ikonu olustur ve li elementine bagla
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-trash");
  li.appendChild(deleteIcon);

  todoUl.appendChild(li);
};
