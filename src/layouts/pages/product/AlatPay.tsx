// Type definitions
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
  loadingText?: string;
  buttonText?: string;
}

// Add global type declaration
declare global {
  interface Window {
    Alatpay?: AlatpaySDK;
  }
}

import { Button } from "@chakra-ui/react";
import React, { useEffect, useState, useCallback } from "react";

/**
 * AlatpayButton - A React component for integrating Alatpay payment gateway
 *
 * Handles SDK loading and payment initialization with proper error handling
 * Uses modern script loading techniques to avoid document.write()
 */
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
  className,
  loadingText = "Loading...",
  buttonText = "Pay with Alatpay",
}) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const scriptId = "alatpay-script";

  // Load the Alatpay SDK
  useEffect(() => {
    // Check if SDK is already loaded in window object
    if (window.Alatpay) {
      setSdkLoaded(true);
      return;
    }

    // Check if script is already in the DOM but not loaded yet
    const existingScript = document.getElementById(
      scriptId
    ) as HTMLScriptElement;
    if (existingScript) {
      // If script exists but SDK isn't available, wait for it
      const checkExisting = setTimeout(() => {
        if (window.Alatpay) {
          setSdkLoaded(true);
          clearTimeout(checkExisting);
        }
      }, 100);

      return () => clearTimeout(checkExisting);
    }

    const scriptUrl = import.meta.env.VITE_ALAT_WEMA_BASE_URL;

    if (!scriptUrl) {
      setLoadError("Alatpay SDK URL is not configured");
      return;
    }

    // Modern way to load script dynamically
    const loadScript = async () => {
      try {
        const script = document.createElement("script");
        script.src = scriptUrl;
        script.id = scriptId;
        script.async = true;

        // Create a promise to handle script loading
        const scriptPromise = new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error("Failed to load Alatpay SDK"));
        });

        // Append to document head (preferred over body for scripts)
        document.head.appendChild(script);

        // Wait for script to load
        await scriptPromise;

        // Additional check to ensure SDK is actually available
        const sdkCheckInterval = setInterval(() => {
          if (window.Alatpay) {
            setSdkLoaded(true);
            clearInterval(sdkCheckInterval);
          }
        }, 100);

        // Set timeout to prevent infinite checking
        setTimeout(() => {
          clearInterval(sdkCheckInterval);
          if (!window.Alatpay) {
            setLoadError("Alatpay SDK failed to initialize properly");
          }
        }, 5000);
      } catch (error) {
        setLoadError(
          `Script loading failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    };

    loadScript();

    // Cleanup function
    return () => {
      // No need to remove the script on unmount as it might be used by other components
      // Just clean up any ongoing checks
    };
  }, []);

  // Initialize payment
  const handlePayment = useCallback((): void => {
    // Reset any previous errors
    setLoadError(null);

    if (!window.Alatpay) {
      setLoadError("Alatpay SDK not loaded");
      return;
    }

    try {
      const apiKeyValue = apiKey || import.meta.env.VITE_ALAT_WEMA_PRY_KEY;
      const businessIdValue =
        businessId || import.meta.env.VITE_ALAT_WEMA_BUS_ID;

      if (!apiKeyValue || !businessIdValue) {
        setLoadError("API key or Business ID not configured");
        return;
      }

      const popup = window.Alatpay.setup({
        apiKey: apiKeyValue,
        businessId: businessIdValue,
        email,
        phone,
        firstName,
        lastName,
        metadata,
        currency,
        amount,
        onTransaction: (response: AlatpayResponse) => {
          onTransaction?.(response);
        },
        onClose: () => {
          onClose?.();
        },
      });

      popup.show();
    } catch (error) {
      setLoadError(
        `Payment initialization failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      console.error("Alatpay setup error:", error);
    }
  }, [
    apiKey,
    businessId,
    email,
    phone,
    firstName,
    lastName,
    metadata,
    currency,
    amount,
    onTransaction,
    onClose,
  ]);

  // Generate button state and text
  const isDisabled = !sdkLoaded || !!loadError;
  const displayText = loadError
    ? "Payment unavailable"
    : !sdkLoaded
    ? loadingText
    : buttonText;

  return (
    <>
      {loadError && (
        <div style={{ color: "red", marginBottom: "8px", fontSize: "14px" }}>
          Error: {loadError}
        </div>
      )}
      <Button
        color="white"
        bg="#FF5733"
        borderRadius="full"
        mt={6}
        w="full"
        h="55px"
        size="lg"
        onClick={handlePayment}
        isDisabled={isDisabled}
        className={className}
        _hover={{ bg: "#E84C2C" }}
        _active={{ bg: "#D1431F" }}
      >
        {displayText}
      </Button>
    </>
  );
};

export default AlatpayButton;
