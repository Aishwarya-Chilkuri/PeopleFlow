import React, { useEffect, useState } from "react";
import "./styles/App.css";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx78P7H_ptytDWYjDn7TkLvY3J0z7D5npT9OmCgK7BPRLJ9Ppsg4d82abNWS-ba5p67GA/exec";

const employeeRanges = [
  1, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000,
];

const employeeOptions = [
  "1-25",
  "26-100",
  "101-250",
  "251-500",
  "500+",
];

const pricingTiers = [
  { max: 10, starter: 999, professional: 2499 },
  { max: 25, starter: 1499, professional: 3499 },
  { max: 50, starter: 2499, professional: 4999 },
  { max: 100, starter: 3999, professional: 6999 },
  { max: 250, starter: 6999, professional: 9999 },
  { max: 500, starter: 9999, professional: 14999 },
  { max: 1000, starter: 14999, professional: 19999 },
  { max: 2500, starter: 24999, professional: 29999 },
  { max: 5000, starter: 39999, professional: 49999 },
  { max: 10000, starter: 59999, professional: 74999 },
];

const features = [
  {
    icon: "👥",
    title: "Employee Management",
    slug: "employee-management",
    text: "Manage employee profiles, departments, roles and workforce information from one place.",
  },
  {
    icon: "🕒",
    title: "Attendance",
    slug: "attendance",
    text: "Track attendance, working hours, late arrivals and daily workforce activity.",
  },
  {
    icon: "📅",
    title: "Leave Management",
    slug: "leave-management",
    text: "Simplify leave requests, approvals, balances and leave policies.",
  },
  {
    icon: "💳",
    title: "Payroll",
    slug: "payroll",
    text: "Organize payroll information, salary structures and monthly processing.",
  },
  {
    icon: "📈",
    title: "Performance",
    slug: "performance",
    text: "Set goals, review performance and maintain employee growth records.",
  },
  {
    icon: "📄",
    title: "Documents",
    slug: "documents",
    text: "Keep employee documents organized, searchable and accessible.",
  },
  {
    icon: "📢",
    title: "Announcements",
    slug: "announcements",
    text: "Share important company updates with employees instantly.",
  },
  {
    icon: "📊",
    title: "Reports & Analytics",
    slug: "reports-analytics",
    text: "Turn HR data into useful reports for faster decision-making.",
  },
  {
    icon: "🎧",
    title: "Helpdesk",
    slug: "helpdesk",
    text: "Manage employee questions, requests and HR support tickets.",
  },
  {
    icon: "🔎",
    title: "Recruitment",
    slug: "recruitment",
    text: "Organize candidates, hiring stages and recruitment activities.",
  },
  {
    icon: "🚀",
    title: "Onboarding",
    slug: "onboarding",
    text: "Create structured onboarding journeys for new employees.",
  },
  {
    icon: "💼",
    title: "Asset Management",
    slug: "asset-management",
    text: "Track company assets assigned to employees and departments.",
  },
];

const solutions = [
  {
    icon: "👩‍💼",
    title: "For HR Teams",
    text: "Centralize everyday HR operations and reduce repetitive administrative work.",
  },
  {
    icon: "🧑‍💻",
    title: "For Managers",
    text: "Get a clear view of teams, attendance, performance and employee activity.",
  },
  {
    icon: "🙋",
    title: "For Employees",
    text: "Give employees simple access to attendance, leave, documents and HR support.",
  },
];

const steps = [
  {
    number: "01",
    title: "Set Up Your Organization",
    text: "Configure your company, departments, policies and HR preferences.",
  },
  {
    number: "02",
    title: "Add Your Employees",
    text: "Create employee profiles and organize your workforce.",
  },
  {
    number: "03",
    title: "Manage Daily HR",
    text: "Handle attendance, leave, payroll, documents and employee requests.",
  },
  {
    number: "04",
    title: "Analyze & Improve",
    text: "Use reports and insights to make better workforce decisions.",
  },
];

const security = [
  {
    icon: "🔐",
    title: "Secure Access",
    text: "Role-based access helps keep HR information protected.",
  },
  {
    icon: "🛡️",
    title: "Authentication",
    text: "Authentication controls help protect employee accounts.",
  },
  {
    icon: "☁️",
    title: "Centralized Data",
    text: "Keep important HR information organized in one system.",
  },
  {
    icon: "⚙️",
    title: "Admin Controls",
    text: "Give administrators control over HR workflows and settings.",
  },
];

