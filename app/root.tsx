import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import { AnimatePresence } from "framer-motion";
import styles from "./styles/app.css";
import { Typography } from "@mui/material";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Japan Dev Job",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const animataKey = useLocation().pathname;
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <AnimatePresence key={animataKey}>
          <Outlet />
        </AnimatePresence>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const ErrorBoundary = ({ error }: { error: unknown }) => {
  if (error instanceof Error) {
    return (
      <html>
        <head>
          <title>Something went wrong</title>
          <Meta />
          <Links />
        </head>
        <body>
          <div className="mt-20 md:w-full md:h-full mx-auto">
            <Typography variant="h1" className="pb-20 text-center text-red-300">
              {" "}
              Something went wrong!
            </Typography>
            <Typography className="text-center" variant="h3" component="h2">
              {error.message}
            </Typography>
          </div>
        </body>
      </html>
    );
  }
  return (
    <div className="mt-20 md:w-full md:h-full mx-auto">
      <Typography variant="h1" className="text-center text-red-300">
        Something went wrong!
      </Typography>
    </div>
  );
};
