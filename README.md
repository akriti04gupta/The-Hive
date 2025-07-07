# 🐝 The Hive

**The Hive** is a full-featured, dynamic college community platform that brings all campus societies and their events under one roof. It allows students to explore, join, manage, and participate in society activities through a clean, intuitive interface.

This project uses a **hybrid stack** combining traditional **server-side rendering with EJS** and a **modern, interactive dashboard built in React**, allowing seamless transitions and scalable architecture.

---

## 🌟 Project Vision

In many colleges, information about societies and events is scattered across notice boards, WhatsApp groups, and Instagram posts. **The Hive** aims to centralize all this in one unified platform:

- 📅 View and RSVP to upcoming events  
- 🧠 Discover societies across domains (tech, culture, arts, academics)  
- 📝 Allow students to **create or manage their own society**  
- 📬 Get real-time notifications and updates from societies  
- 🧑‍💼 A personal **dashboard** for each user to manage their journey

---

## ✨ Key Features

### 🌐 Public Platform (EJS Frontend)
- 🔍 **Search and filter** societies and events
- 🧾 Detailed **society and event pages** with cover image, description, and metadata
- 🧑‍🎓 **Join societies** and **RSVP for events**
- 📩 Society creation form (pending backend integration)
- 🗃 Paginated society/event listings
- 🌙 Fully responsive layout for desktop and mobile users

### 📊 Private Dashboard (React Frontend)
- 💼 `/dashboard` route served via React build
- 📌 **Tabs-based interface** for profile, societies, events, and notifications
- 🖼 Update profile image, name, email from the dashboard
- 📣 Real-time notifications for RSVP confirmations or announcements
- 🎨 Clean UI using Tailwind CSS + `shadcn/ui` components
- 📅 Embedded upcoming event previews and society tiles
- 📦 Fully modular components like `EventCard`, `SocietyCard`, `ProfileEditor`

---

## 🛠 Tech Stack

### Backend
- **Node.js** + **Express.js** – API and route handling
- **MongoDB** with **Mongoose** – (for future user/event/society storage)
- **Express-Session or Passport.js** – User authentication (in progress)

### Frontend
| Tech        | Purpose                                |
|-------------|----------------------------------------|
| EJS         | Server-side HTML rendering             |
| TailwindCSS | Utility-first CSS framework            |
| React       | Interactive dashboard UI               |
| React Router | Page navigation in React dashboard    |
| `shadcn/ui` | UI components library (based on Radix) |
| `lucide-react` | Icon pack                           |

---

## 🧱 Folder Structure

