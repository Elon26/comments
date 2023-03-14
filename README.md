<h1>Страница с комментариями</h1>
<br>
<p>Функционал содержит следующие компоненты:</p>
<ul>
    <li>Форму для добавления комментариев со следующими элементами:
      <ul>
        <li>Поле ввода имени:
          <ul>
            <li>На поле установлена валидация на непустое значение.</li>
            <li>Нажатие клавиши Enter при фокусе на данном поле запускает обработку формы (см. Кнопка отправки формы).</li>
          </ul>
        </li>
        <li>Поле ввода даты:
          <ul>
            <li>Поле допускает пустое значение. В этом случае, настроена установка текущей даты.</li>
            <li>При вводе непустого значения, установлена валидация двух уровней - сначала проверка формата ввода на соответствие "ДД.ММ.ГГГГ", затем проверка на корректность ввода даты (32.13.2006 распознаётся, как некорректная дата).</li>
            <li>Нажатие клавиши Enter при фокусе на данном поле запускает обработку формы (см. Кнопка отправки формы).</li>
          </ul>
        </li>
        <li>Поле ввода комментария:
          <ul>
            <li>На поле установлена валидация на непустое значение.</li>
            <li>Нажатие клавиши Enter при фокусе на данном поле не запускает обработку (submit) формы, т.к. Enter используется для перехода на новую строку. Функционал сохраняет пользовательские отступы.</li>
          </ul>
        </li>
        <li>Кнопка отправки формы, которая:
          <ul>
            <li>Запускает валидацию полей форм (дальнейшие действия осуществляются, только при успешном прохождении валидации).</li>
            <li>Приводит введённые данные к установленному формату: 
                 <ul>
                     <li>Имя преобразуется в формат "С большой буквы".</li>
                     <li>Дата, если не была введена, устанавливается текущая, если была - приводится к единому формату, также устанавливается текущее время.</li>
                 </ul>
            </li>
            <li>Создаёт унифицированный объект комментария.</li>
            <li>Сохраняет объект в базе данных.</li>
            <li>Отрисовывает HTML комментария.</li>          
            <li>Очищает поля формы.</li>                
            <li>Осуществляет сортировку комментариев по дате создания.</li>        
            <li>Создаёт стикер о создании нового комментария.</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>Раздел с уже созданными комментариями, каждый из которых содержит:
      <ul>
        <li>Имя автора комментария.</li>
        <li>Дату создания комментария.</li>
        <li>Содержание комментария с сохранёнными пользовательскими отступами.</li>          
        <li>Кнопку "лайка", которая при нажатии:
          <ul>
            <li>Меняет цвет.</li>
            <li>Меняет соответствующее поле соответствующего объекта комментария в базе данных.</li>
          </ul>
        </li>
        <li>Кнопку удаления, которая при нажатии:
          <ul>
            <li>Запрашивает подтверждение удаления (дальнейшие действия осуществляются, только при подтверждении пользователем).</li>
            <li>Удаляет комментарий из HTML.</li>
            <li>Удаляет комментарий из базы данных.</li>             
            <li>Если комментариев больше не осталось, выводится соответствующее сообщение.</li>              
            <li>Создаёт стикер об удалении комментария.</li> 
          </ul>
        </li>
      </ul>
    </li>
  </ul>
