/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react"
import Service from "./Service";

const About = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Load services
    fetch('services.json').then(res => res.json()).then(data => {
      setServices(data)
    });
  }, [])

  return (
    <article className="about active" data-page="about">

      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="about-text">
        <h3 className="h3 about-subtitle">Our time is precious — here's the quick version:</h3>
        <ul className="about-highlights">
          <li>I ship 🚢.</li>
          <li>I learn fast 🧠.</li>
          <li>I'm the teammate who gets things done 🧑‍🤝‍🧑.</li>
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