/* Your Code Here */
function createEmployeeRecord(array) {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };

    return employee;
}


function createEmployeeRecords(arrays) {
    return arrays.map(employee => createEmployeeRecord(employee));
}

//adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record
function createTimeInEvent(timeStamp) {
    //split time stamp
    const [date, time] = timeStamp.split(" ");

    this.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(time)
    });

    return this;

}

//it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
function createTimeOutEvent(timeStamp) {
    //split time stamp
    const [date, time] = timeStamp.split(" ");

    this.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(time)
    });

    return this;

}

//Given an employee record with a date-matched timeInEvent and timeOutEvent hoursWorkedOnDate calculates the hours worked when given an employee record and a date
function hoursWorkedOnDate(date) {

    let timein = this.timeInEvents.find(event => event.date === date);

    let timeout = this.timeOutEvents.find(event => event.date === date)

    return (timeout.hour - timein.hour) / 100

}

//wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
function wagesEarnedOnDate(date) {

    let hours = hoursWorkedOnDate.call(this, date);
    let wage = this.payPerHour;
    return hours * wage;

}


//CalculatePayroll aggregates all the dates' wages and adds them together
function calculatePayroll(employees) {

    let payroll = employees.reduce((accumulator, employee) => {
        return accumulator + allWagesFor.call(employee);
    }, 0);

    return payroll;

}


function findEmployeeByFirstName(employees, name) {
    return employees.find(employee => {
        return employee.firstName === name;
    });
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}