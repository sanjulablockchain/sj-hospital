import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { Welcome } from "./components/Welcome";
import { Services } from "./components/Services";
import { Doctors } from "./components/Doctors";
import { WhyChooseUs } from "./components/WhyChooseUs";

export function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Welcome />
      <Services />
      <Doctors />
      <WhyChooseUs />
    </>
  );
}
