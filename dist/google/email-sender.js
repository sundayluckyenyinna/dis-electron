"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class EmailSenderService {
    constructor() {
    }
    getTransporter() {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'sundayluckyenyinnadeveloper@gmail.com',
                pass: '123456professor'
            }
        });
        return transporter;
    }
    getDummyMailOptions() {
        const mailOptions = {
            from: 'sundayluckyenyinnadeveloper@gmail.com',
            to: 'sundayenyinna360@gmail.com',
            subject: 'Testing out the nodemailer sender',
            text: 'Hi, this is your guy sending email using the nodemailer node modules',
            attachments: [
                {
                    filename: 'nepa.pdf',
                    content: fs_1.default.createReadStream(this.getFilePath())
                }
            ]
        };
        return mailOptions;
    }
    sendEmail() {
        this.getTransporter().sendMail(this.getDummyMailOptions(), function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    getFilePath() {
        const file = path_1.default.join(__dirname, 'nepa.pdf');
        return file;
    }
}
exports.default = EmailSenderService;
