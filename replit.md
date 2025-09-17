# Auction Analysis Application

## Overview

This is a React-based auction analysis tool that helps users evaluate the financial viability of property auctions. The application provides comprehensive calculation features for analyzing auction investments, including initial costs, ongoing expenses, and profitability metrics. It features a modern UI built with React, TypeScript, and shadcn/ui components, with a Node.js/Express backend for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: React hooks with custom calculator hook for auction calculations
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for auction analysis CRUD operations
- **Middleware**: Request logging, JSON parsing, and error handling
- **Development**: Hot reload with Vite integration for full-stack development

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless database provider
- **Schema**: Centralized schema definition in shared directory
- **Validation**: Zod schemas for runtime type validation
- **Fallback**: In-memory storage implementation for development/testing

### Authentication and Authorization
- Currently no authentication system implemented
- Session management infrastructure present with connect-pg-simple for future implementation

### Design System
- **Component Library**: Custom implementation using shadcn/ui patterns
- **Theme System**: CSS custom properties with light/dark mode support
- **Typography**: Inter font family with multiple font weights
- **Color System**: Neutral-based color palette with semantic color tokens
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities

### Development Environment
- **Replit Integration**: Configured for Replit development with banner and cartographer plugins
- **Build Process**: Vite for frontend, esbuild for backend bundling
- **Type Safety**: Strict TypeScript configuration with path mapping
- **Code Quality**: ESLint-ready setup with proper module resolution

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form, TanStack Query
- **Build Tools**: Vite, esbuild, TypeScript compiler
- **UI Framework**: Radix UI components, Tailwind CSS, class-variance-authority

### Database and ORM
- **Drizzle**: drizzle-orm, drizzle-kit for migrations, drizzle-zod for validation
- **Database Driver**: @neondatabase/serverless for PostgreSQL connection
- **Session Store**: connect-pg-simple for PostgreSQL session storage

### Utility Libraries
- **Validation**: Zod for schema validation and type inference
- **Date Handling**: date-fns for date manipulation
- **Styling**: clsx and tailwind-merge for conditional styling
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Replit Plugins**: @replit/vite-plugin-runtime-error-modal, @replit/vite-plugin-cartographer
- **CSS Processing**: PostCSS with Tailwind CSS and Autoprefixer
- **UI Development**: Command palette (cmdk), carousel components (embla-carousel-react)

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Development Runtime**: tsx for TypeScript execution
- **HTTP Utilities**: Built-in Node.js modules for server functionality