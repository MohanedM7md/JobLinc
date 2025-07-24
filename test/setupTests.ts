import { beforeAll, afterEach, afterAll, vi } from "vitest";
import axios from "axios";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { server } from "../src/__mocks__/msw/server";
beforeAll(() => {
  server.listen();
});
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
vi.mock("axios", async () => {
  const actual = await vi.importActual<
    typeof import("axios") & { create: Function }
  >("axios");

  return {
    ...actual,
    defaults: {
      baseURL: "http://test-api.com",
      headers: {
        common: {},
        post: {},
        get: {},
      },
    },
    create: vi.fn(() => ({
      ...actual.create(),
      interceptors: {
        request: { use: vi.fn(), eject: vi.fn() },
        response: { use: vi.fn(), eject: vi.fn() },
      },
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    })),
  };
});
