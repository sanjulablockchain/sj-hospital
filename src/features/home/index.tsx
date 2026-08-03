import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { Welcome } from "./components/Welcome";
import { Services } from "./components/Services";

export function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Welcome />
      <Services />
    </>
  );
}
