window.onload = function() {
  let dayNumber = getDayNum();
  let calendar = createCalendar(dayNumber.year, dayNumber.month);
  let calendarElement = document.getElementById('calendar');
  calendarElement.appendChild(calendar);
}

function getDayNum() {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();
  let day = today.getDay();
  (day -1 == -1) ? day = 6 : day -= 1;

  let firstDay = new Date(year, month, 1);
  let firstDate = firstDay.getDate();
  let firstDayNum = firstDay.getDay();
  (firstDayNum -1 == -1) ? firstDayNum = 6 : firstDayNum -= 1;

  let lastDay = new Date(year, month + 1, 0);
  let lastDate = lastDay.getDate();

  return {
    today: today,
    year: year,
    month: month,
    date: date,
    day: day,
    firstDay: firstDay,
    firstDate: firstDate,
    firstDayNum: firstDayNum,
    lastDay: lastDay,
    lastDate: lastDate
  };
}
let dayNum = getDayNum();

function createCalendar(year, month) {
  let weekdays = ['월', '화', '수', '목', '금', '토', '일'];
  let date = new Date(year, month, 1);
  let cloneMonth = date.getMonth();
  let calendar = document.createElement('table');
  let caption = calendar.createCaption();
  let captionTitle = document.createElement('h1');
  captionTitle.textContent = year + '년 ' + (month + 1) + '월';
  caption.appendChild(captionTitle);

  //요일 표시
  let header = calendar.insertRow();
  for(let dayName = 0; dayName < 7; dayName++) {
    let cell = header.insertCell();
    let dayText = document.createElement('p');  //요일 넣을 p태그 생성
    dayText.textContent = weekdays[dayName];    //p태그 안에 요일 넣기
    dayText.classList.add('dayName');           //p태그에 클래스 추가
    cell.appendChild(dayText);                  //p태그를 셀의 자식으로 추가
    cell.classList.add('dayCell');

    if (dayName === 5) {
      cell.classList.add('saturdayName');
    } else if (dayName === 6) {
      cell.classList.add('sundayName');
    }
  }

  //이번 달 첫 요일 구하기
  let dayCount = dayNum.firstDayNum;
  let row = calendar.insertRow();

  //시작 위치까지 빈 셀 추가
  for (let i = 0; i < dayNum.firstDayNum; i++) {
    let emptyCell = row.insertCell();
  }

  //달력 생성
  while (date.getMonth() === cloneMonth) {
    let cell = row.insertCell();
    let dateText = document.createElement('p');
    dateText.textContent = date.getDate();
    cell.appendChild(dateText);
    
    if (dayCount === 5) {                   // 토요일인 경우 'Saturday' 클래스 추가
      dateText.classList.add('saturday');
    } else if (dayCount === 6) {            // 일요일인 경우 'Sunday' 클래스 추가
      dateText.classList.add('sunday');
    } else {                                // 나머지 요일인 경우 'dateNumber' 클래스 추가
      dateText.classList.add('dateNumber');
    }
    
    // 날짜 입력을 위한 input 요소 생성
    let dateInput = document.createElement('input');  
    dateInput.type = 'text';
    dateInput.classList.add('dateInput');
    dateInput.size = 1;
    dateInput.step = 0.1;
    dateInput.onkeyup = function(){sumWorkTime()};
    cell.appendChild(dateInput);
    date.setDate(date.getDate() + 1);
  
    // 일요일이면 다음 행으로 이동
    if (dayCount < 6) {
      dayCount++;
    } else {
      row = calendar.insertRow();
      dayCount = 0;
    }
  }

  //마지막 주 빈 셀 채우기
  while (row.cells.length < 7) {
    let emptyCell = row.insertCell();
  }

  return calendar;
}

function sumWorkTime() {
  let sumWorkTime = 0;
  for(let i = dayNum.firstDayNum; i < dayNum.lastDate; i++) {
    let dayWorkTime = document.getElementsByClassName("dateInput")[i].value;
    sumWorkTime += Number(dayWorkTime);
    let printWorkTime = document.getElementById('resultP');
    printWorkTime.textContent = "총 근무 시간은 " + sumWorkTime + "시간 입니다.";
  }
  console.log(sumWorkTime);
}