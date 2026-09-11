import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Download,
  ShieldCheck,
} from "lucide-react";
import type { GuideDetail } from "../types";
import GuideCard, { bnNumber } from "./GuideCard";
import GuideImage from "./GuideImage";
import GuideActions from "./GuideActions";
import styles from "./Guides.module.css";

const date = (value: string) =>
  new Date(value).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Dhaka",
  });

export default function GuideArticle({ data }: { data: GuideDetail }) {
  const { guide, page, related } = data;
  return (
    <div className={`${styles.container} ${styles.articlePage}`}>
      <Link
        href={`/guide?category=${guide.category.slug}#all-guides`}
        className={styles.back}
      >
        <ArrowLeft size={17} /> সব গাইড
      </Link>
      <article id="guide-print-article" className={styles.article}>
        <header>
          <Link
            className={styles.category}
            href={`/guide?category=${guide.category.slug}#all-guides`}
          >
            {guide.category.name}
          </Link>
          <h1>{guide.title}</h1>
          <p className={styles.lead}>{guide.excerpt}</p>
          <div className={styles.articleMeta}>
            <span>
              <Clock3 size={16} /> {bnNumber(guide.readMinutes)} মিনিট
            </span>
            <span>লেখা: {guide.authorName}</span>
            {guide.publishedAt && (
              <span>
                <CalendarDays size={16} /> প্রকাশ: {date(guide.publishedAt)}
              </span>
            )}
            <span>সর্বশেষ সম্পাদনা: {date(guide.updatedAt)}</span>
            {guide.reviewedAt && (
              <span>তথ্য যাচাই: {date(guide.reviewedAt)}</span>
            )}
          </div>
          <GuideActions />
        </header>
        <GuideImage
          src={guide.coverImage}
          alt={guide.coverAlt}
          className={styles.articleImage}
          eager
        />
        <div className={styles.articleLayout}>
          <nav className={styles.toc} aria-label="এই গাইডে যা আছে">
            <h2>এই গাইডে</h2>
            {guide.sections.map((section, index) => (
              <a key={index} href={`#guide-section-${index + 1}`}>
                {bnNumber(index + 1)}. {section.title}
              </a>
            ))}
          </nav>
          <div className={styles.articleContent}>
            {guide.sections.map((section, index) => (
              <section key={index} id={`guide-section-${index + 1}`}>
                <h2>{section.title}</h2>
                {section.body && <p>{section.body}</p>}
                {section.points.length > 0 && (
                  <ul>
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            {guide.pdfUrl && (
              <a
                href={guide.pdfUrl}
                className={styles.primaryButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} /> PDF খুলুন
                {guide.pageCount
                  ? ` · ${bnNumber(guide.pageCount)} পৃষ্ঠা`
                  : ""}
              </a>
            )}
            <section className={styles.sources}>
              <h2>তথ্যসূত্র</h2>
              <ul>
                {guide.sources.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.label}
                      <ArrowUpRight size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
            {page && (
              <aside className={styles.notice}>
                <ShieldCheck aria-hidden="true" />
                <div>
                  <h2>{page.noticeTitle}</h2>
                  <p>{page.noticeText}</p>
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section className={`${styles.section} ${styles.related}`}>
          <h2>আরও পড়ুন</h2>
          <div className={styles.cardGrid}>
            {related.map((item) => (
              <GuideCard key={item.id} guide={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
