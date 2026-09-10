import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";

const components = {
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
