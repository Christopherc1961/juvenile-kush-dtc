import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/store/landing";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "JUVENILE × KUSH — Official DTC" },
      {
        name: "description",
        content:
          "Never hand-roll again. Official Kush × Juvenile collab. Big Hit Station $49.99. 21+.",
      },
    ],
  }),
});

function Home() {
  return <Landing />;
}
