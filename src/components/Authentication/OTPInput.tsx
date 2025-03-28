import { useState, useRef, useEffect } from "react";

const OTPInput = ({ length = 6, onComplete }: { length?: number; onComplete: (otp: string) => void }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [showErrorOTP, setShowErrorOTP] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(length).fill(null));

    useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    }, []);
    
  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}  // ✅ Fix: No return value
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-10 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OTPInput;
