import { contentBlockSchema, type ContentBlock } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummyContentBlocks } from "@/api/mock/contentBlocks.mock";

export const getContentBlocks = createListApi<ContentBlock>({
  path: "/content-blocks",
  itemSchema: contentBlockSchema,
  getMock: () => dummyContentBlocks,
  delay: 90,
});

export function findBlock(blocks: ContentBlock[], key: string): ContentBlock | undefined {
  return blocks.find((block) => block.key === key);
}
