import type { Stage } from "./ProcessPhase";

export const RESEARCH_INTRO = [
  "We began by deeply analyzing the product's functionality and understanding how users interacted with it. This involved reviewing technical specifications and user documentation, performing a UX evaluation to uncover problem areas, and reorganizing the platform's structure for clarity.",
  "To create a more intuitive experience, we mapped user journeys to simplify complex tasks. Key features were then prioritized to ensure the solution was practical, user-centered, and effective in addressing the product's core challenges.",
];

export const RESEARCH_INTRO_IMAGES = ["research-1a.png.webp", "research-1b.png.webp"];

export const RESEARCH_STAGES: Stage[] = [
  {
    label: "Stage 1",
    title: "Documentation analysis",
    paragraphs: [
      "Our research began with a thorough review of the product's documentation to gain a holistic understanding of its functionality. Designers concentrated on user-facing materials like manuals and guides to identify how the product was designed to be used. They also tested the product themselves, adopting a user-first perspective to uncover challenges and usability issues.",
      "At the same time, developers analyzed the backend documentation to assess the technical structure and limitations of the platform. This combined approach allowed us to align user experience improvements with technical capabilities, ensuring a practical and well-rounded solution.",
    ],
  },
  {
    label: "Stage 2",
    title: "Competitor analisys",
    paragraphs: [
      "We conducted an in-depth competitive analysis of four key players in the industry to evaluate their strengths, weaknesses, and market positioning. This involved assessing their features, usability, and strategic approaches to highlight what delivered tangible business value and met user needs.",
      "This detailed analysis of competitors provided valuable benchmarks and identified gaps in the market, enabling us to craft a more targeted, user-focused, and competitive strategy for the platform.",
    ],
    images: ["research-2a.png.webp", "research-2b.png.webp"],
  },
  {
    label: "Stage 3",
    title: "UX audit",
    paragraphs: ["During the UX audit, we conducted a comprehensive evaluation of the platform, focusing on user experience and usability. Our analysis included the following:"],
    bullets: [
      "Reviewed all user flows and compared them against industry-standard UX practices and Nielsen's heuristics.",
      "Incorporated client feedback to identify key usability challenges reducing product efficiency.",
      "Designed tailored user flows for each platform role – teachers, students, administrators, and parents – to address their unique needs.",
      "Proposed hypotheses for feature enhancements and design improvements to increase platform value.",
      "Assessed UI quality, addressing both visual and functional limitations to ensure a consistent and effective user experience across all roles.",
    ],
    images: ["research-3.png.webp"],
  },
  {
    label: "Stage 4",
    title: "Consult (BA)",
    paragraphs: [
      "The business analysis phase focused on defining the platform's functionality through user stories and detailed documentation. This included analyzing the subject area, identifying challenges, and providing actionable solutions. A prioritized feature list ensured enhancements addressed critical needs while aligning with the client's long-term goals.",
      "Key modules included an enrolment system (applications, payment gateways, invoicing), an online lessons tool (scheduling, attendance, recordings), and course pages for organizing content efficiently. Essential features like assessment tools (homework, gradebooks) and communication modules (messaging, notifications) were also prioritized. A centralized dashboard was proposed to unify tasks, analytics, and navigation, laying the groundwork for immediate goals and future scalability.",
    ],
  },
  {
    label: "Stage 5",
    title: "Informational architecture",
    paragraphs: [
      "Using insights from the UX audit, business analysis, and client discussions, we initiated the development of a refreshed information architecture for the product. This restructured framework addressed existing issues while seamlessly incorporating and organizing new features. The architecture was designed to accommodate all platform roles—teachers, students, administrators, and parents—ensuring that each user group had a tailored, intuitive experience.",
      "We focused on creating a logical and user-friendly structure that improved usability and streamlined the overall user experience for everyone involved.",
    ],
    images: ["research-4.png.webp"],
  },
];

export const DESIGN_INTRO = [
  "We transformed the analysis results into a user-friendly interface, adhering to usability standards and addressing user needs. Wireframes played a key role in bridging the updated information architecture with the live product, helping to visualize elements and refine user flows.",
  "This clarified the design vision early on, streamlining development and ensuring an efficient, high-quality, user-centered solution.",
];

