import Link from "next/link";
import { Search } from "lucide-react";
import HeroSlider from "@/modules/home/components/HeroSlider";
import type { Banner } from "@/modules/home/types/banner";
import { guideHref } from "../api";
import type { GuideHub, GuideList } from "../types";
import GuideCard, { bnNumber } from "./GuideCard";
import styles from "./Guides.module.css";

export default function GuideDirectory({
  hub,
  banners,
  result,
  query,
}: {
  hub: GuideHub;
  banners: Banner[];
  result: GuideList;
  query: { q: string; category: string; sort: "popular" | "newest" };
}) {
  const title = hub.page?.title || "মা ও শিশুর যত্নের গাইড";
  const description = hub.page?.description || "সহজ ভাষায় প্রয়োজনীয় তথ্য, পরামর্শ ও যত্নের নির্দেশনা পড়ুন।";

  return (
    <main className={styles.directory}>
      {banners.length > 0 && <HeroSlider banners={banners} ariaLabel="গাইড ব্যানার" headingTag="h2" />}

      <div className={styles.container}>
        <header className={styles.simpleHero}>
          <p>MAANIKO GUIDE</p>
          <h1>{title}</h1>
          <span>{description}</span>
        </header>

        <form role="search" action="/guide#all-guides" className={styles.search}>
          <Search aria-hidden="true" />
          <input name="q" type="search" maxLength={120} defaultValue={query.q} placeholder="যে বিষয়ে জানতে চান লিখুন" aria-label="গাইড খুঁজুন" />
          {query.category && <input type="hidden" name="category" value={query.category} />}
          <button type="submit">খুঁজুন</button>
        </form>

        <nav className={styles.tabs} aria-label="গাইড ক্যাটাগরি">
          <Link href={guideHref({ q: query.q, sort: query.sort })} aria-current={!query.category ? "page" : undefined}>সব গাইড</Link>
          {hub.categories.map((category) => (
            <Link key={category.id} href={guideHref({ ...query, category: category.slug })} aria-current={query.category === category.slug ? "page" : undefined}>{category.name}</Link>
          ))}
        </nav>

        <section id="all-guides" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <h2>{query.category ? hub.categories.find((item) => item.slug === query.category)?.name : "সব গাইড"}</h2>
              <p>{bnNumber(result.total)}টি গাইড পাওয়া গেছে</p>
            </div>
            <Link href={guideHref({ ...query, sort: query.sort === "popular" ? "newest" : "popular" })}>{query.sort === "popular" ? "নতুন আগে" : "জনপ্রিয় আগে"}</Link>
          </div>

          {result.items.length > 0 ? (
            <div className={styles.cardGrid}>{result.items.map((guide) => <GuideCard key={guide.id} guide={guide} />)}</div>
          ) : (
            <div className={styles.empty}><Search aria-hidden="true" /><h3>কোনো গাইড পাওয়া যায়নি</h3><p>অন্য শব্দ দিয়ে খুঁজে দেখুন।</p><Link href="/guide#all-guides">সব গাইড দেখুন</Link></div>
          )}

          {result.totalPages > 1 && (
            <nav className={styles.pagination} aria-label="গাইডের পৃষ্ঠা">
              {result.page > 1 ? <Link rel="prev" href={guideHref({ ...query, page: result.page - 1 })}>আগের পৃষ্ঠা</Link> : <span />}
              <span>{bnNumber(result.page)} / {bnNumber(result.totalPages)}</span>
              {result.page < result.totalPages ? <Link rel="next" href={guideHref({ ...query, page: result.page + 1 })}>পরের পৃষ্ঠা</Link> : <span />}
            </nav>
          )}
        </section>
      </div>
    </main>
  );
}
