// ✅ Robust import
import { rest } from "msw/browser"; // use browser-safe version for Vite

export const paymentHandler = [
  rest.post("/create-payment-intent", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        clientSecret: "pi_mock_123_secret_abc123",
      }),
    );
  }),
];
