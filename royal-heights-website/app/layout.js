import "./globals.css";

export const metadata = {
  title: "Royal Heights Sukari",
  description: "Royal Heights Sukari by Promitto Limited",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
