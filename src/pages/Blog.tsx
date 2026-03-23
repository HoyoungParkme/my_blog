import { useState } from "react";
import { format } from "date-fns";
import { Calendar, ArrowUpRight, ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { posts, type Post, getNotionEmbedUrl } from "@/content/portfolio";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const POSTS_PER_PAGE = 5;

function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);

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
        className="relative w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]"
      >
        <div className="p-5 border-b border-border flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {format(new Date(post.createdAt), 'MMM dd, yyyy')}
          </span>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-accent/10">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-hidden bg-muted relative">
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted">
              <div className="w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">노션 페이지 불러오는 중...</p>
            </div>
          )}
          <iframe
            src={getNotionEmbedUrl(post.link!)}
            className={`w-full h-full border-0 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            title={post.title}
            allowFullScreen
            style={{ colorScheme: 'light' }}
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row gap-3">
          <Button asChild variant="default" className="flex-1 rounded-full h-12 text-sm font-semibold">
            <a href={post.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              노션에서 전체 보기 <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-full h-12 text-sm font-semibold">
            닫기
          </Button>
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
          <h1 className="font-serif text-5xl font-bold mb-6">Troubleshooting</h1>
          <p className="text-xl text-muted-foreground">
            이슈 발생 원인 분석 및 해결 방안 정리
          </p>
        </div>

        <div className="space-y-6">
          {currentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-accent/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => post.link && setSelectedPost(post)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                  </div>
                  <div className="p-2 bg-secondary rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 flex-shrink-0">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <h2 className="font-serif text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                  {post.summary}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <AnimatePresence>
          {selectedPost && (
            <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
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

