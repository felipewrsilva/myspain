import { join } from "node:path";
import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import type { List, PhrasingContent, Root, RootContent, Table } from "mdast";
import { siteConfig } from "@/lib/site";
import type { Apostila } from "@/lib/content";

const fontsDir = join(process.cwd(), "src/app/fonts");

Font.register({
  family: "Source Serif",
  fonts: [
    { src: join(fontsDir, "SourceSerif4-Regular.ttf"), fontWeight: 400 },
    { src: join(fontsDir, "SourceSerif4-Semibold.ttf"), fontWeight: 600 },
  ],
});

Font.register({
  family: "Source Sans",
  fonts: [
    { src: join(fontsDir, "SourceSans3-Regular.ttf"), fontWeight: 400 },
    { src: join(fontsDir, "SourceSans3-Semibold.ttf"), fontWeight: 600 },
    { src: join(fontsDir, "SourceSans3-Bold.ttf"), fontWeight: 700 },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    paddingTop: 64,
    paddingBottom: 64,
    paddingHorizontal: 52,
    fontFamily: "Source Serif",
    fontSize: 11,
    lineHeight: 1.55,
    color: "#14181f",
  },
  header: {
    position: "absolute",
    top: 24,
    left: 52,
    right: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Source Sans",
    fontSize: 8.5,
    color: "#5a6572",
  },
  brand: {
    fontFamily: "Source Sans",
    fontWeight: 700,
    fontSize: 9.5,
    color: "#c8102e",
  },
  kicker: {
    fontFamily: "Source Sans",
    fontWeight: 700,
    fontSize: 8.5,
    letterSpacing: 1.6,
    color: "#c8102e",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: "Source Sans",
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1.25,
    color: "#14181f",
    marginBottom: 10,
  },
  description: {
    fontSize: 11.5,
    lineHeight: 1.5,
    color: "#5a6572",
    marginBottom: 20,
  },
  h2: {
    fontFamily: "Source Sans",
    fontWeight: 700,
    fontSize: 13.5,
    lineHeight: 1.3,
    marginTop: 18,
    marginBottom: 8,
    color: "#14181f",
  },
  h3: {
    fontFamily: "Source Sans",
    fontWeight: 700,
    fontSize: 11.5,
    lineHeight: 1.3,
    marginTop: 14,
    marginBottom: 6,
    color: "#14181f",
  },
  p: {
    marginBottom: 10,
    color: "#2c3540",
  },
  bold: {
    fontFamily: "Source Serif",
    fontWeight: 600,
    color: "#14181f",
  },
  link: {
    fontFamily: "Source Serif",
    color: "#c8102e",
    textDecoration: "none",
  },
  code: {
    fontFamily: "Source Sans",
    fontSize: 10,
    color: "#14181f",
  },
  list: {
    marginBottom: 10,
  },
  li: {
    flexDirection: "row",
    marginBottom: 5,
    paddingLeft: 2,
  },
  bullet: {
    width: 18,
    fontFamily: "Source Sans",
    fontWeight: 700,
    color: "#c8102e",
  },
  liBody: {
    flex: 1,
    color: "#2c3540",
  },
  quote: {
    marginBottom: 12,
    marginTop: 4,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#c8102e",
    backgroundColor: "#f7f4f2",
  },
  quoteText: {
    color: "#14181f",
  },
  table: {
    marginBottom: 14,
    marginTop: 2,
    borderWidth: 1,
    borderColor: "#d7e0e7",
  },
  tr: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d7e0e7",
  },
  th: {
    flex: 1,
    padding: 8,
    backgroundColor: "#f0f4f7",
    fontFamily: "Source Sans",
    fontWeight: 700,
    fontSize: 9.5,
  },
  td: {
    flex: 1,
    padding: 8,
    fontSize: 9.5,
    lineHeight: 1.4,
    color: "#2c3540",
  },
  footerLeft: {
    position: "absolute",
    bottom: 28,
    left: 52,
    fontFamily: "Source Sans",
    fontSize: 9,
    color: "#5a6572",
  },
  footerRight: {
    position: "absolute",
    bottom: 28,
    left: 52,
    right: 52,
    fontFamily: "Source Sans",
    fontSize: 9,
    color: "#5a6572",
    textAlign: "right",
  },
});

function stripMdx(source: string) {
  return source
    .replace(/<CoverImage[\s\S]*?\/>/g, "\n")
    .replace(/<YouTube([^/]*)\/>/g, (_match, attrs: string) => {
      const title = /title="([^"]*)"/.exec(attrs)?.[1];
      const id = /id="([^"]*)"/.exec(attrs)?.[1];
      const url = id ? `https://www.youtube.com/watch?v=${id}` : "";
      if (title && url) {
        return `\n\n**Vídeo (português do Brasil):** [${title}](${url})\n\n`;
      }
      if (url) return `\n\n**Vídeo:** ${url}\n\n`;
      return title ? `\n\n**Vídeo no site:** ${title}\n\n` : "\n";
    })
    .replace(/<Callout([^>]*)>([\s\S]*?)<\/Callout>/g, (_match, attrs: string, body: string) => {
      const variant = /variant="([^"]*)"/.exec(attrs)?.[1] ?? "dica";
      const label = variant === "aviso" ? "Atenção" : variant === "nao-pode" ? "Não pode" : "Dica";
      const text = body.replace(/\s+/g, " ").trim();
      return `\n\n> **${label}.** ${text}\n\n`;
    })
    .trim();
}

