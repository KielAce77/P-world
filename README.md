# P-World Engineering

![Hero Snapshot](https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=90&auto=format&fit=crop)

A React + Vite portfolio I built for an electrical engineer. It highlights 5 main service areas: field installation, automation, renewable energy, industrial maintenance, and fault diagnostics.

I built this with a dark, modern industrial theme and hooked up a custom email backend so the admin can reply to contact form messages straight from a hidden dashboard.

---

## What's included

- **Dark Theme UI:** Built with standard CSS modules and Google Fonts (Orbitron, Rajdhani, Share Tech Mono) to give it a techy, blueprint-style look.
- **Scroll Effects:** Simple fade-ins as you scroll down the page, handled via the native IntersectionObserver API.
- **Built-in Email Server:** I wrote a custom Node.js backend using raw SMTP sockets so messages can be sent right from the browser without needing tricky third-party libraries.
- **Admin Dashboard:** Visit the site and add `#admin` to the URL. It's a password-protected dashboard (password is `pworld2024` by default) where you can read messages from the contact form and reply to them natively. It remembers you're logged in using local storage.
- **Easy to Update:** Everything (images, text, projects, services) lives inside one file: `src/data.js`. You don't need to know React to change the site content, just edit that file.

---

## How to run it locally

You'll need Node.js installed on your machine.

### 1. Install packages
First, download the code, go into the folder, and run npm install:
```bash
cd p-world-portfolio
npm install
```

### 2. Add your Gmail App Password
If you want the "Reply via Email" feature on the Admin dashboard to actually send emails, you need to plug in a Google App Password.
- Open `api/reply.js`
- Look for the part near the bottom with `quarcoopomekelvin@gmail.com`
- Replace the password next to it with your real 16-letter Google App Password wrapper in quotes.

### 3. Start the servers
You need to run two things at once: the frontend website, and the backend email server. Open two different terminal windows in this folder.

**Terminal 1 (Backend Email):**
```bash
node server.js
```

**Terminal 2 (Frontend React):**
```bash
npm run dev
```
Then just open `http://localhost:5173` in your browser.

---

## Deploying to Vercel

I set this up specifically so it's a breeze to host on Vercel for free. Vercel will automatically host the React app, and it will turn the `api/reply.js` file into a Serverless Function to handle the emails on the fly.

1. Upload this codebase to your own GitHub account.
2. Sign into Vercel and click Add New Project.
3. Pick your repository. It should automatically detect that it's a Vite project.
4. Hit Deploy. 

Vercel handles all the backend routing out of the box so the emails will just work.

---

## File layout

Just a quick map of where everything is if you want to dig into the code:

```
p-world-portfolio/
├── api/
│   └── reply.js                 # The serverless email function for Vercel
├── public/                      
│   └── assets/                  # Local images 
├── src/
│   ├── components/              # All the React UI sections (Hero, About, etc.)
│   │   ├── AdminPage.jsx        # The hidden dashboard code
│   │   └── Contact.jsx          # The contact form
│   ├── App.jsx                  
│   ├── data.js                  # **EDIT THIS FILE TO CHANGE SITE CONTENT**
│   ├── hooks.js                 
│   └── index.css                # Global styles and colors
├── server.js                    # The local Node server equivalent to api/reply.js
└── vite.config.js               # Tells Vite how to proxy /api requests locally
```

---

## Changing the colors

If you want to swap out the colors, they are defined at the top of `src/index.css`.

| Variable       | Color code   | What it does |
|---------------|-------------|---------------------------|
| `--amber`      | `#F5A623`    | Main buttons and icons |
| `--amber-hot`  | `#FFD000`    | Button hover states |
| `--dark`       | `#050C14`    | The main background color |
| `--dark-2`     | `#0B1624`    | Darker boxes for cards |
| `--text`       | `#C8D8EC`    | Normal paragraph text |
| `--white`      | `#EFF6FF`    | Titles and headers |

---

## Tech Stack
- React 18
- Vite 5
- Native Node.js TLS (for the SMTP email sending)
- CSS Modules
