import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoSvg from './assets/logo.svg';

// Pages
import Landing from './pages/Landing';
import Documentation from './pages/Documentation';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 glass-panel rounded-full px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 relative z-10">
        <img src={logoSvg} alt="VoxCtr logo" className="w-10 h-10 rounded-full" />
        <span className="font-display font-bold text-xl tracking-wide text-white">VoxCtr</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 relative z-10">
        <NavLink to="/">Overview</NavLink>
        <NavLink to="/docs">Documentation</NavLink>
        <a
          href="https://github.com/JRufer/VoxCtr"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-full border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
        >
          GitHub
        </a>
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden relative z-20 p-2 text-on-surface hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 p-6 rounded-3xl glass-panel flex flex-col gap-4 border border-white/5 md:hidden"
          >
            <MobileNavLink to="/">Overview</MobileNavLink>
            <MobileNavLink to="/docs">Documentation</MobileNavLink>
            <a
              href="https://github.com/JRufer/VoxCtr"
              target="_blank"
              rel="noreferrer"
              className="block text-lg font-medium text-primary py-2 px-4 rounded-xl hover:bg-white/5"
            >
              GitHub
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ to, children }: { to: string, children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to === '/docs' && location.pathname.startsWith('/docs'));
  return (
    <Link
      to={to}
      className={`font-medium transition-colors ${isActive ? 'text-white' : 'text-on-surface-variant hover:text-white'}`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children }: { to: string, children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to === '/docs' && location.pathname.startsWith('/docs'));
  return (
    <Link
      to={to}
      className={`block text-lg font-medium py-2 px-4 rounded-xl ${isActive ? 'bg-white/10 text-white' : 'text-on-surface-variant hover:text-white hover:bg-white/5'}`}
    >
      {children}
    </Link>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-white flex flex-col">
        <Navigation />

        <main className="flex-1 pt-32 pb-20 px-6">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/docs/*" element={<Documentation />} />
          </Routes>
        </main>

        <footer className="py-12 border-t border-white/5 mt-auto">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 opacity-60">
              <img src={logoSvg} alt="VoxCtr logo" className="w-5 h-5 rounded" />
              <span className="font-display font-medium tracking-wide">VoxCtr</span>
            </div>
            <p className="text-on-surface-variant text-sm">
              The Intelligent Audio Interface for Linux. MIT Licensed.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
