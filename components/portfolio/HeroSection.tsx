"use client";

import Text3DFlip from "@/components/ui/text-3d-flip";

interface HeroSectionProps {
  onEnter: () => void;
  onNameHover: () => void;
}

export function HeroSection({ onEnter, onNameHover }: HeroSectionProps) {
  return (
    <section
      className="opening-stage cursor-pointer"
      aria-label="Francisco Caparruva portfolio introduction"
      onClick={onEnter}
    >
      <div className="stage-grain" />
      <div className="hero-3d-wrap flex flex-col items-center justify-center gap-4 px-4">

        <div onMouseEnter={onNameHover}>
          <Text3DFlip
            className="justify-center bg-transparent"
            textClassName="bg-transparent text-foreground font-mono font-black text-[clamp(2.6rem,9vw,8.2rem)] leading-[0.85] tracking-[-0.07em]"
            flipTextClassName="bg-transparent text-foreground font-mono font-black"
            rotateDirection="top"
          >
            FRANCISCO CAPARRUVA
          </Text3DFlip>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-2">
          <Text3DFlip
            className="bg-transparent"
            textClassName="bg-transparent text-foreground font-mono text-[15px] tracking-[0.20em] font-bold text-muted-foreground"
            flipTextClassName="bg-transparent text-foreground font-mono"
            rotateDirection="top"
          >
            SOFTWARE ENGINEER
          </Text3DFlip>
          <span className="hidden md:block text-muted-foreground font-mono text-[15px]">
            /
          </span>
          <Text3DFlip
            className="bg-transparent"
            textClassName="bg-transparent text-foreground font-mono text-[15px] tracking-[0.20em] font-bold text-muted-foreground"
            rotateDirection="top"
          >
            AI ENGINEER
          </Text3DFlip>
        </div>

        <button
          className="scroll-cue mt-8 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onEnter();
          }}
          aria-label="Enter portfolio"
        >
          CLICK TO ENTER <span>↓</span>
        </button>
      </div>
    </section>
  );
}
