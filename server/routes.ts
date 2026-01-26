import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Posts
  app.get(api.posts.list.path, async (req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  app.post(api.posts.create.path, async (req, res) => {
    try {
      const input = api.posts.create.input.parse(req.body);
      const post = await storage.createPost(input);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
    }
  });

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post(api.projects.create.path, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
    }
  });

  // Messages
  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingPosts = await storage.getPosts();
  if (existingPosts.length === 0) {
    await storage.createPost({
      title: "Building Modern UIs",
      slug: "building-modern-uis",
      summary: "Thoughts on component composition and design systems.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    });
    await storage.createPost({
      title: "The Future of Web Dev",
      slug: "future-web-dev",
      summary: "Why fullstack TypeScript is the way forward.",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    });
    await storage.createPost({
      title: "Learning Framer Motion",
      slug: "learning-framer-motion",
      summary: "Creating smooth animations in React applications.",
      content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    });
  }

  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await storage.createProject({
      title: "E-Commerce Dashboard",
      description: "A comprehensive dashboard for managing online stores with real-time analytics.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      link: "#",
      tags: ["React", "TypeScript", "Tailwind"]
    });
    await storage.createProject({
      title: "Task Management App",
      description: "Collaborative task manager with team features and drag-and-drop interface.",
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
      link: "#",
      tags: ["Node.js", "PostgreSQL", "Socket.io"]
    });
    await storage.createProject({
      title: "Weather Forecast",
      description: "Beautiful weather application using external APIs for accurate global forecasting.",
      imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=800",
      link: "#",
      tags: ["Vue", "API Integration", "CSS Grid"]
    });
  }
}
