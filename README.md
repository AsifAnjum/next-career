# Next Career Platform

**Live Link:** [Next Career](https://nextcareer-pro.vercel.app/)

### User Credentials (Moderator)

email: b@gmail.com \
 pass:123456

---

## Project Overview

Next Career Platform is a comprehensive application that combines a job portal and blogging platform into one cohesive experience. The platform allows users, HR personnel, authors, and administrators to perform tailored actions based on their roles. With features like profile management, job posting, blog creation, content management, and admin moderation, the platform empowers various user types to collaborate seamlessly.

---

## Features

### User-Facing Features

#### Profile Management:

- Update profile details and change passwords.

#### Job Features:

- Browse and search job listings with filters.
- View detailed job descriptions and apply for positions.

#### Blog Features:

- Read blogs written by authors and content managers.
- Access detailed blog posts, including related articles.

---

### Role-Specific Features

#### HR Personnel:

- Create, edit, and delete job postings.

#### Authors:

- Create, edit, and manage blog posts.

#### Content Managers:

- Post both job listings and blogs.

#### Admins/Moderators:

- Manage users, jobs, and blogs.
- Handle content moderation for the platform.

---

## Authentication System

### Login Methods:

- Email and password.
- Google login integration.

### Role-Based Access Control:

- Different functionalities for users based on their roles (e.g., HR, Author, Admin).

---

## Upcoming Features

- **Password Reset:** Users can request a password reset via email.
- **Email Verification:** Ensure valid email addresses during signup.

---

## Tech Stack

### Frontend:

- **Next.js:** React framework for server-side rendering and routing.
- **TypeScript:** Ensures type safety and improved developer experience.
- **Tailwind CSS:** Modern utility-first CSS framework.
- **Tailwind CSS Animate:** For animations built on Tailwind CSS.
- **Shadcn UI:** A customizable UI component library built with Radix primitives.
- **Radix UI:** Accessible, low-level UI components for React.
- **Lucide React:** Icon library for React.
- **React Hook Form:** For efficient form validation.
- **Sonner:** For toast notifications.
- **Embla Carousel React:** For carousels and sliders.
- **React Hook Form**: Provides efficient and performant form handling with minimal re-renders.
- **Zod**: A TypeScript-first schema validation library for validating and parsing user input.

### Backend:

- **Next.js API Routes:** For server-side logic.
- **MongoDB:** NoSQL database for managing data like users, blogs, and jobs.
- **Mongoose:** ORM for MongoDB.
- **JWT (jsonwebtoken):** For secure authentication and role management.
- **BcryptJS:** For hashing and verifying passwords.
- **Next-Auth:** For authentication and user session management.
- **UploadThing:** For handling file uploads.

---

## Build and Development Tools

- **Turbopack:** Built-in bundler for Next.js for fast development builds.
- **pnpm:** Efficient dependency management.
- **ESLint:** For linting and code quality.
- **PostCSS:** For CSS processing.
- **Tailwind Merge:** Utility for merging Tailwind CSS classes.

---

## Directory Structure

```plaintext
asifanjum-next-career/
├── public/           # Static assets like images.
├── src/              # Core application logic.
│   ├── app/          # Next.js app directory.
│   ├── components/   # Reusable components for the UI.
│   ├── db/           # Database connection and queries.
│   ├── hooks/        # Custom React hooks.
│   ├── lib/          # Helper functions and utilities.
│   ├── schema/       # Validation schemas.
│   ├── types/        # TypeScript type definitions.
│   └── utils/        # Utility functions (e.g., file uploads).
├── tailwind.config.ts # Tailwind CSS configuration.
├── next.config.ts     # Next.js configuration.
├── tsconfig.json      # TypeScript configuration.
└── package.json       # Project dependencies and scripts.
```

---

## Package Details

```json
"dependencies": {
    "@hookform/resolvers": "^3.9.1",
    "@radix-ui/react-avatar": "^1.1.1",
    "@radix-ui/react-checkbox": "^1.1.3",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.3",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-popover": "^1.1.4",
    "@radix-ui/react-radio-group": "^1.2.2",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.6",
    "@uploadthing/react": "^7.1.2",
    "axios": "^1.7.8",
    "bcryptjs": "^2.4.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "embla-carousel-react": "^8.5.1",
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.462.0",
    "mongoose": "^8.8.3",
    "next": "15.0.4-canary.34",
    "next-auth": "5.0.0-beta.25",
    "next-themes": "^0.4.3",
    "novel": "^0.5.0",
    "react": "19.0.0-rc-66855b96-20241106",
    "react-dom": "19.0.0-rc-66855b96-20241106",
    "react-hook-form": "^7.53.2",
    "sonner": "^1.7.0",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "uploadthing": "^7.4.0",
    "zod": "^3.23.8"
  },
```

---

## License

This project is licensed under **Asif Anjum**.

---

## Contact

For inquiries, please email [asif.anjum.rabi@gmail.com](mailto:asif.anjum.rabi@gmail.com).
