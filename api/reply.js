import tls from 'tls';

const sendMailRaw = (to, subject, text, user, pass) => {
    return new Promise((resolve, reject) => {
        const socket = tls.connect(465, 'smtp.gmail.com', () => console.log('Connected to Google via TLS'));
        socket.setEncoding('utf8');

        const steps = [
            { expect: '220', send: 'EHLO localhost\r\n' },
            { expect: '250', send: 'AUTH LOGIN\r\n' },
            { expect: '334', send: Buffer.from(user).toString('base64') + '\r\n' },
            { expect: '334', send: Buffer.from(pass).toString('base64') + '\r\n' },
            { expect: '235', send: `MAIL FROM:<${user}>\r\n` },
            { expect: '250', send: `RCPT TO:<${to}>\r\n` },
            { expect: '250', send: 'DATA\r\n' },
            { expect: '354', send: `From: ${user}\r\nTo: ${to}\r\nSubject: ${subject}\r\n\r\n${text}\r\n.\r\n` },
            { expect: '250', send: 'QUIT\r\n' },
            { expect: '221', send: null }
        ];

        let step = 0;
        let buffer = '';

        socket.on('data', (data) => {
            buffer += data.toString();
            if (buffer.endsWith('\n')) {
                const lines = buffer.trim().split('\n');
                const lastLine = lines[lines.length - 1];
                if (/^\d{3} /.test(lastLine)) {
                    const code = lastLine.substring(0, 3);
                    const bufCopy = buffer;
                    buffer = '';
                    if (code.startsWith('4') || code.startsWith('5')) {
                        try { socket.write('QUIT\r\n'); } catch (e) { }
                        return reject(new Error(`SMTP Error: ${bufCopy.trim()}`));
                    }
                    if (step < steps.length && steps[step].expect === code) {
                        const nextCmd = steps[step].send;
                        step++;
                        if (nextCmd) {
                            socket.write(nextCmd);
                        } else {
                            socket.end();
                            resolve('Sent');
                        }
                    } else {
                        try { socket.write('QUIT\r\n'); } catch (e) { }
                        reject(new Error(`Unexpected SMTP code: ${code}`));
                    }
                }
            }
        });

        socket.on('error', reject);
        socket.on('end', () => step < steps.length && reject(new Error('Closed')));
    });
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { to, subject, text } = req.body;
    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    const user = process.env.EMAIL_USER || 'quarcoopomekelvin@gmail.com';
    const pass = process.env.EMAIL_PASS;

    if (!pass) {
        return res.status(500).json({ error: 'Server email configuration missing' });
    }

    try {
        await sendMailRaw(to, subject, text, user, pass);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('SMTP Error:', error);
        res.status(500).json({ error: error.message });
    }
}
