import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

if (!globalThis.navigator) {
  // @ts-expect-error - test shim
  globalThis.navigator = { userAgent: "node.js" };
}

if (!(globalThis.navigator as any).clipboard) {
  (globalThis.navigator as any).clipboard = {
    writeText: async () => {},
    readText: async () => "",
  };
}
