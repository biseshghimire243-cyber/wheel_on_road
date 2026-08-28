# 🚗 BMW Journey

> **Drive. Explore. Remember.**

**BMW Journey** is a modern web-based BMW travel and journey tracking platform designed to give users an interactive digital driving experience.

The project allows users to explore BMW models, record their journeys, track distance and GPS coordinates, view journey history, and request a BMW test drive through a premium BMW-inspired interface.

---

## ✨ Features

### 🏠 Home Page

* Modern BMW-inspired landing page
* Premium automotive design
* Navigation to all major sections
* Responsive layout
* Call-to-action sections for exploring BMW Journey

### 🛣️ Journey Tracking

* Record completed journeys
* Store travelled distance in kilometers
* Capture latitude and longitude
* Get current location using browser GPS
* View complete journey history
* View individual journey details
* Update journey records
* Delete journey records
* Automatic journey statistics

### 🚘 BMW Model Gallery

* Explore BMW models
* BMW model images
* Search BMW models
* Interactive model cards
* Clean automotive gallery layout
* Models remain hidden until the user searches

### 📅 Book a BMW

* BMW model selection
* Customer information form
* Preferred date and time
* Test-drive experience selection
* Additional message field
* Booking request interface
* Responsive booking design

### ℹ️ About Page

* Project introduction
* Project goals
* Main features
* Technology section
* Drive / Explore / Remember concept
* Customer review section
* Call-to-action section

### 📞 Contact

* Contact information
* Customer enquiry form
* Official contact details
* Easy access to support

---

## 🖥️ Pages

| Page          | Description                       |
| ------------- | --------------------------------- |
| 🏠 Home       | BMW Journey landing page          |
| 🛣️ Journey   | Track and manage driving journeys |
| 🚘 Gallery    | Search and explore BMW models     |
| 📅 Book a BMW | Request a BMW test drive          |
| ℹ️ About      | Information about BMW Journey     |
| 📞 Contact    | Contact and enquiry page          |

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Responsive Web Design
* Browser Geolocation API

### Backend

* Node.js
* Express.js
* REST API
* CORS
* dotenv

### Database

* MySQL
* mysql2

### Development Tools

* Visual Studio Code
* Git
* GitHub
* XAMPP / MySQL
* Nodemon

---

## 🏗️ Project Architecture

```text
BMW-Travel-Website/
│
├── frontend/
│   │
│   ├── index.html
│   ├── journey.html
│   ├── gallery.html
│   ├── about.html
│   ├── book.html
│   ├── contact.html
│   │
│   ├── css/
│   │   ├── style.css
│   │   ├── journey.css
│   │   ├── gallery.css
│   │   ├── about.css
│   │   ├── book.css
│   │   └── contact.css
│   │
│   └── js/
│       ├── script.js
│       ├── journey.js
│       ├── gallery.js
│       ├── book.js
│       └── contact.js
│
├── backend/
│   │
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore
```

---

# 🔌 REST API

BMW Journey uses a REST API to communicate between the frontend and backend.

## Test API

```http
GET /api/test
```

Response:

```json
{
    "success": true,
    "message": "BMW Journey API is working!"
}
```

---

## 🛣️ Journey API

### Get All Journeys

```http
GET /api/journeys
```

Returns all saved journeys.

---

### Get Single Journey

```http
GET /api/journeys/:id
```

Example:

```http
GET /api/journeys/1
```

---

### Save Journey

```http
POST /api/journeys
```

Request:

```json
{
    "distance": 125.50,
    "latitude": 27.7172,
    "longitude": 85.3240
}
```

---

### Update Journey

```http
PUT /api/journeys/:id
```

Request:

```json
{
    "distance": 150.25,
    "latitude": 27.7000,
    "longitude": 85.3300
}
```

---

### Delete Journey

```http
DELETE /api/journeys/:id
```

Example:

```http
DELETE /api/journeys/1
```

---

# 🗄️ Database

The project uses a MySQL database named:

```text
bmw_travel
```

The main journey table contains:

| Column     | Type      | Description           |
| ---------- | --------- | --------------------- |
| id         | INT       | Unique journey ID     |
| distance   | DECIMAL   | Journey distance      |
| latitude   | DECIMAL   | GPS latitude          |
| longitude  | DECIMAL   | GPS longitude         |
| created_at | TIMESTAMP | Journey creation time |

Example database structure:

```sql
CREATE DATABASE bmw_travel;

USE bmw_travel;

CREATE TABLE journeys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    distance DECIMAL(10,4) NOT NULL,
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/biseshghimire243-cyber/BMW-Travel-Website.git
```

Then:

