import { Box, Heading, Text } from "@chakra-ui/react";

export default function Terms() {
  return (
    <Box mt={{ base: 20, md: 40 }} fontFamily="Poppins">
      <Box bg="#FF5733" py={{ base: 5, md: 30 }}>
        <Heading color="#ffff" textAlign="center" fontSize={{ base: "xl", md: "3xl" }}>
          Terms and Conditions
        </Heading>
      </Box>
      <Box py={{ base: 5, md: 14 }} px={{ base: 4, md: 10, lg: 20, xl: 40 }}>
        <Text pb={6} lineHeight={8} fontSize={{ base: "sm", md: "md" }}>
          These Terms and Conditions ("Agreement") govern the use of our
          e-commerce platform [Soto Nigeria] which consists of a Website and
          Mobile Application ("marketplace"). These terms and conditions shall
          apply to both buyers and Vendors on the Website and shall govern your
          use of the marketplace and related services. By accessing,
          registering, listing products, or making purchases on the Marketplace,
          you agree to be bound by these Terms and Conditions. Please read these
          Terms carefully before using the Website or Marketplace. If you do not
          agree to these Terms, you may not use the Website or Marketplace.
        </Text>
        <Text pb={6} lineHeight={8} fontSize={{ base: "sm", md: "md" }}>
          <strong>General Terms for Buyers and Vendors </strong>
          <br />
          <strong>Eligibility </strong>
          <br />
          <strong>Buyers:</strong> To make purchases on the Marketplace, you
          must be at least 18 years old or have the legal capacity to enter into
          binding contracts. Vendors: To list products, Vendors must be at least
          18 years old and, if applicable, be a registered business with all
          necessary permits and legal documentation to sell the products they
          offer.
        </Text>
        <Text pb={6} lineHeight={8} fontSize={{ base: "sm", md: "md" }}>
          <strong>Agreement Binding</strong>
          <br />
          By using the Marketplace, you agree to comply with and be bound by
          these Terms. This applies to both buyers and Vendors, who may also be
          referred to as "users" within this Agreement.
        </Text>
        <Text pb={6} lineHeight={8} fontSize={{ base: "sm", md: "md" }}>
          <strong> Modifications to Terms</strong>
          <br />
          We reserve the right to modify or update these Terms at any time. Any
          changes will be posted on the Marketplace, and the revised Terms will
          take effect immediately upon posting. Continued use of the Marketplace
          after changes are posted constitutes your acceptance of the updated
          Terms.
        </Text>
        <Text pb={6} lineHeight={8} fontSize={{ base: "sm", md: "md" }}>
          <strong>Buyer-Specific Terms</strong>
          <br />
          <strong>Account Registration and Security</strong>
          <br />
          <li>
            Buyers must create an account to place an order. During
            registration, you agree to provide accurate, current, and complete
            information.
          </li>
          <li>
            {" "}
            You are responsible for maintaining the confidentiality of your
            account details and are responsible for all activities under your
            account.
          </li>
          <li>
            {" "}
            Your account shall be used exclusively by you and you shall not
            transfer your account to any third party. If you authorize any third
            party to manage your account on your behalf this shall be at your
            own risk.
          </li>{" "}
          <li>
            {" "}
            You may cancel your account on our marketplace by contacting us
          </li>
        </Text>
        <Text pb={6} lineHeight={8} fontSize={{ base: "sm", md: "md" }}>
          <strong>Orders and Payment Processing</strong>
          <li>
            When placing an order, buyers must select products, provide billing
            and shipping information, and proceed to payment.
          </li>
          <li>
            All payments will be processed through secure third-party payment
            gateways such as credit/debit cards, Bank Transfer, Paystack,
            PayPal, or other available methods.
          </li>
          <li>
            <strong>Payment Authorization:</strong> By submitting payment
            information, buyers authorize us to charge the provided method for
            the full purchase amount, including any applicable taxes, shipping,
            and handling fees.
          </li>
        </Text>
        <Text pb={6} lineHeight={8} fontSize={{ base: "sm", md: "md" }}>
          <strong>Order Acceptance and Confirmation</strong>
          <li>
            Once an order is placed, buyers will receive an order acceptance
            email. This acceptance is not confirmation of the order.
          </li>
          <li>
            <strong>Order Confirmation:</strong> The order is considered
            confirmed only when the item(s) have been paid for or other Payment
            option like pay at delivery is selected. Then a confirmation email
            is sent.
          </li>
        </Text>
        <Text pb={6} lineHeight={8} fontSize={{ base: "sm", md: "md" }}>
          <strong>Buyer Responsibilities</strong>
          <li>
            Buyers agree to provide accurate information, respect the rights of
            Vendors, and refrain from fraudulent or malicious activities.
          </li>
          <li>
            <strong>Prohibited Activities:</strong> Buyers may not engage in any
            activity that disrupts the Marketplace's operations or interferes
            with other users' experiences. This includes, but is not limited to,
            submitting false information, conducting chargebacks without
            justification, or harassing Vendors.
          </li>
        </Text>
        <Text pb={6} lineHeight={8} fontSize={{ base: "sm", md: "md" }}>
          <strong>Seller-Specific Terms</strong>
          <li>Seller-Specific Terms</li>
          You acknowledge and agree that:
          <li>
            To list products on the Marketplace, Vendors must create an account
            and provide complete business information, including proof of
            identity, tax identification number (if available), and payment
            details for payouts.
          </li>
          <li>
            Vendors are responsible for maintaining accurate account details and
            promptly updating them if there are any changes.
          </li>
          <li>
            We shall accept binding sales on behalf of Vendors, but Zoto will
            not be held liable for transaction with the buyer.
          </li>
        </Text>
        <Text pb={6} lineHeight={8} fontSize={{ base: "sm", md: "md" }}>
          <strong>Product Listings</strong>

          <li>
            <strong>Product Information:</strong> Vendors are responsible for
            accurately describing their products, including providing clear
            images, descriptions, pricing, and specifications.
          </li>
          <li>
            <strong>Product Availability:</strong> Vendors must ensure that
            listed products are available for sale. Should there be a change in
            stock level, Vendors must update their inventory promptly.
          </li>
          <li>
            <strong>Product Quality:</strong> products must be of satisfactory
            quality, fit and safe for any purpose specified in and conform in
            all material respects to the product listing and any other
            description of the products supplied or made available by the seller
            to the buyer.
          </li>
          <li>
            <strong>Prohibited Products:</strong>Vendors must not list any
            products that violate intellectual property laws, infringe on
            copyrights or trademarks, or contravene local or international
            regulations.
          </li>
          <li>
            <strong>Right to Supply:</strong> in respect of physical products
            sold, the seller warrants that the seller has good title to and is
            the sole legal and beneficial owner of the products and/or has the
            right to supply the products pursuant to this agreement and that the
            products are not subject to any third party rights or restrictions
            including in respect of third party intellectual property rights
            and/or any criminal insolvency or tax investigation or proceedings;
            and in respect of digital products the seller warrants that the
            seller has the right to supply the digital products to the buyer.
          </li>
        </Text>
        <Text pb={6} lineHeight={8} fontSize={{ base: "sm", md: "md" }}>
          <strong>Pricing and Fees</strong>
          <li>
            Vendors are responsible for setting their product prices, which must
            include applicable taxes, shipping fees, and other costs.
          </li>
          <li>
            <strong>Platform Fees:</strong> Vendors are not subjected to fees
            for using the platform unless otherwise stated.
          </li>
        </Text>
        <Text pb={6} lineHeight={8} fontSize={{ base: "sm", md: "md" }}>
          <strong>Order Fulfillment and Shipping</strong>
          <li>
            <strong>Shipping Timeframe:</strong> Vendors are required to make
            ordered goods available for pickup at the designated time. Delays
            must be communicated to Soto in a timely manner.
          </li>
          <li>
            <strong>Packaging:</strong> Vendors are responsible for securely
            packaging items to prevent damage during transit.
          </li>
        </Text>
      </Box>
    </Box>
  );
}
