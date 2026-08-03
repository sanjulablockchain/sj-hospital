import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { Welcome } from "./components/Welcome";

export function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Welcome />
    </>
  );
}
