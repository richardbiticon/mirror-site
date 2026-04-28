import { telHref, whatsappHref } from "../lib/contact";

interface Props {
  phone: string;
  prefilledMessage?: string;
}

export function PhoneActions({ phone, prefilledMessage }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <a
        href={telHref(phone)}
        className="font-mono text-slate-200 hover:text-sky-300"
      >
        {phone}
      </a>
      <div className="flex items-center gap-2 text-xs">
        <a
          href={telHref(phone)}
          className="text-slate-500 hover:text-sky-300"
        >
          Call
        </a>
        <span className="text-slate-700">.</span>
        <a
          href={whatsappHref(phone, prefilledMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-emerald-400"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
