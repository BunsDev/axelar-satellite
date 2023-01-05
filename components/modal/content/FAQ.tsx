import { FC, useState } from "react";

import { useApplicationStateStore } from "../../../store";

import {
  FAQ_MODAL,
  docsLinks,
  tokenContractDocs,
} from "../../../config/constants";

type FAQProps = {};

export const FAQ: FC<FAQProps> = ({}) => {
  const { modalId } = useApplicationStateStore((state) => state);

  if (modalId !== FAQ_MODAL) return null;

  return (
    <div>
      <h1 className="mb-10 text-3xl">Frequently Asked Questions</h1>
      {FAQs.map((faq, index) => {
        return (
          <FAQLine
            key={`faq-${index}`}
            tabIndex={index}
            title={faq.title}
            text={faq.text}
          />
        );
      })}
      <div className="modal-action">
        <label htmlFor={modalId} className="btn">
          Close
        </label>
      </div>
    </div>
  );
};

type FAQLineProps = {
  tabIndex: number;
  title: string;
  text: any;
};

const FAQLine: FC<FAQLineProps> = ({ tabIndex, title, text }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      tabIndex={tabIndex}
      className={
        "border collapse collapse-arrow border-base-300 rounded-box bg-gray-700 cursor-pointer mb-5 " +
        (open ? "collapse-open" : "collapse-close")
      }
      onClick={() => setOpen(!open)}
    >
      <div className="text-xl font-medium cursor-pointer collapse-title">
        {title}
      </div>
      <div className="cursor-pointer collapse-content">
        <div>{text}</div>
      </div>
    </div>
  );
};

const FAQs = [
  {
    title: "Do you have any tutorials for Satellite?",
    text: (
      <div>
        Yes!
        <div>
          Step by step{" "}
          <a
            href="https://socialaxl.medium.com/f6480c7ff20c"
            className="link link-primary"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            medium post.
          </a>
        </div>
        <div>
          Prefer a{" "}
          <a
            href="https://www.youtube.com/watch?v=_bxEw9Otb20"
            className="link link-primary"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            video walkthrough?
          </a>
        </div>
      </div>
    ),
  },
  {
    title: "What chains/assets do you support?",
    text: (
      <div>
        Satellite supports all the chains and assets listed in our{" "}
        <a
          href={docsLinks[process.env.NEXT_PUBLIC_ENVIRONMENT as string]}
          className="link link-primary"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          docs
        </a>
        .{" "}
      </div>
    ),
  },
  {
    title: "Can I move non-Axelar Wrapped assets via Satellite?",
    text: (
      <div>
        No. Satellite supports moving of Axelar Wrapped Assets only. Before you
        deposit your tokens to the deposit address, please verify that you’re
        using the correct token contract. If you send a non-Axelar wrapped asset
        to the deposit address, it will be lost.
        <div className="mt-5">
          See the{" "}
          <a
            href={
              tokenContractDocs[process.env.NEXT_PUBLIC_ENVIRONMENT as string]
            }
            className="link link-primary"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            docs
          </a>{" "}
          for a list of token contracts supported by Satellite on the mainnet.
        </div>
      </div>
    ),
  },
  {
    title: "How can I ask for help?",
    text: (
      <div>
        If your asset doesn’t arrive after sufficient time has passed (15-30
        minutes for all chains, except Ethereum, where transactions can take
        longer), then:
        <div className="ml-5">
          1. Confirm that your transaction on the source chain went through via
          the corresponding explorer.
        </div>
        <div className="ml-5">
          2. Confirm that you sent the assets to the Axelar-generated deposit
          address.
        </div>
        <div className="ml-5">
          3. Confirm that you’ve sent the tokens to the desired destination
          chain & added the token contract to your metamask wallet. Try
          searching your transaction in the destination chain’s explorer based
          on your destination address.
        </div>
        <div>
          {" "}
          If you still can’t find it, copy the Trace ID & the destination
          address & your transaction on the source chain and submit a request on{" "}
          <a
            href="https://axelar.zendesk.com/hc/en-us/requests/new"
            className="link link-primary"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Zenhub
          </a>
          .
        </div>
      </div>
    ),
  },
];
