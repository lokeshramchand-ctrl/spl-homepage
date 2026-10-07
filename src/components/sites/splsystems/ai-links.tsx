import { ChatGptIcon, ClaudeIcon, GrokIcon, PerplexityIcon } from "./icons";

const PROVIDERS = [
  {
    name: "ChatGPT",
    icon: ChatGptIcon,
    url: (q: string) => `https://chatgpt.com/?q=${encodeURIComponent(q)}`,
  },
  {
    name: "Claude",
    icon: ClaudeIcon,
    url: (q: string) => `https://claude.ai/new?q=${encodeURIComponent(q)}`,
  },
  {
    name: "Perplexity",
    icon: PerplexityIcon,
    url: (q: string) => `https://www.perplexity.ai/search?q=${encodeURIComponent(q)}`,
  },
  {
    name: "Grok",
    icon: GrokIcon,
    url: (q: string) => `https://grok.com/?q=${encodeURIComponent(q)}`,
  },
];

/** The four "ask an AI" icon links used in the AI band and the footer aside. */
export function AiIconRow({
  prompt,
  size = 32,
  className = "",
}: {
  prompt: string;
  size?: number;
  className?: string;
}) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {PROVIDERS.map(({ name, icon: Icon, url }) => (
        <li key={name}>
          <a
            href={url(prompt)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open in ${name}`}
            className="block text-[#181818] transition-opacity duration-150 hover:opacity-70"
          >
            <Icon width={size} height={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
