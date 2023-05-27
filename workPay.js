function createCalendar(year, month) {
  let weekdays = ['월', '화', '수', '목', '금', '토', '일'];
  let date = new Date(year, month, 1);
  let currentMonth = date.getMonth();
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
  let firstDayOfWeek = date.getDay();
  (firstDayOfWeek - 1 == -1) ? firstDayOfWeek = 6 : firstDayOfWeek -= 1;
  let dayCount = firstDayOfWeek;
  let row = calendar.insertRow();

  //시작 위치까지 빈 셀 추가
  for (let i = 0;i < firstDayOfWeek; i++) {
      let emptyCell = row.insertCell();
  }

  //달력 생성
  while (date.getMonth() === currentMonth) {
    let cell = row.insertCell();
    let dateText = document.createElement('p');
    dateText.textContent = date.getDate();
    cell.appendChild(dateText);
  
    // 토요일인 경우 'Saturday' 클래스 추가
    if (dayCount === 5) {
      dateText.classList.add('saturday');
    }
    // 일요일인 경우 'Sunday' 클래스 추가
    else if (dayCount === 6) {
      dateText.classList.add('sunday');
    }
    // 나머지 요일인 경우 'dateNumber' 클래스 추가
    else {
      dateText.classList.add('dateNumber');
    }
  
    // 날짜 입력을 위한 input 요소 생성
    let dateInput = document.createElement('input');
    dateInput.type = 'text';
    dateInput.classList.add('dateInput');
    dateInput.size = 1;
    dateInput.step = 0.1;
    dateInput.onchange = function(){sumWorkTime()};
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

  //마지막 주의 빈 셀 채우기
  while (row.cells.length < 7) {
    let emptyCell = row.insertCell();
  }

  return calendar;
}

window.onload = function() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let calendar = createCalendar(year, month);
    let calendarElement = document.getElementById('calendar');
    calendarElement.appendChild(calendar);
} 

function sumWorkTime() {
  let nowDate = new Date();
  let nowYear = nowDate.getFullYear();
  let nowMonth = nowDate.getMonth();
  let nowFirstDate = new Date(nowYear, nowMonth, 1);
  let lastDay = new Date(nowYear, nowMonth + 1, 0);
  let nowLastDate = lastDay.getDate();
  let nowFirstDay = nowFirstDate.getDay();
  (nowFirstDay - 1 == -1) ? nowFirstDay = 6 : nowFirstDay -= 1;

  let sumWorkTime = 0;
  for(let i = nowFirstDay; i < nowLastDate; i++) {
    let dayWorkTime = document.getElementsByClassName("dateInput")[i].value;
    sumWorkTime += Number(dayWorkTime);
    let printWorkTime = document.getElementById('resultP');
    printWorkTime.textContent = "총 근무 시간은 " + sumWorkTime + "시간 입니다.";
  }
  console.log(sumWorkTime);
}