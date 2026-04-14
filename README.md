# 🚀 DevVault

**DevVault** is a powerful developer-focused code snippet manager that helps you **store, organize, search, and reuse code instantly**.

> ⚡ Stop losing useful code. Start building your personal developer memory.

---

## 🎯 Problem It Solves

Developers often:

* Lose useful code snippets
* Rewrite the same logic repeatedly
* Waste time searching through files, notes, or chat history

**DevVault fixes this** by giving you a fast, searchable, and organized space for all your code.

---

## 💡 Key Features

### 🧠 Core Features

* ➕ Add code snippets (title, code, language, tags)
* 🗑️ Delete snippets
* 📋 One-click copy to clipboard
* 🔍 Live search (title, tags, and code)
* 🧩 Clean card-based UI

---

### 🧭 Dashboard (Advanced)

* 📊 Total snippets & weekly stats
* 🕑 Recent activity (created, copied, edited)
* ⭐ Favorites (pinned snippets)
* 📁 Collections preview
* 📈 Usage insights (charts)

---

### ⚡ Productivity Features

* 🌙 Dark / Light mode (saved in browser)
* ⌨️ Keyboard shortcuts
* 🔄 Version tracking (planned)
* 🧠 Smart suggestions (planned)

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, Vanilla JavaScript
* **Backend:** PHP (PDO)
* **Database:** MySQL
* **Charts:** Chart.js

---

## 📁 Project Structure

```
devvault/
│
├── config/
│   └── database.php
│
├── api/
│   ├── get_snippets.php
│   ├── add_snippet.php
│   ├── delete_snippet.php
│   ├── get_dashboard_stats.php
│   ├── get_recent_activity.php
│   ├── toggle_favorite.php
│   ├── get_collections.php
│   └── track_usage.php
│
├── components/
│   └── header.php
│
├── assets/
│   ├── css/style.css
│   └── js/app.js
│
├── dashboard.php
└── setup.sql
```

---

## ⚙️ Setup Instructions

### 1. Clone / Download Project

Place the project inside your server directory:

```
xampp/htdocs/devvault
```

---

### 2. Start Server

* Start **Apache** and **MySQL** in XAMPP

---

### 3. Setup Database

* Open **phpMyAdmin**
* Create a database named:

```
devvault
```

* Import:

```
setup.sql
```

---

### 4. Configure Database Connection

Edit:

```
config/database.php
```

Make sure credentials match your setup:

```php
$host = 'localhost';
$db   = 'devvault';
$user = 'root';
$pass = '';
```

---

### 5. Run the App

Open in browser:

```
http://localhost/devvault/dashboard.php
```

---

## 🧠 How It Works

1. Frontend (JS) sends requests using Fetch API
2. PHP APIs handle logic and database queries
3. MySQL stores all snippets and usage data
4. UI updates dynamically without page reload

---

## 🚀 Future Improvements

* 🔐 User authentication (multi-user support)
* 🤖 AI-powered code suggestions
* 📤 Export/import (JSON, GitHub Gists)
* 🧩 Drag & drop collections
* 🌐 Public snippet sharing

---

## 🎯 Vision

> DevVault is not just a snippet manager —
> it’s your **developer second brain**.

---

## 🤝 Contributing

Feel free to fork, improve, and submit pull requests.

---

## 📄 License

This project is open-source and free to use.

---

## 💬 Author

Built with 💻 by a developer who was tired of losing good code.
