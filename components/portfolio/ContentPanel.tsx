"use client";

import {
  BriefcaseBusiness,
  Code2,
  Command,
  GraduationCap,
  Mail,
  TerminalSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DirectoryContent } from "@/components/portfolio/DirectoryContent";

interface ContentPanelProps {
  directory: string;
}

export function ContentPanel({ directory }: ContentPanelProps) {
  return (
    <section className="content-column">
      <div className="content-header">
        <div>
          <span className="eyebrow">CURRENT DIRECTORY</span>
          <h2>
            {directory === "~" ? "Welcome" : directory.replace("/", "")}
          </h2>
        </div>
        <div className="content-icon">
          {directory === "/proyectos" || directory === "/projects" ? (
            <Code2 />
          ) : directory === "/experiencia" ||
            directory === "/experience" ? (
            <BriefcaseBusiness />
          ) : directory === "/education" ||
            directory === "/educacion" ? (
            <GraduationCap />
          ) : directory === "/servicios" || directory === "/services" ? (
            <Command />
          ) : directory === "/sobre-mi" || directory === "/about" ? (
            <Mail />
          ) : (
            <TerminalSquare />
          )}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={directory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <DirectoryContent directory={directory} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
