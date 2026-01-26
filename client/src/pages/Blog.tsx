import { usePosts, useCreatePost } from "@/hooks/use-posts";
import { format } from "date-fns";
import { Link } from "wouter";
import { Loader2, Calendar, ArrowRight, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPostSchema, type InsertPost } from "@shared/schema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Blog() {
  const { data: posts, isLoading } = usePosts();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const createPost = useCreatePost();
  
  const form = useForm<InsertPost>({
    resolver: zodResolver(insertPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      content: "",
    }
  });

  const onSubmit = (data: InsertPost) => {
    createPost.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast({
          title: "Post created",
          description: "Your blog post has been published.",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h1 className="font-serif text-5xl font-bold mb-6">Thoughts</h1>
            <p className="text-xl text-muted-foreground">
              Insights on development, design, and technology.
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" /> New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Write New Post</DialogTitle>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" {...form.register("title")} placeholder="Post Title" />
                    {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" {...form.register("slug")} placeholder="post-url-slug" />
                    {form.formState.errors.slug && <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea id="summary" {...form.register("summary")} placeholder="Brief summary for the list view..." rows={3} />
                  {form.formState.errors.summary && <p className="text-sm text-destructive">{form.formState.errors.summary.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" {...form.register("content")} placeholder="Write your post content here..." rows={8} />
                  {form.formState.errors.content && <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>}
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={createPost.isPending}>
                    {createPost.isPending ? "Publishing..." : "Publish Post"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-12">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            posts?.map((post) => (
              <article key={post.id} className="group relative py-8 border-b border-border/50 last:border-0 hover:border-border transition-colors">
                <div className="flex flex-col md:flex-row gap-6 md:items-start">
                  <div className="md:w-32 flex-shrink-0 text-sm text-muted-foreground flex items-center gap-2 pt-2">
                    <Calendar className="w-4 h-4" />
                    {post.createdAt ? format(new Date(post.createdAt), 'MMM dd, yyyy') : 'Draft'}
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
            ))
          )}
          
          {posts?.length === 0 && (
            <div className="py-20 text-center text-muted-foreground bg-secondary/30 rounded-2xl border border-dashed border-border">
              No articles yet. Check back soon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
