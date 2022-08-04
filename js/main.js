let storageKey = 'students';
let students = [];
let now = new Date();

let deleteKey;

if (students == []) {
    deleteKey = 0;
}
else {
    deleteKey = students.length;
}

function studentObj(surname, name, secondName, faculty, birthDate, startDate, deleteKey) {
    this.surname = surname.trim();
    this.name = name.trim();
    this.secondName = secondName.trim();
    this.faculty = faculty.trim();
    this.birthDate = birthDate;
    this.startDate = startDate;
    this.deleteKey = deleteKey;
}


let form = document.querySelector('.form__add');
let table = document.querySelector('.table');

function createLine(fio, faculty, age, period, deleteKey) {
    let tableLine = document.createElement('div');
    let firstCell = document.createElement('div');
    let secondCell = document.createElement('div');
    let thirdCell = document.createElement('div');
    let fourthCell = document.createElement('div');
    let deleteButton = document.createElement('button');

    tableLine.classList.add('table__line', 'flex', 'line' + deleteKey);
    firstCell.classList.add('table__cell', 'table__cell_1');
    secondCell.classList.add('table__cell', 'table__cell_2');
    thirdCell.classList.add('table__cell', 'table__cell_3');
    fourthCell.classList.add('table__cell', 'table__cell_4');
    deleteButton.classList.add('btn-reset', 'table__cell_5');
    deleteButton.id = deleteKey;

    firstCell.textContent = fio;
    secondCell.textContent = faculty;
    thirdCell.textContent = age;
    fourthCell.textContent = period;

    tableLine.append(firstCell);
    tableLine.append(secondCell);
    tableLine.append(thirdCell);
    tableLine.append(fourthCell);
    tableLine.append(deleteButton);

    table.append(tableLine);
}

function removeLine(deleteKey) {
    document.querySelector('.line' + deleteKey).remove();
};

function createTable(students) {
    let previousLines = document.querySelectorAll('.table__line');
    for (line of previousLines) {
        line.remove();
    }

    for (value of students) {
        let surname = value.surname;
        let name = value.name;
        let secondName = value.secondName;
        let faculty = value.faculty;
        let birthDate = new Date(value.birthDate);
        let startDate = value.startDate;
        let deleteKey = value.deleteKey;

        let fio = surname + ' ' + name + ' ' + secondName;

        /* ДР и возраст */
        let now = new Date();
        let currentAge;

        if (now.getMonth() > birthDate.getMonth() || (now.getMonth() == birthDate.getMonth() && now.getDate() > birthDate.getDate())) {
            currentAge = now.getFullYear() - birthDate.getFullYear();
        }
        else {
            currentAge = now.getFullYear() - birthDate.getFullYear() - 1;
        }

        let ageArray = ("" + currentAge).split("").map(Number);
        let lastNumber = ageArray[ageArray.length - 1];
        let penultNumber = ageArray[ageArray.length - 2];

        if (lastNumber == 1) {
            if (penultNumber == 1) {
                currentAge = currentAge + ' лет';
            }
            else {
                currentAge = currentAge + ' год';
            }
        }
        else if (lastNumber == 2 || lastNumber == 3 || lastNumber == 4) {
            if (penultNumber == 1) {
                currentAge = currentAge + ' лет';
            }
            else {
                currentAge = currentAge + ' года';
            }
        }
        else {
            currentAge = currentAge + ' лет';
        }

        let month;
        let monthArray = ("" + birthDate.getMonth()).split("").map(Number);
        if (monthArray.length == 1) {
            month = '0' + birthDate.getMonth();
        }
        else {
            month = birthDate.getMonth();
        }
        let day;
        let dayArray = ("" + birthDate.getDate()).split("").map(Number);
        if (dayArray.length == 1) {
            day = '0' + birthDate.getDate();
        }
        else {
            day = birthDate.getDate();
        }

        let age = day + '.' + month + '.' + birthDate.getFullYear() + ' ' + '(' + currentAge + ')';

        /* Годы обучения */
        let studyPeriod;
        let endDate = parseInt(Number(startDate) + 4, 10);

        if ((now.getFullYear() == endDate && now.getMonth() > 8) || now.getFullYear() > endDate) {
            studyPeriod = 'закончил';
        }
        else if (now.getMonth() < 9) {
            studyPeriod = Math.abs(now.getFullYear() - startDate);
            studyPeriod = studyPeriod + ' курс';
        }
        else {
            studyPeriod = Math.abs(now.getFullYear() - startDate) + 1;
            studyPeriod = studyPeriod + ' курс';
        }

        let period = startDate + '-' + parseInt(Number(startDate) + 4, 10) + ' ' + '(' + studyPeriod + ')';

        createLine(fio, faculty, age, period, deleteKey);
    }

    localStorage.setItem(storageKey, JSON.stringify(students));
    console.log(students);

    let deleteButtons = document.querySelectorAll('.table__cell_5');
    console.log(deleteButtons);
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function (e) {
            console.log(e.target.getAttribute('id'));
            let id = String(e.target.getAttribute('id'));
            for (student of students) {
                if (student.deleteKey == id) {
                    console.log(students.indexOf(student));
                    students.splice(students.indexOf(student), 1);
                }
            };
            console.log(students);
            localStorage.setItem(storageKey, JSON.stringify(students));
            createTable(students);
        })
    };
}


