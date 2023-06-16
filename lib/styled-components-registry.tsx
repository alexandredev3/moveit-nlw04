'use client';

import { useServerInsertedHTML } from "next/navigation";
import { useState, type PropsWithChildren } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export function StyledComponentsRegistry({ children }: PropsWithChildren) {
  const [styledComponentsStylesheet] = useState(() => new ServerStyleSheet());
  
  useServerInsertedHTML(() => {
    const styles = styledComponentsStylesheet.getStyleElement();
    styledComponentsStylesheet.instance.clearTag();

    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStylesheet.instance}>
      {children}
    </StyleSheetManager>
  );
}