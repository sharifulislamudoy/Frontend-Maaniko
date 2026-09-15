import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import type { GuideCardData } from "../types";
import GuideImage from "./GuideImage";
import styles from "./Guides.module.css";

export const bnNumber = (value: number) => value.toLocaleString("bn-BD");

export default function GuideCard({ guide }: { guide: GuideCardData }) {
  return (
    <article className={styles.card}>
      <Link href={`/guide/${guide.slug}`} className={styles.cardLink}>
        <GuideImage
          src={guide.coverImage}
          alt={guide.coverAlt}
          className={styles.cardImage}
        />
        <div className={styles.cardBody}>
          <span className={styles.category}>{guide.category.name}</span>
          <h3>{guide.title}</h3>
          <p>{guide.excerpt}</p>
          <div className={styles.cardMeta}>
            <span>
              <Clock3 size={16} aria-hidden="true" />{" "}
              {bnNumber(guide.readMinutes)} মিনিট
            </span>
            <ArrowRight size={21} aria-hidden="true" />
          </div>
        </div>
      </Link>
    </article>
  );
}
