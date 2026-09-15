import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3, Download } from "lucide-react";
import type { GuideDetail } from "../types";
import GuideCard, { bnNumber } from "./GuideCard";
import GuideImage from "./GuideImage";
import GuideActions from "./GuideActions";
import styles from "./Guides.module.css";

export default function GuideArticle({ data }: { data: GuideDetail }) {
  const { guide, related } = data;
  return (
    <main className={`${styles.container} ${styles.articlePage}`}>
      <Link href="/guide" className={styles.back}><ArrowLeft size={17} /> সব গাইড</Link>

      <article id="guide-print-article" className={styles.article}>
        <header className={styles.articleHeader}>
          <Link className={styles.category} href={`/guide?category=${guide.category.slug}#all-guides`}>{guide.category.name}</Link>
          <h1>{guide.title}</h1>
          <p className={styles.lead}>{guide.excerpt}</p>
          <div className={styles.articleMeta}>
            <span><Clock3 size={16} /> {bnNumber(guide.readMinutes)} মিনিট পড়া</span>
            <span>{guide.authorName}</span>
          </div>
          <GuideActions />
        </header>

        <GuideImage src={guide.coverImage} alt={guide.coverAlt} className={styles.articleImage} eager />

        <div className={styles.articleContent}>
          {guide.sections.map((section, index) => (
            <section key={index}>
              {guide.sections.length > 1 && <h2>{section.title}</h2>}
              {section.body.split(/\n{2,}/).filter(Boolean).map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
              {section.points.length > 0 && <ul>{section.points.map((point, pointIndex) => <li key={pointIndex}>{point}</li>)}</ul>}
            </section>
          ))}

          {guide.pdfUrl && <a href={guide.pdfUrl} className={styles.primaryButton} target="_blank" rel="noopener noreferrer"><Download size={18} /> PDF খুলুন</a>}

          {guide.sources.length > 0 && (
            <section className={styles.sources}>
              <h2>তথ্যসূত্র</h2>
              <ul>{guide.sources.map((source, index) => <li key={index}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRight size={15} /></a></li>)}</ul>
            </section>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className={`${styles.section} ${styles.related}`}>
          <h2>আরও পড়ুন</h2>
          <div className={styles.cardGrid}>{related.map((item) => <GuideCard key={item.id} guide={item} />)}</div>
        </section>
      )}
    </main>
  );
}
