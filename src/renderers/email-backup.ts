
export{}

import { ipcRenderer } from "electron";
import jQuery from 'jquery';

const $ = jQuery;


// This function returns all the possible school email addresses.
async function getSchoolEmailAddresses() : Promise<string[]> {
    // tell the main process to give the string for all the addresses
    const emailString : string  = await ipcRenderer.invoke('get-school-email-string'); 
    return emailString.split('#');
}

// returns the data object that will be used by the main process to back-up academic database to the email
function getAcademicTermBackupData() : Object  {
    return {};
}

function getAcademicSessionBackupData() : Object {
    return {};
}

function getAcademicReportBackupData() : Object {
    return {};
}

function getAcademicBroadsheetBackupData() : Object {
    return {};
}

function getAcademicScoresBackupData() : Object {
    return {};
}

function getOtherItemsBackupData() : Object {
    return {};
}

$('#academic-term-database-backup').on('click', async function( event ){
    // TODO
    await ipcRenderer.invoke('backup-academic-term-database', getAcademicTermBackupData());
    return;
});

$('#academic-session-database-backup').on('click', async function( event ){
    //TODO
    await ipcRenderer.invoke('backup-academic-session-database', getAcademicSessionBackupData());
});

$('#academic-report-backup').on('click', async function( event ){
    // TODO
    await ipcRenderer.invoke('backup-academic-report', getAcademicReportBackupData());
});

$('#backup-broadsheet').on('click', async function( even ){
    //TODO
    await ipcRenderer.invoke('backup-broadsheet');
});

$('#backup-scores').on('click', async function( event ){
    // TODO
    await ipcRenderer.invoke('backup-scores');
});

$('#backup-other-items').on('click', async function( event ){
    // TODO
    await ipcRenderer.invoke('backup-other-items');
});