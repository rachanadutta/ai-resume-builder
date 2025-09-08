# 🤖 AI Resume Builder (Full-Stack Project)

This is a full-stack AI-powered resume builder. Users can create resumes with multiple sections, select templates, and download their resumes as PDFs. The front-end is built with React and Tailwind CSS, and the back-end uses Node.js, Express, MongoDB, and Puppeteer for PDF generation.

---

## 🔗 Deployed Links

- **Frontend:** [https://rachanadutta.github.io/ai-resume-builder/](https://rachanadutta.github.io/ai-resume-builder/)  
- **Backend:** `https://ai-resume-backend-11s4.onrender.com/`  

---

## 🌟 Key Features

### 📝 Resume Sections
- **Personal Info:** Name, Title, Contact, Social links  
- **Experience:** Work history with role, company, and description  
- **Skills:** List of technical and soft skills  
- **Projects:** Project title, description, and links  
- **Education:** Academic history  
- **Optional Sections:** Certificates, Languages, Others  

### 🖌 Templates
- Multiple resume templates to choose from  
- Live preview while editing  

### 💾 Auto-Save & Load
- Progress is auto-saved to the backend after changes  
- Resume can be loaded anytime after logging in  

### 📄 PDF Download
- Generate and download resume in PDF format  
- Puppeteer used to render front-end templates as PDF  

### 🔐 Authentication
- Signup and login functionality with JWT-based authentication  
- User-specific resumes  

---

## 🛠 Technologies Used

**Frontend:**
- React.js  
- Tailwind CSS  
- Framer Motion, GSAP for animations  
- React Router for routing  

**Backend:**
- Node.js & Express  
- MongoDB Atlas for database  
- Puppeteer for PDF generation  
- bcryptjs for password hashing  
- JSON Web Tokens (JWT) for authentication  

**Other Tools:**
- Axios for HTTP requests  
- Vite for frontend bundling  
- GitHub Pages for frontend deployment  
- Render for backend deployment  

---

## 📄 Pages Included

- **Home:** Landing page with resume info  
- **Signup & Login:** User authentication  
- **Resume Builder:** Step-by-step form to create resume  
- **Preview:** Live preview of selected template  
- **Print Template:** Hidden page used for PDF generation  

---

## ⚡ How to Run Locally

1. Clone the repository:
```bash
git clone <repo-url>
cd ai-resume-builder

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
