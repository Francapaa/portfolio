export function codeToInputChar(code: string): string | null {
  if (code.startsWith("Key")) return code.slice(3).toLowerCase();
  if (code.startsWith("Digit")) return code.slice(5);

  const map: Record<string, string> = {
    Backquote: "`",
    Minus: "-",
    Equal: "=",
    BracketLeft: "[",
    BracketRight: "]",
    Backslash: "\\",
    Semicolon: ";",
    Quote: "'",
    Comma: ",",
    Period: ".",
    Slash: "/",
    Space: " ",
  };

  return map[code] ?? null;
}

export const IGNORED_VIRTUAL_CODES: readonly string[] = [
  "Escape",
  "Tab",
  "CapsLock",
  "ShiftLeft",
  "ShiftRight",
  "ControlLeft",
  "ControlRight",
  "AltLeft",
  "AltRight",
  "MetaLeft",
  "MetaRight",
  "Fn",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
];
