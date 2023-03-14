"use strict"

/** Первоначальная база данных. Можно хранить на сервере/LocalStorage, запрашивать с сервера/LocalStorage при запуске скрипта и сохранять при обновлении. */
const commentsDB = {
    "44564653": {
        id: "44564653",
        name: "Станислав",
        date: "3.10.2023 8:5",
        message: "Милота",
        like: false
    },
    "44564654": {
        id: "44564654",
        name: "Олег",
        date: "3.12.2023 12:31",
        message: "Классный котёнок!!!",
        like: false
    },
    "44564655": {
        id: "44564655",
        name: "Евгений",
        date: "3.11.2023 10:48",
        message: "Прям как мой =)",
        like: false
    }
};

const commentsElement = document.querySelector(".comments__body");
const form = document.forms.form;

/** Функция приводит однозначные цифры в формат двузначных (3 -> 03). */
function checkDoubleNumber(num) {
    if (num < 10) return "0" + num;
    return num;
}

/** Функция преобразует дату из формата, хранимого в базе данных, в формат, пригодный для отображения.*/
function convertDateFromDB(str) {
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const commentDate = new Date(str);
    const commentYear = commentDate.getFullYear();
    const commentMonth = commentDate.getMonth();
    const commentDay = commentDate.getDate();
    const commentHour = commentDate.getHours();
    const commentMin = commentDate.getMinutes();

    const displayDate = (
        currentYear === commentYear
        && currentMonth === commentMonth
        && currentDay === commentDay
    )
        ? "Сегодня"
        : (
            currentYear === commentYear
            && currentMonth === commentMonth
            && currentDay - 1 === commentDay
        )
            ? "Вчера"
            : `${checkDoubleNumber(commentDay)} ${months[commentMonth]} ${commentYear}`;

    const displayTime = `${checkDoubleNumber(commentHour)}:${checkDoubleNumber(commentMin)}`;

    return displayDate + " " + displayTime;
}

/** Функция преобразует дату в формат, установленный для хранения в базе данных.*/
function convertDateToDB(str) {
    const currentDate = new Date();

    let day, month, year;
    if (str) {
        [day, month, year] = str.split(".");
    } else {
        day = currentDate.getDate();
        month = currentDate.getMonth() + 1;
        year = currentDate.getFullYear();
    }

    const hour = currentDate.getHours();
    const min = currentDate.getMinutes();

    return `${month}.${day}.${year} ${hour}:${min}`;
}

/** Функция создаёт HTML одного комментария.*/
function renderComment(data) {
    const commentOuter = document.createElement("div");
    commentOuter.classList = "comments__item";
    commentOuter.dataset.id = data.id;

    const commentInfo = document.createElement("p");
    commentInfo.classList = "comments__info";

    const commentAuthor = document.createElement("span");
    commentAuthor.classList = "comments__author";
    commentAuthor.textContent = data.name;

    const commentDate = document.createElement("span");
    commentDate.classList = "comments__date";
    commentDate.textContent = convertDateFromDB(data.date);

    const commentText = document.createElement("p");
    commentText.classList = "comments__text";
    commentText.innerHTML = `<pre>${data.message}</pre>`;

    const commentIcons = document.createElement("p");
    commentIcons.classList = "comments__icons";

    const likeIcon = document.createElement("div");
    likeIcon.classList = "comments__icon comments__icon_like";
    likeIcon.innerHTML = `
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.1" d="M4.8824 12.9557L10.5021 19.3071C11.2981 20.2067 12.7019 20.2067 13.4979 19.3071L19.1176 12.9557C20.7905 11.0649 21.6596 8.6871 20.4027 6.41967C18.9505 3.79992 16.2895 3.26448 13.9771 5.02375C13.182 5.62861 12.5294 6.31934 12.2107 6.67771C12.1 6.80224 11.9 6.80224 11.7893 6.67771C11.4706 6.31934 10.818 5.62861 10.0229 5.02375C7.71053 3.26448 5.04945 3.79992 3.59728 6.41967C2.3404 8.6871 3.20947 11.0649 4.8824 12.9557Z" fill="#323232"/>
    <path d="M4.8824 12.9557L10.5021 19.3071C11.2981 20.2067 12.7019 20.2067 13.4979 19.3071L19.1176 12.9557C20.7905 11.0649 21.6596 8.6871 20.4027 6.41967C18.9505 3.79992 16.2895 3.26448 13.9771 5.02375C13.182 5.62861 12.5294 6.31934 12.2107 6.67771C12.1 6.80224 11.9 6.80224 11.7893 6.67771C11.4706 6.31934 10.818 5.62861 10.0229 5.02375C7.71053 3.26448 5.04945 3.79992 3.59728 6.41967C2.3404 8.6871 3.20947 11.0649 4.8824 12.9557Z" stroke="#323232" stroke-width="2" stroke-linejoin="round"/>
    </svg>
    `

    const removeIcon = document.createElement("div");
    removeIcon.classList = "comments__icon comments__icon_remove";
    removeIcon.innerHTML = `
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `

    commentInfo.append(commentAuthor);
    commentInfo.append(commentDate);
    commentIcons.append(likeIcon);
    commentIcons.append(removeIcon);
    commentOuter.append(commentInfo);
    commentOuter.append(commentText);
    commentOuter.append(commentIcons);
    commentsElement.prepend(commentOuter);
}

