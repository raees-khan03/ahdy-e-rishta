import {
  BadgeCheck,
  Camera,
  FileText,
  Globe,
  HeartCrack,
  HeartHandshake,
  Lock,
  MessageCircle,
  MessagesSquare,
  Phone,
  Search,
  ShieldCheck,
  UserRoundSearch,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  lock: Lock,
  users: Users,
  "message-circle": MessageCircle,
  "badge-check": BadgeCheck,
  "heart-handshake": HeartHandshake,
  "heart-crack": HeartCrack,
  globe: Globe,
  "messages-square": MessagesSquare,
  "user-round-search": UserRoundSearch,
  "users-round": UsersRound,
  "file-text": FileText,
  search: Search,
  phone: Phone,
  camera: Camera,
};

export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? HeartHandshake;
  return <Icon className={className} aria-hidden="true" />;
}
