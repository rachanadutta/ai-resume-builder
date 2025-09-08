📝 AI Resume Builder (Full-Stack Project)  
A full-stack resume builder with AI-powered suggestions, live preview, multiple templates, and PDF download.  

🔗 Deployed Frontend: https://rachanadutta.github.io/ai-resume-builder/  
🔗 Deployed Backend: https://ai-resume-backend-11s4.onrender.com  

🌟 Key Features:  
🧑‍💼 **User Authentication:**  
🔑 Signup / Login with JWT authentication  
📝 Save resume progress automatically  

📑 **Step-by-Step Resume Builder:**  
🧭 Personal Info: Name, Title, Email, Phone, GitHub, LinkedIn, Portfolio  
💼 Experience: Add multiple experiences  
🎓 Education: Add multiple educational entries  
🛠 Skills & Projects: Add skills and projects with AI suggestions  
💡 Summary: Generate AI-powered resume summary  

🧩 **Optional Sections:**  
🏆 Certificates  
🌐 Languages  
📦 Others  

🖥 **Preview & Templates:**  
🎨 Multiple templates (Template1, Template2, Template3)  
🔍 Live preview of the resume while editing  

📄 **PDF Download:**  
📥 Export resume as PDF using Puppeteer  

🛠 **Technologies Used:**  
💻 Frontend: React, Vite, React Router, Tailwind CSS  
🗄 Backend: Node.js, Express, MongoDB Atlas, Puppeteer  
☁️ Deployment: Frontend → GitHub Pages, Backend → Render  

⚙️ **Setup (Local):**  
1. Clone the repo  
```bash
git clone https://github.com/rachanadutta/ai-resume-builder.git
# Frontend
npm install
# Backend
cd backend
npm install
Backend (.env)

MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
GEMINI_API_KEY=<your-ai-key>
PORT=5000
Frontend (.env)

VITE_BASE_URL=http://localhost:5000
Run locally

# Backend
cd backend
npm run dev
# Frontend
cd ..
npm run dev