/** Функция запускает валидацию полей форм. Если хоть одна валидация возвращает false, то вся функция вернёт false. Вернёт true только если все валидации вернут true. */
function validateForm() {
    const nameValidateResult = validateItem(form.name);
    const dateValidateResult = validateItem(form.date);
    const messageValidateResult = validateItem(form.message);

    return nameValidateResult && dateValidateResult && messageValidateResult;
}

/** Функция задаёт правила валидации полей форм. */
function validateItem(data) {
    switch (data.name) {
        case "name":
            if (data.value.trim() === "") {
                data.classList.add("error");
                createErrorMessage(data, "Пожалуйста, введите имя");
                return false;
            }
            return true;
        case "date":
            if (data.value.trim() === "") return true;
            const dateReg = /^\d{2}.\d{2}.\d{4}$/;
            if (!dateReg.test(data.value)) {
                data.classList.add("error");
                createErrorMessage(data, "Введите дату в формате ДД.ММ.ГГГГ");
                return false;
            };
            const isCorrectDate = validateDate(data.value);
            if (!isCorrectDate) {
                data.classList.add("error");
                createErrorMessage(data, "Введённая дата некорректна, проверьте данные");
                return false;
            };
            return true;
        case "message":
            if (data.value.trim() === "") {
                data.classList.add("error");
                createErrorMessage(data, "Пожалуйста, введите комментарий");
                return false;
            }
            return true;
        default:
            return;
    }
}

/** Функция создаёт сообщение об ошибке валидации формы и размещает его в HTML. */
function createErrorMessage(formItem, errorMessage) {
    const errorItem = document.createElement("span");
    errorItem.className = "form__error";
    errorItem.textContent = errorMessage;
    formItem.after(errorItem);
}

/** Функция проверяет введенные день и месяц на предмет коорректности даты (напр. 32.03.2020 считается некорректным). */
function validateDate(date) {
    let [day, month, year] = date.split(".");
    day = +day;
    month = +month;
    year = +year;

    if (month > 12) return false;
    if (day > 31) return false;
    if ([4, 6, 9, 11].includes(month) && day > 30) return false;
    if (year % 4 === 0 && month === 2 && day > 29) return false;
    if (year % 4 !== 0 && month === 2 && day > 28) return false;

    return true;
}

/** Функция удаляет все сообщения об ошибках. */
function clearErrors() {
    const inputItems = form.querySelectorAll(".form__input");
    inputItems.forEach(inputItem => clearError(inputItem));
}

/** Функция удаляет выбранное сообщение об ошибке. */
function clearError(item) {
    if (item.classList.contains("error")) {
        item.classList.remove("error");
        item.nextElementSibling.remove();
    }
}

/** Функция преобразует поле имени, чтобы ФИО начинались с большой буквы. */
function handleName(name) {
    const nameArr = name.trim().split(" ");

    const updatedNameArr = nameArr.map(nameItem => {
        return nameItem[0].toUpperCase() + nameItem.slice(1);
    });

    return updatedNameArr.join(" ");
}

