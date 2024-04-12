const button = document.getElementById("btn");

const name = document.getElementById("name");
const avatar = document.getElementById("avatar");
const comment = document.getElementById("comment");

// Функция: Скрыть/Показать поле "Имя"
function Selected(str) {
  let label = str.value;
  if (label == "no") {
    (name.style.display = "none"),
      (document.getElementById("nameLabel").style.display = "none");
  } else {
    (name.style.display = "block"),
      (document.getElementById("nameLabel").style.display = "block");
  }
}

//Функция замены слов на звездочки при наличии спама
function checkSpam(str) {
  let lowerStr = str.toLowerCase();
  return lowerStr.replace(/viagra|xxx/g, "***");
}

//Функция: Переносим очищенные имя, комментарии и аватар в чат
function getInfo() {
  const yes = document.getElementById("radioyes");
  const no = document.getElementById("radiono");

  // Проверяем условие по отметке на Радиокнопке и Получаем содержимое поля "Введите ваше имя"
  let getName = "";
  if (no.checked) {
    getName = "username";
  } else if (yes.checked) {
    getName = name.value;
  } else {
    getName = name.value;
  }
  // Очищаем имя от пробелов, делаем 1 букву заглавную, остальные - строчные
  let clearNameBlanks =
    getName[0].toUpperCase() + getName.slice(1).toLowerCase();
  let clearName = clearNameBlanks.replace(/ /g, "");

  //Получаем содержимое поля "Оставьте комментарий"
  let getComment = comment.value;
  //Очищаем комментарий
  let clearComment = getComment;
  // Проверяем на спам и заменяем
  clearComment = checkSpam(clearComment);

  // Получаем аватар указанный или рандомный (если не указан)
  let chatImgSrc;
  if (avatar.value != "") {
    chatImgSrc = avatar.value;
  } else {
    const avatars = [
      "../assets/images/moon.jpg",
      "../assets/images/cat.jpg",
      "../assets/images/catmoon.jpg",
      "../assets/images/owl.jpg",
      "../assets/images/seal.png",
    ];
    const randomIndex = Math.floor(Math.random() * 5);
    chatImgSrc = avatars[randomIndex];
  }
  // Получаем время отправки сообщения
  const getTime = new Date();

  // Создаем новый элемент комментария +++++++++++++++++++++++++++++
  const newComment = document.createElement("div");
  newComment.classList.add("info");

  // Создаем структуру элемента комментария
  newComment.innerHTML = `
    <div class="info_main">
      <img style = "max-width: 80px"  src="${chatImgSrc}" alt="User Avatar">
      <span style = "margin: 0 30px; max-width: 100px">${clearName}</span>
      <span style = "width: 400px">${getTime}</span>
    </div>
    <p>${clearComment}</p>
    <hr style="border: 0; border-bottom: 3px dotted; color: #6495ed;">
  `;

  // Получаем контейнер для комментариев
  const chatContainer = document.querySelector(".chat");

  // Вставляем новый комментарий в конец списка +++++++++++++++++++++++
  chatContainer.appendChild(newComment);

  // Обнуляем поля формы
  name.value = "";
  comment.value = "";
}
button.addEventListener("click", (event) => {
  event.preventDefault();
  getInfo();
});
