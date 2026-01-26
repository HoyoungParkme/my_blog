import { format } from "date-fns";
import { Link } from "wouter";
import { Calendar, ArrowRight } from "lucide-react";
import { posts } from "@/data/portfolio";

export default function Blog() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="font-serif text-5xl font-bold mb-6">Thoughts</h1>
          <p className="text-xl text-muted-foreground">
            Insights on development, design, and technology.
          </p>
        </div>

        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.id} className="group relative py-8 border-b border-border/50 last:border-0 hover:border-border transition-colors">
              <div className="flex flex-col md:flex-row gap-6 md:items-start">
                <div className="md:w-32 flex-shrink-0 text-sm text-muted-foreground flex items-center gap-2 pt-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                </div>
                
                <div className="flex-grow">
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-serif text-2xl font-bold mb-3 group-hover:text-accent transition-colors cursor-pointer">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {post.summary}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-medium text-foreground hover:text-accent transition-colors">
                    Read more <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
