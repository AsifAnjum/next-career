export const active = "active";
export const inactive = "inactive";
export const blocked = "blocked";
export const user = "user";
export const moderator = "moderator";
export const admin = "admin";
export const hr = "hr";
export const author = "author";
export const contentManager = "content-manager";
export const credentials = "credentials";
export const google = "google";
export const draft = "draft";
export const success = "success";
//? job constants
export const fullTime = "full-time";
export const partTime = "part-time";
export const contract = "contract";
export const internship = "internship";
export const temporary = "temporary";
export const remote = "remote";
export const onSite = "onsite";
export const hybrid = "hybrid";
export const expired = "expired";

//? job categories
export const developer = "developer";
export const engineer = "engineer";
export const designer = "designer";
export const marketer = "marketer";
export const manager = "manager";
export const accountant = "accountant";
export const sales = "sales";
export const healthcare = "healthcare";
export const education = "education";
export const customerSupport = "customer-support";
export const logistics = "logistics";
export const consultant = "consultant";
export const analyst = "analyst";
export const writer = "writer";
export const legal = "legal";
export const humanResources = "human-resources";
export const eventPlanning = "event-planning";

//?blog categories
export const technology = "technology";
export const artDesign = "art-design";
export const travel = "travel";
export const photography = "photography";
export const music = "music";
export const books = "books";
export const fitness = "fitness";
export const programming = "programming";

import {
  BadgeDollarSign,
  Book,
  BookOpen,
  Camera,
  Code,
  Cpu,
  Factory,
  Globe,
  Music,
  Omega,
  Palette,
  Slice,
  SquareActivity,
  Settings,
  CalendarPlus,
  FilePenLine,
  CalendarCog,
  FileCog,
  User,
  UserCog,
  MemoryStick,
} from "lucide-react";

export const navItem = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Job",
    url: "/jobs",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blogs",
  },
  {
    id: 4,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 5,
    title: "Sign Up",
    url: "/signup",
    isLoggedIn: false,
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
    isLoggedIn: true,
  },
];

export const jobCategories = [
  {
    id: 1,
    title: "Technology",
    image: <Cpu size={70} />,
    description: "Roles focused on software, hardware, and IT infrastructure.",
    url: `/jobs/?category=${developer},${engineer}`,
  },
  {
    id: 2,
    title: "Business",
    image: <Factory size={70} />,
    description:
      " Jobs focused on strategic planning, team leadership, and organizational growth.",
    url: `/jobs/?category=${manager},${consultant},${analyst},${accountant},${humanResources},${logistics},${legal},${customerSupport}`,
  },
  {
    id: 3,
    title: "Marketing",
    image: <BadgeDollarSign size={70} />,
    description:
      "Positions specializing in promoting products, brands, and organizations.",
    url: `/jobs/?category=${marketer},${sales}`,
  },
  {
    id: 4,
    title: "Design",
    image: <Slice size={70} />,
    description: "Roles centered around creativity and visual communication.",
    url: `/jobs/?category=${designer},${writer},${eventPlanning}`,
  },
  {
    id: 5,
    title: "Education",
    image: <BookOpen size={70} />,
    description: "Careers in teaching, coaching, and learning facilitation.",
    url: `/jobs/?category=${education},${writer}`,
  },
  {
    id: 6,
    title: "Healthcare",
    image: <SquareActivity size={70} />,
    description: "Jobs in medical, health, and pharmaceutical industries",
    url: `/jobs/?category=${healthcare}`,
  },
  {
    id: 7,
    title: "Engineering",
    image: <Omega size={70} />,
    description:
      "Roles focused on designing, building, and maintaining systems.",

    url: `/jobs/?category=${engineer},${developer},${analyst}`,
  },
];

export const blogCategories = [
  {
    id: 1,
    title: "Technology",
    description: "Explore the latest trends in tech and development.",
    icon: <MemoryStick size={70} />,
    url: "/blogs/?category=technology",
  },
  {
    id: 2,
    title: "Art & Design",
    description: "Inspiration and insights from creative industries.",
    icon: <Palette size={70} />,
    url: "/blogs/?category=art-design",
  },
  {
    id: 3,
    title: "Travel",
    description: "Discover new destinations and cultures.",
    icon: <Globe size={70} />,
    url: "/blogs/?category=travel",
  },
  {
    id: 4,
    title: "Photography",
    description: "Capture moments and learn photography tips.",
    icon: <Camera size={70} />,
    url: "/blogs/?category=photography",
  },
  {
    id: 5,
    title: "Music",
    description: "Dive into melodies, beats, and music production.",
    icon: <Music size={70} />,
    url: "/blogs/?category=music",
  },
  {
    id: 6,
    title: "Books",
    description: "Reviews and recommendations for book lovers.",
    icon: <Book size={70} />,
    url: "/blogs/?category=books",
  },
  {
    id: 7,
    title: "Health & Fitness",
    description: "Tips for a healthy lifestyle and fitness routines.",
    icon: <SquareActivity size={70} />,
    url: "/blogs/?category=health-fitness",
  },
  {
    id: 8,
    title: "Programming",
    icon: <Code size={70} />,
    description: "Positions specializing in coding, development, and testing.",
    url: "/blogs/?category=programming",
  },
];

export const dashboardNavigation = [
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
    role: ["all"],
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    role: ["all"],
  },
  {
    title: "Add Job",
    url: "/dashboard/job/add",
    icon: CalendarPlus,
    role: [hr, contentManager, admin, moderator],
  },
  {
    title: "Add Blog",
    url: "/dashboard/blog/add",
    icon: FilePenLine,
    role: [author, contentManager, admin, moderator],
  },
  {
    title: "Manage Jobs",
    url: "/dashboard/job",
    icon: CalendarCog,
    role: [hr, contentManager, admin, moderator],
  },
  {
    title: "Manage Blogs",
    url: "/dashboard/blog",
    icon: FileCog,
    role: [author, contentManager, admin, moderator],
  },
  {
    title: "Manage Users",
    url: "/dashboard/user",
    icon: UserCog,
    role: [admin, moderator],
  },
];
