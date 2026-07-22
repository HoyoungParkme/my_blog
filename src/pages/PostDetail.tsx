import { useState } from "react";
import { Link, useRoute } from "wouter";
import { format } from "date-fns";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { posts, getNotionEmbedUrl } from "@/content/portfolio";
import { Button } from "@/components/ui/button";
import NotFound from "./not-found";

export default function PostDetail() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  const post = posts.find(p => p.slug === slug);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!post) {
    return <NotFound />;
  }

  return (
    <article className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-accent font-medium mb-4">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.createdAt}>
              {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
            </time>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.summary}
          </p>
        </header>

        {post.link ? (
          <div className="rounded-2xl border border-border overflow-hidden bg-muted relative h-[70vh]">
            {!isLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted">
                <div className="w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">노션 페이지 불러오는 중...</p>
              </div>
            )}
            <iframe
              src={getNotionEmbedUrl(post.link)}
              className={`w-full h-full border-0 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              title={post.title}
              allowFullScreen
              style={{ colorScheme: 'light' }}
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        ) : (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap">{post.content}</div>
          </div>
        )}

        {post.link && (
          <Button asChild variant="default" className="mt-8 rounded-full h-12 text-sm font-semibold">
            <a href={post.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              노션에서 전체 보기 <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        )}
      </div>
    </article>
  );
}