/* Validation */

function validate(surname, name, secondName, faculty, birthDate, startDate) {
    let errors = 0;

    let surnameInput = document.getElementById('surname');
    let nameInput = document.getElementById('name');
    let secondNameInput = document.getElementById('secondName');
    let facultyInput = document.getElementById('faculty');
    let birthDateInput = document.getElementById('birthDate');
    let startDateInput = document.getElementById('startDate');
    birthDate = new Date(birthDate);

    surnameInput.classList.remove('error');
    nameInput.classList.remove('error');
    secondNameInput.classList.remove('error');
    facultyInput.classList.remove('error');
    birthDateInput.classList.remove('error');
    startDateInput.classList.remove('error');

    surnameInput.parentNode.classList.remove('surname');
    nameInput.parentNode.classList.remove('name');
    secondNameInput.parentNode.classList.remove('secondName');
    facultyInput.parentNode.classList.remove('faculty');
    startDateInput.parentNode.classList.remove('startDate', 'startDate-min', 'startDate-max');
    birthDateInput.parentNode.classList.remove('birthDate', 'birthDate-min', 'birthDate-max');

    if (surname == '') {
        errors = errors + 1;
        surnameInput.classList.add('error');
        surnameInput.parentNode.classList.add('surname');
    }

    if (name == '') {
        errors = errors + 1;
        nameInput.classList.add('error');
        nameInput.parentNode.classList.add('name');
    }

    if (secondName == '') {
        errors = errors + 1;
        secondNameInput.classList.add('error');
        secondNameInput.parentNode.classList.add('secondName');
    }

    if (faculty == '') {
        errors = errors + 1;
        facultyInput.classList.add('error');
        facultyInput.parentNode.classList.add('faculty');
    }

    if (startDate == '') {
        errors = errors + 1;
        startDateInput.classList.add('error');
        startDateInput.parentNode.classList.add('startDate');
    }
    else if (Number(startDate) < 2000) {
        errors = errors + 1;
        startDateInput.classList.add('error');
        startDateInput.parentNode.classList.add('startDate-min');
    }
    else if (Number(startDate) > Number(now.getFullYear())) {
        errors = errors + 1;
        startDateInput.classList.add('error');
        startDateInput.parentNode.classList.add('startDate-max');
    }

    if (isNaN(birthDate)) {
        errors = errors + 1;
        birthDateInput.classList.add('error');
        birthDateInput.parentNode.classList.add('birthDate');
    }
    else if (birthDate.getFullYear() < 1900) {
        errors = errors + 1;
        birthDateInput.classList.add('error');
        birthDateInput.parentNode.classList.add('birthDate-min');
    }
    else if (birthDate.getFullYear() > now.getFullYear() || (birthDate.getFullYear() == now.getFullYear() && birthDate.getMonth() > now.getMonth()) || (birthDate.getFullYear() == now.getFullYear() && birthDate.getMonth() == now.getMonth() && birthDate.getDate() > now.getDay())) {
        errors = errors + 1;
        birthDateInput.classList.add('error');
        birthDateInput.parentNode.classList.add('birthDate-max');
    }

    if (errors == 0) {
        surnameInput.value = '';
        nameInput.value = '';
        secondNameInput.value = '';
        facultyInput.value = '';
        birthDateInput.value = '';
        startDateInput.value = '';
    }

    return errors;
}


