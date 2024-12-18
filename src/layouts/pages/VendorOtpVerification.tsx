import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import OtpPage from "../../components/OtpPage";

export default function VendorOtpVerification() {
  const navigate = useNavigate();
  const { loading, validateOtp, isSuccessOTP } = useAuth();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpResult = otp.join("");

  const handleValidateOTP = async () => {
    await validateOtp({ otp: otpResult, otp_purpose: "ACCOUNT_VALIDATION" });
  };

  useEffect(() => {
    if (isSuccessOTP) {
      navigate("/auth/approve-page");
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
