"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  artDesign,
  books,
  fitness,
  music,
  photography,
  programming,
  technology,
  travel,
} from "@/lib/constant";

import Editor from "@/components/editor/editor";
import { JSONContent } from "novel";
import { Badge } from "@/components/ui/badge";
import PrimaryModal from "@/components/ui/primaryModal";
import useBlogMutation from "@/hooks/useBlogMutation";
import { IBlog } from "@/db/models/blogModel";

const BlogForm = ({ edit, blog }: { edit?: boolean; blog?: IBlog }) => {
  const {
    form,
    onSubmit,
    showModal,
    setShowModal,
    alertMessage,
    handleTagInput,
    tagsState: tags,
  } = useBlogMutation({ edit, blog });

  const initialContent = (blog?.content || "") as unknown as JSONContent;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. How To Get Frustrated" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Blog Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    technology,
                    artDesign,
                    travel,
                    photography,
                    music,
                    books,
                    fitness,
                    programming,
                  ].map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Content</FormLabel>
              <FormControl>
                <Editor
                  initialValue={initialContent}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="tags"
                  {...field}
                  onChange={(e) => {
                    handleTagInput(e);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>
                Separate tags with a comma (e.g. javascript, react, nodejs)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-x-1 space-y-1">
          {tags.map((tag, index) => (
            <Badge variant="secondary" key={index}>
              {tag.trim()}
            </Badge>
          ))}
        </div>

        {edit && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Status</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Publish</SelectItem>
                      <SelectItem value="false">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Featured</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {form.formState?.errors?.root?.serverError && (
          <FormMessage>
            {form.formState?.errors?.root.serverError.message}
          </FormMessage>
        )}
        <Button
          className="w-full"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          {edit ? "Update" : "Submit"} Blog
        </Button>
      </form>
      {showModal && (
        <PrimaryModal
          message={alertMessage!}
          setShowModal={setShowModal}
          className="!text-destructive"
        />
      )}
    </Form>
  );
};

export default BlogForm;
