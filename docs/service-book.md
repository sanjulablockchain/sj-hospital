# Service Book: how the web copy is made

The `/service-book` page shows the hospital's printed Service Book. The
designer's master PDF is not committed; the site serves files derived from it.

## Source

- 2026 edition: `C:\Users\User\Documents\Web data\sj-hospital\Data\STJ_Booklet_Final.pdf`
- 41 pages, A4 landscape, 136 MB. Every page is one flattened 3508 x 2480
  JPEG with no text layer.

## Known slips in the 2026 master

- Printed page 19 (the laboratory price list intro) sits at position 13 of the
  PDF, between printed pages 12 and 13. The script puts it back in printed
  order for both the page images and the download copy, so web page N is
  printed page N.
- The last two numbered pages are printed "36." and "37." (they are pages 39
  and 40), and page 37 has a stray "34." under its number. These are in the
  artwork and need the designer.

## What the site serves

| File | What | Size (2026) |
|---|---|---|
| `public/images/service-book/2026/page-NN.webp` | each page, 2000 x 1414 WebP, quality 82 (stepped down by 5 for any page over 290 KB; none needed it) | 52 to 253 KB each, 5.7 MB in all |
| `public/downloads/sj-service-book-2026.pdf` | the download: each page re-embedded as a 1600 px JPEG at quality 72, A4 landscape kept | 5.9 MB |

`next/image` serves the pages as AVIF or WebP at the width each screen needs,
so a phone fetches far less than the 2000 px master.

## A new edition

1. Put the new pages in a new year folder (`public/images/service-book/2027/`)
   and name the PDF after the year, so no cached copy of the old one lingers.
2. Update `src/features/service-book/data/pageImages.ts` (the 41 imports),
   `data/pages.ts` (alt text per page), `data/chapters.ts` (page ranges from the
   book's contents page), and `download` plus the hero facts in
   `data/content.ts`.
3. Run `npm test` (it pins the page count and the chapter ranges) and
   `npm run check:images`.

## The conversion script

Run once with Python 3, PyMuPDF and Pillow (`pip install --target <dir> pymupdf pillow`),
outside the repo:

```
python convert.py <source.pdf> <image dir> <output.pdf> <library dir>
```

```python
import sys; sys.path.insert(0, sys.argv[4])
import io, sys, pymupdf
from PIL import Image
src, img_dir, pdf_out = sys.argv[1:4]
doc = pymupdf.open(src)
out = pymupdf.open()
LIMIT = 290 * 1024
# The 2026 master has its printed page 19 (the laboratory price list intro)
# at position 13; put it back between printed pages 18 and 20.
ORDER = list(range(1, 13)) + list(range(14, 20)) + [13] + list(range(20, doc.page_count + 1))
assert sorted(ORDER) == list(range(1, doc.page_count + 1))
for i, src_no in enumerate(ORDER, start=1):
    page = doc[src_no - 1]
    pix = page.get_pixmap(dpi=180)
    im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    big = im.resize((2000, 1414), Image.LANCZOS)
    q = 82
    while True:
        buf = io.BytesIO(); big.save(buf, "WEBP", quality=q, method=6)
        if buf.tell() <= LIMIT or q <= 50: break
        q -= 5
    open(f"{img_dir}/page-{i:02d}.webp", "wb").write(buf.getvalue())
    small = im.resize((1600, 1131), Image.LANCZOS)
    jb = io.BytesIO(); small.save(jb, "JPEG", quality=72, optimize=True, progressive=True)
    p = out.new_page(width=page.rect.width, height=page.rect.height)
    p.insert_image(p.rect, stream=jb.getvalue())
    print(i, q, round(buf.tell() / 1024), "KB", flush=True)
out.set_metadata({"title": "St. Joseph Hospital Service Book 2026", "author": "St. Joseph Hospital, Negombo"})
out.save(pdf_out, garbage=4, deflate=True)
```
