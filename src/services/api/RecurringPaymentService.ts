// src/services/api/RecurringPaymentService.ts
export const RecurringPaymentService = {
  toggleAutoRenew: (enabled: boolean): Promise<string> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(enabled ? "Auto-renew enabled" : "Auto-renew disabled");
      }, 600);
    }),
};
