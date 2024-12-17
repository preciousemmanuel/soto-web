import { HStack, Input } from "@chakra-ui/react";
import { useRef } from "react";

interface OtpInputProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
}

const OtpInput = ({ otp, setOtp }: OtpInputProps) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    Array(otp.length).fill(null)
  );

  // Handle input changes
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]*$/.test(value)) return; // Allow only numeric input

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last digit
    setOtp(newOtp);

    // Move focus to the next input box if available
    if (value && index < otp.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace to move focus
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <HStack spacing={4}>
      {otp.map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          value={otp[index]}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          textAlign="center"
          fontSize="2xl"
          w="50px"
          h="50px"
          borderRadius="md"
          bg="#F9FAFF"
          border="1px solid"
          borderColor="gray.300"
          _focus={{ borderColor: "orange.400", boxShadow: "outline" }}
        />
      ))}
    </HStack>
  );
};

export default OtpInput;
