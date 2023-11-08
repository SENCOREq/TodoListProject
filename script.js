
let noteList = [];

displayNotes();

function addNote() {

    let userNote = document.getElementById("userNoteInput");
    let userDate = document.getElementById("userDateInput");
    let userTime = document.getElementById("userTimeInput");

    // get current year
    let d = new Date();
    let year = d.getUTCFullYear();
    // -------------------------

    // get user Entered year
    let dateValid = new Date(userDate.value)
    let dateEnteredByUser = dateValid.getUTCFullYear();
    // --------------------------------------------------

    if (userNote.value == "" || userDate.value == "" || userTime.value == "") {
        alert("You must fill in all the details to add a Note!");
    }
    else if (dateEnteredByUser < year || dateEnteredByUser > 3000) {
        alert("You need to choose a valid date (between the current year and the year 3000)")
    }

    else {

        // get the Value that the user entered to change the format of the date.
        let dateValue = new Date(userDate.value);
        let userDateYear = dateValue.getUTCFullYear();
        let userDateMonth = dateValue.getMonth() + 1;
        let userDateDay = dateValue.getDate();

        if (userDateDay < 10) { // without this it will show 7 instead of 07 for example
            userDateDay = "0" + userDateDay;
        }

        if (userDateMonth < 10) { // without this it will show 7 instead of 07 for example
            userDateMonth = "0" + userDateMonth;
        }

        let userDateValue = `${userDateDay}-${userDateMonth}-${userDateYear}` // new format of the date entered by user
        //--------------------------------------------------------------------

        let newNote = new Note(userNote.value, userDateValue, userTime.value); // set new object the Note class
        noteList.unshift(newNote); // get the object in the first spot of array
        localStorage.savedNoteList = JSON.stringify(noteList);
        displayNotes();
    }
}

function deleteNote(i) {
    noteList.splice(i, 1); // delete item from array, get to "i" and delete 1 item
    localStorage.setItem("savedNoteList", JSON.stringify(noteList)); // save the array in the localstorage after delete
    displayNotes();
}

function displayNotes() {

    let userNotesList = document.getElementById("userNotesList");

    userNotesList.innerHTML = "";

    if (localStorage.savedNoteList) // if savedNoteList exists in localstorage
        noteList = JSON.parse(localStorage.savedNoteList); // get the localstorage info into the array again

    let noteListLength = noteList.length - 1; // last spot in Array

    for (let i in noteList) {

        if (i == noteListLength) { // if i(index) == last spot in array

            userNotesList.innerHTML +=
                `
                <div class="missionStyleOfLastArrayIndex col-sm-4 col-lg-2">

                    <p><button class="cancelMissionStyle" id="${i}" onclick="deleteNote(id)">X</button></p>

                    <p class="missionDetails">${noteList[i].mission}</p>

                    <p class="missionDate">${noteList[i].date}</p>

                    <p class="missionDate">${noteList[i].time}</p>

                </div>
            `
        } else { // if its not the last spot in array
            userNotesList.innerHTML +=
                `

                <div class="missionStyle col-sm-4 col-lg-2">


                    <p><button class="cancelMissionStyle" id="${i}" onclick="deleteNote(id)">X</button></p>

                    <p class="missionDetails">${noteList[i].mission}</p>

                    <p class="missionDate">${noteList[i].date}</p>

                    <p class="missionDate">${noteList[i].time}</p>

                </div>
        `
        }

    }

}

