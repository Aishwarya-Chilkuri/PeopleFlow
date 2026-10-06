import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import App from "./App";

describe("PeopleFlow App", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = "";
    window.scrollTo = vi.fn();
  });

  it("renders PeopleFlow", () => {
    render(<App />);

    expect(screen.getAllByText("PeopleFlow").length).toBeGreaterThan(0);
  });

  it("renders navigation links", () => {
    render(<App />);

    [
      "Home",
      "About",
      "Features",
      "Solutions",
      "Pricing",
      "Contact",
      "Get Started",
    ].forEach((text) => {
      expect(screen.getAllByText(text).length).toBeGreaterThan(0);
    });
  });

  it("renders the hero section", () => {
    render(<App />);

    expect(screen.getByText("Simplify HR.")).toBeInTheDocument();
    expect(screen.getByText("Empower People.")).toBeInTheDocument();
  });

  it("renders all HRMS features", () => {
    render(<App />);

    const featureCards = document.querySelectorAll(".feature-card");

    expect(featureCards.length).toBe(12);
  });

  it("renders all solution cards", () => {
    render(<App />);

    const solutionCards = document.querySelectorAll(".solution-card");

    expect(solutionCards.length).toBe(3);
  });

  it("renders all steps", () => {
    render(<App />);

    const stepCards = document.querySelectorAll(".step-card");

    expect(stepCards.length).toBe(4);
  });

 
  it("renders pricing section", () => {
    render(<App />);

    expect(
      document.querySelector(".pricing-section")
    ).toBeInTheDocument();

    expect(
      document.querySelector(".pricing-slider")
    ).toBeInTheDocument();
  });

  it("pricing slider works", () => {
    render(<App />);

    const slider = screen.getByRole("slider");

    expect(slider).toBeInTheDocument();

    fireEvent.change(slider, {
      target: { value: "5" },
    });

    expect(slider).toHaveValue("5");
  });

  it("renders FAQ section", () => {
    render(<App />);

    const faqItems = document.querySelectorAll(".faq-item");

    expect(faqItems.length).toBeGreaterThan(0);
  });

  it("renders contact section", () => {
    render(<App />);

    expect(
      document.querySelector(".contact-section")
    ).toBeInTheDocument();

    expect(
      document.querySelector(".contact-form")
    ).toBeInTheDocument();
  });

  it("renders footer", () => {
    render(<App />);

    expect(
      document.querySelector(".footer")
    ).toBeInTheDocument();
  });

  it("switches to dark mode", () => {
    render(<App />);

    const darkButton = screen.getByTitle("Dark mode");

    fireEvent.click(darkButton);

    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("switches back to light mode", () => {
    render(<App />);

    fireEvent.click(screen.getByTitle("Dark mode"));
    fireEvent.click(screen.getByTitle("Light mode"));

    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("stores theme in localStorage", () => {
    render(<App />);

    fireEvent.click(screen.getByTitle("Dark mode"));

    expect(localStorage.getItem("peopleflow-theme")).toBe("dark");
  });

  it("opens a feature modal", () => {
    const { container } = render(<App />);

    const learnMore = container.querySelector(".learn-more");

    expect(learnMore).toBeInTheDocument();

    fireEvent.click(learnMore);

    expect(
      container.querySelector(".modal-overlay")
    ).toBeInTheDocument();
  });

  it("closes the feature modal", () => {
    const { container } = render(<App />);

    const learnMore = container.querySelector(".learn-more");

    fireEvent.click(learnMore);

    const closeButton = container.querySelector(".modal-close");

    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(
      container.querySelector(".modal-overlay")
    ).not.toBeInTheDocument();
  });

  it("renders the main website sections", () => {
    const { container } = render(<App />);

    expect(container.querySelector("#home")).toBeInTheDocument();
    expect(container.querySelector("#about")).toBeInTheDocument();
    expect(container.querySelector("#features")).toBeInTheDocument();
    expect(container.querySelector("#solutions")).toBeInTheDocument();
    expect(container.querySelector("#pricing")).toBeInTheDocument();
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });
});