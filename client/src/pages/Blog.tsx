import { useState } from "react";
import { format } from "date-fns";
import { Link } from "wouter";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { posts } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

const POSTS_PER_PAGE = 5;

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="font-serif text-5xl font-bold mb-6">Thoughts</h1>
          <p className="text-xl text-muted-foreground">
            AI 개발, 디자인, 그리고 기술에 대한 통찰.
          </p>
        </div>

        <div className="space-y-12">
          {currentPosts.map((post) => (
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
                    더 보기 <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              이전
            </Button>
            
            <div className="text-sm font-medium">
              {currentPage} / {totalPages}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="gap-2"
            >
              다음
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
