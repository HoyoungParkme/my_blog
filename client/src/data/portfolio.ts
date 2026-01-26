export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tags: string[];
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  createdAt: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for managing online stores with real-time analytics.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    link: "https://www.notion.so/test-2dcacd78299e8046909fce0dbc35efea?source=copy_link",
    tags: ["React", "TypeScript", "Tailwind"]
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task manager with team features and drag-and-drop interface.",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
    link: "https://www.notion.so/test-2dcacd78299e8046909fce0dbc35efea?source=copy_link",
    tags: ["Node.js", "PostgreSQL", "Socket.io"]
  },
  {
    id: 3,
    title: "Weather Forecast",
    description: "Beautiful weather application using external APIs for accurate global forecasting.",
    imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=800",
    link: "https://www.notion.so/test-2dcacd78299e8046909fce0dbc35efea?source=copy_link",
    tags: ["Vue", "API Integration", "CSS Grid"]
  }
];

export const posts: Post[] = [
  {
    id: 1,
    title: "Building Modern UIs",
    slug: "building-modern-uis",
    summary: "Thoughts on component composition and design systems.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdAt: "2026-01-15T10:00:00.000Z"
  },
  {
    id: 2,
    title: "The Future of Web Dev",
    slug: "future-web-dev",
    summary: "Why fullstack TypeScript is the way forward.",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    createdAt: "2026-01-10T10:00:00.000Z"
  },
  {
    id: 3,
    title: "Learning Framer Motion",
    slug: "learning-framer-motion",
    summary: "Creating smooth animations in React applications.",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    createdAt: "2026-01-05T10:00:00.000Z"
  }
];

export const profileInfo = {
  name: "Alex Kim",
  title: "Full-Stack Developer",
  tagline: "Crafting digital experiences with purpose.",
  bio: "I'm a full-stack developer and designer who builds accessible, pixel-perfect, and performant web applications.",
  email: "hello@alex.dev",
  location: "San Francisco, CA",
  availableForWork: true,
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com"
};
