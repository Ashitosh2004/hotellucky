# Hotel Lucky - Restaurant Management System

## Overview

Hotel Lucky is a professional multilingual hotel and restaurant management system built as a modern web application. The system provides role-based access for customers, kitchen staff, and administrators, supporting real-time ordering, kitchen management, and comprehensive dashboard analytics. The application supports three languages (English, Hindi, Marathi) with seamless language switching and direct ordering without cart functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with CSS variables for theming, Inter font family for typography
- **State Management**: React hooks for local state, Firebase real-time listeners for data synchronization
- **Routing**: Client-side routing with role-based access control

### Backend Architecture
- **Server Framework**: Express.js with TypeScript for API endpoints
- **Database ORM**: Drizzle ORM configured for PostgreSQL with schema-first approach
- **Authentication**: Firebase Authentication for secure user management
- **Real-time Communication**: Firebase Firestore real-time listeners for live order updates
- **File Storage**: Firebase Storage for menu item images and assets

### Data Architecture
- **Primary Database**: PostgreSQL with Drizzle ORM for relational data
- **Real-time Database**: Firestore for live order tracking and kitchen management
- **Schema Design**: Shared TypeScript schemas between client and server
- **Data Persistence**: Local storage for user role and language preferences

### Authentication & Authorization
- **Authentication Provider**: Firebase Auth with email/password
- **Role-Based Access**: Four distinct roles (customer, south-kitchen, kolhapuri-kitchen, admin)
- **Session Management**: Firebase handles token management and session persistence
- **Route Protection**: Role-based route guards preventing unauthorized access

### Design Patterns
- **Component Architecture**: Reusable UI components with prop-based configuration
- **Hook Pattern**: Custom hooks for Firebase operations, authentication, and notifications
- **Provider Pattern**: Context providers for shared state and configuration
- **Modal Pattern**: Centralized modal management for orders, login, and menu item creation

### Key Features
- **Direct Ordering**: No cart system - immediate order placement with quantity selection
- **Real-time Updates**: Live order status tracking across all user roles
- **Multilingual Support**: Dynamic language switching with persistent preferences
- **Kitchen Dashboards**: Role-specific dashboards for South Indian and Kolhapuri kitchens
- **Admin Management**: Comprehensive dashboard with analytics, menu management, and order oversight
- **Mobile-First Design**: Responsive design optimized for mobile devices

## External Dependencies

### Firebase Services
- **Firebase Authentication**: User authentication and session management
- **Firestore Database**: Real-time NoSQL database for orders and menu items
- **Firebase Storage**: File storage for menu item images
- **Firebase Analytics**: User behavior tracking and insights

### Database & ORM
- **PostgreSQL**: Primary relational database (configured via DATABASE_URL)
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database operations and migrations

### UI & Styling
- **Radix UI**: Accessible component primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Class Variance Authority**: Component variant management

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds
- **React Hook Form**: Form validation and management with Zod schemas

### Additional Libraries
- **TanStack Query**: Server state management and caching
- **Date-fns**: Date manipulation and formatting
- **CMDK**: Command palette functionality
- **Embla Carousel**: Touch-friendly carousel component