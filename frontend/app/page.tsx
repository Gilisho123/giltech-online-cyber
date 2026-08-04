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
import { prisma } from "@/lib/prisma";


export default async function HomePage() {


  const settings = await getSiteSettings();

  const featuredServices = await prisma.service.findMany({
    where: {
      featured: true,
    },
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });



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




  const statsSettings = settings
    ? {
      stat1Number: settings.stat1Number,
      stat1Label: settings.stat1Label,

      stat2Number: settings.stat2Number,
      stat2Label: settings.stat2Label,

      stat3Number: settings.stat3Number,
      stat3Label: settings.stat3Label,

      stat4Number: settings.stat4Number,
      stat4Label: settings.stat4Label,
    }
    : null;

  const whySettings = settings
    ? {
      whyTitle: settings.whyTitle,
      whyDescription: settings.whyDescription,

      whyCard1Title: settings.whyCard1Title,
      whyCard1Text: settings.whyCard1Text,

      whyCard2Title: settings.whyCard2Title,
      whyCard2Text: settings.whyCard2Text,

      whyCard3Title: settings.whyCard3Title,
      whyCard3Text: settings.whyCard3Text,

      whyCard4Title: settings.whyCard4Title,
      whyCard4Text: settings.whyCard4Text,

      whyCard5Title: settings.whyCard5Title,
      whyCard5Text: settings.whyCard5Text,

      whyCard6Title: settings.whyCard6Title,
      whyCard6Text: settings.whyCard6Text,
    }
    : null;

  const processSettings = settings
    ? {
      processTitle: settings.processTitle,
      processDescription: settings.processDescription,

      step1Title: settings.step1Title,
      step1Text: settings.step1Text,

      step2Title: settings.step2Title,
      step2Text: settings.step2Text,

      step3Title: settings.step3Title,
      step3Text: settings.step3Text,

      step4Title: settings.step4Title,
      step4Text: settings.step4Text,
    }
    : null;

  const portfolioProjects = await prisma.portfolio.findMany({
    where: {
      featured: true,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  const testimonials = await prisma.testimonial.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  const partners = await prisma.partner.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const faqs = await prisma.fAQ.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  const callToActionSettings = settings
    ? {
      companyName: settings.companyName,
      tagline: settings.tagline,

      phone: settings.phone,
      email: settings.email,

      ctaTitle: settings.ctaTitle,
      ctaSubtitle: settings.ctaSubtitle,

      ctaButtonText: settings.ctaButtonText,
      ctaButtonLink: settings.ctaButtonLink,
    }
    : null;


  return (

    <>

      <Hero settings={heroSettings} />


      <Stats settings={statsSettings} />


      <FeaturedServices services={featuredServices} />


      <WhyChooseUs settings={whySettings} />


      <HowItWorks settings={processSettings} />


      <PortfolioPreview projects={portfolioProjects} />


      <Testimonials testimonials={testimonials} />


      <Partners partners={partners} />


      <FAQ faqs={faqs} />


      <CallToAction settings={callToActionSettings} />

    </>

  );

}