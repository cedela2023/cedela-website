"use client";

import { incidentTypes } from "@/content/ires";
import { pillars } from "@/content/pillars";
import { Consent, Field, FileInput, RadioGroup, Row, Select, SmartForm, TextArea } from "./form-kit";

const interestOptions = [
  ...pillars.map((p) => p.title),
  "Digital Readiness Assessment",
  "Cyber Maturity Assessment",
  "AI Readiness Assessment",
  "CISO as a Service",
  "SOC as a Service",
  "iRES Incident Response",
  "Executive Strategy Retreat",
  "Something else",
];

export function ContactForm({ defaultType }: { defaultType?: string }) {
  return (
    <SmartForm kind="contact" submitLabel="Send message" successTitle="Message received">
      <Row>
        <Field name="name" label="Full name" required autoComplete="name" />
        <Field name="email" label="Work email" type="email" required autoComplete="email" />
      </Row>
      <Row>
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
        <Field name="organization" label="Organization" autoComplete="organization" />
      </Row>
      <Select
        name="enquiryType"
        label="What is this about?"
        required
        defaultValue={defaultType}
        options={[
          { label: "General enquiry", value: "general" },
          { label: "Business development", value: "business" },
          { label: "Media enquiry", value: "media" },
          { label: "Careers", value: "careers" },
          { label: "Partnerships", value: "partnership" },
          { label: "Investor relations", value: "investor" },
        ]}
      />
      <TextArea name="message" label="How can we help?" required placeholder="Tell us about your organization and what you would like to achieve." />
      <Consent />
    </SmartForm>
  );
}

export function ConsultationForm({ defaultInterest }: { defaultInterest?: string }) {
  return (
    <SmartForm kind="consultation" submitLabel="Request consultation" successTitle="Request received">
      <Row>
        <Field name="name" label="Full name" required autoComplete="name" />
        <Field name="email" label="Work email" type="email" required autoComplete="email" />
      </Row>
      <Row>
        <Field name="phone" label="Phone" type="tel" required autoComplete="tel" />
        <Field name="organization" label="Organization" required autoComplete="organization" />
      </Row>
      <Row>
        <Field name="role" label="Your role" autoComplete="organization-title" />
        <Field name="preferredDate" label="Preferred date" type="date" />
      </Row>
      <Select name="interest" label="Area of interest" required options={interestOptions} defaultValue={defaultInterest && interestOptions.includes(defaultInterest) ? defaultInterest : undefined} />
      <TextArea name="message" label="What would you like to discuss?" required placeholder="Share your objectives, challenges or questions so we can bring the right expert." />
      <Consent />
    </SmartForm>
  );
}

export function PartnershipForm() {
  return (
    <SmartForm kind="partnership" submitLabel="Submit proposal" successTitle="Thank you">
      <Row>
        <Field name="name" label="Full name" required autoComplete="name" />
        <Field name="email" label="Work email" type="email" required autoComplete="email" />
      </Row>
      <Row>
        <Field name="organization" label="Organization" required autoComplete="organization" />
        <Field name="website" label="Website" type="url" placeholder="https://" />
      </Row>
      <Row>
        <Select
          name="partnershipType"
          label="Partnership type"
          required
          options={["Technology alliance", "Academic collaboration", "Professional body", "Government engagement", "Industry association", "Development partner", "Startup or innovation", "Other"]}
        />
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
      </Row>
      <TextArea name="message" label="Tell us about the opportunity" required />
      <Consent />
    </SmartForm>
  );
}

export function InvestorForm() {
  return (
    <SmartForm kind="investor" submitLabel="Request information" successTitle="Request received">
      <Row>
        <Field name="name" label="Full name" required autoComplete="name" />
        <Field name="email" label="Email" type="email" required autoComplete="email" />
      </Row>
      <Row>
        <Field name="organization" label="Organization or fund" required autoComplete="organization" />
        <Select name="investorType" label="I am a" required options={["Strategic investor", "Venture capital", "Private equity", "Development finance institution", "Family office or angel", "Corporate venture", "Other"]} />
      </Row>
      <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
      <TextArea name="message" label="Areas of interest" rows={4} />
      <Consent />
    </SmartForm>
  );
}

export function PortalAccessForm() {
  return (
    <SmartForm kind="portalAccess" submitLabel="Request access" successTitle="Request received">
      <Row>
        <Field name="name" label="Full name" required autoComplete="name" />
        <Field name="email" label="Work email" type="email" required autoComplete="email" />
      </Row>
      <Row>
        <Field name="organization" label="Organization" required autoComplete="organization" />
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
      </Row>
      <TextArea name="message" label="Engagement or project name" rows={3} />
      <Consent />
    </SmartForm>
  );
}

