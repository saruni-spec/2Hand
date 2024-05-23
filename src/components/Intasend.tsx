import "intasend-inlinejs-sdk";

interface IntaSend {
  new (options: { publicAPIKey: string; live: boolean }): IntaSendInstance;
}

interface IntaSendInstance {
  on(
    event: "COMPLETE" | "FAILED" | "IN-PROGRESS",
    callback: (response: Response) => void
  ): IntaSendInstance;
}

interface Response {
  status: string;
  message: string;
}

declare global {
  interface Window {
    IntaSend: IntaSend;
  }
}

const IntaSendButton = ({ amount }: { amount: string }) => {
  // Destructure amount prop
  new window.IntaSend({
    publicAPIKey: "ISPubKey_test_2ccf1b85-f000-4e4c-8b3e-5564d3e3fb8b",
    live: false, //or true for live environment
  })
    .on("COMPLETE", (response: Response) => {
      console.log("COMPLETE:", response);
    })
    .on("FAILED", (response: Response) => {
      console.log("FAILED", response);
    })
    .on("IN-PROGRESS", () => {
      console.log("INPROGRESS ...");
    });

  return (
    <div>
      <button
        className="intaSendPayButton"
        data-amount={amount} // Set data-amount directly on button
        data-currency="KES"
      >
        Pay Now
      </button>
    </div>
  );
};

export default IntaSendButton;
