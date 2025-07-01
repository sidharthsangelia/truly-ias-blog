import Cta from "@/components/Cta";
import FeaturedPostsSection from "@/components/FeaturedPosts";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";


export default function Home() {
  return (
    <main>
    <Hero/>
    <FeaturedPostsSection/>
    <HowItWorks/>
    <Cta/>
    </main>
  );
}
