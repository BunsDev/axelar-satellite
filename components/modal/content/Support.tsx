import { FC } from "react";
import Image from "next/image";

import { useApplicationStateStore } from "../../../store";

import { SUPPORT_MODAL } from "../../../config/constants";
import { Link } from "../../common/GetLink";

type SupportProps = {};

export const Support: FC<SupportProps> = ({}) => {
  const { modalId } = useApplicationStateStore((state) => state);

  if (modalId !== SUPPORT_MODAL) return null;

  return (
    <div>
      <h1 className="mb-10 text-3xl">Get Support</h1>
      {Link({
        url: "https://transaction-confirmation.axelar.dev",
        linkTitle: "Transaction Stuck?",
        linkDescription: `Try this Deposit Recovery Tool to confirm your deposit transasction on the Axelar network.`,
      })}
      {Link({
        url: `https://${
          process.env.NEXT_PUBLIC_ENVIRONMENT !== "mainnet" ? "testnet." : ""
        }axelarscan.io`,
        linkTitle: "Transaction History",
        linkDescription: `Search Axelarscan for any transactions you made through Satellite. You can search by sending, receiving, or deposit addresses.`,
      })}
      {Link({
        url: "https://axelar.zendesk.com/hc/en-us/requests/new",
        linkTitle: "File A Ticket",
        linkDescription: `For general help, submit your questions/feedback via Zendesk. Any and all thoughts welcome!`,
      })}
      {GetSocials()}
      <div className="modal-action">
        <label htmlFor={modalId} className="btn">
          Close
        </label>
      </div>
    </div>
  );
};

export const GetSocials = () => {
  return (
    <div className="flex items-center mb-5 space-x-2">
      <div>
        <div className="text-[#FFFFFF] uppercase mr-2">Join the community!</div>
      </div>

      <a
        className="flex items-center ml-1 space-x-2"
        href={"https://discord.com/invite/aRZ3Ra6f7D"}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <Image
          layout="intrinsic"
          width={25}
          height={50}
          src="/assets/ui/discord.svg"
          alt="Discord icon"
        />
      </a>
      <a
        className="flex items-center ml-1 space-x-2"
        href={"https://twitter.com/axl_satellite"}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <Image
          layout="intrinsic"
          width={25}
          height={25}
          src="/assets/ui/twitter.svg"
          alt="Twitter icon"
        />
      </a>
      <a
        className="flex items-center ml-1 space-x-2"
        href={"https://www.linkedin.com/company/axelarnetwork/"}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <Image
          layout="intrinsic"
          width={25}
          height={25}
          src="/assets/ui/linkedin.svg"
          alt="LinkedIn icon"
        />
      </a>
    </div>
  );
};
