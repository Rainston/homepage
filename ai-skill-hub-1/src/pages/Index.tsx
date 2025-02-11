import { Brain, Calendar, GraduationCap, Coins, Link, MessageSquare, Shield, Users } from "lucide-react";
import { SolutionCard } from "@/components/SolutionCard";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { BackgroundSlideshow } from "@/components/BackgroundSlideshow";

const solutions = [
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "AI-Powered Course Recommendations",
    description: "Personalized learning paths based on student feedback and performance."
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Mock Tests with AI Proctoring",
    description: "Secure online exams with tab restriction and facial detection."
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
    title: "Blockchain-Verified Certificates",
    description: "Tamper-proof and verifiable certificates for course completion."
  },
  {
    icon: <Coins className="w-6 h-6 text-primary" />,
    title: "Web3 Token Rewards",
    description: "Earn and redeem blockchain-based SAR coins for internships and job opportunities."
  },
  {
    icon: <Calendar className="w-6 h-6 text-primary" />,
    title: "Course Roadmap Generator",
    description: "AI-generated study plans ranging from 15 days to 1 year."
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-primary" />,
    title: "AI Doubt Clarification Chatbot",
    description: "Video and voice-enabled chatbot for student queries."
  },
  {
    icon: <Link className="w-6 h-6 text-primary" />,
    title: "Skill-Based Job & Internship Matching",
    description: "AI-driven job and internship recommendations based on student performance."
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Decentralized Verification System",
    description: "Secure credential verification using blockchain technology."
  }
];

const team = [
  {
    name: "Felix Rainston V G",
    role: "Blockchain Developer",
    image: "/src/assets/images/felix-rainstom.jpg",
    socials: [] // Will be updated later with LinkedIn and Gmail
  },
  {
    name: "Team Member 2",
    role: "AI Developer"
  },
  {
    name: "Team Member 3",
    role: "Full Stack Developer"
  },
  {
    name: "Team Member 4",
    role: "UI/UX Designer"
  }
];

const Index = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="min-h-screen text-white">
      <BackgroundSlideshow />
      
      <nav className="fixed w-full bg-black/40 backdrop-blur-md z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-2xl font-extrabold tracking-tight">AI for Skill Development</span>
          <div className="space-x-4">
            <Button variant="ghost" size="lg" asChild className="font-semibold hover:bg-white/20 text-white">
              <a href="/login">Login</a>
            </Button>
            <Button size="lg" asChild className="bg-white text-black hover:bg-white/90 font-semibold">
              <a href="/register">Register</a>
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative pt-48 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block px-6 py-2 mb-6 text-sm font-bold rounded-full bg-white/20 text-white">
            Welcome to the Future of Learning
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
            AI for Skill Development
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 leading-relaxed">
            Empowering learners with AI-driven personalized education and blockchain-verified credentials
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-black hover:bg-white/90 font-semibold">
              <a href="/register">Get Started</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/20">
              <a href="/contact">Learn More</a>
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="h-screen w-full flex items-center justify-center">
        <div className="text-center text-white p-8 rounded-lg backdrop-blur-sm bg-black/20 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide">
            Welcome to AI Skill Hub
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide">
            Scroll to explore the future of AI
          </p>
        </div>
      </section>

      <section className="h-screen w-full flex items-center justify-center">
        <div className="text-center text-white p-8 rounded-lg backdrop-blur-sm bg-black/20 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide">
            Discover AI Skills
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-white/90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide mb-8">
            Learn and master artificial intelligence
          </p>
          <blockquote className="relative">
            <div className="absolute -left-4 -top-4 text-blue-400 opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <p className="text-xl md:text-2xl text-white/90 italic font-medium leading-relaxed px-8 mb-4">
              The future belongs to those who learn more skills and combine them in creative ways!
            </p>
            <footer className="text-right text-white/80 font-medium">
              ― Robert Greene
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="h-screen w-full flex items-center justify-center">
        <div className="text-center text-white p-8 rounded-lg backdrop-blur-sm bg-black/20 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide">
            Join the Future
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-white/90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide mb-8">
            Be part of the AI revolution
          </p>
          <blockquote className="relative">
            <div className="absolute -left-4 -top-4 text-blue-400 opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <p className="text-xl md:text-2xl text-white/90 italic font-medium leading-relaxed px-8 mb-4">
              Education is the passport to the future, for tomorrow belongs to those who prepare for it today.
            </p>
            <footer className="text-right text-white/80 font-medium">
              ― Malcolm X
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide">
              Our Solutions
            </h2>
            <p className="text-xl md:text-2xl font-semibold text-white/90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide">
              Comprehensive tools for modern education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-blue-400 mb-4">
                <GraduationCap size={40} className="drop-shadow-glow" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                AI-Powered Course Recommendations
              </h3>
              <p className="text-white/90 text-lg font-medium leading-relaxed">
                Personalized learning paths based on student feedback and performance.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-blue-400 mb-4">
                <Shield size={40} className="drop-shadow-glow" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Mock Tests with AI Proctoring
              </h3>
              <p className="text-white/90 text-lg font-medium leading-relaxed">
                Secure online exams with tab restriction and facial detection.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-blue-400 mb-4">
                <Link size={40} className="drop-shadow-glow" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Blockchain-Verified Certificates
              </h3>
              <p className="text-white/90 text-lg font-medium leading-relaxed">
                Tamper-proof and verifiable certificates for course completion.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-blue-400 mb-4">
                <Coins size={40} className="drop-shadow-glow" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Web3 Token Rewards
              </h3>
              <p className="text-white/90 text-lg font-medium leading-relaxed">
                Earn and redeem blockchain-based SAR coins for internships and job opportunities.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-blue-400 mb-4">
                <Calendar size={40} className="drop-shadow-glow" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Course Roadmap Generator
              </h3>
              <p className="text-white/90 text-lg font-medium leading-relaxed">
                AI-generated study plans ranging from 15 days to 1 year.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-blue-400 mb-4">
                <MessageSquare size={40} className="drop-shadow-glow" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                AI Doubt Clarification Chatbot
              </h3>
              <p className="text-white/90 text-lg font-medium leading-relaxed">
                Video and voice-enabled chatbot for student queries.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-blue-400 mb-4">
                <Users size={40} className="drop-shadow-glow" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Skill-Based Job & Internship Matching
              </h3>
              <p className="text-white/90 text-lg font-medium leading-relaxed">
                AI-driven job and internship recommendations based on student performance.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-blue-400 mb-4">
                <Brain size={40} className="drop-shadow-glow" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Decentralized Verification System
              </h3>
              <p className="text-white/90 text-lg font-medium leading-relaxed">
                Secure credential verification using blockchain technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide">
              Meet Our Team
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {member.image && (
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-full object-cover w-full h-full border-4 border-blue-400/50"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-400/20 to-transparent"></div>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  {member.name}
                </h3>
                <p className="text-blue-400 font-semibold mb-4">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-black/60 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
            <p className="text-xl text-white/80 font-medium">Have questions? We'd love to hear from you.</p>
          </motion.div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input id="name" required placeholder="Your name" className="h-12 bg-white/10 border-white/20" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" required placeholder="Your email" className="h-12 bg-white/10 border-white/20" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea
                id="message"
                required
                placeholder="Your message"
                className="min-h-[150px] bg-white/10 border-white/20"
              />
            </div>
            <Button type="submit" size="lg" className="w-full bg-white text-black hover:bg-white/90 font-semibold">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
