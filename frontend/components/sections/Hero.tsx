import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Glow from "@/components/ui/Glow";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-[#081225] py-24 text-white">
            <Glow position="left" />
            <Glow position="right" />

            <Container>
                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* Left Side */}
                    <div>

                        <Badge>Kenya's Digital Business Hub</Badge>

                        <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
                            Giltech
                            <span className="block text-cyan-400">
                                Online Cyber
                            </span>
                        </h1>

                        <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
                            Your trusted partner for Government Services,
                            Tax Consultancy, Data Analytics,
                            Artificial Intelligence,
                            Software Development,
                            Research and Digital Business Solutions.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">

                            <Button>
                                Request Service
                            </Button>

                            <Button variant="secondary">
                                Explore Services
                            </Button>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="relative hidden lg:block">

                        <div className="space-y-6">

                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="text-xl font-bold text-cyan-400">
                                    Data Analytics
                                </h3>

                                <p className="mt-2 text-slate-300">
                                    Power BI • Python • Excel • SPSS
                                </p>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="text-xl font-bold text-fuchsia-400">
                                    AI Solutions
                                </h3>

                                <p className="mt-2 text-slate-300">
                                    Automation • ChatGPT • AI Training
                                </p>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h3 className="text-xl font-bold text-emerald-400">
                                    Government Services
                                </h3>

                                <p className="mt-2 text-slate-300">
                                    KRA • eCitizen • NTSA • SHA
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </Container>

        </section>
    );
}