form.addEventListener('submit', function (e) {
    e.preventDefault();

    let surname = document.getElementById('surname').value.trim();
    let name = document.getElementById('name').value.trim();
    let secondName = document.getElementById('secondName').value.trim();
    let faculty = document.getElementById('faculty').value.trim();
    let birthDate = document.getElementById('birthDate').value;
    let startDate = document.getElementById('startDate').value.trim();
    birthDate = new Date(birthDate);
    birthDate = new Date(birthDate.getFullYear(), parseInt(birthDate.getMonth() + 1), birthDate.getDate());

    let errors = validate(surname, name, secondName, faculty, birthDate, startDate);

    if (errors == 0) {
        deleteKey = deleteKey + 1;
        let newStudent = new studentObj(surname, name, secondName, faculty, birthDate, startDate, deleteKey);
        students.push(newStudent);
        createTable(students);
    }
    else {
        return;
    }

});

/* Сортировка */
let clickNumber = 0;

let nameSort = document.querySelector('.header__value_1');
nameSort.addEventListener('click', function () {
    if (clickNumber == 1) {
        students = students.sort((a, b) => a.surname + a.name + a.secondName < b.surname + b.name + b.secondName ? 1 : -1);
        clickNumber = 0;
    }
    else {
        clickNumber = clickNumber + 1;
        students = students.sort((a, b) => a.surname + a.name + a.secondName > b.surname + b.name + b.secondName ? 1 : -1);
    }
    createTable(students);
});

let facultySort = document.querySelector('.header__value_2');
facultySort.addEventListener('click', function () {
    if (clickNumber == 1) {
        students = students.sort((a, b) => a.faculty > b.faculty ? 1 : -1);
        clickNumber = 0;
    }
    else {
        clickNumber = clickNumber + 1;
        students = students.sort((a, b) => a.faculty < b.faculty ? 1 : -1);
    }
    createTable(students);
});

let birthDate = document.querySelector('.header__value_3');
birthDate.addEventListener('click', function () {
    if (clickNumber == 1) {
        students = students.sort((a, b) => a.birthDate > b.birthDate ? 1 : -1);
        clickNumber = 0;
    }
    else {
        clickNumber = clickNumber + 1;
        students = students.sort((a, b) => a.birthDate < b.birthDate ? 1 : -1);
    }
    createTable(students);
});

let startSort = document.querySelector('.header__value_4');
startSort.addEventListener('click', function () {
    if (clickNumber == 1) {
        students = students.sort((a, b) => a.startDate > b.startDate ? 1 : -1);
        clickNumber = 0;
    }
    else {
        clickNumber = clickNumber + 1;
        students = students.sort((a, b) => a.startDate < b.startDate ? 1 : -1);
    }
    createTable(students);
});

/* Фильтрация */
let fioFilter = document.getElementById('fioFilter');
let facultyFilter = document.getElementById('facultyFilter');
let startDateFilter = document.getElementById('startDateFilter');
let finalDateFilter = document.getElementById('finalDateFilter');

function checkOpenFilters(field, fioFilter, facultyFilter, startDateFilter, finalDateFilter) {
    let filters = [fioFilter, facultyFilter, startDateFilter, finalDateFilter];
    for (i of filters) {
        if (field.id == i.id) {
            filters.splice(filters.indexOf(i), 1);
        }
    }
    let filterCount = 0;
    for (i of filters) {
        if (i.value != '') {
            filterCount = filterCount + 1;
        }
    }
    return filterCount;

};

let fields = [];

