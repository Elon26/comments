<h1>Страница с комментариями</h1>
<br>
<p>Функционал содержит следующие компоненты:</p>
<ul>
    <li>Форму для добавления комментариев со следующими элементами:
      <ul>
        <li>Поле ввода имени:
          <ul>
            <li>На поле установлена валидация на непустое значение</li>
            <li>На поле установлен функционал преобразования введенного значения, чтобы каждое слово начиналось с большой буквы (олег иванов -> Олег Иванов)</li>
            <li>Нажатие клавиши Enter при фокусе на данном поле запускает обработку формы (см. Кнопка отправки формы)</li>
          </ul>
        </li>
        <li>Поле ввода даты:
          <ul>
            <li>Поле допускает пустое значение. В этом случае, настроена установка текущей даты</li>
            <li>При вводе непустого значения, установлена валидация двух уровней - сначала проверка формата ввода на соответствие "ДД.ММ.ГГГГ", затем проверка на корректность ввода даты (32.13.2006 распознаётся, как некорректная дата)</li>
            <li>Нажатие клавиши Enter при фокусе на данном поле запускает обработку формы (см. Кнопка отправки формы)</li>
          </ul>
        </li>
        <li>Поле ввода имени комментария:
          <ul>
            <li>На поле установлена валидация на непустое значение</li>
            <li>Нажатие клавиши Enter при фокусе на данном поле не запускает обработку (submit) формы, т.к. Enter используется для перехода на новую строку. Функционал сохраняет пользовательские отступы</li>
          </ul>
        </li>
        <li>Кнопка отправки формы, которая:
          <ul>
            <li>Приводит введённые данные к установленному формату</li>
            <li>Создаёт унифицированный объект комментария</li>
            <li>Сохраняет объект в базе данных</li>
            <li>Отрисовывает HTML комментария</li> 
          </ul>
        </li>
      </ul>
    </li>    
  </ul>
