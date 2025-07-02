# 🌟 Personal Portfolio Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express)](https://expressjs.com/)

> A stunning, fully responsive portfolio website showcasing my journey as a Software Engineer specializing in AI/ML and Full-Stack Development. Features an interactive constellation background, smooth animations, and a functional contact form powered by modern web technologies.

## 🌐 Live Demo

🚀 **[View Live Portfolio](https://portfolio2-0-iamshuklau.vercel.app)** 

*Note: Deploy to Vercel to get your live URL*

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
- **TypeScript Support**: Full TypeScript implementation for better code quality
- **Modern ES6+**: Latest JavaScript features and best practices
- **Email Integration**: Powered by Resend API for reliable email delivery
- **Performance Optimized**: Efficient animations and optimized assets
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 🔧 Tech Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Advanced styling with CSS Grid, Flexbox, and animations
- **JavaScript/TypeScript** - Interactive functionality and type safety
- **Ionicons** - Beautiful icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server-side development
- **Resend API** - Email service integration

### Development Tools
- **ts-node** - TypeScript execution for Node.js
- **Concurrently** - Run multiple npm scripts simultaneously
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Iamshuklau/Portfolio2.0.git
   cd Portfolio2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the environment template
   cp env-template .env
   
   # Edit .env file with your email settings
   # Add your Resend API key
   RESEND_API_KEY=your_resend_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - The website will automatically open at `http://localhost:3001`
   - Backend API runs on the same port

### Available Scripts

```bash
# Development with TypeScript
npm run dev

# Production build
npm run build

# Start production server
npm start

# Development with JavaScript
npm run dev:js

# Build frontend TypeScript
npm run build:frontend

# Watch mode for TypeScript
npm run watch

# Setup environment
npm run setup
```

## 📁 Project Structure

```
Portfolio2.0/
├── 📁 assets/
│   ├── 📁 css/
│   │   └── style.css           # Main stylesheet
│   ├── 📁 js/
│   │   ├── script.js          # Compiled JavaScript
│   │   └── script.ts          # TypeScript source
│   ├── 📁 images/             # Project images and assets
│   └── Utkarsh_Shukla_CV.pdf  # Resume/CV file
├── 📁 api/
│   ├── send-email.js          # Email API endpoint
│   └── send-email.ts          # TypeScript email handler
├── 📁 includes/
│   ├── head.html              # HTML head section
│   ├── navigation.html        # Navigation component
│   ├── sidebar.html           # Sidebar component
│   └── footer-scripts.html    # Footer scripts
├── 📁 pages/
│   ├── about.html             # About page content
│   ├── resume.html            # Resume page content
│   ├── portfolio.html         # Portfolio page content
│   ├── blog.html              # Blog page content
│   └── contact.html           # Contact page content
├── index.html                 # Main HTML file
├── server.ts                  # Express server (TypeScript)
├── server.js                  # Express server (JavaScript)
├── run-dev.ts                 # Development runner
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vercel.json                # Vercel deployment config
└── README.md                  # This file
```

## 🌐 Features Deep Dive

### Contact Form
- **Real-time Validation**: Client-side form validation
- **Email Integration**: Powered by Resend API
- **Responsive Design**: Works on all device sizes
- **Success/Error Feedback**: User-friendly notifications

### Portfolio Section
- **Project Filtering**: Filter by AI/ML, Full Stack, Web Development
- **External Links**: Direct links to GitHub repositories
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Hover Effects**: Smooth transitions and visual feedback

### Constellation Animation
- **Mouse Interaction**: Stars respond to cursor movement
- **Performance Optimized**: Efficient canvas rendering
- **Mobile Responsive**: Disabled on mobile for better performance
- **Customizable**: Easy to modify colors and behavior

## 📧 Contact Form Setup

The contact form requires a Resend API key to function properly:

1. **Get Resend API Key**
   - Sign up at [resend.com](https://resend.com)
   - Generate an API key from the dashboard

2. **Configure Environment**
   ```bash
   # In your .env file
   RESEND_API_KEY=re_your_api_key_here
   ```

3. **Update Email Settings**
   - Modify `api/send-email.ts` to customize:
     - Recipient email
     - Email templates
     - Validation rules

## 🚢 Deployment

### Vercel (Recommended)
1. Fork or clone this repository to your GitHub account
2. Connect your GitHub repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY=your_resend_api_key_here`
4. Deploy automatically - your portfolio will be live instantly!

### Manual Deployment
1. Build the project: `npm run build`
2. Upload files to your hosting provider
3. Ensure Node.js support for the backend
4. Set environment variables on the server

## 🎯 Customization

### Styling
- **Colors**: Modify CSS custom properties in `assets/css/style.css`
- **Fonts**: Update font imports in the CSS file
- **Animations**: Adjust animation durations and effects

### Content
- **Personal Info**: Update `includes/sidebar.html`
- **Projects**: Modify `pages/portfolio.html`
- **Resume**: Replace `assets/Utkarsh_Shukla_CV.pdf`
- **About**: Edit `pages/about.html`

### Functionality
- **Constellation**: Customize in `assets/js/script.ts`
- **Email**: Modify templates in `api/send-email.ts`
- **Navigation**: Update `includes/navigation.html`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern portfolio trends and best practices
- **Icons**: [Ionicons](https://ionic.io/ionicons) for beautiful iconography
- **Email Service**: [Resend](https://resend.com) for reliable email delivery
- **Fonts**: Google Fonts for typography

## 📞 Contact

**Utkarsh Shukla**
- 🌐 Portfolio: [Live Demo](https://portfolio2-0-iamshuklau.vercel.app)
- 📧 Email: iamshuklau@gmail.com
- 💼 LinkedIn: [linkedin.com/in/utkarsh-shukla](https://linkedin.com/in/utkarsh-shukla-dev)
- 🐱 GitHub: [@Iamshuklau](https://github.com/Iamshuklau)
- 📂 Repository: [Portfolio2.0](https://github.com/Iamshuklau/Portfolio2.0)

---

⭐ **If you found this project helpful, please give it a star!** ⭐

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Iamshuklau">Utkarsh Shukla</a></sub>
</div> 