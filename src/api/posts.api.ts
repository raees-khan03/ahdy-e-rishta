import { z } from "zod";
import { blogPostSchema, type BlogPost } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { httpRequest } from "@/api/http";
import { env } from "@/lib/env";
import { mockDelay } from "@/api/mock/delay";
import { dummyPosts } from "@/api/mock/posts.mock";
import { visible } from "@/api/mock/records";

export const getPosts = createListApi<BlogPost>({
  path: "/blog-posts",
  itemSchema: blogPostSchema,
  getMock: () => dummyPosts,
  delay: 200,
});

export async function getPostBySlug(slug: string, signal?: AbortSignal) {
  if (env.useMockApi) {
    await mockDelay(180, signal);
    return visible(dummyPosts).find((post) => post.slug === slug) ?? null;
  }
  return httpRequest(`/blog-posts/${slug}`, {
    schema: z.union([blogPostSchema, z.null()]),
    signal,
  });
}
