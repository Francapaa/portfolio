"use client";

import { GitHubCalendar } from "react-github-calendar";

export function GithubContributions() {
  return (
    <div className="w-full overflow-x-auto rounded-[10px] border border-border bg-white/60 p-4 backdrop-blur-[6px]">
      <div className="min-w-[720px]">
        <GitHubCalendar
          username="francapaa"
          colorScheme="light"
          blockSize={12}
          blockMargin={4}
          fontSize={11}
          theme={{
            light: ["#f5f5f7", "#dbeafe", "#93c5fd", "#60a5fa", "#0071e3"],
          }}
        />
      </div>
      <p className="mt-3 text-center font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
        github.com/francapaa — último año
      </p>
    </div>
  );
}
