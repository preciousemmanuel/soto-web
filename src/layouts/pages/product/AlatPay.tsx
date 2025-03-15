interface AlatpayResponse {
  reference: string;
  status: string;
  message: string;
  data?: any;
}

interface AlatpayPopup {
  show: () => void;
}

interface AlatpaySDK {
  setup: (config: AlatpayConfig) => AlatpayPopup;
}

interface AlatpayConfig {
  apiKey?: string;
  businessId?: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  metadata?: Record<string, any> | null;
  currency?: string;
  amount: number;
  onTransaction: (response: AlatpayResponse) => void;
  onClose: () => void;
}

interface AlatpayButtonProps
  extends Omit<AlatpayConfig, "onTransaction" | "onClose"> {
  onTransaction?: (response: AlatpayResponse) => void;
  onClose?: () => void;
  className?: string;
}

declare global {
  interface Window {
    Alatpay?: AlatpaySDK;
  }
}

import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";

const AlatpayButton: React.FC<AlatpayButtonProps> = ({
  apiKey,
  businessId,
  email,
  phone = "",
  firstName,
  lastName,
  metadata = null,
  currency = "NGN",
  amount,
  onTransaction,
  onClose,
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = import.meta.env.VITE_ALAT_WEMA_BASE_URL;
    script.async = true;
    document.body?.appendChild(script);

    return () => {
      document.body?.removeChild(script);
    };
  }, []);

  const handlePayment = (): void => {
    if (typeof window?.Alatpay === "undefined") {
      console.error("Alatpay SDK not loaded");
      return;
    }

    const popup = window.Alatpay.setup({
      apiKey: import.meta.env.VITE_ALAT_WEMA_PRY_KEY,
      businessId: import.meta.env.VITE_ALAT_WEMA_BUS_ID,
      email,
      phone,
      firstName,
      lastName,
      metadata,
      currency,
      amount,
      onTransaction: (response: AlatpayResponse) => {
        // console.log("API response is ", response);
        if (onTransaction) onTransaction(response);
      },
      onClose: () => {
        // console.log("Payment gateway is closed");
        if (onClose) onClose();
      },
    });

    popup.show();
  };

  return (
    <Button
      color="white"
      bg="#FF5733"
      borderRadius="full"
      mt={6}
      w="full"
      h="55px"
      size="lg"
      onClick={handlePayment}
    >
      Pay with Alatpay
    </Button>
  );
};

export default AlatpayButton;
