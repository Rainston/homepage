
import { motion } from "framer-motion";

interface TeamMemberCardProps {
  name: string;
  role: string;
  delay?: number;
}

export const TeamMemberCard = ({ name, role, delay = 0 }: TeamMemberCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-primary/20 transition-all duration-300"
    >
      <div className="w-full aspect-square rounded-lg bg-gray-200 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </motion.div>
  );
};
