import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial, Sparkles, TorusKnot } from "@react-three/drei";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown, ArrowUp, ArrowUpRight, BriefcaseBusiness, Code2, Database,
  Download, ExternalLink, Github, Linkedin, Mail, Menu, X, Sparkles as SparklesIcon,
  Layers3, Server, ShieldCheck, Zap, MapPin, FileText
} from "lucide-react";
import "./styles.css";

const EMAIL = "goulipsharathkmar@gmail.com";
const GITHUB = "https://github.com/goulipsharathkumar";
const LINKEDIN = "https://www.linkedin.com/in/sharath-gouli-3a4b68275";
const CERTIFICATE_URL = "https://certificates.ccbp.in/intensive/irc?id=6DW7830GF7";

const projects = [
  {
    number: "01",
    title: "HireFlow",
    kicker: "JOB PORTAL + ATS",
    description: "A multi-role hiring platform built around the complete recruiter workflow — job creation, candidate applications, pipeline tracking and administration.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    icon: <BriefcaseBusiness />,
    accent: "violet"
  },
  {
    number: "02",
    title: "AI Text Summarizer",
    kicker: "AI PRODUCT",
    description: "A production-style AI summarization experience with a React frontend, Node.js API layer, Groq integration, prompt engineering and error handling.",
    stack: ["React", "Node.js", "Groq", "LLaMA 3.3 70B"],
    icon: <SparklesIcon />,
    accent: "cyan"
  },
  {
    number: "03",
    title: "FoodSafe Manager",
    kicker: "INVENTORY + EXPIRY",
    description: "A full-stack food inventory and expiry tracker designed end-to-end, including requirements, architecture decisions, SQLite migration and deployment.",
    stack: ["React", "Node.js", "SQLite", "Vercel", "Render"],
    icon: <Database />,
    accent: "emerald"
  },
  {
    number: "04",
    title: "Jobby App",
    kicker: "JOB LISTING PLATFORM",
    description: "A responsive React job platform with protected routes, JWT login, dynamic job listings, search, filters and robust loading, error and empty states.",
    stack: ["React", "Router", "REST API", "JWT"],
    icon: <Layers3 />,
    accent: "blue"
  },
  {
    number: "05",
    title: "NxtTrendz",
    kicker: "E-COMMERCE",
    description: "An e-commerce application with product listings, authentication, cart management through Context API, protected routes and order flow.",
    stack: ["React", "Context API", "JWT", "REST API"],
    icon: <Zap />,
    accent: "amber"
  }
];

const skillGroups = [
  { title: "Frontend", icon: <Code2 />, skills: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Context API", "React Router"] },
  { title: "Backend", icon: <Server />, skills: ["Node.js", "Express.js", "REST API Design", "JWT Auth", "MongoDB", "SQL", "Firebase"] },
  { title: "AI + Tools", icon: <SparklesIcon />, skills: ["Claude", "ChatGPT", "Cursor", "Prompt Engineering", "AI-assisted Debugging", "Documentation"] },
  { title: "Delivery", icon: <ShieldCheck />, skills: ["Git", "GitHub", "Vercel", "Render", "Netlify", "Postman", "VS Code"] }
];

function Scene() {
  const group = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.22;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.45) * 0.08;
  });
  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight position={[4, 4, 5]} intensity={3.2} />
      <pointLight position={[-4, -2, 3]} intensity={4} color="#7c3aed" />
      <pointLight position={[4, 1, -2]} intensity={3} color="#22d3ee" />
      <group ref={group}>
        <Float speed={1.4} rotationIntensity={0.7} floatIntensity={1.4}>
          <TorusKnot args={[1.25, 0.38, 180, 28, 2, 3]}>
            <MeshTransmissionMaterial
              backside
              samples={8}
              thickness={0.7}
              chromaticAberration={0.08}
              anisotropy={0.25}
              distortion={0.15}
              distortionScale={0.3}
              temporalDistortion={0.12}
              transmission={1}
              roughness={0.08}
              ior={1.45}
              color="#a78bfa"
            />
          </TorusKnot>
        </Float>
      </group>
      <Sparkles count={80} scale={[7, 7, 7]} size={2} speed={0.3} color="#c4b5fd" />
      <Environment preset="city" />
    </>
  );
}

function ThreeHero() {
  return (
    <Canvas dpr={[1, 1.7]} camera={{ position: [0, 0, 6], fov: 40 }} gl={{ antialias: true, alpha: true }}>
      <Scene />
    </Canvas>
  );
}

