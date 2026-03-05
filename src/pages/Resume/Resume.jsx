import React, { useState, useEffect, useRef } from 'react';
import { FaBookReader, FaRegBookmark, FaAward, FaExternalLinkAlt } from "react-icons/fa";
import TimelineItem from './TimelineItem';
import Fireworks from '../../components/Fireworks';

const Resume = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (triggered) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          setShowPopup(true);
        }
      },
      { threshold: 0.5 }
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [triggered]);

  const handleLaunchFireworks = () => {
    setShowPopup(false);
    setShowFireworks(true);
  };

  return (
    <section>
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      <div className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <FaBookReader />
          </div>
          <h3 className="h3">Education</h3>
        </div>
        <ol className="timeline-list">
          <TimelineItem
            company="University of Colorado Boulder"
            title="Master of Computer Science"
            date="2025 — 2027"
            gpa="4"
            coursework="Machine Learning, Deep Learning, Algorithms, Database Systems, Computer Networks, Operating Systems"
          />
        </ol>
      </div>

      <div className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <FaRegBookmark />
          </div>
          <h3 className="h3">Experience</h3>
        </div>
        <ol className="timeline-list">
          <TimelineItem
            company="Nomad eCommerce"
            title="Software Engineer Intern"
            date="Nov 2025 — Feb 2026"
            description={[
              'Built a "Frequently Ordered" experience by implementing new DataPort endpoints and SQL-backed data retrieval, enabling dynamic rendering of customer-specific purchase history.',
              'Delivered stage-to-production releases across multi-tenant storefronts by replicating application changes and aligning environment-specific DataPort/database configurations, reducing deployment friction caused by DB differences.',
              'Created a Python CLI PDF Extractor to batch-process 300+ heterogeneous manuals and extract exploded-diagram assets; added a verification script to validate extraction completeness and surface failures for re-runs.',
              'Developed a JS site crawler to produce a 5K+ URL inventory for migration/SEO redirect mapping, exporting structured CSV outputs with rate limiting and stability checks.',
              'Triaged production issues across client storefronts using DevTools to trace failing requests and isolate frontend vs backend ownership, providing reproducible steps and evidence for escalation.',
              'Unblocked an urgent customer request with a minimal, reversible client-side workaround when backend dependencies were unavailable, and documented follow-up actions for a permanent fix.',
            ]}
          />
          <TimelineItem
            company="Code Chimp"
            title="Software Engineer Intern"
            date="Jun 2025 — Sep 2025"
            description={[
              'Developed a LangGraph conversational AI agent showcasing a 94% accuracy rate in classifying user intent, which allowed users to intuitively navigate and analyze complex customer business workflows.',
              'Constructed an automated system for daily insight generation, which securely extracted data from the core platform\'s Supabase database using a Lambda function and generated payment activity summaries with AWS Bedrock.',
              'Catalyzed a Retrieval Augmented Generation (RAG) pipeline leveraging Bedrock Knowledge Base and OpenSearch Vector Store for 1,000+ product-related documents, improving evaluation scores by 30% through optimized chunking strategies.',
              'Contributed to core platform engineering and automated new invoice and vault management workflows by extending tRPC APIs, leveraging Mistral AI for file classification and Trigger.dev for asynchronous tasks.',
              'Enhanced overall application quality through rigorous end-to-end debugging, most notably fixing a critical bug in the Ruby-based desktop app\'s Git sync logic that was causing recurring task failures.',
              'Collaborated with stakeholders on iterative UI/UX improvements, leveraging a CI/CD pipeline for automated testing to ensure high code quality and deployment velocity.',
            ]}
          />
          <TimelineItem
            company="Alibaba Cloud"
            title="Software Engineer Intern"
            date="Jan 2025 — Apr 2025"
            description={[
              'Engineered RESTful diagnosis entry API on the CPS server-side using Go and SQL, enabling a high-concurrency interface that facilitated real-time registration for 200+ nodes with <0.1% error rate.',
              'Improved the accuracy of A100 GPU diagnostic model by profiling bottlenecks with the Roofline model and refactoring underperforming test modules using CUDA and Python, increasing the stress test\'s applied compute and memory throughput by 26% and 25% and enabling more reliable detection of degraded GPUs.',
              'Executed pre-delivery diagnostics on 200 server nodes utilizing HB diagnostic tool, pinpointing 20 critical bottlenecks across 15 GPUs and diminishing potential delivery failures for cloud customers.',
              'Quantified an average 18% acceleration in kernel execution speed across 12 GPU models by employing a large-kernel-parameter benchmark for the self-developed GPU diagnostic tool using CUDA 12.1, and iteratively enhanced the tool\'s performance using Agile sprints.',
            ]}
          />
        </ol>
      </div>

      <div className="certificates">
        <div className="title-wrapper">
          <div className="icon-box">
            <FaAward />
          </div>
          <h3 className="h3">Certificates</h3>
        </div>
        <div className="certificate-list">
          <a
            href="https://www.credly.com/badges/76f9b09f-74d8-4f30-b06f-8ad16eb8c217/public_url"
            target="_blank"
            rel="noopener noreferrer"
            className="certificate-card"
          >
            <div className="certificate-info">
              <h4 className="h4 certificate-title">AWS Certified Cloud Practitioner</h4>
              <p className="certificate-issuer">Amazon Web Services (AWS)</p>
              <p className="certificate-id">CLF-C02</p>
            </div>
            <span className="certificate-link-icon">
              <FaExternalLinkAlt />
            </span>
          </a>
        </div>
      </div>

      <div ref={bottomRef} className="resume-bottom-trigger" />

      {showPopup && (
        <div className="firework-popup-overlay">
          <div className="firework-popup">
            <p>Thanks for reading my resume!</p>
            <button className="firework-popup-btn" onClick={handleLaunchFireworks}>
              Fireworks Delivering 
            </button>
          </div>
        </div>
      )}

      <Fireworks active={showFireworks} onFinished={() => setShowFireworks(false)} />
    </section>
  );
};

export default Resume;