export const DESIGN_STAGES: Stage[] = [
  {
    label: "Stage 1",
    title: "Wireframes",
    paragraphs: [
      "We developed wireframes, essential for refining the design structure and optimizing the user journey prior to finalizing the mockup.",
      "This phase allowed us to establish the logic and framework of the future platform. Prototypes were created and validated for each user flow, considering all screen states, determining the layout and container sizes for visuals, and ensuring each interaction was intuitive and user-friendly.",
    ],
    images: ["design-1.png.webp"],
  },
  {
    label: "Stage 2",
    title: "Design direction",
    paragraphs: [
      "Before developing the design concept, we created several mood boards to define the visual direction. Once the client selected their preferred style, we began working on design concepts.",
      "To speed up the process, the client requested that design and development run in parallel. To meet this need, we proposed using the Cabana design library, which helped us move faster while keeping the design consistent and developer-friendly. Designers worked with ready-made components, and developers used pre-built elements that aligned with the visual direction.",
      "Thanks to this setup, we were able to quickly present three design concepts, giving the client options and flexibility to choose the best fit for their goals.",
    ],
    images: ["design-2.png.webp"],
  },
  {
    label: "Stage 3",
    title: "Product UI design",
    paragraphs: [
      "With the design direction established, we created interface layouts for all key screens, carefully accounting for edge cases and diverse workflows. The goal was to ensure smooth user interactions while managing the platform's inherent complexities.",
      "Throughout the process, we worked closely with developers to align design ideas with technical constraints identified earlier. Some solutions required adjustments to fit within backend limitations, but constant collaboration allowed us to adapt creatively while ensuring the final designs were both functional and visually appealing.",
    ],
    images: ["design-3a.png.webp", "design-3b.png.webp", "design-3c.png.webp"],
  },
  {
    label: "Stage 4",
    title: "Design system",
    paragraphs: [
      "While working on the design system, our designers simultaneously refined and expanded an existing design system, documenting updates and ensuring a cohesive workflow. Though this initial phase required extra time, it significantly boosted efficiency in later stages. For instance, tasks that would typically take over a month were ready for development within weeks.",
      "Building on the foundation of the existing design system, the team enhanced its flexibility by introducing improvements to make it more adaptable to diverse use cases. These enhancements were carefully reviewed and discussed with the development team to ensure seamless integration. This collaborative approach not only streamlined the handoff process but also optimized the overall design-to-development workflow, resulting in faster and more efficient execution.",
    ],
    images: ["design-4a.png.webp", "design-4b.png.webp", "design-4c.png.webp"],
  },
];

export const DEVELOPMENT_INTRO = [
  "The development phase of Qurtuba prioritized precision, collaboration, and scalability. We undertook a comprehensive analysis of outdated API documentation and built a high-performance, accessible frontend using TypeScript and a range of libraries, including React, Vite, MUI, and Redux. This approach ensured the product's reliability and longevity.",
  "By integrating tools like Swagger and pgAdmin, we facilitated seamless interactions between the frontend and backend, which utilized Nest JS, TypeORM, and Axios. We also employed Recharts to create interactive visualizations of complex data. Challenges such as backend limitations and design adjustments were tackled with flexibility and innovative solutions, aligning the final product with both technical and design requirements.",
];

export const DEVELOPMENT_INTRO_IMAGES = ["dev-1.png.webp"];

export const DEVELOPMENT_STAGES: Stage[] = [
  {
    label: "Stage 1",
    title: "APIs & back-end analysis",
    paragraphs: [
      "At the outset of the development process, we faced significant difficulties due to the presence of outdated and incomplete API documentation. The current Redoc materials were inconsistent because the client did not have the capacity to keep them current. As a result, our developers had to go beyond the provided resources, manually exploring API endpoints to truly grasp the system's functionalities and its interdependencies.",
      "The project's business logic was quite complex, featuring intricate connections among various API services. This complexity necessitated thorough investigation and practical testing to accurately chart how these services interacted. Fully understanding these relationships was crucial for creating effective frontend components and ensuring that new features, like the questionnaire builder, would integrate seamlessly into the existing backend framework.",
    ],
    images: ["dev-2a.png.webp", "dev-2b.png.webp"],
  },
  {
    label: "Stage 2",
    title: "Front-end development",
    paragraphs: [
      "As part of the project to develop an educational platform for students, teachers, administrators, and parents, an end-to-end system was implemented to support the entire lifecycle of interactions and management of the learning process. The platform includes functionality for education, assessment, progress tracking, communication between participants, and efficient management of administrative tasks.",
      "To create a flexible and user-friendly system, modern technologies and tools were used:",
    ],
    bullets: [
      "React & Vite – Providing a dynamic and high-performance interface.",
      "MUI – Enabling quick development of styled components.",
      "Redux & RTK Query – Managing application state and handling efficient data exchange.",
      "i18next – Supporting multilingual functionality for a global audience.",
      "react-quill – Enabling rich text content editing for seamless user interaction.",
    ],
    images: ["dev-3.png.webp"],
  },
  {
    label: "Stage 3",
    title: "Back-end development",
    paragraphs: ["The backend was designed for scalability, security, and efficient data management using:"],
    bullets: [
      "NestJS & TypeORM – Structuring the backend with a scalable architecture and optimized database interactions.",
      "Axios – Facilitating smooth and reliable data exchange between the client and server.",
      "Firebase – Handling authentication and real-time features.",
      "Crypto-js – Enhancing security and data protection.",
      "Fullcalendar – Integrating event management functionality.",
      "date-fns – Simplifying date and time operations.",
      "Formik & Yup – Ensuring smooth form validation and management.",
      "Docker – Providing containerization for a stable development and deployment process.",
      "Additionally, the backend is integrated with external systems, such as calendars, communication tools for teachers and parents, and student performance tracking systems, making the platform a comprehensive solution for educational management.",
    ],
    images: ["dev-4.png.webp"],
  },
];
