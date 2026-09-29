import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { Insight, SimpleBlock } from "@/content/types";
import { cn } from "@/lib/utils";

const components: PortableTextComponents = {
  types: {
    imageWithAlt: ({ value }) =>
      value?.src ? (
        <figure className="my-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={value.src} alt={value.alt ?? ""} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
          </div>
          {value.caption && <figcaption className="mt-3 text-center text-sm text-muted">{value.caption}</figcaption>}
        </figure>
      ) : null,
    callout: ({ value }) => (
      <aside
        className={cn(
          "my-8 rounded-2xl border-l-4 p-6 text-[1.02rem]",
          value?.tone === "warning" ? "border-alert bg-alert/5" : value?.tone === "success" ? "border-success bg-success/5" : "border-navy bg-tint",
        )}
      >
        {value?.text}
      </aside>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:/.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
};

function Simple({ blocks }: { blocks: SimpleBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b._type) {
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case "quote":
            return <blockquote key={i}>{b.text}</blockquote>;
          default:
            return <p key={i}>{b.text}</p>;
        }
      })}
    </>
  );
}

export function RichBody({ body, className }: { body: Insight["body"]; className?: string }) {
  const isPortable = body.some((b) => b._type === "block" || b._type === "imageWithAlt" || b._type === "callout");
  return (
    <div className={cn("prose-cedela", className)}>
      {isPortable ? <PortableText value={body as never} components={components} /> : <Simple blocks={body as SimpleBlock[]} />}
    </div>
  );
}

export function bodyToText(body: Insight["body"]): string {
  return body
    .map((b) => {
      const x = b as Record<string, unknown>;
      if (typeof x.text === "string") return x.text;
      if (Array.isArray(x.items)) return (x.items as string[]).join(" ");
      if (Array.isArray(x.children)) return (x.children as { text?: string }[]).map((c) => c.text ?? "").join("");
      return "";
    })
    .join(" ");
}
