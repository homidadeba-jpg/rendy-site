import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado. Tente atualizar a página ou voltar ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Renty Beach | Hotel frente a la playa en Encarnación, Paraguay" },
      {
        name: "description",
        content:
          "Hotel Renty Beach en Encarnación, Paraguay: a 300 m de Playa San José y frente al Sambódromo. Desayuno buffet, WiFi gratis, estacionamiento y habitaciones desde individuales hasta familiares. Reservá por WhatsApp.",
      },
      { name: "author", content: "Renty Beach" },
      { name: "theme-color", content: "#0e2c47" },
      {
        property: "og:title",
        content: "Renty Beach | Hotel frente a la playa en Encarnación",
      },
      {
        property: "og:description",
        content:
          "A 300 m de Playa San José y frente al Sambódromo. Desayuno buffet, WiFi gratis y la mejor atención de Encarnación.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_PY" },
      { property: "og:site_name", content: "Renty Beach" },
      { property: "og:image", content: "/fotos/hero-costanera-1600.webp" },
      { name: "twitter:image", content: "/fotos/hero-costanera-1600.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/brand/renty-beach-logo.jpg", type: "image/jpeg" },
      { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/bodoni-moda-400.woff2", crossOrigin: "anonymous" },
      { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/bodoni-moda-400-italic.woff2", crossOrigin: "anonymous" },
      { rel: "preload", as: "image", href: "/fotos/hero-costanera-720.webp", media: "(max-width: 700px)", fetchPriority: "high" },
      { rel: "preload", as: "image", href: "/fotos/hero-costanera-1600.webp", media: "(min-width: 701px)", fetchPriority: "high" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
