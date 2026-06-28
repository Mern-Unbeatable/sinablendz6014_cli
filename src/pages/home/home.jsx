import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Check,
  Headphones,
  Home as HomeIcon,
  KeyRound,
  Minus,
  Plus,
  Star,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { Layout } from "@/components/site/Layout";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";
import { addInquiry, getPublishedProperties } from "@/lib/store";

import living from "@/assets/living-room.jpg";
import bedroom from "@/assets/bedroom.jpg";

import penthouse from "@/assets/penthouse.jpg";

import Hero from "./sections/Hero";
import Trusted from "./sections/Trusted";
import About from "./sections/About";
import FeaturedIn from "./sections/FeaturedIn";
import Services from "./sections/Services";
import Priority from "./sections/Priority";
import Testimonials from "./sections/Testimonials";
import Faq from "./sections/Faq";
import Properties from "./sections/Properties";

export const services = [
  {
    icon: HomeIcon,
    title: "Property Showcase",
    desc: "We list homeowner properties with professional photos and full details on this website.",
  },
  {
    icon: KeyRound,
    title: "Homeowner Partnerships",
    desc: "We collect and rent properties from Melbourne owners for short-stay use on their behalf.",
  },
  {
    icon: Headphones,
    title: "Personal Inquiry Handling",
    desc: "Every form submission is reviewed and followed up manually — no automated booking system.",
  },
  {
    icon: CalendarCheck,
    title: "Guest Matching",
    desc: "We connect interested short-term renters with the right property from our portfolio.",
  },
  {
    icon: BarChart3,
    title: "Listing Management",
    desc: "Publish, update, and manage property listings and track all inquiries from one dashboard.",
  },
  {
    icon: Shield,
    title: "Owner–Guest Coordination",
    desc: "All communication between property owners and guests is handled directly by our team.",
  },
];

export const reviews = [
  {
    name: "Paul",
    text: "Very clean and modern with great views. Truly five star and a great spot. Excellent host who informed us regularly.",
  },
  {
    name: "Manuelika",
    text: "We got there and stayed in the most luxurious amazing place. I want to stay here forever. Absolutely stunning.",
  },
  {
    name: "Ahmed",
    text: "Highly recommend this apartment! Hosts attended to all my needs immediately. Will definitely return.",
  },
  {
    name: "Josh",
    text: "Loved the location, scenic Melbourne views. Wide open balcony and bedroom views to die for. Apartment is gorgeous.",
  },
  {
    name: "Sheng",
    text: "We have very enjoyed our stay. Liked the views and the amenities. We will book again without hesitation.",
  },
  {
    name: "Sehet",
    text: "Modern, definitely recommend staying — comfortable, spacious, and a great location close to everything.",
  },
];

export const faqs = [
  {
    q: "How do I list my property with Aurora Suites?",
    a: "Submit the homeowner form on our homepage or contact page. Our team will review your property details and follow up personally to discuss listing it on our website.",
  },
  {
    q: "How do guests enquire about a stay?",
    a: "Browse our properties, open a listing you like, and submit a stay inquiry with your preferred dates. We will contact you directly to confirm availability and next steps.",
  },
  {
    q: "Is booking done through the website?",
    a: "No. This website is for showcasing properties and collecting inquiries. All communication and arrangements are handled manually by our team.",
  },
  {
    q: "What types of properties do you work with?",
    a: "Apartments, townhouses, and homes across Melbourne — from CBD apartments to suburban family residences.",
  },
  {
    q: "How quickly will I hear back after submitting a form?",
    a: "We aim to respond to all homeowner and guest inquiries within one business day.",
  },
  {
    q: "What does Aurora Suites handle for homeowners?",
    a: "We collect properties from owners, showcase them online, receive guest inquiries, and manage the short-term rental process on your behalf.",
  },
];

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <Trusted />
      <About />
      <FeaturedIn />
      <Services />
      <Priority />
      <Testimonials />
      <Faq />
      <Properties />
    </Layout>
  );
}