/** Функция создаёт новый объект комментария по единому стандарту для сохранения в базе данных. */
function createCommentObject() {
    const newObject = {
        id: Date.now().toString(),
        name: handleName(form.name.value),
        date: convertDateToDB(form.date.value),
        message: form.message.value,
        like: false
    }

    return newObject;
}

/** Функция очищает данные введённые пользователем. */
function clearForm() {
    form.name.value = "";
    form.date.value = "";
    form.message.value = "";
}

/** Функция сортирует комментарии по Дате создания (указанной или сгенерированной автоматически). */
function sortComments() {
    const comments = commentsElement.querySelectorAll(".comments__item");

    const sortedComments = Array.from(comments).sort((a, b) => {
        const date1 = new Date(commentsDB[a.dataset.id].date);
        const date2 = new Date(commentsDB[b.dataset.id].date);

        return date2.getTime() - date1.getTime();
    });

    sortedComments.forEach(element => commentsElement.append(element));
}

/** Функция добавляет/удаляет класс, отвечающий за цвет иконки, а также меняет значение boolean-поля like соответствующего комментария в базе данных на противоположное. */
function handleToggleLike(item) {
    item.classList.toggle("active");
    const commentId = item.closest(".comments__item").dataset.id;
    commentsDB[commentId].like = !commentsDB[commentId].like;
}

/** Функция создаёт сообщение об отсутствии комментариев. */
function createEmptyMessage() {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "comments__empty";
    emptyMessage.textContent = "Никто ещё не оставил свой комментарий. Стань первым!!!";

    commentsElement.before(emptyMessage);
}

/** Функция удаляет сообщение об отсутствии комментариев, при его наличии. */
function removeEmptyMessage() {
    const emptyMessage = document.querySelector(".comments__empty");
    if (emptyMessage) emptyMessage.remove();
}

/** Функция удаляет комментарий из базы данных и HTML. */
function handleRemove(item) {
    const parentElem = item.closest(".comments__item")
    const commentId = parentElem.dataset.id;
    delete commentsDB[commentId];
    parentElem.remove();

    if (!Object.keys(commentsDB).length) createEmptyMessage();
}

/** Функция создаёт информационный стикер о действии, инициированном пользователем. Стикер автоматически удаляется исчезает и удаляется через 1,5 секунды. */
function createSticker(str) {
    const oldSticker = document.body.querySelector(".sticker");
    if (oldSticker) oldSticker.remove();

    const sticker = document.createElement("div");
    sticker.className = "sticker";
    sticker.textContent = str;

    document.body.append(sticker);

    setTimeout(() => {
        sticker.style.right = "20px";
    });

    setTimeout(() => {
        sticker.style.right = "-200px";
    }, 1500);

    setTimeout(() => {
        sticker.remove();
    }, 1800);
}

/** Функция запускает первоначальную отрисовку комментариев, сохраненных в базе данных, и вызывает их сортировку. */
function firstRender(data) {
    Object.values(data).forEach(item => {
        renderComment(item);
    });
    sortComments();
}

form.addEventListener("submit", e => {
    e.preventDefault();
    clearErrors();
    const isValid = validateForm();

    if (isValid) {
        removeEmptyMessage();
        const commentObject = createCommentObject();
        commentsDB[commentObject.id] = commentObject;
        renderComment(commentObject);
        sortComments();
        clearForm();
        createSticker("Комментарий создан");
    }
})

form.addEventListener("input", e => {
    clearError(e.target);
})

commentsElement.addEventListener("click", e => {
    const targetLike = e.target.closest(".comments__icon_like");
    const targetRemove = e.target.closest(".comments__icon_remove");

    if (targetLike) handleToggleLike(targetLike);
    if (targetRemove) {
        const confirmRemove = confirm("Задача будет полностью удалена. Подтвердите действие.");
        if (confirmRemove) {
            handleRemove(targetRemove);
            createSticker("Комментарий удалён");
        };
    };
})

firstRender(commentsDB);
