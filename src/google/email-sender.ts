
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import fs from 'fs';
import path from 'path';

export default class EmailSenderService
{
    constructor(){

    }

    getTransporter() : nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : 'sundayluckyenyinnadeveloper@gmail.com',
                pass : '123456professor'
            }
        });

        return transporter;
    }

    getDummyMailOptions() {
        const mailOptions = {
            from : 'sundayluckyenyinnadeveloper@gmail.com',
            to : 'sundayenyinna360@gmail.com',
            subject : 'Testing out the nodemailer sender',
            text : 'Hi, this is your guy sending email using the nodemailer node modules',
            attachments:[
                {
                    filename : 'nepa.pdf',
                    content : fs.createReadStream(this.getFilePath())
                }
            ]
        };
        return mailOptions;
    }

    sendEmail(){
        this.getTransporter().sendMail( this.getDummyMailOptions(), function(error, info){
            if(error){ console.log(error)}
            else{
                console.log('Email sent: ' + info.response)
            }
        });
    }

    getFilePath(){
        const file = path.join(__dirname, 'nepa.pdf');
        return file;
    }
}