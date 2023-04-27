import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
	private readonly transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: 'imavin08',
				pass: 'raetmxhsflzrxzjs',
			},
		});
	}

	async sendMail(to: string, token: string) {
		await this.transporter.sendMail({
			from: 'sequilizeProject',
			to,
			subject: 'please confirm your email',
			html: `Please confirm your email <a href="http://localhost:8000/auth/confirm/?token=${token}}">click here</a>`,
		});
	}
}
