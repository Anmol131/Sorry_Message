# Romantic Apology Website ❤️

A beautiful, mobile-first React website designed to express heartfelt apologies with emotional, respectful, and thoughtful messaging.

## Features

- **Multi-Step Apology Flow**: Guided journey through acknowledgement, reasons, promises, and memories
- **Mobile-First Design**: Optimized for mobile devices (375px+) with responsive desktop support
- **Smooth Animations**: Lightweight Framer Motion animations that won't lag on mobile
- **Touch-Friendly**: Large tap areas (minimum 48px) for easy interaction
- **Romantic Aesthetic**: Soft pastel colors (pink, lavender, rose) with gentle gradients
- **Accessible**: High contrast text, readable fonts, and clear visual hierarchy

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
3. Or connect your Git repository and set build command: `npm run build` and publish directory: `dist`

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Or connect your Git repository on [Vercel](https://vercel.com)

### Other Platforms

Any static hosting service will work:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting

Just build the project and upload the `dist` folder contents.

## Customization

### Change Her Name

Edit `src/components/Hero.jsx` and replace "Beautiful" with her name:

```jsx
<h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
  Hey [Her Name] ❤️
</h1>
```

### Customize Apology Text

Edit the text in each component:
- `src/components/Acknowledgement.jsx` - Main apology message
- `src/components/ReasonCards.jsx` - Reasons you love her
- `src/components/PromiseList.jsx` - Your promises
- `src/components/Memories.jsx` - Shared memories

### Add Background Music

1. Add an audio file to `public/` folder (e.g., `public/music.mp3`)
2. Update `src/components/ForgivenessResult.jsx`:

```jsx
const [audio] = useState(new Audio('/music.mp3'));

const handleMusicToggle = () => {
  if (musicPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  setMusicPlaying(!musicPlaying);
};
```

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx              # Landing screen
│   ├── Acknowledgement.jsx   # Step 1: Apology
│   ├── ReasonCards.jsx       # Step 2: Why she matters
│   ├── PromiseList.jsx       # Step 3: Promises
│   ├── Memories.jsx          # Step 4: Memories timeline
│   ├── ForgiveButton.jsx     # Step 5: Forgiveness request
│   ├── ForgivenessResult.jsx # Final: Thank you screen
│   └── StepFlow.jsx          # Main flow controller
├── App.jsx                   # Root component
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Minimum viewport: 375px width

## License

Personal use project - feel free to customize for your needs!

---

Made with ❤️ and lots of effort

