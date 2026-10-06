import React, { useEffect, useState } from "react";
import "./styles/Demo.css";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx78P7H_ptytDWYjDn7TkLvY3J0z7D5npT9OmCgK7BPRLJ9Ppsg4d82abNWS-ba5p67GA/exec";
const employeeOptions = [
  "1–10",
  "11–25",
  "26–50",
  "51–100",
  "101–250",
  "251–500",
  "501–1,000",
  "1,001–2,500",
  "2,501–5,000",
  "5,001–10,000",
  "10,000+",
];

const requirements = [
  "Employee Management",
  "Attendance",
  "Leave Management",
  "Payroll",
  "Performance",
  "Recruitment",
  "Onboarding",
  "Documents",
  "Reports & Analytics",
  "Helpdesk",
  "Asset Management",
  "Other",
];

function Demo() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("peopleflow-theme") || "light"
  );

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    phone: "",
    employees: "",
    role: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [selectedRequirements, setSelectedRequirements] = useState([]);

  const [status, setStatus] = useState("");

  useEffect(() => {
    localStorage.setItem("peopleflow-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const toggleRequirement = (item) => {
    setSelectedRequirements((previous) =>
      previous.includes(item)
        ? previous.filter((value) => value !== item)
        : [...previous, item]
    );
  };

  const goHome = () => {
    window.location.href = "/";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("Submitting your request...");

    const payload = {
      type: "demo",
      fullName: formData.fullName,
      email: formData.workEmail,
      company: formData.company,
      phone: formData.phone,
      employees: formData.employees,
      role: formData.role,
      requirements: selectedRequirements,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      message: formData.message,
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

      setStatus(
        "Thank you! Your demo request has been submitted successfully."
      );

      setFormData({
        fullName: "",
        workEmail: "",
        company: "",
        phone: "",
        employees: "",
        role: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });

      setSelectedRequirements([]);
    } catch {
      setStatus(
        "Your request could not be submitted right now. Please try again."
      );
    }
  };

  return (
    <div className="demo-page">
      {/* HEADER */}

      <header className="demo-navbar">
        <div className="demo-nav-container">
          <button
            className="demo-logo"
            onClick={goHome}
            type="button"
          >
            <span className="demo-logo-mark">P</span>

            <span>PeopleFlow</span>
          </button>

          <div className="demo-theme-switch">
            <button
              className={theme === "light" ? "active" : ""}
              onClick={() => setTheme("light")}
              type="button"
              title="Light mode"
            >
              ☀️ <span>Light</span>
            </button>

            <button
              className={theme === "dark" ? "active" : ""}
              onClick={() => setTheme("dark")}
              type="button"
              title="Dark mode"
            >
              🌙 <span>Dark</span>
            </button>
          </div>

          <button
            className="demo-back-btn"
            onClick={goHome}
            type="button"
          >
            ← Back to Website
          </button>
        </div>
      </header>

      {/* HERO */}

      <main>
        <section className="demo-hero">
          <div className="demo-hero-content">
            <span className="demo-eyebrow">
              PEOPLEFLOW HRMS
            </span>

            <h1>
              See PeopleFlow
              <span> in action.</span>
            </h1>

            <p>
              Tell us a little about your organization and HR
              requirements. Our team can walk you through the
              PeopleFlow HRMS platform and its features.
            </p>

            <div className="demo-benefits">
              <div className="demo-benefit">
                <span>✓</span>

                <div>
                  <strong>Personalized Demo</strong>

                  <small>
                    Explore workflows relevant to your organization.
                  </small>
                </div>
              </div>

              <div className="demo-benefit">
                <span>✓</span>

                <div>
                  <strong>HRMS Overview</strong>

                  <small>
                    See employee, attendance, leave and HR modules.
                  </small>
                </div>
              </div>

              <div className="demo-benefit">
                <span>✓</span>

                <div>
                  <strong>Ask Questions</strong>

                  <small>
                    Discuss your requirements with our team.
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="demo-preview">
            <div className="preview-card">
              <div className="preview-header">
                <div>
                  <span>PEOPLEFLOW</span>

                  <h3>HRMS Overview</h3>
                </div>

                <span className="preview-live">
                  ● Live
                </span>
              </div>

              <div className="preview-stats">
                <div className="preview-stat blue-stat">
                  <span>Employees</span>

                  <strong>248</strong>

                  <small>Active workforce</small>
                </div>

                <div className="preview-stat purple-stat">
                  <span>Attendance</span>

                  <strong>94.8%</strong>

                  <small>Today's status</small>
                </div>

                <div className="preview-stat teal-stat">
                  <span>Leave</span>

                  <strong>08</strong>

                  <small>Pending requests</small>
                </div>
              </div>

              <div className="preview-workflow">
                <div className="workflow-heading">
                  <span>HR Workflow</span>

                  <small>PeopleFlow</small>
                </div>

                <div className="workflow-step completed">
                  <span>✓</span>

                  <div>
                    <strong>Employee Added</strong>

                    <small>Employee Management</small>
                  </div>
                </div>

                <div className="workflow-step">
                  <span>2</span>

                  <div>
                    <strong>Attendance Tracked</strong>

                    <small>Daily attendance</small>
                  </div>
                </div>

                <div className="workflow-step">
                  <span>3</span>

                  <div>
                    <strong>Performance Reviewed</strong>

                    <small>Employee growth</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FORM */}

        <section className="demo-form-section">
          <div className="demo-form-heading">
            <span className="demo-section-tag">
              REQUEST A DEMO
            </span>

            <h2>Let's understand your HR needs.</h2>

            <p>
              Fill in the details below and we'll use them to
              understand what you want to explore.
            </p>
          </div>

          <form
            className="demo-form"
            onSubmit={handleSubmit}
          >
            <div className="form-section-title">
              <span>01</span>

              <div>
                <h3>Your Details</h3>

                <p>
                  Tell us who we will be speaking with.
                </p>
              </div>
            </div>

            <div className="demo-form-grid">
              <label>
                Full Name *

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label>
                Work Email *

                <input
                  type="email"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                />
              </label>

              <label>
                Company Name *

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company"
                  required
                />
              </label>

              <label>
                Phone Number

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </label>

              <label>
                Your Role

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">
                    Select your role
                  </option>

                  <option value="HR">
                    HR / HR Manager
                  </option>

                  <option value="HR Head">
                    HR Head
                  </option>

                  <option value="Founder">
                    Founder / Business Owner
                  </option>

                  <option value="Manager">
                    Manager
                  </option>

                  <option value="IT">
                    IT / Admin
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </label>

              <label>
                Number of Employees

                <select
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                >
                  <option value="">
                    Select employee count
                  </option>

                  {employeeOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-divider" />

            <div className="form-section-title">
              <span>02</span>

              <div>
                <h3>
                  What would you like to explore?
                </h3>

                <p>
                  Select the HRMS areas you are interested in.
                </p>
              </div>
            </div>

            <div className="requirements-grid">
              {requirements.map((item) => {
                const selected =
                  selectedRequirements.includes(item);

                return (
                  <button
                    key={item}
                    type="button"
                    className={`requirement-chip ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() => toggleRequirement(item)}
                  >
                    <span>
                      {selected ? "✓" : "+"}
                    </span>

                    {item}
                  </button>
                );
              })}
            </div>

            <div className="form-divider" />

            <div className="form-section-title">
              <span>03</span>

              <div>
                <h3>Schedule Your Demo</h3>

                <p>
                  Choose a preferred date and time.
                </p>
              </div>
            </div>

            <div className="demo-form-grid">
              <label>
                Preferred Date

                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                />
              </label>

              <label>
                Preferred Time

                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                >
                  <option value="">
                    Select preferred time
                  </option>

                  <option value="10:00 AM">
                    10:00 AM
                  </option>

                  <option value="11:00 AM">
                    11:00 AM
                  </option>

                  <option value="12:00 PM">
                    12:00 PM
                  </option>

                  <option value="2:00 PM">
                    2:00 PM
                  </option>

                  <option value="3:00 PM">
                    3:00 PM
                  </option>

                  <option value="4:00 PM">
                    4:00 PM
                  </option>

                  <option value="5:00 PM">
                    5:00 PM
                  </option>
                </select>
              </label>
            </div>

            <label className="full-width-field">
              Anything else you'd like us to know?

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Tell us about your current HR process, challenges or requirements..."
              />
            </label>

            <div className="demo-submit-area">
              <div>
                <strong>
                  Ready to explore PeopleFlow?
                </strong>

                <span>
                  We'll use your information only to understand
                  your demo requirements.
                </span>
              </div>

              <button
                className="demo-submit-btn"
                type="submit"
              >
                Request Demo →
              </button>
            </div>

            {status && (
              <div className="demo-status">
                {status}
              </div>
            )}
          </form>
        </section>

        {/* BOTTOM CTA */}

        <section className="demo-bottom">
          <div>
            <span className="demo-section-tag">
              PEOPLEFLOW HRMS
            </span>

            <h2>
              One platform. One connected HR journey.
            </h2>

            <p>
              Simplify HR operations and create a better
              employee experience.
            </p>
          </div>

          <button
            className="demo-outline-btn"
            onClick={goHome}
            type="button"
          >
            Explore PeopleFlow →
          </button>
        </section>
      </main>

      {/* FOOTER */}

      <footer className="demo-footer">
        <div className="demo-footer-inner">
          <div className="demo-footer-brand">
            <button
              className="demo-logo"
              onClick={goHome}
              type="button"
            >
              <span className="demo-logo-mark">
                P
              </span>

              <span>PeopleFlow</span>
            </button>

            <p>
              Modern HR management for modern organizations.
            </p>
          </div>

          <div className="demo-footer-links">
            <button onClick={goHome} type="button">
              Home
            </button>

            <button onClick={goHome} type="button">
              Features
            </button>

            <button onClick={goHome} type="button">
              Pricing
            </button>

            <button onClick={goHome} type="button">
              Contact
            </button>
          </div>
        </div>

        <div className="demo-footer-bottom">
          <span>
            © 2026 PeopleFlow. All rights reserved.
          </span>

          <span>
            HR • People • Growth
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Demo;