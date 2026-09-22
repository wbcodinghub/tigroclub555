import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Lottery — Home",
};

export default function HomePage() {
  return (
    <main className={styles.wrap}>
      <h1 className={styles.title}>Home Page</h1>
      <p className={styles.hint}>
        This is the only page with real content so far — build the actual Lottery home screen here in
        <code> src/app/home/page.tsx</code>. Activity, Promotion and Account are intentionally left blank
        for you to fill in later.
      </p>
    </main>
  );
}
