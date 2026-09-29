import type { IconName } from "./types";

export const ires = {
  name: "iRES",
  fullName: "Intelligent Response & Emergency Service",
  descriptor: "24/7 Cyber Incident Response Centre",
  quote: "When every second matters, organizations need immediate access to trusted cybersecurity expertise.",
  overview:
    "iRES is CEDELA's flagship cybersecurity platform. It gives organizations immediate access to professional cyber incident response through a centralised, always-available incident management capability, so you can respond rapidly while minimising operational disruption and business impact.",
  audiences: [
    "Government institutions",
    "Financial institutions",
    "Critical infrastructure providers",
    "Healthcare organizations",
    "Telecommunications companies",
    "Educational institutions",
    "Private enterprises",
  ],
  capabilities: [
    { title: "24/7 emergency hotline", icon: "siren" as IconName, body: "Speak to an incident handler at any hour, every day of the year." },
    { title: "Incident reporting portal", icon: "layout" as IconName, body: "Report incidents securely and track progress in real time." },
    { title: "Rapid triage", icon: "gauge" as IconName, body: "Every report is assessed and classified within the target response window." },
    { title: "Ransomware response", icon: "lock" as IconName, body: "Containment, negotiation guidance and recovery coordination for ransomware events." },
    { title: "Digital forensics coordination", icon: "fingerprint" as IconName, body: "Evidence preservation and investigation with a defensible chain of custody." },
    { title: "Threat intelligence", icon: "eye" as IconName, body: "Context on attackers, indicators and techniques relevant to your incident." },
    { title: "Malware analysis", icon: "search" as IconName, body: "Reverse engineering and behavioural analysis of malicious code." },
    { title: "Executive situation reporting", icon: "bar-chart" as IconName, body: "Clear, regular briefings for boards and leadership during an incident." },
    { title: "Crisis communication support", icon: "megaphone" as IconName, body: "Guidance on messaging to staff, customers, media and partners." },
    { title: "Regulatory notification support", icon: "scale" as IconName, body: "Help meeting breach notification duties to regulators and data subjects." },
    { title: "Recovery coordination", icon: "refresh" as IconName, body: "Safe restoration of systems and services with validation." },
    { title: "Lessons learned reporting", icon: "book" as IconName, body: "Post-incident reviews that strengthen your defences." },
  ],
  workflow: [
    { step: "Detect", body: "A suspicious event is identified by your team, tools or our SOC." },
    { step: "Report", body: "The incident is reported through the hotline or secure portal." },
    { step: "Triage", body: "Rapid assessment within the target response window." },
    { step: "Assess", body: "Technical assessment establishes scope and impact." },
    { step: "Classify", body: "Severity and priority are assigned, and stakeholders notified." },
    { step: "Contain", body: "Actions to stop the spread and limit damage." },
    { step: "Eradicate", body: "Root cause removed and attacker access closed." },
    { step: "Recover", body: "Systems restored safely and monitored closely." },
    { step: "Review", body: "Post-incident review and improvement plan." },
  ],
  aiWorkflows: [
    "Automated enrichment of indicators from threat intelligence sources",
    "AI-assisted triage and severity scoring to prioritise response",
    "Pattern detection across incidents to spot coordinated campaigns",
    "Draft executive summaries and timelines for faster reporting",
  ],
  packages: [
    {
      name: "Essential",
      tagline: "For organizations building their first response capability",
      features: ["24/7 hotline access", "Incident reporting portal", "Remote triage and guidance", "Quarterly threat briefing", "Incident response plan template"],
    },
    {
      name: "Professional",
      tagline: "For organizations that need guaranteed expert response",
      featured: true,
      features: ["Everything in Essential", "Retained incident response hours", "Priority response window", "Digital forensics coordination", "Annual tabletop exercise", "Regulatory notification support"],
    },
    {
      name: "Enterprise",
      tagline: "For critical infrastructure and regulated institutions",
      features: ["Everything in Professional", "Dedicated incident manager", "On-site response support", "Integration with SOC as a Service", "Executive crisis simulation", "Custom playbooks and reporting"],
    },
  ],
  emergencyGuidance: [
    { title: "Do not power off affected systems", body: "Isolate them from the network instead. Powering off can destroy valuable evidence held in memory." },
    { title: "Disconnect, do not delete", body: "Remove network cables or disable Wi-Fi on affected devices. Do not delete files or reinstall software." },
    { title: "Preserve evidence", body: "Keep logs, ransom notes, suspicious emails and screenshots. Note the time you noticed each event." },
    { title: "Use a separate channel", body: "Assume email and chat may be compromised. Coordinate by phone or a trusted out-of-band channel." },
    { title: "Do not pay or engage", body: "Do not contact attackers or pay any ransom before speaking with incident responders." },
    { title: "Call iRES", body: "Report the incident as early as possible. Early response reduces impact and recovery time." },
  ],
};

export const incidentTypes = [
  "Ransomware",
  "Phishing or business email compromise",
  "Data breach or data leak",
  "Malware infection",
  "Account compromise",
  "Denial of service",
  "Insider threat",
  "Fraud or financial loss",
  "Website defacement",
  "Other or not sure",
];
