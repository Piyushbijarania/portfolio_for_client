import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import { TwentyFirstToolbar } from '@21st-extension/toolbar-next';
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Piyush Vijay | Video Editor",
  description: "Video editor crafting visual stories for global brands. Specializing in commercials, music videos, and branded content.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Piyush Vijay | Video Editor",
    description: "Video editor crafting visual stories for global brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} antialiased`}
      >
        <TwentyFirstToolbar
          config={{
            plugins: [], // Add your custom plugins here
          }}
        />
        {/* model-viewer web component (lightweight 3D) */}
        <script src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
        {children}
      </body>
    </html>
  );
}
