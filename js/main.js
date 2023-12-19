var submitButtonMain = document.getElementById('btn');
var siteNameMain = document.getElementById('siteName');
var websiteURLMain = document.getElementById('url');
var searchBarMain = document.getElementById('searchBar');
var validsiteName = /[a-zA-Z]{3,}/;
var validURL = /^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

var arrOfURL = [];

submitButtonMain.disabled = true;
websiteURLMain.disabled = true;
submitButtonMain.style.filter = '2px';

var getAllBookMarks = JSON.parse(localStorage.getItem('All Bookmarks'));
if (getAllBookMarks.length !== 0) {
    arrOfURL = getAllBookMarks;
    displayAllBookMarks();
}


function searchBookMark() {
    var container = '';
    for (var i = 0; i < arrOfURL.length; i++) {
        if (arrOfURL[i].siteName.trim().toLowerCase().includes(searchBarMain.value.trim().toLowerCase())) {
            container +=
                `
            <tr>
            <td>${i + 1}</td>
            <td class="fw-bold">${arrOfURL[i].siteName}</td>
            <td><a target="_blank" href="${arrOfURL[i].url}" class="btn btn-secondary fw-bold">Visit</a></td>
            <td><button onclick="editBookMark(${i})" class="btn btn-warning fw-bold"><i class="fa-regular fa-pen-to-square"></i></button></td>
            <td><button type="button" class="btn btn-danger fw-bold" data-bs-toggle="modal"
                    data-bs-target="#Model${i}">
                    <i class="fa-regular fa-trash-can"></i>
                </button></td>
        </tr>
        <!-- Modal -->
        <div class="modal fade" id="Model${i}" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Deleting URL</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to <span class="text-dark text-uppercase fw-bold">delete</span> this URL
                        <span class="text-danger text-uppercase fw-bold">permanently</span>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onclick="deleteURL(${i})" type="button" class="btn btn-danger fw-bold"
                            data-bs-dismiss="modal">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        `
            document.getElementById('tbody').innerHTML = container;
        }
    }

}

function addNewBookMark() {
    var newURL = {
        siteName: siteNameMain.value,
        url: websiteURLMain.value,
    }
    arrOfURL.push(newURL);
    localStorage.setItem('All Bookmarks', JSON.stringify(arrOfURL));
    clearInputs();
    displayAllBookMarks();
}

function clearInputs() {
    siteNameMain.value = '';
    websiteURLMain.value = '';
    websiteURLMain.disabled = true;
    submitButtonMain.disabled = true;
}

function displayAllBookMarks() {
    var container = '';
    for (var i = 0; i < arrOfURL.length; i++) {
        container +=
            `
            <tr>
            <td>${i + 1}</td>
            <td class="fw-bold">${arrOfURL[i].siteName}</td>
            <td><a target="_blank" href="${arrOfURL[i].url}" class="btn btn-secondary fw-bold">Visit</a></td>
            <td><button onclick="editBookMark(${i})" class="btn btn-warning fw-bold"><i class="fa-regular fa-pen-to-square"></i></button></td>
            <td><button type="button" class="btn btn-danger fw-bold" data-bs-toggle="modal"
                    data-bs-target="#Model${i}">
                    <i class="fa-regular fa-trash-can"></i>
                </button></td>
        </tr>
        <!-- Modal -->
        <div class="modal fade" id="Model${i}" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Deleting URL</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to <span class="text-dark text-uppercase fw-bold">delete</span> this URL
                        <span class="text-danger text-uppercase fw-bold">permanently</span>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onclick="deleteURL(${i})" type="button" class="btn btn-danger fw-bold"
                            data-bs-dismiss="modal">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        `
    }
    document.getElementById('tbody').innerHTML = container;
}

function editBookMark(idx) {
    siteNameMain.value = arrOfURL[idx].siteName;
    websiteURLMain.value = arrOfURL[idx].url;
    submitButtonMain.innerHTML = 'Update';
    submitButtonMain.setAttribute('onclick', `updateBookMark(${idx})`);
}

function updateBookMark(idx) {
    submitButtonMain.innerHTML = 'Submit';
    submitButtonMain.setAttribute('onclick', 'addNewBookMark()');
    arrOfURL[idx].siteName = siteNameMain.value;
    arrOfURL[idx].url = websiteURLMain.value;
    displayAllBookMarks();
    localStorage.setItem('All Bookmarks', JSON.stringify(arrOfURL));
    clearInputs();
}

function deleteURL(idx) {
    arrOfURL.splice(idx, 1);
    displayAllBookMarks();
    localStorage.setItem('All Bookmarks', JSON.stringify(arrOfURL));
}

function testing() {
    if (validURL.test(websiteURLMain.value.toLowerCase())) {
        submitButtonMain.disabled = false;
    } else {
        submitButtonMain.disabled = true;

    }

}

var errorMessage = document.getElementById('errorMsg');
errorMessage.style.display = 'none';
function enureInsertedSiteName() {
    if (validsiteName.test(siteNameMain.value)) {
        websiteURLMain.disabled = false;
        errorMessage.style.display = 'none';
    }
    else {
        errorMessage.style.display = 'block';
        websiteURLMain.disabled = true;
        submitButtonMain.disabled = true;

    }
}