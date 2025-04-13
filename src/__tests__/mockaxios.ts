// __mocks__/axios.ts
import { vi } from "vitest";

const mockAxios = {
  defaults: {
    baseURL: "http://localhost:3000",
    headers: {
      common: {},
      post: {},
      get: {},
      // Add other HTTP methods as needed
    },
  },
  create: vi.fn(() => mockAxios),
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  interceptors: {
    request: {
      use: vi.fn(),
      eject: vi.fn(),
    },
    response: {
      use: vi.fn(),
      eject: vi.fn(),
    },
  },
};

export default mockAxios;
