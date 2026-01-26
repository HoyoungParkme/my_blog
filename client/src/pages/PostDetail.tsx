import { usePost } from "@/hooks/use-posts";
import { Link, useRoute } from "wouter";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";
import NotFound from "./not-found";

export default function PostDetail() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  const { data: post, isLoading, error } = usePost(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !post) {
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
            <time dateTime={post.createdAt?.toString()}>
              {post.createdAt ? format(new Date(post.createdAt), 'MMMM dd, yyyy') : 'Draft'}
            </time>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.summary}
          </p>
        </header>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* In a real app, use a markdown renderer here */}
          <div className="whitespace-pre-wrap">{post.content}</div>
        </div>
      </div>
    </article>
  );
}
