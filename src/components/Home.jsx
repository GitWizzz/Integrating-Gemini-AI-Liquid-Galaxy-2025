import { Link } from "react-router-dom";

const SectionDivider = ({ label }) => (
  <div className="relative mt-16 mb-8 flex items-center">
    <div className="flex-grow h-px bg-white/10" />
    <span className="mx-3 text-xs uppercase tracking-widest text-gray-500">
      {label}
    </span>
    <div className="flex-grow h-px bg-white/10" />
  </div>
);

const FeatureCard = ({ icon, title, desc, cta }) => (
  <div className="relative flex flex-col justify-between p-8 rounded-3xl bg-white/5 backdrop-blur border border-white/10 hover:border-white/20 transition">
    <div className="flex items-start gap-5">
      <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-600/20 text-blue-300 flex items-center justify-center text-xl">
        {typeof icon === "string" && icon.startsWith("http") ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          icon
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>

    <button className="mt-8 w-full py-3 rounded-xl  hover:bg-blue-400 text-white text-sm font-medium transition">
      {cta}
    </button>
  </div>
);

const Benefit = ({ title, desc }) => (
  <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
    <div className="mt-1 w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-black text-sm font-bold">
      ✓
    </div>
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="mt-1 text-sm text-gray-400">{desc}</p>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="relative bg-black text-white overflow-hidden">
      {/* NAVBAR (UNCHANGED) */}
      <div className="fixed top-2 left-0 right-0 z-50 px-4 md:px-6">
        <nav className="mx-auto max-w-7xl flex items-center justify-between rounded-2xl px-6 py-4 bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 p-[2px]">
              <img
                src="https://cdn.dribbble.com/userupload/22752596/file/original-79ef8f1017847bb6be620e07b03c2bb0.gif"
                alt="Logo"
                className="w-full h-full rounded-md object-cover"
              />
            </div>
            <span className="font-semibold text-lg">BiMind AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="#" className="hover:text-white transition">
              Features
            </a>
            <a href="#" className="hover:text-white transition">
              Use Cases
            </a>
            <a href="#" className="hover:text-white transition">
              API
            </a>
            <a href="#" className="hover:text-white transition">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Sign In
            </a>
            <Link
              to="/chat"
              className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition"
            >
              Get Started Free
            </Link>
          </div>
        </nav>
      </div>

      {/* BACKGROUND (UNCHANGED) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      <div className="absolute -top-48 -left-48 w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[160px] animate-floatSlow" />
      <div className="absolute top-1/3 -right-48 w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-[160px] animate-floatSlower" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-32">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          BiMind AI <br />
          <span className="text-blue-400">Multimodal Playground</span>
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-2xl">
          A single place to chat with AI, analyze images, understand code, and
          explore next-gen intelligence powered by Gemini.
        </p>

        <div className="mt-10 flex gap-4 flex-wrap">
          <Link
            to="/chat"
            className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
          >
            Start Chat
          </Link>
          <Link
            to="/image"
            className="px-7 py-3 rounded-xl border border-blue-500/40 hover:border-blue-400 transition"
          >
            Analyze Image
          </Link>
        </div>

        <SectionDivider label="Capabilities" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="https://img.icons8.com/?size=100&id=2979&format=png&color=3E7EFF"
            title="Conversational Reasoning"
            desc="Ask complex questions, debug logic, and get structured explanations powered by BiMind AI."
            cta="Explore Chat"
          />
          <FeatureCard
            icon="https://img.icons8.com/?size=100&id=erNIOSLOny0Q&format=png&color=3E7EFF"
            title="Visual Understanding"
            desc="Upload images to identify objects, scenes, and contextual meaning with multimodal intelligence."
            cta="Analyze Images"
          />
          <FeatureCard
            icon="https://img.icons8.com/?size=100&id=ZfINTjqBJlgK&format=png&color=3E7EFF"
            title="Insight Generation"
            desc="Summarize data, extract patterns, and generate insights to support better decisions."
            cta="View Insights"
          />
        </div>

        <SectionDivider label="Get Started" />

        <div className="flex justify-center px-6">
          <div className="relative w-full max-w-6xl rounded-3xl p-14 bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold">
                  Build Faster with BiMind AI
                </h2>
                <p className="mt-4 text-gray-400 max-w-md">
                  One platform to chat with AI, analyze images, and explore
                  multimodal intelligence designed for developers and creators.
                </p>
                <div className="mt-6">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/60"
                  />
                </div>
                <div className="mt-5">
                  <Link
                    to="/chat"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
                  >
                    Get Started Free
                  </Link>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  No credit card required. Unsubscribe anytime.
                </p>
              </div>

              <div className="space-y-6">
                <Benefit
                  title="Real-time AI Responses"
                  desc="Fast and accurate outputs powered by Gemini’s latest models."
                />
                <Benefit
                  title="Multimodal Intelligence"
                  desc="Understand text, images, and context in a single workflow."
                />
                <Benefit
                  title="Developer-Friendly"
                  desc="Clean UI, simple flows, and APIs that just make sense."
                />
                <Benefit
                  title="Built for Scale"
                  desc="Designed to grow with your ideas and projects."
                />
              </div>
            </div>
          </div>
        </div>

        <SectionDivider label="Footer" />
      </div>

      {/* FOOTER (UNCHANGED DESIGN, BLUE LINKS) */}
      <footer className="border-t border-white/10 w-full">
        <div className="max-w-8xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px]">
                <img
                  src="https://cdn.dribbble.com/userupload/22752596/file/original-79ef8f1017847bb6be620e07b03c2bb0.gif"
                  alt="Logo"
                  className="w-full h-full rounded-md object-cover"
                />
              </div>
              <span className="text-base font-semibold">BiMind AI</span>
            </div>
            <p className="mt-4 text-sm text-gray-400 max-w-sm">
              Chat with AI, analyze images, and explore multimodal intelligence
              in one focused workspace.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <span className="text-xs uppercase tracking-wide text-gray-500">
              Product
            </span>
            <a href="#" className="hover:text-blue-400 transition">
              Features
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Use Cases
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              API
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Pricing
            </a>
          </div>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <span className="text-xs uppercase tracking-wide text-gray-500">
              Resources
            </span>
            <a href="#" className="hover:text-blue-400 transition">
              Documentation
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Guides
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Changelog
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Status
            </a>
          </div>
          <div className="md:text-right">
            <p className="text-sm text-gray-400">
              Platform status:{" "}
              <span className="text-green-400">All systems operational</span>
            </p>
            <Link
              to="/chat"
              className="inline-block mt-4 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 px-8">
          <span>
            © {new Date().getFullYear()} BiMind AI. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-400 transition">
              Privacy
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Terms
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Security
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
