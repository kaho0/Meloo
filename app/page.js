'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaBrain, FaBolt, FaGlobe, FaReact, FaPython, FaNodeJs, FaJs, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { TbBrandNextjs } from 'react-icons/tb';
import { SiTensorflow } from 'react-icons/si';
import { BsQuestionCircle, BsLightningCharge, BsBook, BsTrophy } from 'react-icons/bs';

const categories = ['Web Development', 'AI & Machine Learning', 'Data Science', 'General Science', 'Programming'];

const techStack = [
  { name: 'React', icon: <FaReact className="w-10 h-10 text-blue-400" /> },
  { name: 'Next.js', icon: <TbBrandNextjs className="w-10 h-10 text-white" /> },
  { name: 'Python', icon: <FaPython className="w-10 h-10 text-yellow-400" /> },
  { name: 'TensorFlow', icon: <SiTensorflow className="w-10 h-10 text-orange-400" /> },
  { name: 'Node.js', icon: <FaNodeJs className="w-10 h-10 text-green-400" /> },
  { name: 'JavaScript', icon: <FaJs className="w-10 h-10 text-yellow-300" /> },
];

const processSteps = [
  { title: 'Ask Your Question', description: 'Start by selecting a category and asking your technical question.', icon: <BsQuestionCircle className="w-6 h-6" /> },
  { title: 'Get Smart Responses', description: 'Receive clear, detailed answers powered by advanced AI.', icon: <BsLightningCharge className="w-6 h-6" /> },
  { title: 'Deep Learning', description: 'Explore related topics and dive deeper into concepts.', icon: <BsBook className="w-6 h-6" /> },
  { title: 'Master Tech', description: 'Build your knowledge progressively.', icon: <BsTrophy className="w-6 h-6" /> },
];

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStartChat = () => {
    if (searchQuery.trim()) {
      router.push(`/chat?query=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(selectedCategory)}`);
    } else {
      router.push('/chat');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <section className="relative overflow-hidden">
        <div className="relative container mx-auto px-4 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className={`flex-1 space-y-6 text-center lg:text-left transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Unlock Your <span className="text-blue-500">Understanding</span> of Tech
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Get clear, concise answers to your tech queries powered by advanced AI
              </p>

              <div className="space-y-4 max-w-xl mx-auto lg:mx-0">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-800/50 text-white rounded-lg px-4 py-3 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What would you like to learn about?"
                  className="w-full bg-gray-800/50 backdrop-blur text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />

                <button
                  onClick={handleStartChat}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 hover:scale-105 transition-all"
                >
                  Start Learning
                </button>
              </div>
            </div>

            <div className="flex-1 hidden lg:block transform transition-all duration-1000 delay-300">
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/hero.png"
                  alt="AI Visualization"
                  fill
                  className="object-cover"
                  priority
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Smart Learning', description: 'AI-powered responses that adapt to your level', icon: <FaBrain className="w-8 h-8 text-purple-400" /> },
              { title: 'Real-time Interaction', description: 'Get instant answers to your questions', icon: <FaBolt className="w-8 h-8 text-yellow-400" /> },
              { title: 'Wide Range of Topics', description: 'From web development to AI', icon: <FaGlobe className="w-8 h-8 text-blue-400" /> }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:scale-105 transition-all">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Powered by Modern Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 hover:scale-105 transition-all flex flex-col items-center justify-center"
              >
                {tech.icon}
                <span className="text-sm font-medium text-gray-300 mt-3">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="p-6 bg-gray-900/50 rounded-xl hover:scale-105 transition-all">
                <div className="mb-4 text-blue-500">{step.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Tech Learning Assistant</h3>
              <p className="text-gray-400 text-sm">Your AI-powered learning companion for all things tech.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                {categories.slice(0, 4).map(category => (
                  <li key={category}><a href={`/chat?category=${category}`} className="hover:text-white transition-colors">{category}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaGithub className="w-6 h-6" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter className="w-6 h-6" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaLinkedin className="w-6 h-6" /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Tech Learning Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
