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
import type { Checklist } from "@/lib/content";

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

Font.registerHyphenationCallback((word) => {
  if (word.length <= 16) return [word];
  const parts: string[] = [];
  for (let i = 0; i < word.length; i += 8) {
    parts.push(word.slice(i, i + 8));
  }
  return parts;
});

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
    width: 491,
  },
  bullet: {
    width: 18,
    fontFamily: "Source Sans",
    fontWeight: 700,
    color: "#c8102e",
  },
  liBody: {
    width: 473,
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
    padding: 8,
    backgroundColor: "#f0f4f7",
    fontFamily: "Source Sans",
    fontWeight: 700,
    fontSize: 9.5,
  },
  td: {
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
  checkItem: {
    flexDirection: "row",
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e6edf2",
  },
  checkBox: {
    width: 13,
    height: 13,
    marginTop: 3,
    marginRight: 10,
    borderWidth: 1.2,
    borderColor: "#14181f",
  },
  checkBody: {
    width: 466,
  },
  checkStep: {
    fontFamily: "Source Sans",
    fontWeight: 700,
    fontSize: 8.5,
    letterSpacing: 1.2,
    color: "#c8102e",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  checkTitle: {
    fontFamily: "Source Sans",
    fontWeight: 700,
    fontSize: 12,
    marginBottom: 4,
    color: "#14181f",
  },
  checkDetail: {
    fontSize: 10.5,
    lineHeight: 1.45,
    color: "#2c3540",
    marginBottom: 4,
  },
  checkLink: {
    fontFamily: "Source Sans",
    fontSize: 9,
    color: "#c8102e",
    marginBottom: 2,
  },
});

