"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import convertToSubCurrency from "@/lib/convertToSubCurrency";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { createClient } from "@/lib/supabase/client";

function CheckoutPage({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message ?? "An error occurred");
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "An error occurred");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      // get user id from supabase
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const userId = user?.id;

      const paymentRes = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: convertToSubCurrency(amount),
          userId, // attach it here
        }),
      });
      const data = await paymentRes.json();
      setClientSecret(data.clientSecret);
    }

    fetchData();
  }, [amount]);

  if (!clientSecret || !stripe || !elements) {
    return (
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-medium font-mono mb-8 text-center">
          Get unlimited prompts
        </h1>
        <Spinner className="size-8 mt-8" />
      </section>
    );
  }

  return (
    <section className="mt-2 pb-8">
      <h1 className="text-3xl font-medium font-mono mb-8 text-center">
        Get unlimited prompts
      </h1>
      <form onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}
        <Button type="submit" disabled={isLoading} className="w-full mt-4">
          <span>{isLoading ? "Processing..." : `Pay ${amount}`}</span>
        </Button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </section>
  );
}

export default CheckoutPage;