function TiltPhoto() {
  const ref = useRef(null);
  const [style, setStyle] = useState({ transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)" });
  const [roundMode, setRoundMode] = useState(false);
  const onMove = (e) => {
    if (!ref.current || window.innerWidth < 760) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setStyle({ transform: `perspective(1100px) rotateX(${-y * 10}deg) rotateY(${x * 13}deg) translateZ(16px)` });
  };
  const reset = () => setStyle({ transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)" });
  const touchRound = () => setRoundMode(v => !v);
  return (
    <div
      ref={ref}
      className={`portrait-shell ${roundMode ? "round-mode" : ""}`}
      onMouseMove={onMove}
      onMouseLeave={() => { reset(); setRoundMode(false); }}
      onPointerDown={touchRound}
      style={style}
      title="Touch or click my portrait for 3D round mode"
    >
      <div className="portrait-orbit orbit-a" />
      <div className="portrait-orbit orbit-b" />
      <div className="portrait-depth" />
      <img src="/profile.png" alt="Gouli Sharath Kumar" />
      <div className="portrait-sheen" />
      <div className="portrait-label"><span>SHARATH GOULI</span><small>FULL-STACK DEVELOPER</small></div>
      <div className="portrait-touch">TOUCH · 3D</div>
    </div>
  );
}

function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = `${e.clientX}px`;
        ref.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

function App() {
  const [menu, setMenu] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -90]);

  useEffect(() => {
    document.title = "Sharath Gouli — Full-Stack Developer";
  }, []);

  const close = () => setMenu(false);

  return (
    <div className="site">
      <motion.div className="progress" style={{ scaleX: progress }} />
      <div className="grain" />
      <CursorGlow />

      <header className="nav">
        <a className="logo" href="#home" onClick={close}><span>SG</span><i>®</i></a>
        <button className="mobile-menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
        <nav className={menu ? "nav-list open" : "nav-list"}>
          {["About", "Skills", "Projects", "Certification", "Contact"].map((x) => <a key={x} href={`#${x.toLowerCase()}`} onClick={close}>{x}</a>)}
          <a className="nav-resume" href="/Sharath-Gouli-Resume.pdf" target="_blank" rel="noreferrer"><FileText size={15}/> Resume</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <motion.div className="hero-copy" style={{ y: heroY }}>
            <div className="status"><span className="status-dot"/> OPEN TO OPPORTUNITIES <span className="status-line"/></div>
            <p className="hero-overline">Gouli P. Sharath Kumar</p>
            <h1>I build <em>digital products</em> that feel as good as they work.</h1>
            <p className="hero-lead">Full-Stack MERN Developer · Technical Program Associate · AI Tools Practitioner</p>
            <p className="hero-description">I turn business requirements into structured technical plans, responsive interfaces, APIs and production-ready web applications.</p>
            <div className="hero-buttons">
              <a className="btn-primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a>
              <a className="btn-secondary" href="/Sharath-Gouli-Resume.pdf" target="_blank" rel="noreferrer"><Download size={16}/> View resume</a>
            </div>
            <div className="hero-contact"><a href={`mailto:${EMAIL}`}><Mail size={15}/> {EMAIL}</a><span><MapPin size={15}/> Bengaluru · Open to Relocate</span></div>
          </motion.div>

          <div className="hero-stage">
            <div className="stage-ring ring-one"/><div className="stage-ring ring-two"/>
            <div className="scene"><ThreeHero /></div>
            <TiltPhoto />
            <div className="floating-pill pill-react">REACT.JS</div>
            <div className="floating-pill pill-node">NODE.JS</div>
            <div className="floating-pill pill-ai">AI × WEB</div>
          </div>
          <a className="scroll-cue" href="#about"><span>01</span><div/><ArrowDown size={16}/><span>SCROLL</span></a>
        </section>

        <section className="proof-strip" aria-label="Portfolio highlights">
          {[
            ["600+", "coding hours"],
            ["24+", "assignments"],
            ["5+", "full-stack projects"],
            ["9", "certifications"]
          ].map(([value, label], i) => (
            <motion.div key={label} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}>
              <strong>{value}</strong><span>{label}</span>
            </motion.div>
          ))}
        </section>

        <section id="about" className="section about-section">
          <div className="section-kicker">01 / ABOUT ME</div>
          <div className="about-grid">
            <h2>Developer mindset.<br/><span>Product thinking.</span></h2>
            <div className="about-copy">
              <p>I'm a Full-Stack MERN Developer with strong fundamentals in building and deploying multi-role web applications. I enjoy translating business requirements into structured technical plans, API documentation and clear delivery steps.</p>
              <p>I use AI tools such as Claude, ChatGPT and Cursor throughout planning, coding, debugging and documentation — while keeping the engineering decisions and product outcome at the center.</p>
              <div className="about-stats">
                <div><strong>5+</strong><span>Full-stack projects</span></div>
                <div><strong>9</strong><span>Industry certifications</span></div>
                <div><strong>600+</strong><span>Hours of coding</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="section-kicker">02 / CAPABILITIES</div>
          <div className="section-head"><h2>Built for the <span>full stack.</span></h2><p>From interface to API to deployment — I like understanding the whole system.</p></div>
          <div className="skills-grid">
            {skillGroups.map((group, i) => (
              <motion.article key={group.title} className="skill-panel" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} whileHover={{ y: -8 }}>
                <div className="skill-top"><span>{group.icon}</span><small>0{i+1}</small></div>
                <h3>{group.title}</h3>
                <div className="skill-tags">{group.skills.map(s => <span key={s}>{s}</span>)}</div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="projects" className="section project-section">
          <div className="section-kicker">03 / SELECTED PROJECTS</div>
          <div className="section-head project-head"><h2>Work with <span>real purpose.</span></h2><a href={GITHUB} target="_blank" rel="noreferrer">GitHub profile <Github size={16}/></a></div>
          <div className="project-stack">
            {projects.map((p, i) => (
              <motion.article className={`project ${p.accent}`} key={p.title} initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .6, delay: i * .05 }}>
                <div className="project-number">{p.number}</div>
                <div className="project-icon">{p.icon}</div>
                <div className="project-content"><span className="project-kicker">{p.kicker}</span><h3>{p.title}</h3><p>{p.description}</p><div className="stack-row">{p.stack.map(s => <span key={s}>{s}</span>)}</div></div>
                <a className="project-open" href={GITHUB} target="_blank" rel="noreferrer" aria-label={`${p.title} on GitHub`}><ArrowUpRight/></a>
                <div className="project-glow"/>
              </motion.article>
            ))}
          </div>
          <div className="project-note"><Github size={18}/><span>More repositories and source code</span><a href={GITHUB} target="_blank" rel="noreferrer">github.com/goulipsharathkumar <ArrowUpRight size={15}/></a></div>
        </section>

        <section className="section experience-section">
          <div className="section-kicker">04 / EXPERIENCE & EDUCATION</div>
          <div className="timeline">
            <div className="timeline-item"><div className="timeline-dot"/><div><span>NXTWAVE CCBP ACADEMY · 2023 — 2025</span><h3>Full-Stack Developer — MERN Track</h3><p>Completed 9 industry certifications and delivered 5+ full-stack projects independently across planning, coding, QA and deployment.</p></div></div>
            <div className="timeline-item"><div className="timeline-dot"/><div><span>EDUCATION · 2020 — 2023</span><h3>B.A. — History & Economics</h3><p>Sri Shankar Anandsingh Degree College, Hospet.</p></div></div>
            <div className="timeline-item"><div className="timeline-dot"/><div><span>ACHIEVEMENT · MAY 2026</span><h3>Industry-Ready Certificate of Specialization</h3><p>Full Stack Development with MERN · NxtWave CCBP 4.0 Intensive · Verified by NASSCOM.</p></div></div>
          </div>
        </section>

        <section id="certification" className="section certificate-section">
          <div className="section-kicker">05 / VERIFIED CREDENTIAL</div>
          <div className="certificate-grid">
            <div className="certificate-copy">
              <div className="certificate-badge"><ShieldCheck size={17}/> VERIFIED · NASSCOM</div>
              <h2>Industry-Ready <span>Certificate.</span></h2>
              <p>Full Stack Development with MERN · NxtWave CCBP 4.0 Intensive. This credential is part of my professional development portfolio.</p>
              <div className="certificate-meta"><div><small>CREDENTIAL ID</small><strong>6DW7830GF7</strong></div><div><small>ISSUED</small><strong>MAY 2026</strong></div></div>
              <a className="certificate-link" href={CERTIFICATE_URL} target="_blank" rel="noreferrer"><ExternalLink size={16}/> Verify certificate online</a>
            </div>
            <motion.a className="certificate-card" href={CERTIFICATE_URL} target="_blank" rel="noreferrer" whileHover={{ y: -8, rotateX: 3, rotateY: -3 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}>
              <div className="certificate-glow"/>
              <img src="/certificates/industry-ready-certificate.png" alt="Industry-Ready Certificate of Specialization"/>
              <div className="certificate-card-label"><span>CLICK TO VERIFY</span><ExternalLink size={14}/></div>
            </motion.a>
          </div>
        </section>

        <section className="marquee" aria-hidden="true"><div><span>FULL-STACK DEVELOPMENT</span><b>✦</b><span>PRODUCT THINKING</span><b>✦</b><span>AI-ASSISTED BUILDING</span><b>✦</b><span>WEB EXPERIENCES</span><b>✦</b></div></section>

        <section id="contact" className="section contact-section">
          <div className="contact-card">
            <div className="contact-kicker">06 / LET'S CONNECT</div>
            <h2>Have a product<br/><span>worth building?</span></h2>
            <p>I'm open to full-stack development, technical program associate and AI-focused opportunities.</p>
            <a className="email-big" href={`mailto:${EMAIL}`}>{EMAIL} <ArrowUpRight/></a>
            <div className="contact-actions"><a href={GITHUB} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a><a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a><a href="/Sharath-Gouli-Resume.pdf" target="_blank" rel="noreferrer"><FileText size={17}/> Resume</a></div>
          </div>
        </section>
      </main>

      <footer><div><b>SG</b> · Gouli P. Sharath Kumar</div><span>React · Three.js · Built with intent</span><a href="#home"><ArrowUp size={16}/></a></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