export function DemoForm() {
  return (
    <SmartForm kind="demo" submitLabel="Request a demonstration" successTitle="Demo requested" tone="dark">
      <Row>
        <Field name="name" label="Full name" required autoComplete="name" />
        <Field name="email" label="Work email" type="email" required autoComplete="email" />
      </Row>
      <Row>
        <Field name="phone" label="Phone" type="tel" required autoComplete="tel" />
        <Field name="organization" label="Organization" required autoComplete="organization" />
      </Row>
      <Select name="package" label="Package of interest" options={["Essential", "Professional", "Enterprise", "Not sure yet"]} />
      <TextArea name="message" label="Anything we should know?" rows={3} />
      <Consent />
    </SmartForm>
  );
}

export function PlatformInterestForm({ platforms }: { platforms: string[] }) {
  return (
    <SmartForm kind="platformInterest" submitLabel="Register interest" successTitle="You are on the list">
      <Row>
        <Field name="name" label="Full name" required autoComplete="name" />
        <Field name="email" label="Work email" type="email" required autoComplete="email" />
      </Row>
      <Row>
        <Field name="organization" label="Organization" required autoComplete="organization" />
        <Select name="platform" label="Platform" required options={platforms} />
      </Row>
      <TextArea name="message" label="What problem would it solve for you?" rows={3} />
      <Consent />
    </SmartForm>
  );
}

export function ProfileRequestForm() {
  return (
    <SmartForm kind="profile" submitLabel="Email me the profile" successTitle="On its way">
      <Row>
        <Field name="name" label="Full name" required autoComplete="name" />
        <Field name="email" label="Email" type="email" required autoComplete="email" />
      </Row>
      <Field name="organization" label="Organization" autoComplete="organization" />
      <Consent />
    </SmartForm>
  );
}

export function ApplicationForm({ positions, defaultPosition }: { positions: string[]; defaultPosition?: string }) {
  return (
    <SmartForm kind="application" submitLabel="Submit application" successTitle="Application received">
      <Row>
        <Field name="name" label="Full name" required autoComplete="name" />
        <Field name="email" label="Email" type="email" required autoComplete="email" />
      </Row>
      <Row>
        <Field name="phone" label="Phone" type="tel" required autoComplete="tel" />
        <Field name="linkedin" label="LinkedIn profile" type="url" placeholder="https://linkedin.com/in/" />
      </Row>
      <Select name="position" label="Position" required options={positions} defaultValue={defaultPosition} />
      <FileInput name="cv" label="CV" accept=".pdf,.doc,.docx" hint="PDF or Word, up to 4 MB" />
      <TextArea name="message" label="Why CEDELA?" required rows={5} placeholder="Tell us about yourself and what you would bring to the team." />
      <Consent />
    </SmartForm>
  );
}

export function IncidentForm() {
  return (
    <SmartForm kind="incident" submitLabel="Submit incident report" successTitle="Incident logged">
      <RadioGroup
        name="severity"
        label="Severity"
        required
        options={[
          { label: "Critical", value: "critical", hint: "Operations stopped" },
          { label: "High", value: "high", hint: "Major impact" },
          { label: "Medium", value: "medium", hint: "Contained impact" },
          { label: "Low", value: "low", hint: "Suspicious activity" },
        ]}
      />
      <Row>
        <Select name="incidentType" label="Incident type" required options={incidentTypes} />
        <Select
          name="ongoing"
          label="Is the incident ongoing?"
          required
          defaultValue="unsure"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
            { label: "Not sure", value: "unsure" },
          ]}
        />
      </Row>
      <Row>
        <Field name="name" label="Your name" required autoComplete="name" />
        <Field name="organization" label="Organization" required autoComplete="organization" />
      </Row>
      <Row>
        <Field name="phone" label="Phone (we will call this number)" type="tel" required autoComplete="tel" />
        <Field name="email" label="Email (use a trusted account)" type="email" required autoComplete="email" />
      </Row>
      <Row>
        <Field name="detectedAt" label="When was it detected?" type="datetime-local" />
        <Field name="systems" label="Affected systems" placeholder="For example: email, file server, website" />
      </Row>
      <TextArea name="message" label="What happened?" required rows={6} placeholder="Describe what you observed, any messages or ransom notes, and actions already taken." />
      <Consent>I confirm the information is accurate to the best of my knowledge and agree to CEDELA processing it to respond to this incident.</Consent>
    </SmartForm>
  );
}
