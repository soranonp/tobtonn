import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, postUrl } from "@/lib/blog";

export const metadata: Metadata = {
  title: "บทความความรู้การเงิน-การลงทุน | tobtonn.com",
  description:
    "บทความเกี่ยวกับดอกเบี้ยทบต้น การลงทุน DCA วางแผนเกษียณ และความรู้การเงินสำหรับคนไทย เข้าใจง่าย อ้างอิงข้อมูลจริง",
  alternates: {
    canonical: "https://tobtonn.com/blog",
  },
  openGraph: {
    title: "บทความความรู้การเงิน-การลงทุน | tobtonn.com",
    description:
      "บทความเกี่ยวกับดอกเบี้ยทบต้น การลงทุน วางแผนเกษียณ สำหรับคนไทย",
    url: "https://tobtonn.com/blog",
    locale: "th_TH",
    type: "website",
  },
};

const SITE_URL = "https://tobtonn.com";

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "บทความ tobtonn.com",
    url: `${SITE_URL}/blog`,
    inLanguage: "th",
    description:
      "บทความเกี่ยวกับดอกเบี้ยทบต้น การลงทุน วางแผนเกษียณ สำหรับคนไทย",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: postUrl(p.slug),
      datePublished: p.date,
      author: { "@type": "Organization", name: p.author ?? "ทีม tobtonn" },
      description: p.excerpt,
    })),
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: postUrl(p.slug),
      name: p.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      {/* Hero */}
      <section className="px-4 pb-10 pt-12 text-center md:pt-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Blog
        </p>
        <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl lg:text-5xl">
          บทความความรู้{" "}
          <em className="text-accent">การเงิน-การลงทุน</em>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          เข้าใจดอกเบี้ยทบต้น วางแผนเกษียณ ลงทุน DCA และเครื่องมือทางการเงินอื่น ๆ
          ที่คนไทยควรรู้ — เขียนเข้าใจง่าย อ้างอิงข้อมูลจริง
        </p>
      </section>

      {/* Posts grid */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-white/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg"
            >
              {/* Tag badge */}
              <span className="mb-3 inline-flex w-fit items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
                {post.tag}
              </span>

              {/* Title */}
              <h2 className="mb-3 font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-accent">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-3 border-t border-line pt-4 text-xs text-ink-soft">
                <span>{post.formattedDate}</span>
                <span className="text-line">•</span>
                <span>อ่าน {post.readingMinutes} นาที</span>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-ink-soft">ยังไม่มีบทความ</p>
        )}
      </section>
    </>
  );
}