const faqs = [
  {
    q: "What is PeopleFlow?",
    a: "PeopleFlow is an HRMS platform designed to bring employee management, attendance, leave, payroll, recruitment, performance and other HR operations together in one place.",
  },
  {
    q: "Who can use PeopleFlow?",
    a: "PeopleFlow is designed for HR teams, managers and employees across growing organizations.",
  },
  {
    q: "Can I manage attendance and leave?",
    a: "Yes. PeopleFlow provides dedicated modules for attendance tracking, leave requests, approvals and related HR workflows.",
  },
  {
    q: "Does PeopleFlow support different employee counts?",
    a: "Yes. The pricing calculator supports employee counts from 1 up to 10,000 employees.",
  },
  {
    q: "Can employees access their own information?",
    a: "The platform is designed around role-based access so employees can work with the information and workflows available to their role.",
  },
  {
    q: "Can I request a product demo?",
    a: "Yes. Use the Get Started or Book a Demo buttons to open the demo request page.",
  },
];

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("peopleflow-theme") || "light"
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [pricingRangeIndex, setPricingRangeIndex] = useState(0);
  const [openFeature, setOpenFeature] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    company: "",
    employees: "",
    message: "",
  });

  const [contactStatus, setContactStatus] = useState("");

  useEffect(() => {
    localStorage.setItem("peopleflow-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const pricingUsers = employeeRanges[pricingRangeIndex];

  const getPricing = (users) =>
    pricingTiers.find((tier) => users <= tier.max) ||
    pricingTiers[pricingTiers.length - 1];

  const currentPricing = getPricing(pricingUsers);

  const openDemo = () => {
    setMenuOpen(false);
    window.location.href = "/demo";
  };

  const openFeaturePage = (slug) => {
    setMenuOpen(false);
    window.location.href = `/features/${slug}`;
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  const handleNavigation = (id) => {
    if (id === "home") {
      setMenuOpen(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    scrollToSection(id);
  };

  const handleContact = async (event) => {
    event.preventDefault();

    setContactStatus("Sending...");

    const payload = {
      type: "contact",
      fullName: contact.fullName,
      email: contact.email,
      company: contact.company,
      employees: contact.employees,
      message: contact.message,
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      setContact({
        fullName: "",
        email: "",
        company: "",
        employees: "",
        message: "",
      });

      setContactStatus(
        "Thanks! Your message has been sent successfully."
      );
    } catch {
      setContactStatus(
        "Unable to send right now. Please try again."
      );
    }
  };

  return (
    <div className="site-shell">
      <header className="navbar">
        <div className="nav-container">
          <button
            className="logo"
            onClick={() => handleNavigation("home")}
            type="button"
          >
            <span className="logo-mark">P</span>
            <span>PeopleFlow</span>
          </button>

          <div className="theme-switch">
            <button
              className={theme === "light" ? "active" : ""}
              onClick={() => setTheme("light")}
              title="Light mode"
              type="button"
            >
              ☀️ <span>Light</span>
            </button>

            <button
              className={theme === "dark" ? "active" : ""}
              onClick={() => setTheme("dark")}
              title="Dark mode"
              type="button"
            >
              🌙 <span>Dark</span>
            </button>
          </div>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            {[
              "home",
              "about",
              "features",
              "solutions",
              "pricing",
              "contact",
            ].map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item)}
                type="button"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}

            <button
              className="nav-cta"
              onClick={openDemo}
              type="button"
            >
              Get Started
            </button>
          </nav>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Open menu"
            type="button"
          >
            ☰
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              SMART HRMS • SIMPLE • CONNECTED
            </span>

            <h1>
              Simplify HR.
              <br />
              <span>Empower People.</span>
            </h1>

            <p>
              PeopleFlow brings your entire HR journey together — from hiring
              and onboarding to attendance, payroll, performance and employee
              support.
            </p>

            <div className="hero-actions">
              <button
                className="primary-btn"
                onClick={openDemo}
                type="button"
              >
                Book a Demo →
              </button>

              <button
                className="secondary-btn"
                onClick={() => handleNavigation("features")}
                type="button"
              >
                Explore Features
              </button>
            </div>

            <div className="hero-points">
              <span>✓ HR in one place</span>
              <span>✓ Employee friendly</span>
              <span>✓ Built to scale</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="dashboard-card">
              <div className="dashboard-top">
                <div>
                  <span className="small-label">
                    PeopleFlow HRMS
                  </span>

                  <h3>HR Dashboard</h3>
                </div>

                <span className="online-dot">● Live</span>
              </div>

              <div className="stats-row">
                <div className="mini-stat blue">
                  <span>Employees</span>
                  <strong>248</strong>
                  <small>+12 this month</small>
                </div>

                <div className="mini-stat purple">
                  <span>Attendance</span>
                  <strong>94.8%</strong>
                  <small>Today</small>
                </div>
              </div>

              <div className="dashboard-body">
                <div className="chart-box">
                  <div className="chart-heading">
                    <span>Workforce Overview</span>
                    <span>2026</span>
                  </div>

                  <div className="bars">
                    {[45, 70, 54, 82, 63, 91, 76].map(
                      (height, index) => (
                        <span
                          key={index}
                          style={{ height: `${height}%` }}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="activity-box">
                  <div className="chart-heading">
                    <span>Quick View</span>
                  </div>

                  <div className="activity-line">
                    <b>Leave Requests</b>
                    <span>08</span>
                  </div>

                  <div className="activity-line">
                    <b>Open Tickets</b>
                    <span>14</span>
                  </div>

                  <div className="activity-line">
                    <b>New Joiners</b>
                    <span>06</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-heading">
            <span className="section-tag">About PeopleFlow</span>

            <h2>
              Everything You Need to Manage Your People
            </h2>

            <p>
              PeopleFlow brings essential HR operations together in one
              simple, professional platform, helping organizations manage
              employees, attendance, leave, performance and more.
            </p>
          </div>

          <div className="about-grid">
            <div
              className="about-card about-main"
              onClick={() =>
                setOpenFeature({
                  title: "One Connected HR Platform",
                  icon: "🏢",
                  text:
                    "PeopleFlow connects everyday HR operations in one place, making it easier to manage employees, attendance, leave, payroll, performance and other HR activities.",
                })
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setOpenFeature({
                    title: "One Connected HR Platform",
                    icon: "🏢",
                    text:
                      "PeopleFlow connects everyday HR operations in one place, making it easier to manage employees, attendance, leave, payroll, performance and other HR activities.",
                  });
                }
              }}
            >
              <span className="about-icon">🏢</span>

              <h3>One Connected HR Platform</h3>

              <p>
                Manage your complete employee lifecycle from one centralized
                HR platform designed for modern organizations.
              </p>

              <div className="about-tags">
                <span>HR Management</span>
                <span>Employee Experience</span>
                <span>Automation</span>
              </div>
            </div>

            <div
              className="about-card"
              onClick={() =>
                setOpenFeature({
                  title: "Simplify HR Operations",
                  icon: "⚡",
                  text:
                    "PeopleFlow helps HR teams reduce repetitive work and manage everyday employee operations through a centralized system.",
                })
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setOpenFeature({
                    title: "Simplify HR Operations",
                    icon: "⚡",
                    text:
                      "PeopleFlow helps HR teams reduce repetitive work and manage everyday employee operations through a centralized system.",
                  });
                }
              }}
            >
              <span className="about-icon">⚡</span>

              <h3>Simple & Efficient</h3>

              <p>
                Reduce repetitive HR work and keep important employee
                information organized and accessible.
              </p>
            </div>

            <div
              className="about-card"
              onClick={() =>
                setOpenFeature({
                  title: "Employee Experience",
                  icon: "👥",
                  text:
                    "Give employees easy access to important HR services such as attendance, leave, documents and HR support.",
                })
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setOpenFeature({
                    title: "Employee Experience",
                    icon: "👥",
                    text:
                      "Give employees easy access to important HR services such as attendance, leave, documents and HR support.",
                  });
                }
              }}
            >
              <span className="about-icon">👥</span>

              <h3>Better Employee Experience</h3>

              <p>
                Give employees a simple way to access their HR information
                and stay connected with their organization.
              </p>
            </div>
          </div>
        </section>

        <section className="section features-section" id="features">
          <div className="section-heading compact-heading">
            <span className="section-tag">
              POWERFUL FEATURES
            </span>

            <h2>Everything HR needs, connected.</h2>

            <p>
              Focused tools for everyday HR operations.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <button
                className="feature-card"
                key={feature.title}
                onClick={() => openFeaturePage(feature.slug)}
                type="button"
              >
                <span className="feature-icon">
                  {feature.icon}
                </span>

                <h3>{feature.title}</h3>

                <p>{feature.text}</p>

                <span className="learn-more">
                  Know More →
                </span>
              </button>
            ))}
          </div>
        </section>

        <section id="solutions" className="section solutions-section">
          <div className="section-heading compact-heading">
            <span className="section-tag">Solutions</span>

            <h2>Built for Every Part of Your Organization</h2>

            <p>
              PeopleFlow gives HR teams, managers and employees the tools
              they need to manage work efficiently.
            </p>
          </div>

          <div className="solutions-grid">
            {solutions.map((solution) => (
              <div
                className="solution-card"
                key={solution.title}
                onClick={() => setOpenFeature(solution)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setOpenFeature(solution);
                  }
                }}
              >
                <span className="solution-icon">
                  {solution.icon}
                </span>

                <h3>{solution.title}</h3>

                <p>{solution.text}</p>

                <span className="solution-arrow">→</span>
              </div>
            ))}
          </div>
        </section>

        <section id="steps" className="section steps-section">
          <div className="section-heading">
            <span className="section-tag">How It Works</span>

            <h2>Simple Steps to Get Started</h2>

            <p>
              Set up PeopleFlow quickly and start managing your HR operations
              from one place.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <div
                className="step-card"
                key={step.title}
                onClick={() => setOpenFeature(step)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setOpenFeature(step);
                  }
                }}
              >
                <span className="step-number">
                  {step.number}
                </span>

                <h3>{step.title}</h3>

                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="section-heading compact-heading">
            <span className="section-tag">
              PRICING
            </span>

            <h2>Choose based on your workforce.</h2>

            <p>
              Move the slider to select your employee count.
            </p>
          </div>

          <div className="pricing-calculator">
            <div className="pricing-count">
              <span>Employees</span>

              <strong>
                {pricingUsers.toLocaleString("en-IN")}
              </strong>
            </div>

            <input
              type="range"
              min="0"
              max={employeeRanges.length - 1}
              step="1"
              value={pricingRangeIndex}
              onChange={(event) =>
                setPricingRangeIndex(
                  Number(event.target.value)
                )
              }
              className="pricing-slider"
            />

            <div className="slider-labels">
              <span>1</span>
              <span>10</span>
              <span>25</span>
              <span>50</span>
              <span>100</span>
              <span>250</span>
              <span>500</span>
              <span>1K</span>
              <span>2.5K</span>
              <span>5K</span>
              <span>10K</span>
            </div>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <span className="plan-label">
                STARTER
              </span>

              <h3>Starter</h3>

              <p>
                For small teams beginning their HR journey.
              </p>

              <div className="price">
                ₹{currentPricing.starter.toLocaleString("en-IN")}
                <small>/month</small>
              </div>

              <div className="price-note">
                For up to {Math.min(pricingUsers, 10)} employees
              </div>

              <ul>
                <li>✓ Employee management</li>
                <li>✓ Attendance</li>
                <li>✓ Leave management</li>
                <li>✓ Basic reports</li>
              </ul>

              <button
                className="plan-btn"
                onClick={openDemo}
                type="button"
              >
                Get Started
              </button>
            </div>

            <div className="pricing-card featured-plan">
              <span className="popular-badge">
                POPULAR
              </span>

              <span className="plan-label">
                PROFESSIONAL
              </span>

              <h3>Professional</h3>

              <p>
                For growing organizations that need more HR control.
              </p>

              <div className="price">
                ₹{currentPricing.professional.toLocaleString("en-IN")}
                <small>/month</small>
              </div>

              <div className="price-note">
                Based on {pricingUsers.toLocaleString("en-IN")} employees
              </div>

              <ul>
                <li>✓ Everything in Starter</li>
                <li>✓ Payroll</li>
                <li>✓ Performance</li>
                <li>✓ Recruitment & onboarding</li>
                <li>✓ Advanced reports</li>
              </ul>

              <button
                className="plan-btn primary-plan"
                onClick={openDemo}
                type="button"
              >
                Book a Demo
              </button>
            </div>

            <div className="pricing-card enterprise-plan">
              <span className="plan-label">
                ENTERPRISE
              </span>

              <h3>Enterprise</h3>

              <p>
                Flexible HR operations for larger organizations.
              </p>

              <div className="price custom-price">
                Custom
              </div>

              <div className="price-note">
                For 10,000+ employees
              </div>

              <ul>
                <li>✓ Full HRMS suite</li>
                <li>✓ Advanced access controls</li>
                <li>✓ Custom workflows</li>
                <li>✓ Enterprise support</li>
              </ul>

              <button
                className="plan-btn"
                onClick={openDemo}
                type="button"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="section-heading compact-heading">
            <span className="section-tag">
              FAQ
            </span>

            <h2>Frequently asked questions.</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className="faq-item" key={faq.q}>
                <button
                  className="faq-question"
                  onClick={() =>
                    setOpenFaq(
                      openFaq === index ? null : index
                    )
                  }
                  type="button"
                >
                  <span>{faq.q}</span>

                  <b>
                    {openFaq === index ? "−" : "+"}
                  </b>
                </button>

                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div>
            <span className="section-tag">
              READY TO FLOW?
            </span>

            <h2>Make HR simpler for everyone.</h2>

            <p>
              See how PeopleFlow can fit your organization.
            </p>
          </div>

          <button
            className="primary-btn light-cta"
            onClick={openDemo}
            type="button"
          >
            Book a Demo →
          </button>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-grid">
            <div className="contact-copy">
              <span className="section-tag">
                CONTACT US
              </span>

              <h2>
                Let's talk about your HR journey.
              </h2>

              <p>
                Have a question, need a demo or want to discuss
                your HR requirements? Send us a message.
              </p>

              <div className="contact-points">
                <span>📧 hello@peopleflow.com</span>
                <span>📍 Hyderabad, India</span>
                <span>🕒 Mon – Fri, 9:30 AM – 6:30 PM</span>
              </div>
            </div>

            <form
              className="contact-form"
              onSubmit={handleContact}
            >
              <div className="form-row">
                <label>
                  Full Name *

                  <input
                    type="text"
                    value={contact.fullName}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        fullName: e.target.value,
                      })
                    }
                    required
                    placeholder="Your name"
                  />
                </label>

                <label>
                  Email *

                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({
                        ...contact,
                        email: e.target.value,
                      })
                    }
                    required
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label>
                Company

                <input
                  type="text"
                  value={contact.company}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      company: e.target.value,
                    })
                  }
                  placeholder="Company name"
                />
              </label>

              <label>
                Number of Employees *

                <select
                  name="employees"
                  value={contact.employees}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      employees: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">
                    Select employees
                  </option>

                  {employeeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Message *

                <textarea
                  value={contact.message}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      message: e.target.value,
                    })
                  }
                  required
                  rows="4"
                  placeholder="Tell us what you need..."
                />
              </label>

              <button
                className="primary-btn"
                type="submit"
              >
                Send Message →
              </button>

              {contactStatus && (
                <p className="form-status">
                  {contactStatus}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <button
              className="logo"
              onClick={() => handleNavigation("home")}
              type="button"
            >
              <span className="logo-mark">P</span>
              <span>PeopleFlow</span>
            </button>

            <p>
              Modern HR management for modern organizations.
            </p>
          </div>

          <div className="footer-links">
            <button
              onClick={() => handleNavigation("about")}
              type="button"
            >
              About
            </button>

            <button
              onClick={() => handleNavigation("features")}
              type="button"
            >
              Features
            </button>

            <button
              onClick={() => handleNavigation("solutions")}
              type="button"
            >
              Solutions
            </button>

            <button
              onClick={() => handleNavigation("pricing")}
              type="button"
            >
              Pricing
            </button>

            <button
              onClick={() => handleNavigation("contact")}
              type="button"
            >
              Contact
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 PeopleFlow. All rights reserved.
          </span>

          <span>
            HR • People • Growth
          </span>
        </div>
      </footer>

      {openFeature && (
        <div
          className="modal-overlay"
          onClick={() => setOpenFeature(null)}
        >
          <div
            className="feature-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setOpenFeature(null)}
              aria-label="Close"
              type="button"
            >
              ×
            </button>

            <span className="modal-icon">
              {openFeature.icon}
            </span>

            <h2>{openFeature.title}</h2>

            <p>{openFeature.text}</p>

            <p>
              PeopleFlow keeps this workflow connected with
              the rest of your HR operations so your team can
              manage work from one platform.
            </p>

            <button
              className="primary-btn"
              onClick={openDemo}
              type="button"
            >
              Request a Demo →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;