import { useState } from "react";
import { format } from "date-fns";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";
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
          <span className="font-mono text-sm text-muted-foreground">
            {format(new Date(post.createdAt), 'yyyy.MM.dd')}
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
          <h1 className="font-serif text-[44px] font-bold mb-3 tracking-[-0.02em]">Troubleshooting</h1>
          <p className="text-[17px] text-muted-foreground">
            이슈 발생 원인 분석 및 해결 방안 정리
          </p>
        </div>

        <div className="border-t-2 border-foreground">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="flex gap-6 py-[26px] px-2 border-b border-border cursor-pointer transition-colors hover:bg-[#fafafa]"
              onClick={() => post.link && setSelectedPost(post)}
            >
              <div className="flex-shrink-0 w-[88px]">
                <div className="font-mono text-xs text-[#737373]">
                  {format(new Date(post.createdAt), 'yyyy.MM.dd')}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="font-mono text-[10.5px] text-accent mt-1">#{post.tags[0]}</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-[16.5px] font-semibold mb-2">{post.title}</h2>
                {post.problem && (
                  <div className="flex items-center gap-2 text-[13px] text-[#525252] mb-1">
                    <span className="w-[7px] h-[7px] rounded-full bg-destructive flex-shrink-0" />
                    <span>{post.problem}</span>
                  </div>
                )}
                {post.solution && (
                  <div className="flex items-center gap-2 text-[13px] text-[#525252]">
                    <span className="w-[7px] h-[7px] rounded-full bg-accent flex-shrink-0" />
                    <span>{post.solution}</span>
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 flex items-center">
                <ArrowUpRight className="w-4 h-4 text-[#a3a3a3]" />
              </div>
            </div>
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
            >
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
            >
              다음
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
