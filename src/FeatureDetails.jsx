import React, { useEffect, useState } from "react";
import "./styles/FeatureDetails.css";

const featureData = {
  "employee-management": {
    icon: "👥",
    title: "Employee Management",
    subtitle: "Manage your complete workforce from one place.",
    description:
      "PeopleFlow helps HR teams maintain employee profiles, departments, roles and workforce information in one centralized system.",
    benefits: [
      "Centralized employee profiles",
      "Department and role management",
      "Employee information tracking",
      "Easy workforce organization",
    ],
  },

  attendance: {
    icon: "🕒",
    title: "Attendance",
    subtitle: "Track attendance and working hours with ease.",
    description:
      "Monitor employee attendance, working hours, late arrivals and daily workforce activity through a simple HR workflow.",
    benefits: [
      "Daily attendance tracking",
      "Working hours monitoring",
      "Late arrival tracking",
      "Employee attendance records",
    ],
  },

  "leave-management": {
    icon: "📅",
    title: "Leave Management",
    subtitle: "Make leave requests and approvals simple.",
    description:
      "PeopleFlow helps employees request leave while HR teams and managers can review, approve and manage leave balances.",
    benefits: [
      "Leave request management",
      "Approval workflows",
      "Leave balance tracking",
      "Leave policy management",
    ],
  },

  payroll: {
    icon: "💳",
    title: "Payroll",
    subtitle: "Organize payroll and salary information.",
    description:
      "Manage payroll information, salary structures and monthly payroll activities in a centralized HR environment.",
    benefits: [
      "Salary information management",
      "Payroll organization",
      "Monthly payroll processing",
      "Employee compensation records",
    ],
  },

  performance: {
    icon: "📈",
    title: "Performance",
    subtitle: "Track employee goals and performance.",
    description:
      "Create a structured approach to employee performance by managing goals, reviews and employee growth records.",
    benefits: [
      "Goal management",
      "Performance reviews",
      "Employee growth tracking",
      "Performance records",
    ],
  },

  documents: {
    icon: "📄",
    title: "Documents",
    subtitle: "Keep important employee documents organized.",
    description:
      "Store and organize employee-related documents so HR teams can access important information more easily.",
    benefits: [
      "Employee document organization",
      "Centralized document access",
      "Easy document management",
      "Organized HR records",
    ],
  },

  announcements: {
    icon: "📢",
    title: "Announcements",
    subtitle: "Keep employees informed and connected.",
    description:
      "Share important company announcements and HR updates with employees through a centralized communication system.",
    benefits: [
      "Company announcements",
      "HR updates",
      "Employee communication",
      "Centralized information sharing",
    ],
  },

  "reports-analytics": {
    icon: "📊",
    title: "Reports & Analytics",
    subtitle: "Turn HR information into useful insights.",
    description:
      "Use HR reports and analytics to understand workforce information and support better organizational decisions.",
    benefits: [
      "HR reports",
      "Workforce insights",
      "Data-based decision support",
      "Centralized HR information",
    ],
  },

  helpdesk: {
    icon: "🎧",
    title: "Helpdesk",
    subtitle: "Make employee HR support easier.",
    description:
      "Manage employee questions, requests and HR support activities through a centralized helpdesk workflow.",
    benefits: [
      "Employee support requests",
      "HR ticket management",
      "Request tracking",
      "Centralized HR support",
    ],
  },

  recruitment: {
    icon: "🔎",
    title: "Recruitment",
    subtitle: "Organize your hiring process.",
    description:
      "Manage candidates, recruitment stages and hiring activities in one organized recruitment workflow.",
    benefits: [
      "Candidate management",
      "Hiring stage tracking",
      "Recruitment activity management",
      "Organized hiring workflow",
    ],
  },

  onboarding: {
    icon: "🚀",
    title: "Onboarding",
    subtitle: "Create structured onboarding journeys.",
    description:
      "Help new employees start smoothly by organizing onboarding activities, employee information and required processes.",
    benefits: [
      "New employee onboarding",
      "Onboarding task management",
      "Employee information setup",
      "Structured onboarding workflows",
    ],
  },

  "asset-management": {
    icon: "💼",
    title: "Asset Management",
    subtitle: "Track company assets assigned to employees.",
    description:
      "Maintain records of company assets assigned to employees and departments for better workforce administration.",
    benefits: [
      "Employee asset assignment",
      "Asset tracking",
      "Department-wise asset records",
      "Centralized asset information",
    ],
  },
};

