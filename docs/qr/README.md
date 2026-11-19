# Service Book QR code

Points to **https://sjhospital.lk/service-book**, the Service Book's intro
page. Its "Read now" button opens the full screen reader.

| File | Use |
|---|---|
| `service-book-qr.svg` | Print. Vector, so it stays sharp at any size. |
| `service-book-qr.png` | Screens, WhatsApp, quick mock ups (1184 x 1184 px). |

QR version 3 (29 x 29 modules), error correction level M, with the standard
4 module quiet zone already included. Decoded and checked against the URL
when it was made.

## Printing

- Print it at least **2.5 cm** wide; 3 cm or more for posters read from a
  distance.
- Keep the white margin around it. Nothing (text, photos, borders) inside it.
- Dark on light only. Do not invert it, put it on a photograph, or recolour
  it to a light tint.
- A short line beside it helps, for example "Scan to read our Service Book".
- Scan a printed proof with an iPhone and an Android phone before the run.

## If the URL ever changes

The printed codes keep working as long as `/service-book` exists. A future
edition (2027) replaces the book behind the same address, so the codes never
need reprinting. If the page ever moves, add a redirect from `/service-book`
rather than reprinting.

Made with Python `segno` (`segno.make(url, error="m")`), checked with `pyzbar`.
