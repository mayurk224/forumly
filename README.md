# Forumly

Forumly is a modern forum/community platform inspired by Reddit, built with Next.js 15 and Sanity CMS. It allows users to create communities, share posts, engage in discussions, and more.

![Forumly](https://github.com/mayurk224/forumly/blob/main/public/images/Forumly%20-%20SCREENSHOT.png)

## 🌟 Features

- **User Authentication**: Secure user authentication powered by Clerk
- **Community Creation**: Create and manage communities with custom names, descriptions, and images
- **Content Creation**: Post text, images, and links to communities
- **Comments & Replies**: Engage in discussions with nested comments and replies
- **Voting System**: Upvote or downvote posts and comments
- **Search Functionality**: Search for posts, communities, and users
- **Responsive Design**: Fully responsive UI that works on all devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Content Moderation**: Report inappropriate content
- **AI Integration**: AI-powered features using OpenAI for content moderation

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS 4**: Utility-first CSS framework
- **ShadCN**: Accessible UI components
- **Lucide React**: Icon library
- **Next Themes**: Dark mode support

### Backend & Data
- **Sanity CMS**: Headless CMS for content management
- **Clerk**: Authentication and user management
- **GROQ**: Query language for Sanity
- **Vercel**: Hosting and deployment

### AI & Utilities
- **AI SDK**: Integration with OpenAI
- **Zod**: Schema validation
- **React TimeAgo**: Relative time formatting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- pnpm package manager (recommended)
- Sanity account
- Clerk account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mayurk224/forumly.git
cd forumly
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# OpenAI (optional)
OPENAI_API_KEY=your_openai_api_key
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Sanity Studio

To access the Sanity Studio for content management:

1. Run the Sanity development server:
```bash
pnpm sanity
```

2. Or access it through the Next.js app at [http://localhost:3000/studio](http://localhost:3000/studio)

## 📦 Project Structure

```
forumly/
├── app/                  # Next.js App Router
│   ├── (admin)/          # Admin routes (Sanity Studio)
│   ├── (app)/            # Main application routes
│   └── api/              # API routes
├── components/           # React components
│   ├── comment/          # Comment-related components
│   ├── community/        # Community-related components
│   ├── header/           # Header components
│   ├── post/             # Post-related components
│   └── ui/               # UI components
├── public/               # Static assets
├── sanity/               # Sanity configuration
│   ├── lib/              # Sanity utility functions
│   └── schemaTypes/      # Sanity schema definitions
└── action/               # Server actions
```

## 🔄 Scripts

- `pnpm dev`: Run the development server
- `pnpm build`: Build the application for production
- `pnpm start`: Start the production server
- `pnpm lint`: Run ESLint
- `pnpm typegen`: Generate TypeScript types from Sanity schema
- `pnpm sanity`: Run Sanity Studio locally
- `pnpm sanity-deploy`: Deploy Sanity Studio

## 🌐 Deployment

The project is deployed on Vercel. You can view the live demo at:

[https://forumly-lemon.vercel.app](https://forumly-lemon.vercel.app)

To deploy your own instance:

```bash
vercel
```

For production deployment:

```bash
vercel --prod
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
