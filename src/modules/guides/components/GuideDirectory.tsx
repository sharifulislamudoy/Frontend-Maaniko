import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  FileText,
  Heart,
  MessageSquare,
  PencilLine,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import HeroSlider from "@/modules/home/components/HeroSlider";
import type { Banner } from "@/modules/home/types/banner";
import { guideHref } from "../api";
import type { GuideHub, GuideInfoItem, GuideList } from "../types";
import GuideCard, { bnNumber } from "./GuideCard";
import GuideImage from "./GuideImage";
import styles from "./Guides.module.css";

const icons = {
  message: MessageSquare,
  file: FileText,
  refresh: RefreshCw,
  research: FileSearch,
  edit: PencilLine,
  check: CheckCircle2,
};

function InfoItems({
  items,
  numbered = false,
}: {
  items: GuideInfoItem[];
  numbered?: boolean;
}) {
  return (
    <div className={styles.infoGrid}>
      {items.map((item, index) => {
        const Icon = icons[item.icon] ?? FileText;
        return (
          <div key={index} className={styles.infoItem}>
            <div>
              {numbered && (
                <span className={styles.step}>
                  {bnNumber(index + 1).padStart(2, "০")}
                </span>
              )}
              <Icon aria-hidden="true" strokeWidth={1.4} />
            </div>
            <p>{item.text}</p>
          </div>
        );
      })}
    </div>
  );
}

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
  const content = hub.page;
  if (!content)
    return (
      <div className={styles.message}>
        <h1>গাইড শীঘ্রই আসছে</h1>
        <p>নতুন গাইড যুক্ত হলে এখানে পড়তে পারবেন।</p>
      </div>
    );
  const filtered = Boolean(
    query.q || query.category || query.sort === "newest",
  );
  const activeCategory = hub.categories.find(
    (category) => category.slug === query.category,
  );
  return (
    <div className={styles.directory}>
      <h1 className="sr-only">{content.title}</h1>
      <HeroSlider banners={banners} ariaLabel="গাইড ব্যানার" headingTag="h2" />
      <div className={styles.container}>
        {!banners.length && (
          <header className={styles.fallbackHero}>
            <h2>{content.title}</h2>
            <p>{content.description}</p>
          </header>
        )}
        <form
          id="guide-search"
          role="search"
          action="/guide#all-guides"
          className={styles.search}
        >
          <Search aria-hidden="true" />
          <label htmlFor="guide-query" className="sr-only">
            গাইড খুঁজুন
          </label>
          <input
            id="guide-query"
            name="q"
            type="search"
            maxLength={120}
            defaultValue={query.q}
            key={query.q}
            placeholder={content.searchPlaceholder}
          />
          {query.category && (
            <input type="hidden" name="category" value={query.category} />
          )}
          <input type="hidden" name="sort" value={query.sort} />
          <button type="submit">খুঁজুন</button>
        </form>

        <section className={styles.infoPanel} aria-labelledby="guide-trust">
          <h2 id="guide-trust">{content.trustTitle}</h2>
          <InfoItems items={content.trustItems} />
        </section>

        <section className={styles.section} aria-labelledby="guide-journey">
          <h2 id="guide-journey">{content.journeyTitle}</h2>
          <nav className={styles.tabs} aria-label="গাইডের জার্নি">
            <Link
              href={guideHref({ ...query, category: "" })}
              aria-current={!query.category ? "page" : undefined}
            >
              সব
            </Link>
            {hub.categories.map((category) => (
              <Link
                key={category.id}
                href={guideHref({ ...query, category: category.slug })}
                aria-current={
                  query.category === category.slug ? "page" : undefined
                }
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </section>

        {!filtered && result.page === 1 && hub.featuredGuides.length > 0 && (
          <section className={styles.section} aria-labelledby="guide-featured">
            <div className={styles.sectionHead}>
              <h2 id="guide-featured">{content.featuredTitle}</h2>
              <Link href={guideHref({ sort: "newest" })}>
                সব দেখুন <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            {hub.featuredGuides.map((guide) => (
              <article key={guide.id} className={styles.featured}>
                <div className={styles.featuredImage}>
                  <GuideImage
                    src={guide.coverImage}
                    alt={guide.coverAlt}
                    className={styles.featuredPhoto}
                    eager
                  />
                </div>
                <div className={styles.featuredBody}>
                  <span className={styles.badge}>
                    {guide.pdfUrl ? "ফ্রি PDF" : "ফ্রি গাইড"}
                  </span>
                  <h3>{guide.title}</h3>
                  <p>{guide.excerpt}</p>
                  <span className={styles.featuredMeta}>
                    {guide.pdfUrl && guide.pageCount
                      ? `${bnNumber(guide.pageCount)} পৃষ্ঠা`
                      : `${bnNumber(guide.readMinutes)} মিনিট পড়া`}{" "}
                    · বাংলা
                  </span>
                  <Link
                    className={styles.primaryButton}
                    href={`/guide/${guide.slug}`}
                  >
                    ফ্রি গাইড পড়ুন <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}

        <section
          id="all-guides"
          className={`${styles.section} ${styles.results}`}
          aria-labelledby="guide-results"
        >
          <div className={styles.sectionHead}>
            <h2 id="guide-results">
              {filtered
                ? (activeCategory?.name ?? "সব গাইড")
                : content.popularTitle}
            </h2>
            <Link
              href={guideHref({
                ...query,
                sort: query.sort === "popular" ? "newest" : "popular",
              })}
            >
              {query.sort === "popular" ? "নতুন আগে" : "জনপ্রিয় আগে"}{" "}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          {filtered && (
            <div className={styles.resultInfo}>
              <p>
                {query.q ? `“${query.q}” — ` : ""}
                {bnNumber(result.total)}টি গাইড
              </p>
              <Link href="/guide#all-guides">ফিল্টার মুছুন</Link>
            </div>
          )}
          {result.items.length ? (
            <div className={styles.cardGrid}>
              {result.items.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <Search aria-hidden="true" />
              <h3>কোনো গাইড পাওয়া যায়নি</h3>
              <p>অন্য শব্দ বা জার্নি দিয়ে খুঁজে দেখুন।</p>
              <Link href="/guide#all-guides">সব গাইড দেখুন</Link>
            </div>
          )}
          {result.totalPages > 1 && (
            <nav className={styles.pagination} aria-label="গাইডের পৃষ্ঠা">
              {result.page > 1 ? (
                <Link
                  rel="prev"
                  href={guideHref({ ...query, page: result.page - 1 })}
                >
                  আগের পৃষ্ঠা
                </Link>
              ) : (
                <span />
              )}
              <span>
                পৃষ্ঠা {bnNumber(result.page)} / {bnNumber(result.totalPages)}
              </span>
              {result.page < result.totalPages ? (
                <Link
                  rel="next"
                  href={guideHref({ ...query, page: result.page + 1 })}
                >
                  পরের পৃষ্ঠা
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </section>

        <section
          className={`${styles.infoPanel} ${styles.process}`}
          aria-labelledby="guide-process"
        >
          <h2 id="guide-process">{content.processTitle}</h2>
          <InfoItems items={content.processItems} numbered />
          <p className={styles.processNote}>{content.processNote}</p>
        </section>
        <aside className={styles.notice}>
          <ShieldCheck aria-hidden="true" />
          <div>
            <h2>{content.noticeTitle}</h2>
            <p>{content.noticeText}</p>
          </div>
        </aside>
        <section className={styles.cta}>
          <div className={styles.ctaIcon}>
            <Search aria-hidden="true" />
            <Heart aria-hidden="true" />
          </div>
          <div>
            <h2>{content.ctaTitle}</h2>
            <p>{content.ctaDescription}</p>
            <Link className={styles.primaryButton} href="/guide#all-guides">
              {content.ctaLabel}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
