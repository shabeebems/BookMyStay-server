import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'muhammedshabeeb330@gmail.com',
      pass: 'jvkd akwp whun pwyj',
    },
});

export default transporter