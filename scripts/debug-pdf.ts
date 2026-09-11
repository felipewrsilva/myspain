import { getGuide } from "../src/lib/content";
import { renderMarkdownPdf } from "../src/lib/apostila-pdf";

async function tryRender(label: string, content: string) {
  try {
    const pdf = await renderMarkdownPdf({
      title: "Teste",
      description: "Teste de PDF",
      content,
      kicker: "Guia",
      path: "/guias/debug",
    });
    console.log(`OK ${label} bytes=${pdf.length} chars=${content.length}`);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`FAIL ${label} chars=${content.length} ${message}`);
    return false;
  }
}

async function binarySearch(content: string) {
  let lo = 0;
  let hi = content.length;
  let lastFail = content.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    const slice = content.slice(0, mid);
    const ok = await tryRender(`slice:${mid}`, slice);
    if (ok) lo = mid;
    else {
      lastFail = mid;
      hi = mid - 1;
    }
  }
  const start = Math.max(0, lastFail - 500);
  console.log("\n--- window around failure ---\n");
  console.log(content.slice(start, lastFail + 200));
}

async function main() {
  const slug = process.argv[2] ?? "primeiros-30-dias";
  const item = getGuide(slug);
  if (!item) throw new Error(slug);
  const variants: Array<[string, string]> = [
    ["full", item.content],
    ["no-links", item.content.replace(/\[[^\]]+\]\([^)]+\)/g, "link")],
    ["no-tables", item.content.replace(/^\|.+\|[ \t]*$/gm, "")],
    ["no-lists", item.content.replace(/^\s*[-*]\s+.+$/gm, "").replace(/^\s*\d+\.\s+.+$/gm, "")],
    ["no-callouts", item.content.replace(/<Callout[\s\S]*?<\/Callout>/g, "")],
  ];
  for (const [label, content] of variants) {
    await tryRender(label, content);
  }
  await binarySearch(item.content);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
