# Binxthinxx Identity Reclamation Platform

## Overview

Binxthinxx is an identity reclamation coaching platform designed for high-functioning women experiencing burnout from performance-based living. The application combines modern React frontend architecture with a Node.js/Express backend to deliver emotionally resonant coaching experiences through multiple service offerings including Wildroot programs, 1:1 coaching, Shadow Lounge community sessions, and Sunday Reset rituals.

The platform emphasizes deep, transformative work around identity, shadow work, and authentic self-expression, moving users from survival-based performance patterns to genuine self-belonging. The design aesthetic reflects themes of depth, intimacy, and "truth after a long performance" using a carefully curated color palette of ink blues, burnt oranges, and candlelight beiges.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using **React 18** with **TypeScript**, utilizing a file-based routing system through **Wouter** for lightweight navigation. The architecture follows a component-based design pattern with:

- **UI Component Library**: Built on **shadcn/ui** components with **Radix UI** primitives for accessibility and customization
- **Styling Framework**: **Tailwind CSS** with custom design tokens matching the brand color palette (ink-blue, burnt-orange, candlelight-beige, forest-green, faded-rust)
- **State Management**: **TanStack React Query** for server state management and caching
- **Form Handling**: **React Hook Form** with **Zod** schema validation for type-safe form processing
- **Font System**: **Playfair Display** (serif) for headings and **Lora** (serif) for body text to maintain the poetic, intimate aesthetic

### Backend Architecture
The server runs on **Node.js** with **Express.js** in ESM format, designed as a REST API with the following characteristics:

- **Development Setup**: Hot-reload development server with **Vite** integration for seamless full-stack development
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development, designed to easily swap to database persistence
- **API Structure**: RESTful endpoints prefixed with `/api` for clear client-server separation
- **Request Logging**: Comprehensive request/response logging with duration tracking for API monitoring

### Database Architecture
The application uses **Drizzle ORM** with **PostgreSQL** as the target database:

- **Schema Definition**: Type-safe database schemas using Drizzle with **Zod** integration for runtime validation
- **Migration System**: **Drizzle Kit** for schema migrations and database management
- **Connection**: **Neon Database** serverless PostgreSQL for production deployment
- **Development Storage**: In-memory storage implementation during development phase

### Build and Deployment Pipeline
Modern build toolchain optimized for both development and production:

- **Development**: **Vite** dev server with HMR (Hot Module Replacement) for rapid iteration
- **Production Build**: **Vite** for frontend compilation and **esbuild** for backend bundling
- **TypeScript**: Full-stack TypeScript support with shared type definitions
- **Asset Management**: Static asset serving with proper caching strategies

### Authentication and User Management
Basic user management infrastructure is established:

- **User Schema**: ID, username, and password fields with UUID primary keys
- **Storage Interface**: CRUD operations for user management (getUser, getUserByUsername, createUser)
- **Session Foundation**: Prepared for session-based authentication implementation

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection for production
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-kit**: Database migration and schema management tools
- **express**: Node.js web application framework
- **vite**: Frontend build tool and development server

### UI and Styling Dependencies  
- **@radix-ui/***: Comprehensive set of accessible UI primitives (accordion, dialog, dropdown-menu, form controls, navigation, toast, etc.)
- **tailwindcss**: Utility-first CSS framework with custom design system
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx**: Conditional className utility

### Form and Validation Dependencies
- **react-hook-form**: Performant forms with minimal re-renders
- **@hookform/resolvers**: Integration layer for validation libraries
- **zod**: TypeScript schema validation
- **drizzle-zod**: Bridge between Drizzle schemas and Zod validation

### Development and Build Dependencies
- **tsx**: TypeScript execution for Node.js development
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for Replit environment
- **@replit/vite-plugin-cartographer**: Development tooling for Replit integration

### Utility Dependencies
- **date-fns**: Modern JavaScript date utility library
- **cmdk**: Command palette/search component
- **embla-carousel-react**: Touch-friendly carousel component
- **@tanstack/react-query**: Powerful data synchronization for React

The architecture prioritizes developer experience, type safety, and scalable growth while maintaining the intimate, transformative user experience central to the coaching platform's mission.