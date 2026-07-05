import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy category route — the new /products page hosts the full 14-category
// taxonomy sidebar, so redirect all old category URLs there.
export const Route = createFileRoute("/products/$categoryId/")({
  loader: () => {
    throw redirect({ to: "/products" });
  },
  component: () => null,
});