function FeatureDetails() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("peopleflow-theme") || "light"
  );

  const slug = window.location.pathname
    .split("/")
    .filter(Boolean)
    .pop();

  const feature = featureData[slug];

  useEffect(() => {
    const applyTheme = (newTheme) => {
      const selectedTheme =
        newTheme ||
        localStorage.getItem("peopleflow-theme") ||
        "light";

      setTheme(selectedTheme);

      document.documentElement.setAttribute(
        "data-theme",
        selectedTheme
      );
    };

    applyTheme(
      localStorage.getItem("peopleflow-theme") || "light"
    );

    const handleThemeChange = (event) => {
      applyTheme(event.detail);
    };

    window.addEventListener(
      "peopleflow-theme-change",
      handleThemeChange
    );

    return () => {
      window.removeEventListener(
        "peopleflow-theme-change",
        handleThemeChange
      );
    };
  }, []);

  const goHome = () => {
    window.location.href = "/";
  };

  const goToDemo = () => {
    window.open(
      "/demo",
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (!feature) {
    return (
      <div className="feature-details-page">
        <header className="feature-details-header">
          <button
            type="button"
            className="feature-details-logo"
            onClick={goHome}
          >
            PeopleFlow
          </button>

          <button
            type="button"
            className="feature-details-back"
            onClick={goHome}
          >
            ← Back to Home
          </button>
        </header>

        <div className="feature-details-card">
          <span className="feature-details-icon">
            ⚠️
          </span>

          <h1>Feature Not Found</h1>

          <p>
            The feature page you are looking for does not exist.
          </p>

          <button
            type="button"
            className="feature-details-primary"
            onClick={goHome}
          >
            Back to PeopleFlow
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="feature-details-page">
      <header className="feature-details-header">
        <button
          type="button"
          className="feature-details-logo"
          onClick={goHome}
        >
          PeopleFlow
        </button>

        <button
          type="button"
          className="feature-details-back"
          onClick={goHome}
        >
          ← Back to Home
        </button>
      </header>

      <main className="feature-details-container">
        <section className="feature-details-hero">
          <span className="feature-details-icon">
            {feature.icon}
          </span>

          <span className="feature-details-tag">
            PEOPLEFLOW FEATURE
          </span>

          <h1>{feature.title}</h1>

          <h2>{feature.subtitle}</h2>

          <p>{feature.description}</p>

          <button
            type="button"
            className="feature-details-primary"
            onClick={goToDemo}
          >
            Request a Demo →
          </button>
        </section>

        <section className="feature-details-benefits">
          <div className="feature-details-section-heading">
            <span>WHY IT MATTERS</span>

            <h2>Built for everyday HR work.</h2>

            <p>
              PeopleFlow keeps important HR activities organized,
              accessible and easy to manage.
            </p>
          </div>

          <div className="feature-benefits-grid">
            {feature.benefits.map((benefit, index) => (
              <div
                className="feature-benefit-card"
                key={benefit}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{benefit}</h3>

                <p>
                  Manage this part of your HR workflow through
                  PeopleFlow.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="feature-details-cta">
          <h2>Ready to explore PeopleFlow?</h2>

          <p>
            See how PeopleFlow can simplify your HR operations.
          </p>

          <button
            type="button"
            className="feature-details-primary"
            onClick={goToDemo}
          >
            Request a Demo →
          </button>
        </section>
      </main>
    </div>
  );
}

export default FeatureDetails;