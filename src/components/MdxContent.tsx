import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Image from "next/image";
import { Callout } from "@/components/Callout";
import { YouTube } from "@/components/YouTube";
import { CoverImage } from "@/components/CoverImage";

const components = {
  YouTube,
  Callout,
  CoverImage,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const { src, alt, ...rest } = props;
    if (!src) return null;
    return (
      <span className="my-8 block overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper-2)]">
        {/* Markdown images: remote Unsplash, already allowed in next.config */}
        <Image
          src={src}
          alt={alt ?? ""}
          width={1600}
          height={900}
          className="h-auto w-full object-cover"
          {...rest}
        />
      </span>
    );
  },
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href ?? "";
    if (href.startsWith("/")) {
      return (
        <Link href={href} className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
          {props.children}
        </Link>
      );
    }
    return (
      <a
        {...props}
        className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        target="_blank"
        rel="noreferrer"
      />
    );
  },
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-10 mb-3 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 mb-2 text-lg font-bold text-[var(--ink)]" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-[var(--ink-muted)]" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-[var(--ink-muted)]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 list-decimal space-y-2 pl-5 text-[var(--ink-muted)]" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-relaxed" {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-[var(--ink)]" {...props} />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="mb-6 overflow-x-auto rounded-2xl border border-[var(--line)]">
      <table className="w-full min-w-[32rem] text-left text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-[var(--paper-2)] text-[var(--ink)]" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-3 py-2.5 font-semibold" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-t border-[var(--line)] px-3 py-2.5 text-[var(--ink-muted)]" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mb-4 border-l-4 border-[var(--accent-2)] pl-4 text-[var(--ink-muted)] italic"
      {...props}
    />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