function absoluteUrl(href: string) {
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  if (href.startsWith("/")) return `${siteConfig.url}${href}`;
  return href;
}

function Inline({ nodes }: { nodes: PhrasingContent[] }) {
  return nodes.map((node, index) => {
    switch (node.type) {
      case "text":
        return node.value;
      case "strong":
        return (
          <Text key={index} style={styles.bold}>
            <Inline nodes={node.children} />
          </Text>
        );
      case "emphasis":
        return (
          <Text key={index} style={styles.bold}>
            <Inline nodes={node.children} />
          </Text>
        );
      case "link":
        return (
          <Link key={index} src={absoluteUrl(node.url)} style={styles.link}>
            <Inline nodes={node.children} />
          </Link>
        );
      case "inlineCode":
        return (
          <Text key={index} style={styles.code}>
            {node.value}
          </Text>
        );
      case "break":
        return "\n";
      default:
        return null;
    }
  });
}

function listItemNodes(item: List["children"][number]): PhrasingContent[] {
  const first = item.children[0];
  if (first?.type === "paragraph") return first.children;
  return [];
}

function renderBlock(node: RootContent, key: number | string) {
  switch (node.type) {
    case "heading":
      return (
        <Text key={key} style={node.depth >= 3 ? styles.h3 : styles.h2}>
          <Inline nodes={node.children} />
        </Text>
      );
    case "paragraph":
      return (
        <Text key={key} orphans={3} widows={3} style={styles.p}>
          <Inline nodes={node.children} />
        </Text>
      );
    case "list":
      return (
        <View key={key} style={styles.list}>
          {node.children.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.li} wrap={false}>
              <Text style={styles.bullet}>{node.ordered ? `${itemIndex + 1}.` : "•"}</Text>
              <Text style={styles.liBody}>
                <Inline nodes={listItemNodes(item)} />
              </Text>
            </View>
          ))}
        </View>
      );
    case "blockquote": {
      const paragraph = node.children.find((child) => child.type === "paragraph");
      return (
        <View key={key} style={styles.quote} minPresenceAhead={56}>
          <Text style={styles.quoteText}>
            {paragraph ? <Inline nodes={paragraph.children} /> : null}
          </Text>
        </View>
      );
    }
    case "table":
      return <PdfTable key={key} node={node} />;
    default:
      return null;
  }
}

function Blocks({ nodes }: { nodes: RootContent[] }) {
  const elements: Array<ReturnType<typeof renderBlock>> = [];

  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];
    const next = nodes[index + 1];
    const keepWithNext =
      node.type === "heading" && next && next.type !== "heading";

    if (keepWithNext) {
      elements.push(
        <View key={index} wrap={false} minPresenceAhead={28}>
          {renderBlock(node, "heading")}
          {renderBlock(next, "body")}
        </View>,
      );
      index += 1;
      continue;
    }

    elements.push(renderBlock(node, index));
  }

  return elements;
}

function PdfTable({ node }: { node: Table }) {
  return (
    <View style={styles.table} wrap={false} minPresenceAhead={80}>
      {node.children.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.tr} wrap={false}>
          {row.children.map((cell, cellIndex) => (
            <Text key={cellIndex} style={rowIndex === 0 ? styles.th : styles.td}>
              <Inline nodes={cell.children} />
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

function ApostilaDocument({ apostila, tree }: { apostila: Apostila; tree: Root }) {
  return (
    <Document
      title={apostila.title}
      author={siteConfig.name}
      subject={apostila.description}
      creator={siteConfig.name}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Text style={styles.brand}>{siteConfig.name}</Text>
          <Text>{siteConfig.domain}</Text>
        </View>

        <View wrap={false}>
          <Text style={styles.kicker}>Apostila</Text>
          <Text style={styles.title}>{apostila.title}</Text>
          <Text style={styles.description}>{apostila.description}</Text>
        </View>

        <Blocks nodes={tree.children} />

        <Text style={styles.footerLeft} fixed>
          {siteConfig.url}
          {apostilaPdfPath(apostila.slug).replace(/\/pdf$/, "")}
        </Text>
        <Text
          style={styles.footerRight}
          fixed
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        />
      </Page>
    </Document>
  );
}

export function apostilaPdfPath(slug: string) {
  return `/apostilas/${slug}/pdf`;
}

export function apostilaPdfFilename(slug: string) {
  return `minha-espanha-${slug}.pdf`;
}

export async function renderApostilaPdf(apostila: Apostila) {
  const markdown = stripMdx(apostila.content);
  const tree = remark().use(remarkGfm).parse(markdown) as Root;
  return renderToBuffer(<ApostilaDocument apostila={apostila} tree={tree} />);
}
