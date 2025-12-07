"use client";

import { useEffect, useRef, useState } from "react";
import LaserFlow from "@/components/LaserFlow";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          ar?: boolean;
          'auto-rotate'?: boolean;
          'camera-controls'?: boolean;
          'interaction-prompt'?: string;
          exposure?: string;
        },
        HTMLElement
      >;
    }
  }
}

import { ShootingStars } from "@/components/ui/shooting-stars";

const projects = [
  {
    title: "ATHLETIC INTEREST RECREATION",
    year: "2024",
    tags: ["LONG FORM", "EDIT", "STORYTELLING"],
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
  },
  {
    title: "SHEIN FASHION BRAND",
    year: "2024",
    tags: ["COMMERCIAL", "EDIT", "BRAND"],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
  },
  {
    title: "TECH WISER",
    year: "2024",
    tags: ["TECH", "EDIT", "YOUTUBE"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
  },
  {
    title: "PODCAST HOOK",
    year: "2024",
    tags: ["PODCAST", "EDIT", "AUDIO"],
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
  },
  {
    title: "ALI ABDAAL SHORTS",
    year: "2024",
    tags: ["SHORT FORM", "SOCIAL", "YOUTUBE"],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
  },
  {
    title: "OLYMPICS COVERAGE",
    year: "2024",
    tags: ["SHORT FORM", "SPORTS", "EDIT"],
    image: "https://images.unsplash.com/photo-1565186092588-a4937e7f9c2c?w=800&q=80",
  },
  {
    title: "PAW BHAJI STORY",
    year: "2024",
    tags: ["LONG FORM", "FOOD", "CREATIVE"],
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80",
  },
  {
    title: "TEXT EDIT",
    year: "2024",
    tags: ["SHORT FORM", "MOTION", "DESIGN"],
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
  },
];

const services = [
  "Commercials",
  "Brand films",
  "Trailers",
  "Music videos",
  "Docu-style",
  "YouTube edits",
  "Short-form hooks",
  "Motion polish",
  "Color + sound",
  "4K delivery",
];

const process = [
  {
    title: "Story-first brief",
    desc: "Clarify objective, tone, length, and must-use moments. Quick call, shared board, locked brief.",
  },
  {
    title: "Cut + cadence",
    desc: "Build the spine, tempo map, and hook. Layer selects, rhythm, temp music, and captions if needed.",
  },
  {
    title: "Grade + polish",
    desc: "Color pipelines for log/RAW, tasteful grain, light FX, balanced VO/music/SFX, QC for platforms.",
  },
  {
    title: "Delivery + variants",
    desc: "Master + aspect ratios (16:9 / 9:16 / 1:1), burned-in captions on request, export specs aligned.",
  },
];

const capabilities = [
  { icon: "🎬", title: "Commercial Cuts", desc: "30s to 60s punchy ads for brands, apps, and social" },
  { icon: "🎵", title: "Music Videos", desc: "Rhythm-first editing, color grades, and visual storytelling" },
  { icon: "📱", title: "Short-Form", desc: "TikTok, YouTube Shorts, Reels—fast hooks and captions" },
  { icon: "🎥", title: "Brand Films", desc: "4K documentary-style to polished cinematic pieces" },
  { icon: "🎞️", title: "Trailers", desc: "Teasers, sizzles, and launch sequences for films/games" },
  { icon: "🎨", title: "Color & Motion", desc: "Grade-to-finish, VFX integration, and graphics polish" },
];

const caseStudies = [
  {
    title: "Neon Streets Spec",
    client: "Self-Directed",
    role: "Edit, Color, Sound Design",
    outcome: "2.8M views, finalist in 3 festivals",
    desc: "A hyper-cut 90-second spec commercial merging night-city b-roll with kinetic typography. Color graded for high-contrast neon aesthetic; sound designed with modular synth textures and impact FX.",
  },
  {
    title: "Café Lumen Brand",
    client: "Atlas Coffee",
    role: "Edit, Grade",
    outcome: "42% engagement lift, 180K organic reach",
    desc: "4K documentary-style piece celebrating a local roastery. Warm, naturalistic color palette; subtle grain film texture. Docu cuts with VO overlay and ambient soundscape.",
  },
  {
    title: "Pulse Music Video",
    client: "Neon Drift (Artist)",
    role: "Edit, VFX, Grade",
    outcome: "400K views in 6 weeks",
    desc: "Electronic track gets fast-cut treatment with light leaks, speed ramps, and color pop. VFX compositing for geometric shapes and glow effects; synced to beat-drops.",
  },
  {
    title: "Founder in 60s",
    client: "AppFlow Startup",
    role: "Edit, Captions, Motion",
    outcome: "18% conversion to sign-up page",
    desc: "Short-form hook-first promo. On-screen captions, fast cuts, product b-roll. Edited for YouTube and TikTok; mobile-first UX captions. Burned-in subs for cross-platform.",
  },
];

const testimonials = [
  {
    quote: "Tracks the emotion in every frame. Pacing, color, and sound all align to the story. Fast, collaborative, and clear on delivery specs.",
    name: "Jordan Lee",
    role: "Creative Director, Atlas Agency",
  },
  {
    quote: "Best short-form editor I've worked with. Understands hooks, retention, and platform requirements. Delivered 3 variants in 48 hours.",
    name: "Maya Patel",
    role: "Head of Content, TechStart",
  },
  {
    quote: "Neon Streets was a game-changer for our reel. Client loved the color work and pacing. Highly recommend.",
    name: "Chris Murphy",
    role: "Executive Producer, 3AM Films",
  },
];

const stats = [
  { label: "Projects Launched", value: "110+", unit: "" },
  { label: "Views Across Work", value: "120", unit: "M+" },
  { label: "Avg. Response Time", value: "18", unit: "h" },
  { label: "Client Retention", value: "94", unit: "%" },
];

const Starfield = () => (
  <div className="starfield" aria-hidden>
    <div className="star-layer" />
    <div className="star-layer light" />
    <div className="star-layer micro" />
  </div>
);

const CursorTrail = () => {
  const tailRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tail = tailRef.current;
    const star = starRef.current;
    const halo = haloRef.current;
    if (!tail || !star || !halo) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) {
      halo.style.opacity = "0";
      tail.style.opacity = "0";
      star.style.opacity = "0";
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const handleMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      tail.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      star.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(12deg)`;
      halo.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handleMove);
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={tailRef} className="cursor-tail" aria-hidden />
      <div ref={starRef} className="cursor-star" aria-hidden />
      <div ref={haloRef} className="cursor-halo" aria-hidden />
    </>
  );
};

const ScrollReveal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`scroll-reveal ${isVisible ? "visible" : ""}`}>
      {children}
    </div>
  );
};

const StatCounter = ({ target }: { target: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const numericValue = target;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && count === 0) {
          let current = 0;
          const increment = Math.ceil(numericValue / 40);
          const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
              setCount(numericValue);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, 30);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericValue, count]);

  return (
    <div ref={ref} className="stat-box">
      <div className="stat-value">{count}</div>
    </div>
  );
};

const ScrollText = ({ children, isHero = false }: { children: string; isHero?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(isHero);

  useEffect(() => {
    if (isHero) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isHero]);

  const words = children.split(" ");

  return (
    <div ref={ref} className="reveal-text">
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            animationDelay: isInView ? `${i * 0.1}s` : "none",
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="testimonial-carousel">
      {testimonials.map((t, i) => (
        <div key={i} className={`testimonial-slide ${i === current ? "active" : ""}`}>
          <p className="testimonial-quote">"{t.quote}"</p>
          <div className="testimonial-author">
            <strong>{t.name}</strong>
            <span>{t.role}</span>
          </div>
        </div>
      ))}
      <div className="carousel-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const ModelViewer3D = () => {
  // pointer-follow rotation for subtle interactivity and a thinking bubble
  const mvRef = useRef<any>(null);
  const timerRef = useRef<number | null>(null);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    const el = mvRef.current as any;
    if (!el) return;

    let pointerX = 0;
    let pointerY = 0;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointerX = (e.clientX - rect.left) / rect.width - 0.5;
      pointerY = (e.clientY - rect.top) / rect.height - 0.5;
      // apply gentle rotation via CSS vars consumed by inline style
      el.style.setProperty("--rx", `${(-pointerY * 6).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(pointerX * 10).toFixed(2)}deg`);
    };

    const onLeave = () => {
      el.style.setProperty("--rx", `0deg`);
      el.style.setProperty("--ry", `0deg`);
    };

    window.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = () => {
    setThinking(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    // auto-hide after 3s
    timerRef.current = window.setTimeout(() => setThinking(false), 3000);
  };

  return (
    <div className="model-wrap" onClick={handleClick}>
      {/* TS ignore: custom element typing handled at runtime */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <model-viewer
        ref={mvRef}
        src="https://modelviewer.dev/shared-assets/models/RobotExpressive.glb"
        alt="Designer character"
        ar
        exposure="1"
        auto-rotate
        camera-controls
        interaction-prompt="none"
        style={{
          transform: "rotateX(var(--rx, 0)) rotateY(var(--ry, 0))",
          transition: "transform 320ms cubic-bezier(0.2,0.9,0.2,1)",
        }}
      ></model-viewer>

      <div className={`thought-bubble ${thinking ? "visible" : ""}`} aria-hidden>
        <div className="thought-icons">✏️ <span className="sep">🎨</span> 🎬</div>
        <div className="thought-text">Sketching ideas...</div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="page relative">
      {/* Fixed Background with Stars */}
      <div className="fixed inset-0 z-0 bg-black overflow-hidden">
        {/* Galaxy Depth Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-black to-black opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,200,0.3)_0%,rgba(0,0,0,0)_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_30%_70%,rgba(100,200,255,0.15)_0%,rgba(0,0,0,0)_50%)]" />
        
        {/* Starfield */}
        <Starfield />
        
        {/* Shooting Stars - Multiple layers for more frequency */}
        <ShootingStars
          starColor="#9E00FF"
          trailColor="#2EB9DF"
          minSpeed={15}
          maxSpeed={35}
          minDelay={600}
          maxDelay={1500}
        />
        <ShootingStars
          starColor="#FF0099"
          trailColor="#FFB800"
          minSpeed={10}
          maxSpeed={25}
          minDelay={800}
          maxDelay={1800}
        />
        <ShootingStars
          starColor="#00FF9E"
          trailColor="#00B8FF"
          minSpeed={18}
          maxSpeed={38}
          minDelay={700}
          maxDelay={1600}
        />
        <ShootingStars
          starColor="#FFD700"
          trailColor="#FF6B9D"
          minSpeed={12}
          maxSpeed={28}
          minDelay={900}
          maxDelay={1900}
        />
      </div>

      <div className="container relative z-10">
        <header className="site-header">
          <div className="navbar-pill">
            <div className="social-icons">
              <a href="#" aria-label="Twitter">𝕏</a>
              <a href="#" aria-label="GitHub">󠀠</a>
              <a href="#" aria-label="LinkedIn">in</a>
            </div>
            <nav className="main-nav">
              <a href="#work">Projects</a>
              <a href="#about">About</a>
            </nav>
          </div>
        </header>

        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <ScrollText isHero={true}>VIDEO EDITOR</ScrollText>
              </h1>
              <p className="hero-subtitle">A 20 YEAR OLD VIDEO EDITOR AND DESIGNER FROM JAIPUR WITH 2+ YEARS EXPERIENCE</p>
              <p className="hero-description">CRAFTING ENGAGING AND VISUALLY COMPELLING STORIES WITH A KEEN EYE FOR DETAIL</p>
            </div>
            <div className="hero-image-wrapper">
              <div className="hero-image">
                <img src="/clientpp.png" alt="Video Editor" />
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="projects-wrapper">
          <h2 className="section-heading projects-heading">SELECTED WORK</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={project.title} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-info">
                  <div className="project-meta">
                    <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-content">
            <h2 className="section-heading">ABOUT</h2>
            <p className="about-statement">I TRANSFORM FOOTAGES INTO ENGAGING STORIES AND VISUAL MASTERPIECES</p>
            <p className="about-statement">I EDIT LONG FORM CONTENT, SHORT FORM VIDEOS & DESIGN THUMBNAILS</p>
            <p className="about-statement">WITH PASSION FOR CRAFTING VISUALLY COMPELLING NARRATIVES</p>
          </div>
          <div className="skills-section">
            <h3 className="skills-heading">SOFTWARES</h3>
            <div className="skills-list">
              <span className="skill-tag">PREMIERE PRO</span>
              <span className="skill-tag">AFTER EFFECTS</span>
              <span className="skill-tag">PHOTOSHOP</span>
              <span className="skill-tag">DAVINCI RESOLVE</span>
            </div>
          </div>
        </section>

        <div className="section-title" style={{display: 'none'}}>Capabilities</div>
        <ScrollReveal>
          <div className="capabilities-grid">
            {capabilities.map((cap) => (
              <div key={cap.title} className="capability-card hover-lift">
                <div className="cap-icon">{cap.icon}</div>
                <h3>{cap.title}</h3>
                <p>{cap.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="section-title">Expertise</div>
        <div className="marquee" aria-label="Services marquee">
          <div className="marquee-track">
            {[...services, ...services].map((item, idx) => (
              <div key={`${item}-${idx}`} className="pill">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="section-title">Process</div>
        <ScrollReveal>
          <div className="process-grid">
            {process.map((step, idx) => (
              <div key={step.title} className="process-card hover-lift">
                <div className="process-step">{idx + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="section-title">Featured Case Studies</div>
        <ScrollReveal>
          <div className="case-studies-grid">
            {caseStudies.map((cs) => (
              <div key={cs.title} className="case-study-card hover-lift">
                <div className="cs-header">
                  <h3>{cs.title}</h3>
                  <p className="cs-client">{cs.client}</p>
                </div>
                <p className="cs-desc">{cs.desc}</p>
                <div className="cs-meta">
                  <div className="cs-role">
                    <span className="label">Role</span>
                    <span className="value">{cs.role}</span>
                  </div>
                  <div className="cs-outcome">
                    <span className="label">Outcome</span>
                    <span className="value">{cs.outcome}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="section-title">Stats</div>
        <ScrollReveal>
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card hover-lift">
                <div className="stat-value">
                  <StatCounter target={parseInt(stat.value.replace(/\D/g, ""))} />
                  <span>{stat.unit}</span>
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="section-title">Testimonials</div>
        <ScrollReveal>
          <TestimonialCarousel />
        </ScrollReveal>
        <div className="quote">
          <p>
            “Tracks the emotion in every frame. Pacing, color, and sound all align to the story. Fast, collaborative,
            and clear on delivery specs.”
          </p>
          <span>— Creative Director, Atlas Agency</span>
        </div>

        <footer id="contact" className="site-footer">
          <div className="footer-content">
            <div className="footer-main">
              <h2 className="footer-heading">PIYUSH VIJAY</h2>
              <p className="availability">AVAILABLE FOR FREELANCE WORK</p>
            </div>
            <div className="footer-contact">
              <p className="contact-label">HAVE A PROJECT IN MIND?</p>
              <a href="mailto:piyushh.worksample@gmail.com" className="contact-email">PIYUSHH.WORKSAMPLE@GMAIL.COM</a>
            </div>
            <div className="footer-links">
              <div className="social-links">
                <a href="https://instagram.com/piyushvijay" target="_blank" rel="noopener">INSTAGRAM</a>
                <a href="https://linkedin.com/in/piyushvijay" target="_blank" rel="noopener">LINKEDIN</a>
                <a href="mailto:piyushh.worksample@gmail.com">EMAIL</a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2025 PIYUSH VIJAY</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
