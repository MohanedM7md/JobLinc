// Function to detect RTL (Arabic, etc.)
export const isRTL = (text?: string) => {
  return text ? /^[\u0600-\u06FF]/.test(text.trim()) : false;
};
