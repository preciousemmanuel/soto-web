import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import OtpPage from "../../components/OtpPage";

export default function OtpVerification() {
  const navigate = useNavigate();
  const { loading, validateOtp, isSuccessOTP } = useAuth();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpResult = otp.join("");

  const handleValidateOTP = async () => {
    await validateOtp({ otp: otpResult, otp_purpose: "SIGNUP_COMPLETE" });
  };

  useEffect(() => {
    if (isSuccessOTP) {
      navigate("/auth");
    }
  }, [isSuccessOTP]);

  return (
    <OtpPage
      loading={loading}
      otp={otp}
      setOtp={setOtp}
      onClick={handleValidateOTP}
    />
  );
}