import HeroSection from "../components/hero";
import NavBar from "../components/navbar";
import { FirstFooter, SecondFooter } from "../components/footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
      </main>
      <footer>
        <FirstFooter />
        <SecondFooter />
      </footer>
    </>
  );
}
