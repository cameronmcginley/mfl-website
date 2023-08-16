"use client";

import { ThemeProvider } from "next-themes";

export default function Theme({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
