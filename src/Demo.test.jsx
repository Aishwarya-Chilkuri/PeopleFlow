import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Demo from "./Demo";

describe("PeopleFlow Demo API", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = "light";

    global.fetch = vi.fn();
  });

  it("loads the Demo page", () => {
    const { container } = render(<Demo />);

    expect(container.querySelector("form")).toBeTruthy();
  });

  it("sends a POST request when the form is submitted", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: "Demo request submitted successfully",
      }),
    });

    const { container } = render(<Demo />);

    const form = container.querySelector("form");

    expect(form).toBeTruthy();

    fireEvent.submit(form);

    expect(global.fetch).toHaveBeenCalled();
  });
});