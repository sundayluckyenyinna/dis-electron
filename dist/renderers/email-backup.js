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
const $ = jquery_1.default;
// This function returns all the possible school email addresses.
function getSchoolEmailAddresses() {
    return __awaiter(this, void 0, void 0, function* () {
        // tell the main process to give the string for all the addresses
        const emailString = yield electron_1.ipcRenderer.invoke('get-school-email-string');
        return emailString.split('#');
    });
}
// returns the data object that will be used by the main process to back-up academic database to the email
function getAcademicTermBackupData() {
    return {};
}
function getAcademicSessionBackupData() {
    return {};
}
function getAcademicReportBackupData() {
    return {};
}
function getAcademicBroadsheetBackupData() {
    return {};
}
function getAcademicScoresBackupData() {
    return {};
}
function getOtherItemsBackupData() {
    return {};
}
$('#academic-term-database-backup').on('click', function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO
        yield electron_1.ipcRenderer.invoke('backup-academic-term-database', getAcademicTermBackupData());
        return;
    });
});
$('#academic-session-database-backup').on('click', function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO
        yield electron_1.ipcRenderer.invoke('backup-academic-session-database', getAcademicSessionBackupData());
    });
});
$('#academic-report-backup').on('click', function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO
        yield electron_1.ipcRenderer.invoke('backup-academic-report', getAcademicReportBackupData());
    });
});
$('#backup-broadsheet').on('click', function (even) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO
        yield electron_1.ipcRenderer.invoke('backup-broadsheet');
    });
});
$('#backup-scores').on('click', function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO
        yield electron_1.ipcRenderer.invoke('backup-scores');
    });
});
$('#backup-other-items').on('click', function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO
        yield electron_1.ipcRenderer.invoke('backup-other-items');
    });
});
