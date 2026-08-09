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

  const stats = await prisma.siteStats.findMany({
    orderBy: {
      order: "asc",
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

  const callToAction = await prisma.callToAction.findUnique({
    where: {
      id: 1,
    },
  });

  const whyChooseItems = await prisma.whyChoose.findMany({
    where: {
      active: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  const processSteps = await prisma.processStep.findMany({
    where: {
      active: true,
    },
    orderBy: {
      stepNumber: "asc",
    },
  });


  return (

    <>

      <Hero settings={heroSettings} />


      {/* Stats component typing mismatch — cast to any to avoid TSX prop error */}
      <Stats stats={stats} />


      <FeaturedServices services={featuredServices} />


      <WhyChooseUs items={whyChooseItems} />


      <HowItWorks steps={processSteps} />


      <PortfolioPreview projects={portfolioProjects} />


      <Testimonials testimonials={testimonials} />


      <Partners partners={partners} />


      <FAQ faqs={faqs} />


      <CallToAction settings={callToAction} />

    </>

  );

}