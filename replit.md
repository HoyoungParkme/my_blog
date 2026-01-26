# Personal Portfolio - Static Site

## Overview
A clean, minimal personal portfolio website designed for GitHub Pages deployment. The site is fully static with no backend dependencies.

## Project Structure
- `client/src/data/portfolio.ts` - All portfolio data (projects, posts, profile info)
- `client/src/pages/` - Page components (Home, Projects, Blog, Contact)
- `client/src/components/` - Reusable UI components

## Key Features
- Animated hero section with Framer Motion
- Project showcase grid
- Blog posts list
- Contact page with email link and social media links
- Mobile-responsive navigation
- Light/dark mode support via CSS variables

## Customization
Edit `client/src/data/portfolio.ts` to update:
- Profile information (name, email, bio)
- Projects list
- Blog posts
- Social media links

## GitHub Pages Deployment
This is a static site - no backend required. To deploy:
1. Build the project: `npm run build`
2. Deploy the `dist/public` folder to GitHub Pages

## Tech Stack
- React + TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Wouter (routing)
