import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";

export function renderWithRouter(ui: ReactNode, initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>,
  );
}
