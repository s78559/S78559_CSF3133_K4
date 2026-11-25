/*
ERROR IDENTIFICATION – grade.js

Error 1 (Original Line 5):
Name validation does not trim whitespace.
Correction: Use trim().

Error 2 (Original Line 9):
Numeric validation does not properly handle empty input.
Correction: Check empty input before conversion.

Error 3 (Original Line 13):
parseInt() removes decimal values and accepts partial numbers.
Correction: Use Number() and Number.isFinite().

Error 4 (Original Line 14):
Mark validation should reject values outside 0–100.
Correction: Validate mark < 0 or mark > 100.

Error 5 (Original Line 29):
Uses style.colour instead of style.color.
Correction: Change to style.color.

Error 6 (Original Line 37):
Loop starts at i = 1, skipping the first grade.
Correction: Start at i = 0.

Error 7 (Original Line 42):
Uses innerHtml instead of innerHTML.
Correction: Change to innerHTML.

Error 8 (Missing feature):
No randomMark() function.
Correction: Create a function to generate a random mark.

Error 9 (Missing feature):
No date and time display.
Correction: Use new Date() and display the result.
*/

// Function 1: Check the student's mark and calculate grade
function checkMark(event) {

    // Prevent the form from refreshing the page
    event.preventDefault();

    // Get student name and mark
    let name = document.forms["gradeForm"]["name"].value.trim();

    let markInput = document.forms["gradeForm"]["mark"].value;

    // Check whether name is empty
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Check whether mark is empty
    if (markInput.trim() === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Convert mark into a number
    let mark = Number(markInput);

    // Check whether mark is a valid number
    if (!Number.isFinite(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Check whether mark is between 0 and 100
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine the student's grade
    let grade;

    if (mark >= 80) {
        grade = "A";
    }
    else if (mark >= 65) {
        grade = "B";
    }
    else if (mark >= 50) {
        grade = "C";
    }
    else {
        grade = "F";
    }

    // Display result
    let result = document.getElementById("result");

    result.innerHTML = name + " got grade " + grade;

    // Change result colour according to grade
    if (grade === "A" || grade === "B") {
        result.style.color = "green";
    }
    else if (grade === "C") {
        result.style.color = "orange";
    }
    else {
        result.style.color = "red";
    }

    // Get current date and time
    let now = new Date();

    // Display checking date and time in Malaysia
    document.getElementById("checkTime").innerHTML =
        "Checked on: " +
        now.toLocaleString("en-MY", {
            timeZone: "Asia/Kuala_Lumpur"
        }) +
        " (Malaysia Time)";

    return false;
}


// Function 2: Display the grade table
function showTable() {

    // Grade names
    let grades = ["A", "B", "C", "F"];

    // Grade mark ranges
    let ranges = [
        "80-100",
        "65-79",
        "50-64",
        "0-49"
    ];

    // Create HTML table
    let tableHTML = "<table>";

    // Table heading
    tableHTML += "<tr><th>Grade</th><th>Mark Range</th></tr>";

    // Loop through all grades
    for (let i = 0; i < grades.length; i++) {

        tableHTML +=
            "<tr><td>" + grades[i] +
            "</td><td>" + ranges[i] +
            "</td></tr>";

    }

    // Close table
    tableHTML += "</table>";

    // Display table on the webpage
    document.getElementById("tableContainer").innerHTML =
        tableHTML;
}


// Function 3: Generate a random mark
function randomMark() {

    // Generate a random whole number from 0 to 100
    let randomNumber = Math.floor(Math.random() * 101);

    // Put random number into the mark input field
    document.getElementById("mark").value = randomNumber;

}