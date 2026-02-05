import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDiasporaPostBySlug, getFeaturedDiasporaPosts } from "@/app/lib/diaspora";
import { DiasporaDetailHero, DiasporaPostContent } from "@/components";

interface PageProps {
  params: {
    slug: string;
  };
}

// SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getDiasporaPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Ghana Diaspora Hub",
      description: "The requested diaspora post could not be found.",
    };
  }

  return {
    title: `${post.title} | Ghana Diaspora Hub`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.featured_image ? [{ url: post.featured_image }] : [],
      type: "article",
      authors: [post.is_diaspora_author ? post.organization_name : "Ghana Notice Board"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: post.featured_image ? [post.featured_image] : [],
    },
  };
}

// Static Params for Featured/Recent Posts (Incremental Static Regeneration)
export async function generateStaticParams() {
  const posts = await getFeaturedDiasporaPosts(5);
  return posts.results.map((post) => ({
    slug: post.slug,
  }));
}

const DiasporaDetailPage = async ({ params }: PageProps) => {
  const post = await getDiasporaPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <DiasporaDetailHero post={post} />
      <DiasporaPostContent post={post} />
    </main>
  );
};

export default DiasporaDetailPage;