import Image from "next/image";
import { NavBar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function LandingPage() {
  return (
    <>
      <NavBar />
      <div className="">
        {/* Hero Section */}
        <main className="container mx-auto px-6 pt-20 pb-32 text-center">
          <h1 className="text-[#00FF66] font-bold text-4xl md:text-6xl tracking-wider mb-b uppercase font-mono">
            Make Better Decisions
            <br /> with Quorum
          </h1>
          <p className="text-gray-400 mt-6 text-xl">
            Empower Every Voice, Shape Fairer Choices.
          </p>

          {/* Don't delete might be useful on a separate project */}
          {/* <div className="mt-20 grid grid-cols-5 gap-6 max-w-3xl mx-auto">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-4 flex items-center justify-center group hover:border-[#00FF66]/50 transition-colors"
              style={{
                boxShadow: "0 0 20px rgba(0, 255, 102, 0.1)",
              }}
            >
              <div className="w-10 h-10 bg-gray-800 rounded-lg group-hover:shadow-[0_0_20px_rgba(0,255,102,0.3)] transition-shadow" />
            </div>
          ))}
        </div> */}
          <div className="mx-auto p-8 mt-20 mb-12 lg:mt-28 grid  lg:grid-cols-12 lg:gap-8 xl:gap-0 bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-3xl hover:border-[#00FF66]/50 transition-all duration-300 shadow-lg hover:shadow-[#00FF66]/20">
            <div className="ml-auto place-self-center lg:col-span-7 mx-auto px-6 space-y-6 text-start">
              <p className="text-xl text-gray-300 leading-relaxed">
                Democracy thrives when every opinion matters. <span className="text-[#00FF66] font-medium">Quorum </span>
                revolutionizes collective decision-making with a fair and
                innovative voting system that values your priorities, not just
                your numbers.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                With Quadratic Voting, you allocate your voting power across the
                issues you care about most. Whether you're part of a community,
                organization, or decentralized network, our platform ensures
                that decisions reflect the true preferences of the group.
              </p>
            </div>

            <div className="mt-20 max-w-xl mx-auto lg:col-span-5 lg:mt-0 lg:flex">
              <Image
                src="/Earth.png"
                width={500}
                height={500}
                alt="Technology 1"
                className="aspect-square"
              />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#00FF66]/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[#00FF66]/10 rounded-full blur-[100px]" />
        </main>
      </div>
      <Footer />
    </>
  );
}
