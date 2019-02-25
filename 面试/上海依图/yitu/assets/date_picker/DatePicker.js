/**
 * options: 配置对象 
 * options.element: 放置日历的容器 
 * options.year: 日历生成时的年份 
 * options.year: 日历生成时的月份
 * options.onDateSelected: 需要是一个funtion 选择日期时会执行该函数 会将日期传给该函数
 */
function datePicker(options) {

  const WEEKDAY = {
    0: {
      cn: '周末',
      en: 'S'
    },
    1: {
      cn: '星期一',
      en: 'M'
    },
    2: {
      cn: '星期二',
      en: 'T'
    },
    3: {
      cn: '星期三',
      en: 'W'
    },
    4: {
      cn: '星期四',
      en: 'T'
    },
    5: {
      cn: '星期五',
      en: 'F'
    },
    6: {
      cn: '星期六',
      en: 'S'
    }
  }

  const MONTHMAP = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  }


  function getLastMoth(year, month) {
    return month === 0 ? {
      year: year - 1,
      month: 11
    } : {
      year,
      month: month - 1
    };
  }

  function getNextMonth(year, month) {
    return month === 11 ? {
      year: year + 1,
      month: 0
    } : {
      year,
      month: month + 1
    }
  }


  function Calendar(year, month) {
    var element = options.element;

    if (!element) {
      throw 'element required'
    }
    if (typeof element === 'string') {
      if (element.startsWith('#')) {
        this.rootElement = document.querySelector(element);
      }
    }
    if (element instanceof Node) {
      this.rootElement = element;
    }
    if (!this.rootElement) {
      throw 'element not found';
    }
    this.selectedDay = null;
    this.currentDate = null;
  }

  Calendar.prototype.init = function () {
    var fragement = document.createDocumentFragment();
    var calendarContainer = document.createElement('div');
    var calendarHeader = document.createElement('div');
    var calendarHeaderTitle = document.createElement('span');
    var calendarHeaderOperate = document.createElement('div');
    var operatePrevious = document.createElement('div'); // 上一月

    var operateNext = document.createElement('div'); // 下一月
    var previousContent = document.createElement('div');
    var nextContent = document.createElement('div');

    var calendarTabel = document.createElement('div');
    var tabelHeader = document.createElement('div');
    var tabelBody = document.createElement('div');

    fragement.appendChild(calendarContainer);
    calendarContainer.appendChild(calendarHeader);
    calendarContainer.appendChild(calendarTabel);
    calendarHeader.appendChild(calendarHeaderTitle);
    calendarHeader.appendChild(calendarHeaderOperate);
    calendarHeaderOperate.appendChild(operatePrevious);
    calendarHeaderOperate.appendChild(operateNext);
    operatePrevious.appendChild(previousContent);
    operateNext.appendChild(nextContent);
    calendarTabel.appendChild(tabelHeader);
    calendarTabel.appendChild(tabelBody);

    calendarContainer.classList.add('calendar-container');
    calendarHeader.classList.add('calendar-header');
    calendarHeaderTitle.classList.add('calendar-title')
    calendarHeaderOperate.classList.add('calendar-operate');
    operatePrevious.classList.add('operate', 'previous');
    operateNext.classList.add('operate', 'next');
    calendarTabel.classList.add('calendar-table');
    tabelHeader.classList.add('tabel-header');
    tabelBody.classList.add('table-body');
    this.rootElement.appendChild(fragement);
    this.tabelBody = tabelBody;
    this.calendarTabel = calendarTabel;
    this.calendarHeaderTitle = calendarHeaderTitle;
    this.calendarContainer = calendarContainer;
    this.operatePrevious = operatePrevious;
    this.operateNext = operateNext;
    var row = document.createElement('div');
    row.classList.add('table-row');

    // 生成表头
    for (var i = 0; i < 7; i++) {
      var col = document.createElement('div');
      col.innerText = WEEKDAY[i].en;
      col.classList.add('table-col');
      row.appendChild(col);
    }
    tabelHeader.appendChild(row)
  }


  /**
   * 生成日历中的每一天
   * @param {*} year 当前年
   * @param {*} month 当前月
   */
  Calendar.prototype.generateDateCol = function (year, month) {

    var dateCols = [];
    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0)
    var lastMonth = getLastMoth(year, month);
    var nextMonth = getNextMonth(year, month);
    var lastMonthLastDay = new Date(lastMonth.year, lastMonth.month + 1, 0);
    var nextMonthFirstDay = new Date(nextMonth.year, nextMonth.month, 1);
    // 第一天是一周的第几天
    var firstDayCount = firstDay.getDay();
    // 最后一天的索引
    var lastDayCount = lastDay.getDate() + firstDayCount;

    for (var i = 0; i < 42; i++) {
      if (i < firstDayCount) {
        dateCols.unshift({
          year: lastMonth.year,
          month: lastMonth.month + 1,
          day: lastMonthLastDay.getDate() - i,
          weekDay: WEEKDAY[firstDayCount - i - 1],
          tag: 'previous-month'
        })
      } else if (i + 1 > lastDayCount) {
        var day = i + 1 - lastDayCount;
        var date = new Date(nextMonth.year, nextMonth.month, day)
        dateCols.push({
          year: nextMonth.year,
          month: nextMonth.month + 1,
          day: day,
          weekDay: WEEKDAY[date.getDay()],
          tag: 'next-month'
        })
      } else {
        var day = i - firstDayCount + 1;
        var date = new Date(year, month, day);
        dateCols.push({
          year: year,
          month: month + 1,
          day: day,
          weekDay: WEEKDAY[date.getDay()],
          tag: 'current-month'
        })
      }
    }
    return dateCols;
  }

  // 生成日历 
  Calendar.prototype.generateCalendar = function (year, month) {
    this.year = year;
    this.month = month;
    this.calendarHeaderTitle.innerText = MONTHMAP[month + 1] + ' ' + year;
    var tabelBody = document.createElement('div');
    var dateCols = this.generateDateCol(year, month);
    for (var i = 0; i < dateCols.length; i++) {
      var col = document.createElement('div');
      col.innerText = dateCols[i].day;
      col.classList.add('table-col', 'day');
      col.classList.add(dateCols[i].tag);

      if (this.currentDate && dateCols[i].year === this.currentDate.year && dateCols[i].month === this.currentDate.month && dateCols[i].day === this.currentDate.day) {
        col.classList.add('selected');
        this.selectedDay = col;
      }

      if (i % 7 === 0) {
        var row = document.createElement('div');
        row.classList.add('table-row');
        tabelBody.appendChild(row);
      }
      row.appendChild(col);
    }

    tabelBody.classList.add('table-body')
    this.calendarTabel.replaceChild(tabelBody, this.tabelBody);
    this.tabelBody = tabelBody;
  }

  // 绑定事件 
  Calendar.prototype._bindEvent = function () {

    this.operateNext.addEventListener('click', (e) => {
      e.stopPropagation();
      var nextMonth = getNextMonth(this.year, this.month);
      this.generateCalendar(nextMonth.year, nextMonth.month);
    })

    this.operatePrevious.addEventListener('click', (e) => {
      e.stopPropagation();
      var lastMonth = getLastMoth(this.year, this.month);
      this.generateCalendar(lastMonth.year, lastMonth.month);
    })

    this.calendarContainer.addEventListener('click', (e) => {
      var target = e.target;
      var currentDate;

      // 生成上一个月的日历
      if (target.classList.contains('day') && target.classList.contains('previous-month')) {
        var lastMonth = getLastMoth(this.year, this.month);
        currentDate = new CalendarDate(lastMonth.year, lastMonth.month + 1, parseInt(target.innerText));
        this.currentDate = currentDate;
        this.generateCalendar(lastMonth.year, lastMonth.month);
        typeof options.onDateSelected === 'function' &&
          (options.onDateSelected(new CalendarDate(this.year, this.month + 1, parseInt(target.innerText))));
        return;
      }

      // 生成下一个月的日历
      if (target.classList.contains('day') && target.classList.contains('next-month')) {
        var nextMonth = getNextMonth(this.year, this.month);
       // debugger
        currentDate = new CalendarDate(nextMonth.year, nextMonth.month + 1, parseInt(target.innerText));
        this.currentDate = currentDate;
        this.generateCalendar(nextMonth.year, nextMonth.month);
        typeof options.onDateSelected === 'function' &&
          (options.onDateSelected(new CalendarDate(this.year, this.month + 1, parseInt(target.innerText))));
        return;
      }

      // 选中日期
      if (target.classList.contains('day') && target.classList.contains('current-month')) {
        this.selectedDay && (this.selectedDay.classList.remove('selected'));
        target.classList.add('selected');
        this.selectedDay = target;
        this.currentDate = currentDate;
        currentDate = new CalendarDate(this.year, this.month + 1, parseInt(target.innerText));
        typeof options.onDateSelected === 'function' &&
          (options.onDateSelected(new CalendarDate(this.year, this.month + 1, parseInt(target.innerText))));
      }
    })
  }

  function CalendarDate(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  (function () {
    var calendar = new Calendar();
    calendar.init();
    if (options.year && options.year >= 1970 && options.month > 0 && options.month <= 12) {
      calendar.generateCalendar(options.year, options.month - 1);
    } else {
      var date = new Date();
      calendar.generateCalendar(date.getFullYear(), date.getMonth());
    }
    calendar._bindEvent();
  })();
}