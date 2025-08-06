# FPL News Portal

A comprehensive Fantasy Premier League (FPL) news and services portal built with Next.js 15, React 19, and TypeScript. This application provides FPL enthusiasts with the latest news, interactive tools, and analysis to enhance their FPL experience.

## ✨ Features

### 📰 FPL News
- Latest Fantasy Premier League news and updates
- News categories including fixtures and results
- Responsive news cards with modern design

### 🛠️ FPL Services
- **Points Calculator** - Calculate and predict FPL points for your team
- **Player Analysis** - Deep dive into player statistics and performance metrics
- **Fixture Difficulty** - Analyze upcoming fixtures and plan transfers

### 🎨 Modern UI/UX
- Dark/Light theme toggle
- Fully responsive design (mobile, tablet, desktop)
- Modern glassmorphism design elements
- Smooth animations and transitions
- Interactive navigation with dropdown menus

### 📱 Mobile-First Design
- Responsive navigation with mobile menu
- Touch-friendly interface
- Optimized for all screen sizes

## 🚀 Tech Stack

- **Framework**: Next.js 15.4.5 (App Router)
- **Frontend**: React 19.1.0, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: React Icons
- **Theme**: Custom dark/light mode implementation

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with theme provider
│   ├── page.tsx                # Home page
│   ├── context/
│   │   └── themeContext.tsx    # Theme management
│   ├── news/                   # News section
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   ├── fixtures/
│   │   └── results/
│   ├── fplservices/            # FPL tools and services
│   │   ├── page.tsx
│   │   ├── calculator/
│   │   ├── player-analysis/
│   │   └── fixture-difficulty/
│   ├── aboutfpl/
│   └── contactfpl/
├── components/
│   ├── shared/                 # Shared components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Banner.tsx
│   │   ├── NewsCard.tsx
│   │   └── NewsLetter.tsx
│   └── ui/                     # UI primitives
│       ├── button.tsx
│       ├── navigation-menu.tsx
│       └── switch.tsx
├── lib/
│   └── utils.ts                # Utility functions
└── types/
    └── news.ts                 # TypeScript type definitions
```

## 🛠️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/HasnathAhmedTamim/fpl-news-portal-nextjs.git
cd next-fpl-portal
```

2. **Install dependencies**
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

3. **Run the development server**
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎨 Theme System

The application features a custom theme system with:
- Light and dark mode support
- Persistent theme preference
- Smooth theme transitions
- Context-based theme management

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with zero configuration

### Other Deployment Options

- **Netlify**: Connect your GitHub repository
- **Railway**: One-click deployment
- **DigitalOcean App Platform**: Container-based deployment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For any questions or suggestions, please reach out through the Contact FPL page in the application.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
