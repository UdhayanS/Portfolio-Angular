/**
 * Single source of truth for every word on the site.
 * Components read from here — edit copy without touching templates.
 */

export interface Quote {
  text: string;
  author: string;
  note?: string;
}

export interface Sticker {
  id: string;
  title: string;
  sub?: string;
  colour: string; // CSS custom-property name, e.g. 'teal'
  shape: 'card' | 'disc';
  /** Placement on the collage stage, in % of the stage box. */
  x: number;
  y: number;
  tilt: number;
  /** Depth plane in px. Negative sits behind the portrait. */
  depth: number;
  drift: number;
  icon: string;
  /** Text that orbits the badge, for `disc` stickers. */
  ring?: string;
}

export interface Role {
  company: string;
  title: string;
  period: string;
  location: string;
  current?: boolean;
  points: string[];
  stack: string[];
}

export type ProjectKind = 'product' | 'client' | 'open-source';

export interface Project {
  name: string;
  kind: ProjectKind;
  tagline: string;
  blurb: string;
  role: string;
  year: string;
  stack: string[];
  href?: string;
  repo?: string;
  hrefLabel?: string;
  accent: string;
  metrics?: { label: string; value: string }[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Service {
  n: string;
  title: string;
  blurb: string;
  bullets: string[];
  accent: string;
}

export const PROFILE = {
  name: 'Udhayan S',
  initials: 'US',
  role: 'Software Engineer',
  secondRole: 'Product Builder',
  location: 'Chennai, India',
  timezone: 'IST · UTC+5:30',
  email: 'sudhayan2@gmail.com',
  phone: '+91 99447 63361',
  resume: '/Udhayan-S-Resume.pdf',
  socials: [
    {
      label: 'GitHub',
      icon: 'github',
      href: 'https://github.com/UdhayanS',
      handle: '@UdhayanS',
    },
    {
      label: 'LinkedIn',
      icon: 'linkedin',
      href: 'https://www.linkedin.com/in/Udhayan-sk7',
      handle: '/in/Udhayan-sk7',
    },
    {
      label: 'Email',
      icon: 'mail',
      href: 'mailto:sudhayan2@gmail.com',
      handle: 'sudhayan2@gmail.com',
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const HERO = {
  headline: 'Software Engineer',
  headlineAlt: 'Product Builder',
  /** Left column — what I'm doing now. */
  now: `I'm building RapidHR at Rapiddata Technologies in Chennai — an enterprise HR platform
        running employee, attendance, leave and payroll for multiple client organisations on
        ASP.NET Core, Angular and SQL Server.`,
  /** Right column — the wider picture. */
  wide: `Outside the day job I run two live SaaS products and have shipped four client sites
         across India, the UAE and Saudi Arabia — including the SEO, DNS and mail routing that
         make them findable.`,
  cta: 'Get in touch',
  portraitAlt: 'Udhayan S, software engineer, Chennai',
} as const;

export const STICKERS: Sticker[] = [
  {
    id: 'seo',
    title: 'SEO\nSpecialist',
    sub: 'Optimising for visibility & reach',
    colour: 'teal',
    shape: 'disc',
    x: 13,
    y: 12,
    tilt: -6,
    depth: 120,
    drift: 1.5,
    icon: 'search',
    ring: 'SCHEMA · SITEMAPS · VITALS · INDEXING · ',
  },
  {
    id: 'domain',
    title: 'Custom Domain\nHandling',
    sub: 'DNS, SSL & mail routing, end to end',
    colour: 'pink',
    shape: 'card',
    x: 68,
    y: 13,
    tilt: 4,
    depth: 100,
    drift: 1.3,
    icon: 'globe',
  },
  {
    id: 'hrms',
    title: 'HRMS\nExpert',
    sub: 'Architecting human capital systems',
    colour: 'amber',
    shape: 'card',
    x: 5,
    y: 43,
    tilt: -4,
    depth: 80,
    drift: 1.15,
    icon: 'org',
  },
  {
    id: 'api',
    title: 'API\nArchitect',
    sub: 'Clean architecture, REST by contract',
    colour: 'cyan',
    shape: 'card',
    x: 79,
    y: 45,
    tilt: 6,
    depth: 90,
    drift: 1.25,
    icon: 'api',
  },
  {
    id: 'branding',
    title: 'Branding &\nIdentity',
    sub: "© '26",
    colour: 'orange',
    shape: 'card',
    x: 10,
    y: 68,
    tilt: -9,
    depth: 140,
    drift: 1.6,
    icon: 'spark',
  },
  {
    id: 'cd',
    title: 'Continuous\nDelivery',
    sub: 'CI/CD · Deploy · Validate',
    colour: 'lime',
    shape: 'disc',
    x: 71,
    y: 68,
    tilt: 0,
    depth: 130,
    drift: 1.45,
    icon: 'cycle',
    ring: 'CI/CD · DEPLOY · VALIDATE · RELEASE · ',
  },
];

export const MARQUEE: string[] = [
  'ASP.NET Core',
  'Angular',
  'SQL Server',
  'C#',
  'TypeScript',
  'REST APIs',
  'Clean Architecture',
  'Technical SEO',
  'DNS & Mail',
  'Docker',
  'Spring Boot',
  'RxJS',
];

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

export const STATS = [
  { value: '1+', label: 'Year shipping enterprise software', accent: 'teal' },
  { value: '2', label: 'Live SaaS products of my own', accent: 'pink' },
  { value: '4', label: 'Client sites live in 3 countries', accent: 'amber' },
  { value: '8.7', label: 'CGPA, B.E. Computer Science', accent: 'cyan' },
] as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  kicker: 'About',
  headline: 'I build things that go live.',
  body: [
    `I started as an intern at Rapiddata Technologies in 2024 and was promoted to full-time
     software engineer — the same year I started publishing my own products. That combination is
     the whole point of this page: I do the unglamorous enterprise work properly, and I still ship
     side projects that real people use.`,
    `Day to day that means C# and ASP.NET Core on the back end, Angular and RxJS on the front,
     and SQL Server underneath — designing REST contracts, tuning stored procedures, and keeping
     the architecture clean enough that the next person can read it.`,
    `The part most engineers skip is the part I like. Getting a site live means owning the domain,
     the DNS records, the SSL, the mail deliverability and the search visibility. I've done that
     end to end for four client businesses across Chennai, Dubai and Dammam.`,
  ],
  facts: [
    { k: 'Based in', v: 'Chennai, India' },
    { k: 'Currently', v: 'Software Engineer, Rapiddata Technologies' },
    { k: 'Studying', v: 'B.E. CSE, Dr. Mahalingam College of Engineering & Technology' },
    { k: 'Graduating', v: '2026' },
    { k: 'Open to', v: 'Full-time roles & freelance builds' },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const SKILLS: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['C#', 'TypeScript', 'JavaScript', 'SQL', 'Java', 'HTML', 'CSS'],
  },
  {
    label: 'Backend',
    items: [
      'ASP.NET Core',
      'Entity Framework Core',
      'LINQ',
      'REST APIs',
      'Spring Boot',
      'Microservices',
    ],
  },
  {
    label: 'Frontend',
    items: ['Angular', 'RxJS', 'Signals', 'Bootstrap', 'Responsive Design', 'React'],
  },
  {
    label: 'Data',
    items: [
      'SQL Server',
      'Stored Procedures',
      'Query Optimisation',
      'MySQL',
      'Database Design',
    ],
  },
  {
    label: 'DevOps & Tools',
    items: ['Git', 'GitHub', 'Docker', 'Postman', 'Swagger', 'SonarQube', 'Netlify', 'IIS'],
  },
  {
    label: 'Growth',
    items: [
      'Technical SEO',
      'Schema.org',
      'Core Web Vitals',
      'DNS',
      'SPF / DKIM / DMARC',
      'Google Search Console',
    ],
  },
  {
    label: 'Foundations',
    items: [
      'Data Structures',
      'Algorithms',
      'OOP',
      'Design Patterns',
      'Clean Architecture',
      'System Design',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const ROLES: Role[] = [
  {
    company: 'Rapiddata Technologies',
    title: 'Software Engineer',
    period: 'Jun 2025 — Present',
    location: 'Chennai, India',
    current: true,
    points: [
      'Ship features for RapidHR, an enterprise HR platform, across the employee, attendance, leave and payroll modules.',
      'Design REST APIs and optimise SQL Server stored procedures, delivering Angular interfaces that follow clean architecture and the team coding standards.',
      'Deploy and maintain builds on client and production servers — releases, configuration and post-deployment validation.',
      'Promoted from intern to full-time engineer.',
    ],
    stack: ['ASP.NET Core', 'Angular', 'SQL Server', 'EF Core', 'Git'],
  },
  {
    company: 'Shanmuga Technovative Solutions',
    title: 'Software Developer Intern',
    period: 'Apr 2024 — Jul 2024',
    location: 'Coimbatore, India',
    points: [
      'Built a parking management application with Java, Spring Boot and MySQL, implementing REST APIs for spot reservation, booking and slot management.',
      'Containerised the application with Docker for consistent local and deployment environments.',
    ],
    stack: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
  },
];

export const EDUCATION = {
  school: 'Dr. Mahalingam College of Engineering and Technology',
  degree: 'B.E. Computer Science and Engineering',
  period: '2022 — 2026',
  location: 'Coimbatore, India',
  detail: 'CGPA 8.7 / 10',
} as const;

/* ------------------------------------------------------------------ */
/* Work                                                                */
/* ------------------------------------------------------------------ */

export const PROJECTS: Project[] = [
  {
    name: 'RapidHR',
    kind: 'product',
    tagline: 'Enterprise HR, end to end',
    blurb: `A multi-tenant HR management platform serving several client organisations — employee
            records, attendance processing, leave management and payroll in one system. I work
            across the API layer, the Angular front end and the SQL Server procedures behind it,
            and we've folded AI-assisted features into the workflows to cut repetitive HR admin.`,
    role: 'Software Engineer @ Rapiddata',
    year: '2025 — now',
    stack: ['ASP.NET Core', 'Angular', 'SQL Server', 'EF Core'],
    accent: 'teal',
    metrics: [
      { label: 'Modules', value: '4' },
      { label: 'Tenancy', value: 'Multi-org' },
    ],
  },
  {
    name: 'MakePortfolio',
    kind: 'product',
    tagline: 'Build a portfolio that gets you hired',
    blurb: `A self-service product that lets anyone create and publish a personal portfolio site
            from customisable templates. Template-driven Angular front end, ASP.NET Core and
            SQL Server behind it, with live preview and one-click publishing.`,
    role: 'Founder & sole engineer',
    year: '2025',
    stack: ['Angular', 'ASP.NET Core', 'SQL Server'],
    href: 'https://makeportfolio.online/',
    hrefLabel: 'makeportfolio.online',
    accent: 'pink',
    metrics: [
      { label: 'Status', value: 'Live' },
      { label: 'Publish', value: '1 click' },
    ],
  },
  {
    name: 'VetriJobs',
    kind: 'product',
    tagline: 'Find your dream job',
    blurb: `A job discovery platform connecting candidates to openings, built and shipped solo on
            a custom domain — including the search-visibility work, DNS and mail configuration
            that a job board lives or dies by.`,
    role: 'Founder & sole engineer',
    year: '2026',
    stack: ['Angular', 'TypeScript', 'ASP.NET Core'],
    href: 'https://vetrijobs.online/',
    hrefLabel: 'vetrijobs.online',
    accent: 'amber',
    metrics: [
      { label: 'Status', value: 'Live' },
      { label: 'Domain', value: 'Custom' },
    ],
  },

  /* ---- Open source ---- */
  {
    name: 'Dev Palette',
    kind: 'open-source',
    tagline: 'Colour palettes without leaving VS Code',
    blurb: `A VS Code extension that lets developers create, discover and manage colour palettes
            directly inside the editor — with a colour extractor and live theme preview.`,
    role: 'Author',
    year: '2026',
    stack: ['TypeScript', 'VS Code API'],
    repo: 'https://github.com/UdhayanS/Dev-Palette',
    accent: 'violet',
  },
  {
    name: 'Mendix Gemini ChatBot',
    kind: 'open-source',
    tagline: 'Conversational AI as a low-code widget',
    blurb: `A pluggable chatbot widget for Mendix Studio Pro 10+, wired to Google's Gemini API so
            low-code teams get conversational support without building an integration. Published
            with a demo project on the Mendix marketplace.`,
    role: 'Author',
    year: '2026',
    stack: ['TypeScript', 'Mendix', 'Gemini API'],
    repo: 'https://github.com/UdhayanS/Mendix-Gemini-ChatBot-Widget',
    accent: 'cyan',
  },
  {
    name: 'Quick Park Assist',
    kind: 'open-source',
    tagline: 'Real-time parking, reserved ahead',
    blurb: `Drivers find and reserve parking in real time; owners list EV and standard spaces for
            rent. Java and Spring Boot with a Maven build, Dockerised, and wired to SonarQube for
            continuous quality analysis.`,
    role: 'Developer',
    year: '2024',
    stack: ['Java', 'Spring Boot', 'MySQL', 'Docker', 'SonarQube'],
    repo: 'https://github.com/UdhayanS/quick-park-assist-fork',
    accent: 'lime',
  },
  {
    name: 'React Netflix Clone',
    kind: 'open-source',
    tagline: 'Streaming UI, rebuilt from scratch',
    blurb: `A faithful rebuild of the Netflix browse experience in React — row carousels, hover
            previews and a responsive billboard hero — as a study in component composition and
            state.`,
    role: 'Developer',
    year: '2025',
    stack: ['React', 'JavaScript', 'TMDB API'],
    repo: 'https://github.com/UdhayanS/React-Netflix-Clone',
    accent: 'pink',
  },
  {
    name: 'DigiFest',
    kind: 'open-source',
    tagline: 'A college fest, on the web',
    blurb: `An events site for a college technical festival — schedule, event pages and
            registration flow, hand-built with vanilla HTML, CSS and JavaScript.`,
    role: 'Developer',
    year: '2024',
    stack: ['HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/UdhayanS/DigiFest',
    accent: 'orange',
  },

  /* ---- Client work ---- */
  {
    name: 'JBAM Group',
    kind: 'client',
    tagline: 'Connecting the world',
    blurb: `Corporate site for a Saudi logistics group handling general land transport, heavy-lift
            project cargo, renewable-energy logistics for wind farms and equipment rental. Built,
            deployed and configured on their custom domain with business mail.`,
    role: 'Design, build, domain & mail',
    year: '2026',
    stack: ['HTML', 'CSS', 'JavaScript', 'SEO', 'DNS'],
    href: 'https://jbamgroup.com/',
    hrefLabel: 'jbamgroup.com',
    accent: 'cyan',
  },
  {
    name: 'Velumaya Logistics',
    kind: 'client',
    tagline: 'Logistics & manpower, Dubai',
    blurb: `Site for a UAE company offering end-to-end logistics support, transport coordination,
            supply-chain management and skilled workforce solutions — with the search-visibility
            and mail setup handled alongside the build.`,
    role: 'Design, build, domain & mail',
    year: '2026',
    stack: ['HTML', 'CSS', 'JavaScript', 'SEO', 'DNS'],
    href: 'https://velumaya.com/',
    hrefLabel: 'velumaya.com',
    accent: 'teal',
  },
  {
    name: 'MAT Arab Contracting',
    kind: 'client',
    tagline: "Engineering the Kingdom's industrial future",
    blurb: `Corporate site for a Dammam-based contracting and technical services firm, shipped on
            a CDN-backed static host for fast loads across the Gulf.`,
    role: 'Design, build & deploy',
    year: '2026',
    stack: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    href: 'https://mat-arab.netlify.app/',
    hrefLabel: 'mat-arab.netlify.app',
    accent: 'amber',
  },
  {
    name: 'Arthi Lamaze Class',
    kind: 'client',
    tagline: 'Prenatal education, online',
    blurb: `Site for a childbirth and prenatal education practice — class information, enquiry
            flow and a custom domain with business email configured end to end.`,
    role: 'Design, build, domain & mail',
    year: '2026',
    stack: ['HTML', 'CSS', 'JavaScript', 'SEO', 'DNS'],
    href: 'https://www.arthilamazeclass.com/',
    hrefLabel: 'arthilamazeclass.com',
    accent: 'violet',
  },
];

export const PROJECT_FILTERS: { key: ProjectKind | 'all'; label: string }[] = [
  { key: 'all', label: 'Everything' },
  { key: 'product', label: 'Products' },
  { key: 'client', label: 'Client work' },
  { key: 'open-source', label: 'Open source' },
];

/* ------------------------------------------------------------------ */
/* Services — the SEO / domain / mail specialism                       */
/* ------------------------------------------------------------------ */

export const SERVICES: Service[] = [
  {
    n: '01',
    title: 'Technical SEO',
    blurb: `Getting a site indexed, understood and ranked — not by stuffing keywords, but by
            fixing what crawlers actually read.`,
    bullets: [
      'Schema.org / JSON-LD structured data',
      'Sitemaps, robots.txt and canonical strategy',
      'Core Web Vitals — LCP, CLS, INP',
      'Search Console setup and index diagnostics',
      'Server-side rendering and prerendering',
    ],
    accent: 'teal',
  },
  {
    n: '02',
    title: 'Custom domains & DNS',
    blurb: `Owning the whole path from registrar to browser padlock, so a site launches on the
            client's own name without a broken week in between.`,
    bullets: [
      'Registrar transfer and nameserver delegation',
      'A, AAAA, CNAME, ALIAS and TXT records',
      'SSL/TLS provisioning and forced HTTPS',
      'www / apex redirect strategy',
      'Zero-downtime cutover from an old host',
    ],
    accent: 'pink',
  },
  {
    n: '03',
    title: 'Business email',
    blurb: `Mail on the company domain that actually reaches the inbox — the part that quietly
            breaks most small-business launches.`,
    bullets: [
      'Google Workspace / Zoho Mail provisioning',
      'MX record configuration and priority',
      'SPF, DKIM and DMARC authentication',
      'Deliverability testing and spam-score fixes',
      'Aliases, groups and catch-all routing',
    ],
    accent: 'amber',
  },
  {
    n: '04',
    title: 'Ship & maintain',
    blurb: `The site is not done when the code is done. Deployment, monitoring and the boring
            follow-through are part of the job.`,
    bullets: [
      'Netlify, IIS and client-server deployment',
      'CI/CD pipelines and release validation',
      'Analytics and event tracking',
      'Post-launch performance tuning',
      'Ongoing content and feature updates',
    ],
    accent: 'lime',
  },
];

/* ------------------------------------------------------------------ */
/* Achievements                                                        */
/* ------------------------------------------------------------------ */

export const ACHIEVEMENTS = [
  {
    title: '5★ Java on HackerRank',
    detail: 'Top rating band for Java problem solving.',
    accent: 'lime',
  },
  {
    title: '1st place × 4+',
    detail: 'Coding competitions and paper presentations.',
    accent: 'pink',
  },
  {
    title: '4+ national hackathons',
    detail: 'Built and pitched under deadline, repeatedly.',
    accent: 'cyan',
  },
  {
    title: 'Intern → Engineer',
    detail: 'Promoted to full-time at Rapiddata Technologies.',
    accent: 'amber',
  },
] as const;

export const CERTIFICATIONS = [
  { name: 'Programming in Java', issuer: 'NPTEL · IIT Kharagpur' },
  { name: 'Rapid Mendix Developer', issuer: 'Mendix' },
  { name: 'Spring Boot & Hibernate', issuer: 'Udemy' },
  { name: 'React.js Front-End Development', issuer: 'Udemy' },
  { name: 'Introduction to IoT', issuer: 'Cisco' },
] as const;

/* ------------------------------------------------------------------ */
/* Quotes — one per section boundary                                   */
/* ------------------------------------------------------------------ */

export const QUOTES: Record<string, Quote> = {
  hero: {
    text: 'Enterprise HR by day. Two live products by night. Same standard of care.',
    author: 'Udhayan S',
  },
  about: {
    text: 'Programs must be written for people to read, and only incidentally for machines to execute.',
    author: 'Abelson & Sussman',
    note: 'Structure and Interpretation of Computer Programs',
  },
  skills: {
    text: 'Simplicity is a great virtue but it requires hard work to achieve it.',
    author: 'Edsger W. Dijkstra',
  },
  experience: {
    text: 'Make it work, make it right, make it fast.',
    author: 'Kent Beck',
  },
  work: {
    text: 'Real artists ship.',
    author: 'Steve Jobs',
  },
  services: {
    text: 'The best place to hide a dead body is page two of Google.',
    author: 'Search engine folklore',
    note: 'Which is why the technical work matters',
  },
  achievements: {
    text: "Amateurs practise until they get it right. Professionals practise until they can't get it wrong.",
    author: 'Attributed to Julie Andrews',
  },
  contact: {
    text: 'The best time to plant a tree was twenty years ago. The second best time is now.',
    author: 'Proverb',
  },
};

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  kicker: 'Contact',
  headline: "Let's build\nsomething live.",
  body: `Hiring, freelancing or just want a domain untangled — I read everything and reply within
         a day. Chennai-based, comfortable working across time zones.`,
  availability: 'Open to full-time roles & freelance builds',
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
] as const;
