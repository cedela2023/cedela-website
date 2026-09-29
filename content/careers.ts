import type { Vacancy } from "./types";

/**
 * No roles are published by default. Vacancies are managed in Sanity
 * (Careers > Vacancies) and appear on /careers as soon as they are published.
 */
export const seedVacancies: Vacancy[] = [];

export const programmes = [
  {
    title: "Graduate Programme",
    body: "A structured programme for high-potential graduates: an intensive technical bootcamp, rotations across our four practices, and mentorship from experienced consultants.",
    points: ["Rotations across strategy, technology, cybersecurity and learning", "Sponsored professional certifications", "Real client and internal projects", "Dedicated mentor and career plan"],
  },
  {
    title: "Internships",
    body: "Hands-on internships for students and recent graduates who want practical experience in consulting, cybersecurity, software engineering, data or research.",
    points: ["Three to six month placements", "Meaningful project work", "Learning sessions with practitioners", "Pathway to the graduate programme"],
  },
];
