export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  badge: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Alex Rivera",
    role: "Senior Staff Engineer",
    company: "Veloce Cloud",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content: "EchoGPT completely changed how our team writes and reviews code. Pitting Claude 3.5 Sonnet against GPT-4o side-by-side in the Arena view lets us catch tricky architecture edge-cases in seconds.",
    badge: "Verified Engineer"
  },
  {
    id: "t2",
    name: "Sophia Chen",
    role: "AI Product Lead",
    company: "Nexus AI Lab",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content: "The Chrome extension sidebar is an absolute game-changer while reviewing arXiv research papers. Highlighting a dense equation and having Gemini 1.5 Pro break it down instantly saves hours every day.",
    badge: "Research Lead"
  },
  {
    id: "t3",
    name: "Tariq Al-Mansoor",
    role: "Indie Founder & Developer",
    company: "ShipFast Studio",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content: "I cancelled my $20 ChatGPT Plus and $20 Claude Pro subscriptions. Having all models in one unified UI with BYOK key management cut my monthly AI bill from $60 to under $10.",
    badge: "Indie Hacker"
  },
  {
    id: "t4",
    name: "Elena Rostova",
    role: "UX Systems Architect",
    company: "DesignCore",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content: "The new UI is breathtaking! The live code preview sandbox, keyboard navigation, and instant model switching feel as smooth and snappy as Linear. Truly top-shelf frontend craftsmanship.",
    badge: "Design Architect"
  }
];
