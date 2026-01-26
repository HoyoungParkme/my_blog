import { useProjects, useCreateProject } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Loader2, Plus } from "lucide-react";
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
import { insertProjectSchema } from "@shared/schema";
import { type InsertProject } from "@shared/schema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const createProject = useCreateProject();
  
  const form = useForm<InsertProject>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      imageUrl: "",
      tags: [],
    }
  });

  const onSubmit = (data: InsertProject) => {
    createProject.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast({
          title: "Project created",
          description: "Your project has been successfully added to the portfolio.",
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
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <h1 className="font-serif text-5xl font-bold mb-6">All Projects</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A complete list of my works, side projects, and experiments.
            </p>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary text-primary-foreground hover:opacity-90">
                <Plus className="w-4 h-4" /> Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" {...form.register("title")} placeholder="Project name" />
                  {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" {...form.register("description")} placeholder="Describe the project..." />
                  {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL (Unsplash)</Label>
                  <Input id="imageUrl" {...form.register("imageUrl")} placeholder="https://images.unsplash.com/..." />
                  {form.formState.errors.imageUrl && <p className="text-sm text-destructive">{form.formState.errors.imageUrl.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="link">Project Link</Label>
                  <Input id="link" {...form.register("link")} placeholder="https://..." />
                  {form.formState.errors.link && <p className="text-sm text-destructive">{form.formState.errors.link.message}</p>}
                </div>

                {/* Simplified tags input for demo */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input 
                    id="tags" 
                    placeholder="React, TypeScript, Tailwind"
                    onChange={(e) => {
                      const tags = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                      form.setValue("tags", tags);
                    }}
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={createProject.isPending}>
                    {createProject.isPending ? "Creating..." : "Create Project"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
            {projects?.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground bg-secondary/30 rounded-2xl border border-dashed border-border">
                No projects found. Be the first to add one!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
