import { useState } from "react";
import { format } from "date-fns";
import { Link } from "wouter";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { posts, type Post } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const POSTS_PER_PAGE = 5;

function MemoirPreview({ post, onClose }: { post: Post; onClose: () => void }) {
  if (!post.link) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]"
      >
        <div className="p-4 border-b border-border flex items-center justify-between bg-card/50 backdrop-blur-md sticky top-0 z-10">
          <h2 className="font-serif text-xl font-bold px-2">{post.title}</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full hover:bg-accent/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-hidden bg-muted relative">
          <iframe 
            src={post.link.replace("www.notion.so", "www.notion.so/embed")}
            className="w-full h-full border-0"
            title={`${post.title} Preview`}
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          />
        </div>

        <div className="p-4 md:p-6 bg-card border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="default" className="w-full sm:w-auto rounded-full px-8 h-12 text-sm font-semibold">
              <a href={post.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                노션에서 전체 보기 <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto rounded-full px-8 h-12 text-sm font-semibold">
              닫기
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
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
          <h1 className="font-serif text-5xl font-bold mb-6">Memoirs</h1>
          <p className="text-xl text-muted-foreground">
            기록을 통한 성장과 문제 해결의 여정.
          </p>
        </div>

        <div className="space-y-12">
          {currentPosts.map((post) => (
            <article 
              key={post.id} 
              className="group relative py-8 border-b border-border/50 last:border-0 hover:border-border transition-colors cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-start">
                <div className="md:w-32 flex-shrink-0 text-sm text-muted-foreground flex items-center gap-2 pt-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                </div>
                
                <div className="flex-grow">
                  <h2 className="font-serif text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {post.summary}
                  </p>
                  <div className="inline-flex items-center text-sm font-medium text-foreground hover:text-accent transition-colors">
                    더 보기 <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <AnimatePresence>
          {selectedPost && (
            <MemoirPreview 
              post={selectedPost} 
              onClose={() => setSelectedPost(null)} 
            />
          )}
        </AnimatePresence>

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
