# 🌟 Personal Portfolio Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> A stunning, fully responsive portfolio website showcasing my journey as a Software Engineer specializing in AI/ML and Full-Stack Development. Features an interactive constellation background, smooth animations, and a functional contact form powered by modern web technologies.

## 🌐 Live Demo

🚀 **[View Live Portfolio](https://iamshuklau.github.io/Portfolio-2.0/)** 

## 📱 Screenshots

![Portfolio Preview](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Portfolio+Preview+-+Add+Your+Screenshot+Here)

*Add your actual portfolio screenshots here after deployment*

## ✨ Features

### 🎨 **Design & User Experience**
- **Stunning Dark Theme**: Elegant dark interface with golden accent colors
- **Interactive Constellation Background**: Animated star field with mouse interaction
- **Smooth Animations**: Page transitions, scroll animations, and hover effects
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Modern Typography**: Clean, readable fonts with proper hierarchy

### 🚀 **Functionality**
- **Multi-Page Navigation**: About, Resume, Portfolio, Blog, and Contact sections
- **Dynamic Content**: Animated typing effect for role titles
- **Project Showcase**: Filterable portfolio with categories (AI/ML, Full Stack, Web Dev)
- **Contact Form**: Functional contact form with email integration
- **Blog Modal**: Expandable blog post viewing
- **Service Modals**: Detailed service descriptions

### 🛠 **Technical Highlights**
- **Modern ES6+**: Latest JavaScript features and best practices
- **Email Integration**: Powered by Resend API for reliable email delivery
- **Performance Optimized**: Efficient animations and optimized assets
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 🔧 Tech Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Advanced styling with CSS Grid, Flexbox, and animations
- **JavaScript** - Interactive functionality
- **Ionicons** - Beautiful icon library

### Backend (for contact form)
- **Node.js** - Runtime environment (used for the Resend API)
- **Resend API** - Email service integration

## 🚀 Quick Start

### Prerequisites
- A modern web browser.
- A local web server to run the project.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Iamshuklau/Portfolio-2.0.git
   cd Portfolio-2.0
   ```

2. **Run the project**
   You can use any local web server. A simple one is `serve`, which you can run with `npx`:
   ```bash
   npx serve
   ```
   This will start a server, and you can view the website at `http://localhost:3000`.

## 📁 Project Structure

```
Portfolio-2.0/
├── 📁 assets/
│   ├── 📁 css/
│   │   └── style.css           # Main stylesheet
│   ├── 📁 js/
│   │   └── script.js          # Main JavaScript file
│   ├── 📁 images/             # Project images and assets
│   └── Utkarsh_Shukla_CV.pdf  # Resume/CV file
├── 📁 api/
│   └── send-email.js          # Email API endpoint for Vercel
├── index.html                 # Main HTML file
├── package.json               # Dependencies and project info
└── README.md                  # This file
```

## 📧 Contact Form Setup

The contact form is designed to work when deployed on Vercel, using a serverless function that integrates with the Resend API.

1. **Get Resend API Key**
   - Sign up at [resend.com](https://resend.com)
   - Generate an API key from the dashboard

2. **Configure for Vercel**
   - When you deploy to Vercel, add your Resend API key as an environment variable named `RESEND_API_KEY`. The `api/send-email.js` function will then be able to send emails.

## 🚢 Deployment

### Vercel (Recommended)
1. Fork or clone this repository to your GitHub account.
2. Connect your GitHub repository to [Vercel](https://vercel.com).
3. Add an environment variable in the Vercel dashboard:
   - `RESEND_API_KEY=your_resend_api_key_here`
4. Deploy automatically. Your portfolio will be live instantly!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern portfolio trends and best practices
- **Icons**: [Ionicons](https://ionic.io/ionicons) for beautiful iconography
- **Email Service**: [Resend](https://resend.com) for reliable email delivery
- **Fonts**: Google Fonts for typography

## 📞 Contact

**Utkarsh Shukla**
- 🌐 Portfolio: [https://iamshuklau.github.io/Portfolio-2.0/](https://iamshuklau.github.io/Portfolio-2.0/)
- 📧 Email: mrshuklau@gmail.com
- 💼 LinkedIn: [linkedin.com/in/iamshuklau](https://linkedin.com/in/iamshuklau)
- 🐱 GitHub: [@Iamshuklau](https://github.com/Iamshuklau)
- 📂 Repository: [Portfolio-2.0](https://github.com/Iamshuklau/Portfolio-2.0)

---

⭐ **If you found this project helpful, please give it a star!** ⭐

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Iamshuklau">Utkarsh Shukla</a></sub>
</div> 