export const PaymentService = {
  createPaymentIntent: (): Promise<{ clientSecret: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          clientSecret: "pi_mock_123_secret_abc123",
        });
      }, 500); // simulate latency
    });
  },
};