function filter(field, key1, key2, key3, students, final, fioFilter, facultyFilter, startDateFilter, finalDateFilter) {

    let filterCount = checkOpenFilters(field, fioFilter, facultyFilter, startDateFilter, finalDateFilter);
    /*console.log(filterCount);*/
    let lastField;

    if (filterCount > 0) {
        /*console.log(fields);*/
        if (fields.includes(field.id)) {
            lastField = fields[fields.indexOf(field.id) - 1];
        }
        else {
            lastField = fields[fields.length - 1];
        }
        let previousLines = document.querySelectorAll('.' + String(lastField));
        /*console.log(lastField);
        console.log(previousLines);*/
    }

    let found = 0;
    let input;

    if (final == 0) {
        input = String(field.value).trim().toLowerCase();
    }
    else {
        if (field.value > 2000) {
            input = String(field.value - 4).trim().toLowerCase();
        }
        else {
            input = String(field.value).trim().toLowerCase();
        }
        /*console.log(input);*/
    }

    if (input == '') {
        for (student of students) {
            document.querySelector('.line' + student.deleteKey).classList.remove(field.id);
        };
        field.classList.remove('error');
        field.parentNode.classList.remove('filter-error');
        fields.splice(fields.indexOf(field.id), 1);
        if (filterCount > 0) {
            /*console.log(lastField);*/
            let previousLines = document.querySelectorAll('.' + String(lastField));
            for (line of previousLines) {
                line.classList.remove('displayNone');
            }
        }
        else {
            for (student of students) {
                document.querySelector('.line' + student.deleteKey).classList.remove('displayNone');
            };
        }
    }
    else {
        for (student of students) {
            if (key2 == '' && key3 == '') {
                keyValue = String(student[key1]).toLowerCase();
            }
            else {
                keyValue = student[key1] + student[key2] + student[key3];
                keyValue = keyValue.toLowerCase();
            }
            if (keyValue.includes(input)) {
                if (filterCount > 0) {
                    if (document.querySelector('.line' + student.deleteKey).classList.contains(String(lastField))) {
                        document.querySelector('.line' + student.deleteKey).classList.remove('displayNone');
                        document.querySelector('.line' + student.deleteKey).classList.add(field.id);
                        found = found + 1;
                    }
                    else {
                        document.querySelector('.line' + student.deleteKey).classList.add('displayNone');
                        document.querySelector('.line' + student.deleteKey).classList.remove(field.id);
                    }
                }
                else {
                    document.querySelector('.line' + student.deleteKey).classList.remove('displayNone');
                    document.querySelector('.line' + student.deleteKey).classList.add(field.id);
                    found = found + 1;
                }
            }
            else {
                document.querySelector('.line' + student.deleteKey).classList.add('displayNone');
                document.querySelector('.line' + student.deleteKey).classList.remove(field.id);
            }
        }
        if (found == 0) {
            if (fields.includes(field.id)) {
                fields.splice(fields.indexOf(field.id), 1);
            }
            /*console.log(fields);*/
            field.classList.add('error');
            field.parentNode.classList.add('filter-error');
        }
        else {
            if (!fields.includes(field.id)) {
                fields.push(field.id);
            }
            /*console.log(fields);*/
            field.classList.remove('error');
            field.parentNode.classList.remove('filter-error');
        }
    }
}

fioFilter.addEventListener('input', function () {
    filter(fioFilter, 'surname', 'name', 'secondName', students, 0, fioFilter, facultyFilter, startDateFilter, finalDateFilter);
});

facultyFilter.addEventListener('input', function () {
    filter(facultyFilter, 'faculty', '', '', students, 0, fioFilter, facultyFilter, startDateFilter, finalDateFilter);
});

startDateFilter.addEventListener('input', function () {
    filter(startDateFilter, 'startDate', '', '', students, 0, fioFilter, facultyFilter, startDateFilter, finalDateFilter);
});

finalDateFilter.addEventListener('input', function () {
    filter(finalDateFilter, 'startDate', '', '', students, 1, fioFilter, facultyFilter, startDateFilter, finalDateFilter);
})


let filterBtn = document.querySelector('.filter__btn');
filterBtn.addEventListener('click', function (e) {
    e.preventDefault();
    fioFilter.value = '';
    facultyFilter.value = '';
    startDateFilter.value = '';
    finalDateFilter.value = '';

    fioFilter.classList.remove('error');
    fioFilter.parentNode.classList.remove('filter-error');
    facultyFilter.classList.remove('error');
    facultyFilter.parentNode.classList.remove('filter-error');
    startDateFilter.classList.remove('error');
    startDateFilter.parentNode.classList.remove('filter-error');
    finalDateFilter.classList.remove('error');
    finalDateFilter.parentNode.classList.remove('filter-error');

    for (student of students) {
        document.querySelector('.line' + student.deleteKey).classList.remove('displayNone');
    };


});


const LSData = localStorage.getItem(storageKey);
/*console.log(JSON.parse(LSData));*/
if (LSData !== null && LSData !== []) {
    students = JSON.parse(LSData);
    createTable(students);
    deleteKey = students.length;
}
else {
    students = [];
};







