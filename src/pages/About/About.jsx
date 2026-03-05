/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState, useRef } from "react"
import Service from "./Service";

const highlights = [
  "I ship 🚢.",
  "I learn fast 🧠.",
  "I'm the teammate who gets things done 🧑‍🤝‍🧑.",
];

const About = () => {
  const [services, setServices] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [done, setDone] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    fetch('services.json').then(res => res.json()).then(data => {
      setServices(data)
    });
  }, [])

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    let li = 0, ci = 0;
    const lines = ["", "", ""];

    const tick = () => {
      if (li >= highlights.length) {
        setDone(true);
        return;
      }
      const fullText = highlights[li];
      ci++;
      lines[li] = fullText.slice(0, ci);
      setDisplayedLines([...lines]);
      setLineIndex(li);
      setCharIndex(ci);

      if (ci >= fullText.length) {
        li++;
        ci = 0;
        setTimeout(tick, 400);
      } else {
        setTimeout(tick, 45);
      }
    };

    setTimeout(tick, 600);
  }, [])

  return (
    <article className="about active" data-page="about">

      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="about-text">
        <h3 className="h3 about-subtitle">Our time is precious — here's the quick version:</h3>
        <ul className="about-highlights">
          {highlights.map((line, i) => (
            <li key={i} className={i <= lineIndex || done ? "typewriter-visible" : "typewriter-hidden"}>
              {displayedLines[i] || ""}
              {!done && i === lineIndex && <span className="typewriter-cursor">|</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* Service Section */}
      <section className="service">
        <h3 className="h3 service-title">What I'm doing</h3>

        <ul className="service-list">
          {services.map((service, index) => (
            <Service
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </ul>
      </section>

      {/* TODO: Experience Highlights - temporarily hidden, uncomment to restore
      <section className="experience-highlights">
        <h3 className="h3 service-title">Experience Highlights</h3>
        
        <div className="experience-grid">
          <div className="experience-item">
            <div className="experience-icon">🚀</div>
            <h4>Alibaba Cloud AI Infrastructure</h4>
            <p>Developed high-performance GPU diagnostic tools, optimized CUDA kernels achieving 26% throughput improvement, and built APIs supporting 200+ nodes</p>
          </div>

          <div className="experience-item">
            <div className="experience-icon">🤖</div>
            <h4>AI-Powered Applications</h4>
            <p>Created Planr - an intelligent planning tool with OpenAI integration, featuring natural language task planning and schema-based AI workflows</p>
          </div>

          <div className="experience-item">
            <div className="experience-icon">💻</div>
            <h4>Full-Stack Web Development</h4>
            <p>Built multiple production applications including e-commerce platforms and booking systems using React, Redux, Flask, and cloud technologies</p>
          </div>

          <div className="experience-item">
            <div className="experience-icon">⚡</div>
            <h4>Performance Engineering</h4>
            <p>Expert in system optimization, database performance tuning, and scalable architecture design for high-load applications</p>
          </div>
        </div>
      </section>
      */}

      {/* Technologies */}
      <section className="technologies">
        <h3 className="h3 service-title">Tech Stack</h3>
        
        <div className="tech-categories">
          <div className="tech-category">
            <h4>Languages</h4>
            <div className="tech-tags">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">JavaScript</span>
              <span className="tech-tag">Java</span>
              <span className="tech-tag">SQL</span>
              <span className="tech-tag">HTML</span>
              <span className="tech-tag">CSS</span>
              <span className="tech-tag">Golang</span>
            </div>
          </div>

          <div className="tech-category">
            <h4>Frameworks & Libraries</h4>
            <div className="tech-tags">
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">React</span>
              <span className="tech-tag">Redux</span>
              <span className="tech-tag">Express</span>
              <span className="tech-tag">Flask</span>
              <span className="tech-tag">Spring Boot</span>
            </div>
          </div>

          <div className="tech-category">
            <h4>Tools</h4>
            <div className="tech-tags">
              <span className="tech-tag">Docker</span>
              <span className="tech-tag">Git</span>
              <span className="tech-tag">AWS</span>
              <span className="tech-tag">Azure</span>
              <span className="tech-tag">Supabase</span>
              <span className="tech-tag">Trigger.dev</span>
              <span className="tech-tag">OpenAI APIs</span>
              <span className="tech-tag">CI/CD</span>
              <span className="tech-tag">Linux</span>
            </div>
          </div>
        </div>
      </section>

    </article>
  )
}

export default About