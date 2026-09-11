"""Rasterize a PDF into page-01.png, page-02.png, … next to the file."""

from __future__ import annotations

import sys
from pathlib import Path

try:
    import pypdfium2 as pdfium
except ImportError:
    sys.stderr.write("Installing pypdfium2…\n")
    import subprocess

    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdfium2", "--quiet"])
    import pypdfium2 as pdfium


def main() -> None:
    if len(sys.argv) != 2:
        sys.stderr.write("Usage: python scripts/pdf-pages.py <file.pdf>\n")
        sys.exit(2)

    pdf_path = Path(sys.argv[1]).resolve()
    if not pdf_path.is_file():
        sys.stderr.write(f"Not a file: {pdf_path}\n")
        sys.exit(1)

    out_dir = pdf_path.parent
    for old in out_dir.glob("page-*.png"):
        old.unlink()

    pdf = pdfium.PdfDocument(str(pdf_path))
    scale = 2
    for index, page in enumerate(pdf):
        bitmap = page.render(scale=scale)
        image = bitmap.to_pil()
        dest = out_dir / f"page-{index + 1:02d}.png"
        image.save(dest, "PNG", optimize=True)
        page.close()
        print(dest)

    pdf.close()


if __name__ == "__main__":
    main()
