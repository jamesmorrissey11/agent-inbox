import { AGENT_INBOX_GITHUB_README_URL } from "../constants";

export function WelcomeInboxDescription() {
  return (
    <>
      <span className="block">To get started, please add an inbox below.</span>
      <span className="block">
        Not sure where to start? Check out our docs
        <a
          href={AGENT_INBOX_GITHUB_README_URL}
          target="_blank"
          rel="noreferrer"
          className="text-brand-500 hover:underline ml-1"
        >
          here
        </a>
        .
      </span>
    </>
  );
}
