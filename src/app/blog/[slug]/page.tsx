import type { Metadata } from "next";
// blog post page (post-build hmr)
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  getAllSlugs,
  getPost,
  getRelatedPosts,
  postUrl,
  extractToc,
} from "@/lib/blog";
import { mdxComponents } from "@/components/blog/MdxComponents";
import { getHeroComponent } from "@/components/blog/heroes";
import SocialShare from "@/components/blog/SocialShare";
import TableOfContents from "@/components/blog/TableOfContents";
import AdSlot from "@/components/AdSlot";

const SITE_URL = "https://tobtonn.com";

const CALCULATOR_LABELS: Record<string, { title: string; desc: string }> = {
  "/": {
    title: "เครื่องคำนวณดอกเบี้ยทบต้น",
    desc: "ใส่เงินต้น+เงินรายเดือน เห็นกราฟและตารางการเติบโตทันที",
  },
  "/dca-calculator": {
    title: "เครื่องคำนวณ DCA",
    desc: "เปรียบเทียบ DCA กับ Lump Sum แสดงผลตอบแทนรายปี",
  },
  "/savings-calculator": {
    title: "เครื่องคำนวณเงินออม",
    desc: "ตั้งเป้าหมายแล้วรู้ว่าต้องออมเดือนละเท่าไหร่",
  },
  "/retirement-calculator": {
    title: "เครื่องคำนวณเงินเกษียณ",
    desc: "วางแผนเกษียณ คำนวณเงินที่ต้องเตรียมรวมเงินเฟ้อ",
  },
  "/loan-calculator": {
    title: "เครื่องคำนวณดอกเบี้ยเงินกู้",
    desc: "คำนวณค่างวด ดอกเบี้ยรวม และตารางผ่อน",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugs = getAllSlugs();
  if (!slugs.includes(slug)) return {};
  const post = getPost(slug);
  return {
    title: `${post.title} | tobtonn.com`,
    description: post.excerpt,
    alternates: { canonical: postUrl(slug) },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl(slug),
      type: "article",
      locale: "th_TH",
      publishedTime: post.date,
      authors: [post.author ?? "ทีม tobtonn"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const slugs = getAllSlugs();
  if (!slugs.includes(slug)) notFound();

  const post = getPost(slug);
  const toc = extractToc(post.content);
  const related = getRelatedPosts(slug, 3);
  const url = postUrl(slug);
  const calc = post.relatedCalculator
    ? CALCULATOR_LABELS[post.relatedCalculator]
    : undefined;
  const HeroComponent = getHeroComponent(post.heroIllustration);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author ?? "ทีม tobtonn" },
    publisher: {
      "@type": "Organization",
      name: "tobtonn.com",
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "th",
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "หน้าแรก",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "บทความ",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article className="container-wrap pb-20 pt-8" style={{ maxWidth: 1200 }}>
        {/* Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          className="mb-6 flex items-center gap-2 text-sm text-ink-soft"
        >
          <Link href="/" className="hover:text-accent">
            หน้าแรก
          </Link>
          <span className="text-line">/</span>
          <Link href="/blog" className="hover:text-accent">
            บทความ
          </Link>
          <span className="text-line">/</span>
          <span className="line-clamp-1 text-ink">{post.title}</span>
        </nav>

        {/* 3-column grid on desktop */}
        <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,700px)_240px] lg:gap-10">
          {/* LEFT — sticky social + back */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                กลับหน้าบทความ
              </Link>
              <SocialShare url={url} title={post.title} />
            </div>
          </aside>

          {/* CENTER — article */}
          <div className="min-w-0">
            {/* Header */}
            <header className="mb-8">
              <span className="mb-4 inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
                {post.tag}
              </span>
              <h1 className="thai-heading mb-5 font-display font-bold leading-[1.2] text-ink text-[clamp(26px,5.5vw,40px)]">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-ink-soft">
                <span className="font-medium text-ink">{post.author}</span>
                <span className="text-line">•</span>
                <span>{post.formattedDate}</span>
                <span className="text-line">•</span>
                <span>อ่าน {post.readingMinutes} นาที</span>
              </div>
            </header>

            {/* Hero illustration */}
            <div className="mb-10 overflow-hidden rounded-2xl border border-line bg-bg shadow-sm">
              <HeroComponent />
            </div>

            {/* Mobile back/share */}
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                กลับ
              </Link>
              <SocialShare url={url} title={post.title} />
            </div>

            {/* Ad — after intro */}
            <div className="mb-8">
              <AdSlot id={`blog-${post.slug}-top`} size="in-article" />
            </div>

            {/* Article body */}
            <div className="prose-content text-base">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>

            {/* Ad — mid/post-article */}
            <div className="mt-10">
              <AdSlot id={`blog-${post.slug}-mid`} size="in-article" />
            </div>

            {/* Author bio */}
            <div className="mt-16 flex items-start gap-4 rounded-2xl border border-line bg-white/60 p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-white">
                t
              </span>
              <div>
                <p className="font-display text-base font-semibold text-ink">
                  {post.author}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  ทีมเขียนของ tobtonn.com
                  เราตั้งใจสร้างเครื่องมือและบทความการเงินภาษาไทย
                  ที่เข้าใจง่าย อ้างอิงข้อมูลจริง
                  และไม่ขายของหรือชวนลงทุนใด ๆ
                </p>
              </div>
            </div>

            {/* CTA — related calculator */}
            {calc && post.relatedCalculator && (
              <Link
                href={post.relatedCalculator}
                className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-6 transition-all hover:border-accent/50 hover:bg-accent/10"
              >
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
                    ลองคำนวณด้วยเครื่องมือของเรา
                  </p>
                  <p className="font-display text-lg font-semibold text-ink group-hover:text-accent">
                    {calc.title}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{calc.desc}</p>
                </div>
                <ArrowUpRight className="h-6 w-6 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            )}

            {/* Related posts */}
            {related.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-5 font-display text-xl font-bold text-ink">
                  บทความที่เกี่ยวข้อง
                </h2>
                <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group rounded-xl border border-line bg-white/60 p-4 transition-all hover:border-accent/30 hover:shadow-md"
                    >
                      <span className="mb-2 inline-block text-xs font-medium text-accent">
                        {p.tag}
                      </span>
                      <h3 className="mb-2 line-clamp-2 font-display text-base font-semibold leading-snug text-ink group-hover:text-accent">
                        {p.title}
                      </h3>
                      <p className="text-xs text-ink-soft">
                        อ่าน {p.readingMinutes} นาที
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT — sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
              <TableOfContents items={toc} />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
