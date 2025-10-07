import React from "react";

function page({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <h1>Payment successful</h1>
      <p>You have been charged {amount}</p>
    </div>
  );
}

export default page;
