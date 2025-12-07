import type React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          ar?: boolean;
          "auto-rotate"?: boolean;
          "camera-controls"?: boolean;
          "interaction-prompt"?: string;
          exposure?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
