function createCalendar(year, month) {
    let weekdays = ['월', '화', '수', '목', '금', '토', '일'];
    let date = new Date(year, month, 1);
    let currentMonth = date.getMonth();
    let calendar = document.createElement('table');
    let caption = calendar.createCaption();
    caption.textContent = year + '년 ' + (month + 1) + '월';

    //요일 표시
    let header = calendar.insertRow();
    for(let dayName = 0; dayName < 7; dayName++) {
        let cell = header.insertCell();
        cell.textContent = weekdays[dayName];
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
        cell.textContent = date.getDate();
        date.setDate(date.getDate() + 1);

        //일요일이면 다음 행으로 이동
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