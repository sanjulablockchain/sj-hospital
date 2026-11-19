import type { Locale } from "@/lib/i18n/locales";
import { chapters } from "../data/chapters";
import { getServiceBookContent } from "../data/getContent";
import { bookPages } from "../data/pages";
import { pageImages } from "../data/pageImages";
import { BookReader } from "./BookReader";

/** `/service-book/read`: the book and nothing else. */
export async function ServiceBookReaderPage({ locale }: { locale: Locale }) {
  const { reader } = await getServiceBookContent(locale);
  return (
    <main>
      <h1 className="sr-only">{reader.title}</h1>
      <BookReader
        labels={reader}
        backHref="/service-book"
        chapters={chapters}
        pages={bookPages}
        images={pageImages}
      />
    </main>
  );
}
