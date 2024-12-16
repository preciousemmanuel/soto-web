import { Box, Heading, Text } from "@chakra-ui/react";

export default function Privacy() {
  return (
    <Box mt={40} fontFamily="Poppins">
      <Box bg="#FF5733" py={30}>
        <Heading color="#ffff" textAlign="center">
          Privacy Policy
        </Heading>
      </Box>
      <Box py={14} px={40}>
        <Text pb={6} lineHeight={8}>
          At Soto, we value your privacy and are committed to protecting your
          personal information. This Privacy Policy explains how we collect,
          use, disclose, and protect your information when you visit our
          website, use our services, or make purchases from our online store. By
          using our website, you agree to the terms outlined in this policy.
        </Text>
        <Text pb={6} lineHeight={8}>
          <strong>Information We Collect</strong>
          <li>
            <strong>Personal Information</strong>
          </li>
          We may also collect non-personal information automatically when you
          use our website. This includes: <br />
          Contact Information: Name, email address, phone number, and shipping
          address.
          <br /> Payment Information: Credit/debit card numbers, billing
          addresses, and other payment details.
          <br /> Account Information: Username, password, and preferences
          associated with your account. <br />
          Order Information: Details of the products you purchase, order
          history, and any special requests made during checkout.
        </Text>
        <Text pb={6} lineHeight={8}>
          <strong>How We Use Your Information</strong>
          We use the information we collect for the following purposes:
          <li>
            <strong>Providing Services</strong>
          </li>
          <li>
            To process your orders and deliver products to the address you
            provide.
          </li>
          <li>
            To create and manage your account and provide customer support.
          </li>
          <li>To process payments securely and protect against fraud.</li>
          <li>
            To personalize your experience, including product recommendations
            and special offers.
          </li>
          <Text mt={6}>
            <li>
              <strong>Communication</strong>
            </li>
            <li>
              To send order confirmations, shipping updates, and customer
              service-related emails.
            </li>
            <li>
              To communicate promotional offers, newsletters, and updates about
              new products or features if you have opted in to receive marketing
              communications.
            </li>
            <li>
              To respond to inquiries or requests made through our website.
            </li>
          </Text>
          <Text mt={6}>
            <li>
              <strong>Improving Our Website and Services</strong>
            </li>
            <li>
              To analyze usage patterns and improve website functionality and
              user experience.
            </li>
            <li>
              To conduct research and gather feedback to enhance our products,
              services, and marketing strategies.
            </li>
          </Text>
          <Text mt={6}>
            <li>
              <strong>Legal Compliance and Protection</strong>
            </li>
            <li>
              To comply with legal obligations and protect our legal rights,
              including resolving disputes and enforcing our terms and
              conditions.
            </li>
            <li>
              To detect and prevent fraudulent transactions and activities.
            </li>
          </Text>
          <Text mt={6}>
            <strong>Sharing Your Information</strong>
            <br />
            <p>
              {" "}
              We do not sell, rent, or share your personal information with
              third parties for their own marketing purposes without your
              consent. However, we may share your information in the following
              circumstances:
            </p>
            <strong>Service Providers</strong>
            <li>
              We may share your information with third-party service providers
              who perform functions on our behalf, such as payment processing,
              shipping, customer support, marketing, and data analytics. These
              providers are obligated to handle your information in accordance
              with applicable privacy laws and our instructions.
            </li>
            <strong>Business Transfers</strong>
            <li>
              In the event of a merger, acquisition, or sale of our assets, your
              personal information may be transferred as part of the
              transaction. We will notify you via email or a prominent notice on
              our website if such a transfer occurs.
            </li>
            <strong>Legal Requirements</strong>
            <li>
              We may disclose your information if required by law, subpoena, or
              other legal process, or if we believe in good faith that
              disclosure is necessary to protect our rights, comply with a
              judicial proceeding, court order, or legal process.
            </li>
            <strong>Data Security</strong>
            <li>
              We take the security of your personal information seriously and
              implement reasonable physical, technical, and administrative
              measures to protect it from unauthorized access, disclosure,
              alteration, and destruction. However, no data transmission or
              storage method is 100% secure, and we cannot guarantee the
              absolute security of your data.
            </li>

            <strong>Data Deletion</strong>
            <p>
              You may request to delete your account and personal data by
              contacting us at info@soto.ng. Please note that we may need to
              retain certain information for legal, accounting, or security
              purposes
            </p>

            <strong>Contact Us</strong>
            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or the handling of your personal information,
              please contact us at:
              <br />
              Soto <br /> [19b Da Silver Street, Lekki Phase 1, Lagos] <br />{" "}
              Email: support@soto.ng Phone: [09012222232]
            </p>
          </Text>
          <Text mt={6}>
            By using our website, you acknowledge that you have read,
            understood, and agreed to this Privacy Policy.
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
