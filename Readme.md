# 🤖 MessengerMerpati — AI Chatbot with Sentiment Analysis

MessengerMerpati adalah aplikasi chatbot modern berbasis web yang dilengkapi dengan fitur **analisis sentimen** menggunakan NLP. Proyek ini dibangun menggunakan:

- ⚙️ Backend: [FastAPI](https://fastapi.tiangolo.com/) + [VADER Sentiment Analysis](https://github.com/cjhutto/vaderSentiment)
- 💬 Frontend: [Next.js](https://nextjs.org/) + [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
- 🐳 Deployment: Docker + Docker Compose

---

## 🚀 Fitur

- Chatbot berbasis AI
- Analisis sentimen secara real-time (positif, netral, negatif)
- UI modern dan responsif
- Terintegrasi penuh frontend & backend
- Siap dijalankan dengan Docker Compose

---

## 🖥️ Tampilan

<img src="https://github.com/aslich86/ai-chatbot/assets/demo-screenshot.png" alt="MessengerMerpati Chat UI" width="700"/>

---

## 📦 Struktur Proyek

```
ai-chatbot/
├── backend/ # FastAPI app with VADER
│ ├── main.py
│ ├── requirements.txt
│ └── Dockerfile
├── frontend/ # Next.js app with Messenger UI
│ ├── app/page.tsx
│ ├── components/
│ └── Dockerfile
├── docker-compose.yml
└── README.md
```


---

## ⚙️ Cara Menjalankan (dengan Docker)

### 1. Clone repositori ini:
```
git clone https://github.com/aslich86/ai-chatbot.git
cd ai-chatbot
```

2. Jalankan Docker Compose:
```
docker-compose up --build
```

3. Akses aplikasi:
Frontend: http://localhost:3000

Backend API: http://localhost:8000

Endpoint Chat: POST /chat

Contoh request ke API:
```
POST /chat
{
  "text": "I'm feeling great today!"
}

```
🧠 Teknologi yang Digunakan
Layer	Teknologi
Frontend	Next.js, Tailwind, Lucide
Backend	FastAPI, VADER Sentiment
Dev Tools	Docker, Docker Compose

