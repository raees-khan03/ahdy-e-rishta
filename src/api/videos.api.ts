import { videoItemSchema, type VideoItem } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummyVideos } from "@/api/mock/videos.mock";

export const getVideos = createListApi<VideoItem>({
  path: "/videos",
  itemSchema: videoItemSchema,
  getMock: () => dummyVideos,
  delay: 200,
});
