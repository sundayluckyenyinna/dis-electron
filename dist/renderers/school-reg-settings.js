"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const jquery_1 = __importDefault(require("jquery"));
let logo = '';
const $ = jquery_1.default;
getAllSchoolDataFromDataStore().then(data => {
    setSchoolName(data.name);
    setSchoolMotto(data.motto);
    setSchoolAddress(data.address);
    setSchoolLogo(data.logo);
    setAllEmail(data.email);
    setAllMobile(data.telephone);
    logo = data.logo;
    // console.log(  );
});
// GETTERs And SETTERS
function getSchoolName() {
    var _a;
    return compressSingly((_a = $('#school-name').val()) === null || _a === void 0 ? void 0 : _a.toString().trim(), ' ');
}
function setSchoolName(name) {
    $('#school-name').val(name);
}
function getSchoolMotto() {
    var _a;
    const mottoInput = (_a = $('#school-motto').val()) === null || _a === void 0 ? void 0 : _a.toString().trim().toString().toLowerCase();
    return mottoInput.charAt(0).toUpperCase() + mottoInput.substring(1);
}
function setSchoolMotto(motto) {
    $('#school-motto').val(motto);
}
function getSchoolAddress() {
    var _a;
    return compressSingly((_a = $('#school-address').val()) === null || _a === void 0 ? void 0 : _a.toString().trim().toString(), ', ');
}
function setSchoolAddress(address) {
    $('#school-address').val(address);
}
;
function getSchoolLogo() {
    return logo.toString().trim();
}
function setSchoolLogo(logo) {
    $('#school-logo-img').attr('src', logo);
}
function getAllEmail() {
    const emails = [];
    $('.email-input').each(function (index, element) {
        var _a;
        emails.push((_a = $(element).val()) === null || _a === void 0 ? void 0 : _a.toString().trim());
    });
    return emails.join('#');
}
function setAllEmail(emailString) {
    // remove all the email inputs 
    $('.email-input .email-trash').remove();
    // get the arrays of the emails
    const emailArray = emailString.split('#').filter((email) => email !== '');
    const fragment = $(document.createDocumentFragment());
    emailArray.forEach((email) => {
        const newSection = $('<div/>', { 'class': 'email-input-inner-container' });
        const input = $('<input/>', { 'class': 'email-input' });
        input.val(email);
        input.attr('disabled', 'true');
        input.attr('type', 'text');
        const trashButton = $('<button/>', { 'class': 'email-trash trash', 'text': 'Trash' });
        const editButton = $('<input/>', { 'class': 'email-edit edit', 'value': 'Edit', 'type': 'button' });
        newSection.append(input, editButton, trashButton);
        // append it to the outer section
        fragment.append(newSection);
    });
    $('#email-outer-section').append(fragment);
}
function setAllMobile(mobileString) {
    // remove all mobile input
    $('.mobile-input .mobile-trash').remove();
    const mobileArray = mobileString.split('#').filter((mobile) => mobile !== '');
    console.log(mobileArray);
    const fragment = $(document.createDocumentFragment());
    mobileArray.forEach((mobile) => {
        // create a new email entry section
        const newSection = $('<div/>', { 'class': 'mobile-input-inner-container' });
        const input = $('<input/>', { 'class': 'mobile-input' });
        input.attr('type', 'number');
        input.attr('disabled', 'true');
        input.val(mobile);
        const trashButton = $('<button/>', { 'class': 'mobile-trash', 'text': 'Trash' });
        const editButton = $('<input/>', { 'class': 'email-edit edit', 'value': 'Edit', 'type': 'button' });
        newSection.append(input, editButton, trashButton);
        // append it to the outer section
        fragment.append(newSection);
    });
    $('#mobile-section').append(fragment);
}
function getAllMobileNo() {
    const mobiles = [];
    $('.mobile-input').each(function (index, element) {
        var _a;
        mobiles.push((_a = $(element).val()) === null || _a === void 0 ? void 0 : _a.toString().trim());
    });
    return mobiles.join('#');
}
function getAllDataForUpdate() {
    return {
        name: getSchoolName(),
        motto: getSchoolMotto(),
        address: getSchoolAddress(),
        logo: getSchoolLogo(),
        email: getAllEmail(),
        telephone: getAllMobileNo()
    };
}
function compressSingly(value, delimiter) {
    value = value.trim();
    return value.split(delimiter).filter((token) => token !== '').map((token) => token.charAt(0).toUpperCase() + token.substring(1).toLowerCase()).join(delimiter);
}
function getAllSchoolDataFromDataStore() {
    return __awaiter(this, void 0, void 0, function* () {
        const datas = yield electron_1.ipcRenderer.invoke('get-school-data-from-data-store');
        return datas;
    });
}
;
// Handler for the addtion of email address
$('#email-add').on('click', function (event) {
    // create a new email entry section
    const newSection = $('<div/>', { 'class': 'email-input-inner-container' });
    const input = $('<input/>', { 'class': 'email-input' });
    input.attr('placeholder', 'Enter email address');
    input.attr('type', 'text');
    input.attr('disabled', 'true');
    const editButton = $('<input/>', { 'class': 'email-edit edit', 'value': 'Edit', 'type': 'button' });
    const trashButton = $('<button/>', { 'class': 'email-trash trash', 'text': 'Trash' });
    newSection.append(input, editButton, trashButton);
    // append it to the outer section
    $('#email-outer-section').append(newSection);
});
// Handler for the addtion of mobile 
$('#mobile-add').on('click', function (event) {
    // create a new email entry section
    const newSection = $('<div/>', { 'class': 'mobile-input-inner-container' });
    const input = $('<input/>', { 'class': 'mobile-input' });
    input.attr('placeholder', 'Enter mobile no.');
    input.attr('type', 'number');
    input.attr('disabled', 'true');
    const editButton = $('<input/>', { 'class': 'email-edit edit', 'value': 'Edit', 'type': 'button' });
    const trashButton = $('<button/>', { 'class': 'mobile-trash', 'text': 'Trash' });
    newSection.append(input, editButton, trashButton);
    // append it to the outer section
    $('#mobile-section').append(newSection);
});
// Handler for the trash of email address
$('body').on('click', '.trash', function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        const button = $(event.target);
        // // get the corresponding email
        // const emailText = button.parent().find('input').val().trim().toString();
        // // tell the main to ensure that the user really wants to delete the email address.
        // await ipcRenderer.invoke('delete-email', emailText);
        // get the parent div of this button and remove it from the dom
        $(event.target).parent().remove();
    });
});
// Handler for the trash of telephone
$('body').on('click', '.mobile-trash', function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        const button = $(event.target);
        // // get the corresponding email
        // const emailText = button.parent().find('input').val().trim().toString();
        // // tell the main to ensure that the user really wants to delete the email address.
        // await ipcRenderer.invoke('delete-email', emailText);
        // // get the parent div of this button and remove it from the dom
        $(event.target).parent().remove();
    });
});
$('#save').on('click', function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = getAllDataForUpdate();
        console.log(payload);
        // update the database of the school with the new data collected. This is a stateless update.
        yield electron_1.ipcRenderer.invoke('update-school-data', payload);
        // console.log( getAllDataForUpdate() );
    });
});
$('#school-logo-selector').on('change', function (event) {
    // get the file selected 
    const imageFile = Object(event.target).files[0];
    console.log(imageFile);
    // Read the base64 string of the file
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        logo = fileReader.result;
        $('#school-logo-img').attr('src', logo.toString().trim());
    };
    fileReader.readAsDataURL(imageFile);
});
// functionality for the button to add more grade scheme to the grade table
$('#add-grade').on('click', function (event) {
    // create the inputs
    const gradeTextinput = $('<input/>', { 'type': 'text' });
    const lowerinput = $('<input/>', { 'type': 'number' });
    const higherInput = $('<input/>', { 'type': 'number' });
    const scoreinput = $('<input/>', { 'type': 'text' });
    const gradeText = $('<td/>', { 'class': 'g' }).append(gradeTextinput);
    const lowerScore = $('<td/>', { 'class': 'ls' }).append(lowerinput);
    const higherScore = $('<td/>', { 'class': 'hs' }).append(higherInput);
    const scoreRemark = $('<td/>', { 'class': 'r' }).append(scoreinput);
    const editBtn = $('<input/>', { 'type': 'button', 'value': 'Edit' });
    const trashBtn = $('<input/>', { 'type': 'button', 'value': 'Trash' });
    const buttonContainer = $('<td/>').append($('<span/>').append(editBtn, trashBtn));
    // create the row
    const row = $('<tr>', { 'class': 'grade-row' }).append(gradeText, lowerScore, higherScore, scoreRemark, buttonContainer);
    // handler for the edit and the trash buttons
    editBtn.on('click', function (event) {
        var _a;
        if (((_a = $(this).val()) === null || _a === void 0 ? void 0 : _a.toString().trim()) === 'Edit') {
            [gradeTextinput, lowerinput, higherInput, scoreinput].forEach((input) => input.removeAttr('disabled'));
            $(this).val('Done');
            return; // change the text to 'Done'
        }
        // else the text on it must be 'Done'
        [gradeTextinput, lowerinput, higherInput, scoreinput].forEach((input) => input.attr('disabled', 'true'));
        $(this).val('Edit');
        return;
    });
    trashBtn.on('click', function (event) {
        row.remove();
    });
    // append it to the table
    $('#grade-table').append(row);
});
$('#grade-save').on('click', function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        const gradeMap = new Map();
        $('.grade-row').each(function (index, element) {
            var _a, _b, _c, _d;
            const grade = (_a = $(this).find('.g').find('input').val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
            const lowerScore = (_b = $(this).find('.ls').find('input').val()) === null || _b === void 0 ? void 0 : _b.toString().trim();
            const higherScore = (_c = $(this).find('.hs').find('input').val()) === null || _c === void 0 ? void 0 : _c.toString().trim();
            const remarks = (_d = $(this).find('.r').find('input').val()) === null || _d === void 0 ? void 0 : _d.toString().trim();
            const payload = {
                grade: grade,
                lowerScoreRange: Number(lowerScore),
                higherScoreRange: Number(higherScore),
                remarks: remarks
            };
            gradeMap.set(grade, payload);
        });
        yield electron_1.ipcRenderer.invoke('update-grade-system', gradeMap);
    });
});
// by default, all inputs should be disabled from editing, until the edit button is clicked
$('input').attr('disabled', 'true');
$('input[type=button]').removeAttr('disabled');
$('body').on('click', '.edit', function (event) {
    const buttonPressed = $(event.target);
    buttonPressed.parent().find('input').removeAttr('disabled');
    if (buttonPressed.val().trim() === 'Edit') {
        buttonPressed.parent().find('input').removeAttr('disabled');
        buttonPressed.val('Done');
    }
    else {
        buttonPressed.parent().find('input[type=text], input[type=number]').attr('disabled', 'true');
        buttonPressed.val('Edit');
    }
    return;
});
