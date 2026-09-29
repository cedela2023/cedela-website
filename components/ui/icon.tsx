import {
  Award, Banknote, BookOpen, Brain, Briefcase, ChartColumn, ClipboardCheck, Cloud, CodeXml, Compass, Cpu,
  CreditCard, Eye, Factory, FileSearch, Fingerprint, Flame, FlaskConical, Gauge, Globe, GraduationCap,
  Handshake, HeartPulse, Landmark, LayoutDashboard, Leaf, LifeBuoy, Lightbulb, Link2, Lock, Megaphone,
  Network, RadioTower, Radar, RefreshCw, Rocket, Scale, School, Search, Server, Shield, Siren, Sparkles,
  Sprout, Store, Target, Umbrella, UserCheck, Users, Wifi, Zap, type LucideIcon, type LucideProps,
} from "lucide-react";
import type { IconName } from "@/content/types";

const map: Record<IconName, LucideIcon> = {
  compass: Compass, cpu: Cpu, shield: Shield, graduation: GraduationCap, landmark: Landmark, banknote: Banknote,
  umbrella: Umbrella, "heart-pulse": HeartPulse, zap: Zap, flame: Flame, factory: Factory, "radio-tower": RadioTower,
  school: School, handshake: Handshake, store: Store, sprout: Sprout, scale: Scale, "clipboard-check": ClipboardCheck,
  "file-search": FileSearch, lock: Lock, brain: Brain, briefcase: Briefcase, target: Target, rocket: Rocket,
  code: CodeXml, network: Network, cloud: Cloud, "credit-card": CreditCard, "bar-chart": ChartColumn,
  sparkles: Sparkles, wifi: Wifi, server: Server, "life-buoy": LifeBuoy, "user-check": UserCheck, radar: Radar,
  fingerprint: Fingerprint, siren: Siren, eye: Eye, link: Link2, refresh: RefreshCw, users: Users,
  megaphone: Megaphone, book: BookOpen, award: Award, flask: FlaskConical, lightbulb: Lightbulb, search: Search,
  layout: LayoutDashboard, gauge: Gauge, globe: Globe, leaf: Leaf,
};

export function Icon({ name, ...props }: { name: IconName | string } & LucideProps) {
  const Cmp = map[name as IconName] ?? Sparkles;
  return <Cmp strokeWidth={1.6} aria-hidden {...props} />;
}
