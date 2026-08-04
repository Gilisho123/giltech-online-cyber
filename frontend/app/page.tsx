import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/stats";
import FeaturedServices from "@/components/sections/FeaturedServices";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HowItWorks from "@/components/sections/HowItWorks";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import Testimonials from "@/components/sections/Testimonials";
import Partners from "@/components/sections/Partners";
import FAQ from "@/components/sections/FAQ";
import CallToAction from "@/components/sections/CallToAction";

import { getSiteSettings } from "@/lib/settings";


export default async function HomePage() {


  const settings = await getSiteSettings();



  const heroSettings = settings
    ? {

      companyName: settings.companyName,

      tagline: settings.tagline,


      heroTitle: settings.heroTitle,

      heroSubtitle: settings.heroSubtitle,


      heroButtonText: settings.heroButtonText,

      heroButtonLink: settings.heroButtonLink,


      heroImage: settings.heroImage,



      heroCard1Title: settings.heroCard1Title,

      heroCard1Text: settings.heroCard1Text,



      heroCard2Title: settings.heroCard2Title,

      heroCard2Text: settings.heroCard2Text,

    }
    : null;




  const callToActionSettings = settings
    ? {

      companyName: settings.companyName,

      tagline: settings.tagline,

      phone: settings.phone,

      email: settings.email,

    }
    : null;




  return (

    <>

      <Hero settings={heroSettings} />


      <Stats />


      <FeaturedServices />


      <WhyChooseUs />


      <HowItWorks />


      <PortfolioPreview />


      <Testimonials />


      <Partners />


      <FAQ />


      <CallToAction settings={callToActionSettings} />

    </>

  );

}