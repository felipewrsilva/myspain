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
  family: "Syne",
  src: join(fontsDir, "Syne-ExtraBold.ttf"),
});

Font.register({
  family: "Manrope",
  fonts: [
    { src: join(fontsDir, "Manrope-Regular.ttf"), fontWeight: 400 },
    { src: join(fontsDir, "Manrope-SemiBold.ttf"), fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 56,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontFamily: "Manrope",
    fontSize: 10.5,
    lineHeight: 1.45,
    color: "#14181f",
  },
  header: {
    position: "absolute",
    top: 22,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#5a6572",
  },
  brand: {
    fontFamily: "Syne",
    fontSize: 9,
    color: "#c8102e",
  },
  kicker: {
    fontFamily: "Syne",
    fontSize: 8,
    letterSpacing: 1.4,
    color: "#c8102e",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: "Syne",
    fontSize: 20,
    lineHeight: 1.2,
    color: "#14181f",
    marginBottom: 10,
  },
  description: {
    fontSize: 11,
    color: "#5a6572",
    marginBottom: 18,
  },
  h2: {
    fontFamily: "Syne",
    fontSize: 13,
    marginTop: 16,
    marginBottom: 6,
    color: "#14181f",
  },
  h3: {
    fontFamily: "Syne",
    fontSize: 11,
    marginTop: 12,
    marginBottom: 4,
    color: "#14181f",
  },
  p: {
    marginBottom: 8,
    color: "#3a4450",
  },
  bold: {
    fontFamily: "Manrope",
    fontWeight: 600,
    color: "#14181f",
  },
  link: {
    color: "#c8102e",
    textDecoration: "none",
  },
  code: {
    fontSize: 9.5,
    color: "#14181f",
  },
  list: {
    marginBottom: 8,
  },
  li: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 2,
  },
  bullet: {
    width: 16,
    color: "#c8102e",
    fontWeight: 600,
  },
  liBody: {
    flex: 1,
    color: "#3a4450",
  },
  quote: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#c8102e",
  },
  quoteText: {
    color: "#14181f",
  },
  table: {
    marginBottom: 12,
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
    padding: 6,
    backgroundColor: "#f0f4f7",
    fontWeight: 600,
    fontSize: 9,
  },
  td: {
    flex: 1,
    padding: 6,
    fontSize: 9,
    color: "#3a4450",
  },
  footer: {
    position: "absolute",
    bottom: 22,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#5a6572",
  },
});

function stripMdx(source: string) {
  return source
    .replace(/<CoverImage[\s\S]*?\/>/g, "\n")
    .replace(/<YouTube([^/]*)\/>/g, (_match, attrs: string) => {
      const title = /title="([^"]*)"/.exec(attrs)?.[1];
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

function Blocks({ nodes }: { nodes: RootContent[] }) {
  return nodes.map((node, index) => {
    switch (node.type) {
      case "heading":
        return (
          <Text key={index} style={node.depth >= 3 ? styles.h3 : styles.h2}>
            <Inline nodes={node.children} />
          </Text>
        );
      case "paragraph":
        return (
          <Text key={index} style={styles.p}>
            <Inline nodes={node.children} />
          </Text>
        );
      case "list":
        return (
          <View key={index} style={styles.list}>
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
          <View key={index} style={styles.quote} wrap={false}>
            <Text style={styles.quoteText}>
              {paragraph ? <Inline nodes={paragraph.children} /> : null}
            </Text>
          </View>
        );
      }
      case "table":
        return <PdfTable key={index} node={node} />;
      default:
        return null;
    }
  });
}

function PdfTable({ node }: { node: Table }) {
  return (
    <View style={styles.table}>
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

        <Text style={styles.kicker}>Apostila</Text>
        <Text style={styles.title}>{apostila.title}</Text>
        <Text style={styles.description}>{apostila.description}</Text>

        <Blocks nodes={tree.children} />

        <View style={styles.footer} fixed>
          <Text>
            {siteConfig.url}
            {apostilaPdfPath(apostila.slug).replace(/\/pdf$/, "")}
          </Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
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
