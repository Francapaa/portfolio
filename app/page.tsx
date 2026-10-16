"use client";

import { WavyBackground } from "@/components/ui/wavy-background";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { TerminalPanel } from "@/components/portfolio/TerminalPanel";
import { ContentPanel } from "@/components/portfolio/ContentPanel";
import { useSwordAudio } from "@/hooks/useSwordAudio";
import { useTerminal } from "@/hooks/useTerminal";
import { useEnterReveal } from "@/hooks/useEnterReveal";

export default function Page() {
  const { playSword, unlockSwordAudio } = useSwordAudio();
  const terminal = useTerminal();
  const { reveal, handleEnter } = useEnterReveal(unlockSwordAudio);

  return (
    <main className="portfolio-shell" onClick={terminal.focusInput}>
      <HeroSection onEnter={handleEnter} onNameHover={playSword} />

      <section
        className={`portfolio-room ${terminal.hasNavigated ? "has-navigation" : "terminal-only"}`}
        style={{
          opacity: Math.max(0, reveal),
          position: "relative",
          overflow: "hidden",
        }}
      >
        <WavyBackground
          colors={["#0071e3", "#1e90ff", "#60a5fa", "#93c5fd", "#dbeafe"]}
          backgroundFill="white"
          blur={0}
          speed="slow"
          waveWidth={56}
          waveOpacity={0.34}
          containerClassName="absolute inset-0 z-0 pointer-events-none"
          className="relative z-0"
        />
        <SiteHeader />

        <div className="workspace">
          <TerminalPanel
            directory={terminal.directory}
            history={terminal.history}
            input={terminal.input}
            onInputChange={terminal.setInput}
            inputRef={terminal.inputRef}
            sound={terminal.sound}
            onToggleSound={terminal.toggleSound}
            onSubmit={() => terminal.submit()}
            onVirtualKeyPress={terminal.handleVirtualKeyPress}
            onVoiceTranscript={terminal.handleVoiceTranscript}
          />

          <ContentPanel directory={terminal.directory} />
        </div>

        <SiteFooter />
      </section>
    </main>
  );
}