function stripMdx(source: string) {
  return source
    .replace(/<PdfBreak\s*\/>/g, "\n\n:::pdf-break:::\n\n")
    .replace(/<CoverImage[\s\S]*?\/>/g, "\n")
    .replace(/<YouTube([^/]*)\/>/g, (_match, attrs: string) => {
      const title = /title="([^"]*)"/.exec(attrs)?.[1];
      const id = /id="([^"]*)"/.exec(attrs)?.[1];
      const url = id ? `https://www.youtube.com/watch?v=${id}` : "";
      if (title && url) {
        return `\n\n**Vídeo:** [${title}](${url})\n\n`;
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
    .replace(/\r?\n## Fontes[\s\S]*$/i, "\n\nAs fichas oficiais e os links .gob.es estão na versão online deste guia.\n")
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

function isPdfBreak(node: RootContent) {
  if (node.type !== "paragraph") return false;
  return (
    node.children
      .map((child) => (child.type === "text" ? child.value : ""))
      .join("")
      .trim() === ":::pdf-break:::"
  );
}

function renderBlock(node: RootContent, key: number | string, skipHeavyBlocks = false) {
  if (isPdfBreak(node)) {
    return <View key={key} break />;
  }

  if (skipHeavyBlocks && (node.type === "list" || node.type === "table")) {
    return null;
  }

  switch (node.type) {
    case "heading":
      return (
        <Text key={key} style={node.depth >= 3 ? styles.h3 : styles.h2}>
          <Inline nodes={node.children} />
        </Text>
      );
    case "paragraph":
      return (
        <Text key={key} style={styles.p}>
          <Inline nodes={node.children} />
        </Text>
      );
    case "list":
      return (
        <View key={key} style={styles.list}>
          {node.children.map((item, itemIndex) => {
            const body = listItemNodes(item);
            const mark = node.ordered ? `${itemIndex + 1}. ` : "• ";
            return (
              <Text key={itemIndex} style={styles.p}>
                {mark}
                <Inline nodes={body} />
              </Text>
            );
          })}
        </View>
      );
    case "blockquote": {
      const paragraph = node.children.find((child) => child.type === "paragraph");
      return (
        <View key={key} style={styles.quote}>
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

function chunkNodes(nodes: RootContent[], size = 6) {
  const chunks: RootContent[][] = [];
  for (let i = 0; i < nodes.length; i += size) {
    chunks.push(nodes.slice(i, i + size));
  }
  return chunks.length > 0 ? chunks : [[]];
}

function flattenInline(nodes: PhrasingContent[]): string {
  return nodes
    .map((node) => {
      if (node.type === "text") return node.value;
      if (
        (node.type === "link" || node.type === "strong" || node.type === "emphasis") &&
        "children" in node
      ) {
        return flattenInline(node.children as PhrasingContent[]);
      }
      if (node.type === "inlineCode") return node.value;
      return "";
    })
    .join("");
}

function PdfTable({ node }: { node: Table }) {
  return (
    <View style={{ marginBottom: 14, marginTop: 4 }}>
      {node.children.map((row, rowIndex) => (
        <Text key={rowIndex} style={rowIndex === 0 ? styles.h3 : styles.p}>
          {row.children.map((cell) => flattenInline(cell.children)).filter(Boolean).join(" — ")}
        </Text>
      ))}
    </View>
  );
}

function Blocks({ nodes, skipHeavyBlocks = false }: { nodes: RootContent[]; skipHeavyBlocks?: boolean }) {
  return nodes.map((node, index) => renderBlock(node, index, skipHeavyBlocks));
}

function ArticleDocument({
  title,
  description,
  kicker,
  path,
  tree,
  skipHeavyBlocks = false,
}: {
  title: string;
  description: string;
  kicker: string;
  path: string;
  tree: Root;
  skipHeavyBlocks?: boolean;
}) {
  const chunks = chunkNodes(tree.children, 8);

  return (
    <Document title={title} author={siteConfig.name} subject={description} creator={siteConfig.name}>
      {chunks.map((chunk, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <View style={styles.header} fixed>
            <Text style={styles.brand}>{siteConfig.name}</Text>
            <Text>{siteConfig.domain}</Text>
          </View>

          {pageIndex === 0 ? (
            <View>
              <Text style={styles.kicker}>{kicker}</Text>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          ) : null}

          <Blocks nodes={chunk} skipHeavyBlocks={skipHeavyBlocks} />

          <Text style={styles.footerLeft} fixed>
            {siteConfig.url}
            {path}
          </Text>
          <Text
            style={styles.footerRight}
            fixed
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </Page>
      ))}
    </Document>
  );
}

function ChecklistDocument({ checklist }: { checklist: Checklist }) {
  return (
    <Document
      title={checklist.title}
      author={siteConfig.name}
      subject={checklist.description}
      creator={siteConfig.name}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Text style={styles.brand}>{siteConfig.name}</Text>
          <Text>{siteConfig.domain}</Text>
        </View>

        <View>
          <Text style={styles.kicker}>Checklist</Text>
          <Text style={styles.title}>{checklist.title}</Text>
          <Text style={styles.description}>{checklist.description}</Text>
        </View>

        <Text style={styles.p}>
          Marque no papel. O progresso do site fica só no navegador; este PDF é a cópia para levar.
        </Text>

        {checklist.items.map((item, index) => (
          <View key={item.id} style={styles.checkItem}>
            <View style={styles.checkBox} />
            <View style={styles.checkBody}>
              <Text style={styles.checkStep}>Passo {index + 1}</Text>
              <Text style={styles.checkTitle}>{item.title}</Text>
              <Text style={styles.checkDetail}>{item.detail}</Text>
              {item.links?.map((link) => (
                <Link key={link.href} src={absoluteUrl(link.href)} style={styles.checkLink}>
                  {link.label}: {absoluteUrl(link.href)}
                </Link>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.footerLeft} fixed>
          {siteConfig.url}
          {`/checklists/${checklist.slug}`}
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

export function contentPdfFilename(slug: string) {
  return `minha-espanha-${slug}.pdf`;
}

export function guidePdfPath(slug: string) {
  return `/guias/${slug}/pdf`;
}

export function checklistPdfPath(slug: string) {
  return `/checklists/${slug}/pdf`;
}

export async function renderMarkdownPdf({
  title,
  description,
  content,
  kicker,
  path,
}: {
  title: string;
  description: string;
  content: string;
  kicker: string;
  path: string;
}) {
  const markdown = stripMdx(content);
  const tree = remark().use(remarkGfm).parse(markdown) as Root;
  return renderToBuffer(
    <ArticleDocument
      title={title}
      description={description}
      kicker={kicker}
      path={path}
      tree={tree}
    />,
  );
}

export async function renderChecklistPdf(checklist: Checklist) {
  return renderToBuffer(<ChecklistDocument checklist={checklist} />);
}
