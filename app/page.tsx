import { UserButton } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <Image src="/logo.svg" width={40} height={40} alt="Testify AI Logo" />
          <span style={styles.logoText}>Testify AI</span>
        </div>
        <nav style={styles.nav}>
          <Link href="/workspace" style={styles.navLink}>Workspace</Link>
          <Link href="#features" style={styles.navLink}>Features</Link>
          <Link href="#pricing" style={styles.navLink}>Pricing</Link>
        </nav>
        <UserButton />
      </header>

      {/* Hero Section */}
      <main style={styles.hero}>
        <div style={styles.badge}>Next-Gen Test Automation</div>
        <h1 style={styles.title}>
          Automate your tests with <span style={styles.gradient}>AI Precision</span>
        </h1>
        <p style={styles.subtitle}>
          Testify AI helps you build, run, and maintain end-to-end tests faster than ever using advanced agentic intelligence.
        </p>
        <div style={styles.ctaGroup}>
          <Link href="/workspace" style={styles.primaryCta}>Get Started for Free</Link>
          <Link href="#demo" style={styles.secondaryCta}>View Demo</Link>
        </div>
      </main>

      {/* Features Grid */}
      <section id="features" style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.icon}>🤖</div>
          <h3 style={styles.cardTitle}>AI-Driven</h3>
          <p style={styles.cardText}>Our agent understands your UI and writes tests just like a human would.</p>
        </div>
        <div style={styles.card}>
          <div style={styles.icon}>⚡</div>
          <h3 style={styles.cardTitle}>Lightning Fast</h3>
          <p style={styles.cardText}>Run thousands of tests in parallel across different browsers and devices.</p>
        </div>
        <div style={styles.card}>
          <div style={styles.icon}>🛠️</div>
          <h3 style={styles.cardTitle}>Self-Healing</h3>
          <p style={styles.cardText}>Tests automatically adapt to UI changes, reducing maintenance overhead.</p>
        </div>
      </section>

      <footer style={styles.footer}>
        © 2026 Testify AI. All rights reserved.
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff", // Changed from #09090b
    color: "#18181b", // Changed from #fafafa
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    padding: "0 2rem",
    boxSizing: "border-box",
  },
  header: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem 0",
    marginBottom: "4rem",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  logoText: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#0f172a",
  },
  nav: {
    display: "flex",
    gap: "2rem",
  },
  navLink: {
    color: "#64748b",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "0.95rem",
    transition: "color 0.2s",
  },
  hero: {
    textAlign: "center",
    maxWidth: "800px",
    marginBottom: "6rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem",
  },
  badge: {
    display: "inline-block",
    padding: "0.4rem 1rem",
    borderRadius: "9999px",
    backgroundColor: "#f1f5f9",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#2563eb",
    marginBottom: "1.5rem",
    border: "1px solid #e2e8f0",
  },
  title: {
    fontSize: "4rem",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 1.1,
    margin: "0 0 1.5rem 0",
    color: "#0f172a",
  },
  gradient: {
    background: "linear-gradient(to right, #2563eb, #7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "1.25rem",
    color: "#475569",
    lineHeight: 1.6,
    margin: "0 0 2.5rem 0",
    maxWidth: "600px",
  },
  ctaGroup: {
    display: "flex",
    gap: "1rem",
  },
  primaryCta: {
    padding: "0.875rem 2rem",
    borderRadius: "12px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: 600,
    textDecoration: "none",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2), 0 2px 4px -2px rgba(37, 99, 235, 0.1)",
  },
  secondaryCta: {
    padding: "0.875rem 2rem",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    fontWeight: 600,
    textDecoration: "none",
    border: "1px solid #e2e8f0",
    transition: "background-color 0.2s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    width: "100%",
    maxWidth: "1100px",
    marginBottom: "6rem",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #f1f5f9",
    borderRadius: "20px",
    padding: "2rem",
    transition: "all 0.3s ease",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  icon: {
    fontSize: "2.5rem",
    marginBottom: "1.25rem",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
    margin: "0 0 0.75rem 0",
    color: "#0f172a",
  },
  cardText: {
    fontSize: "1rem",
    color: "#64748b",
    lineHeight: 1.6,
    margin: 0,
  },
  footer: {
    width: "100%",
    maxWidth: "1200px",
    textAlign: "center",
    padding: "2rem 0",
    fontSize: "0.875rem",
    color: "#94a3b8",
    borderTop: "1px solid #f1f5f9",
    marginTop: "auto",
  },
};
