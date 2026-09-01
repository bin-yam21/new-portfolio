# Binyam Tamiru Portfolio Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/bin-yam21/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:

```env
# Email Configuration (for contact form)
RESEND_API_KEY=your_resend_api_key
RESEND_TO_EMAIL=your_email@example.com

# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=your_ga_id
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 📝️ Customization Guide

### Personal Information
Update these files with your information:

- **`src/app/layout.tsx`**: Update metadata, SEO, and structured data
- **`src/components/Hero.tsx`**: Update hero section content
- **`src/components/About.tsx`**: Update your bio and story
- **`src/components/Experience.tsx`**: Update work experience

### Projects
Edit `_data/data.ts` to showcase your projects:

```typescript
export const projects = [
  {
    name: "Your Project",
    slug: "your-project",
    show: "Brief one-line description",
    desc: "Detailed project description...",
    lang: ["React", "TypeScript", "Node.js"],
    img: "project-screenshot.png",
    img2: "project-screenshot2.png", // optional
    img3: "project-screenshot3.png", // optional
    link: "https://your-project-demo.com",
    git: "https://github.com/yourusername/your-project",
    problem: "Problem this project solves...", // optional
    solution: "How you solved it...", // optional
  },
  // Add more projects...
];
```

### Tech Stack
Update `src/components/StackLoop.tsx` to reflect your skills:

```typescript
const techStack = [
  { name: "React", src: "/tech/react.svg" },
  { name: "TypeScript", src: "/tech/typescript.svg" },
  // Add your technologies...
];
```

### Social Links
Update links in:
- **`src/components/Navbar.tsx`**: GitHub and other social links
- **`src/components/About.tsx`**: LinkedIn profile link
- **`src/app/layout.tsx`**: Social media links in metadata

### Images & Assets
Replace images in `public/`:
- `public/img/profile-image.jpg` - Hero profile image
- `public/img/profile-pic.jpg` - About section profile
- `public/img/brandLogo.png` - Navbar brand logo
- `public/img/` - Project screenshots (match names in data.ts)
- `public/tech/` - Technology logos
- `public/Resume (7).pdf` - Your resume PDF

## 🎨 Design Customization

### Colors & Theme
The portfolio uses a blue-purple gradient theme. Modify colors in:
- **`src/app/globals.css`**: CSS variables and theme definitions
- Tailwind classes throughout components

### Animations
Enhanced animations are implemented using Framer Motion:
- **`src/components/AnimatedBackground.tsx`**: Background animations
- **`src/lib/animations.ts`**: Reusable animation presets
- Component-specific animations in each component

### Typography
Uses Geist font family. To change:
1. Update font imports in `src/app/layout.tsx`
2. Update CSS variables in `src/app/globals.css`

## 📧 Contact Form Setup

The contact form uses Resend for email delivery:

1. **Sign up for Resend**: [https://resend.com](https://resend.com)
2. **Get your API key** from the dashboard
3. **Set environment variables**:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   RESEND_TO_EMAIL=your@email.com
   ```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration Files

- **`next.config.ts`**: Next.js configuration
- **`tailwind.config.js`**: Tailwind CSS configuration  
- **`tsconfig.json`**: TypeScript configuration
- **`components.json`**: Shadcn/ui component configuration

## 📱 Features

- ✅ Responsive design (mobile-first)
- ✅ Dark/light theme support
- ✅ Smooth animations and transitions
- ✅ SEO optimized
- ✅ Contact form with email integration
- ✅ Project showcase with filtering
- ✅ Interactive tech stack display
- ✅ Social media integration
- ✅ Performance optimized

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Email**: Resend API
- **Deployment**: Vercel

## 📄 License

This portfolio template is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you need help with setup or customization:
1. Check the [Issues](https://github.com/bin-yam21/portfolio/issues) page
2. Create a new issue with detailed description
3. Join our [Discord community](https://discord.gg/binyam) (optional)

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
