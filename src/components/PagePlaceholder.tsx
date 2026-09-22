import styles from "./PagePlaceholder.module.css";

/**
 * Blank-slate page body — just the page's own name, centered.
 * Every page except Home uses this until you replace it with real
 * content. See README.md → "Adding a new page" for how.
 */
export default function PagePlaceholder({ title }: { title: string }) {
  return (
    <div className={styles.wrap}>
      <p className={styles.title}>{title}</p>
    </div>
  );
}