```bash
cd BMW-Travel-Website
```

---

## 2. Install Backend Dependencies

Move into the backend directory:

```bash
cd backend
```

Install packages:

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=bmw_travel
DB_PORT=3306
```

If your MySQL installation has a password, enter it after:

```env
DB_PASSWORD=
```

---

## 4. Create the Database

Open MySQL or phpMyAdmin and run:

```sql
CREATE DATABASE bmw_travel;

USE bmw_travel;

CREATE TABLE journeys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    distance DECIMAL(10,4) NOT NULL,
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 5. Start the Server

From the `backend` folder:

```bash
npm start
```

Or if using Nodemon:

```bash
npx nodemon server.js
```

The server should run at:

```text
http://localhost:5000
```

---

# 🌐 Open the Website

Once the server is running, open:

```text
http://localhost:5000
```

The Express server serves the frontend directly.

---

# 📍 GPS Location

The Journey page uses the browser's Geolocation API.

When the user selects:

```text
📍 Get My Location
```

the browser requests permission to access the user's location.

If permission is granted, the application retrieves:

```text
Latitude
Longitude
```

and places the coordinates into the journey form.

---

# 📊 Journey Dashboard

The Journey dashboard provides important driving statistics such as:

```text
Total Journeys
Total Distance
Current Location
```

Users can also view their saved journey records in a history table.

---

# 🎨 Design

BMW Journey uses a premium dark automotive interface inspired by modern BMW digital experiences.

### Design characteristics

* Dark theme
* BMW-inspired blue accents
* Glassmorphism cards
* Responsive layouts
* Automotive photography
* Smooth hover effects
* Modern typography
* Minimal interface
* Mobile-friendly design

---

# 🔮 Future Improvements

The project can be expanded with additional features such as:

* 🤖 AI BMW Assistant
* 📞 BMW customer support
* 📅 Database-powered booking system
* 👤 User registration and login
* 🔐 Authentication
* 🧑‍💼 Admin dashboard
* 🚘 More BMW models
* 🗺️ Interactive journey maps
* 📍 Route visualization
* 📈 Journey analytics
* ⛽ Fuel tracking
* ⚡ EV charging tracking
* 🏆 Driving achievements
* ⭐ Customer reviews
* 💬 Real-time chatbot
* 📱 Progressive Web App
* 🌙 Dark/light theme
* 🔔 Booking notifications
* 📧 Email confirmations

---

# 🤖 AI Assistant

One planned feature is an AI-powered BMW assistant that can help users with questions such as:

```text
"Which BMW is best for a long trip?"

"What is the difference between BMW X5 and X7?"

"Which BMW is electric?"

"Help me choose a BMW."

"How can I book a test drive?"
```

The assistant can eventually be connected to the project's backend and provide BMW-related guidance directly inside the website.

---

# 📸 Screenshots

Add screenshots of your project here.

Example:

```text
screenshots/
├── home.png
├── journey.png
├── gallery.png
├── book.png
├── about.png
└── contact.png
```

Then display them in the README:

```markdown
## 📸 Screenshots

### Home
![BMW Journey Home](screenshots/home.png)

### Journey Dashboard
![Journey Dashboard](screenshots/journey.png)

### BMW Gallery
![BMW Gallery](screenshots/gallery.png)

### Book a BMW
![Book BMW](screenshots/book.png)

### About
![About BMW Journey](screenshots/about.png)
```

---

# 🧪 Project Testing

Before using the application, make sure:

* MySQL is running
* `bmw_travel` database exists
* `journeys` table exists
* `.env` is configured correctly
* Node.js is installed
* Backend dependencies are installed
* Port `5000` is available

Test the API:

```text
http://localhost:5000/api/test
```

Expected response:

```json
{
    "success": true,
    "message": "BMW Journey API is working!"
}
```

---

# 🔒 Security Notes

The `.env` file contains private configuration information and should **not** be uploaded to GitHub.

Add this to `.gitignore`:

```gitignore
node_modules/
.env
.env.local
*.log
```

---

# 👨‍💻 Developer

**Bishesh Ghimire**

Computer Science / Software Development Project

### Technologies

```text
HTML
CSS
JavaScript
Node.js
Express.js
MySQL
REST API
Git
GitHub
```

---

# 📜 License

This project was created as an educational and portfolio project.

BMW and the BMW logo are trademarks of **BMW AG**. This project is not affiliated with or officially endorsed by BMW AG.

---

# ⭐ Support

If you like the project, consider giving the repository a ⭐ on GitHub.

---

## 🚗 BMW Journey

**Drive. Explore. Remember.**

> Every road has a destination.
> Every journey has a story.
