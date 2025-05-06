import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import styles from "./styles/app.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: "https://cdn.tailwindcss.com" },
  { 
    rel: "stylesheet", 
    href: "https://fonts.googleapis.com/css2?family=Higuen+Elegant+Serif:wght@400;500;600;700&display=swap" 
  },
  { rel: "manifest", href: "/manifest.json" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/images/favicon-32x32.png" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/images/favicon-16x16.png" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/images/apple-touch-icon.png" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Muñe Chic - Boutique" },
    { name: "description", content: "Tu destino premium de moda" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { charset: "utf-8" },
    { name: "theme-color", content: "#fde3ec" },
  ];
};

export default function App() {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="font-higuen bg-gray-50">
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <Navbar />
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>

        <Footer />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
} 