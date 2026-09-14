import About from "@/components/About";
import Availability from "@/components/Availability";
import CompanyWork from "@/components/CompanyWork";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Project from "@/components/Project";

export default function Home() {
  return (
    <>
      <Hero />
      <Availability />
      <hr className="rule shell" />
      <About />
      <hr className="rule shell" />
      <Project />
      <hr className="rule shell" />
      <CompanyWork />
      <hr className="rule shell" />
      <Experience />
      <hr className="rule shell" />
      <Contact />
    </>
  );
}
