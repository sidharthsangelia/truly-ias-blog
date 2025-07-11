import Cta from "@/components/Cta";
import Faq from "@/components/Faq";
import FeaturedPostsSection from "@/components/FeaturedPosts";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonial";


export default function Home() {
  return (
    <main>
      <Header />
    <Hero/>
    <FeaturedPostsSection/>
    <HowItWorks/>
    <Faq/>
    <Testimonials/>
    <Cta/>
    </main>
  );
}
