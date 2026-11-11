/**
 * DUMMY DATA, replace with real data or API.
 * Marriage related videos. Each id was checked against the YouTube oEmbed endpoint
 * before it was added here, so the player is allowed to embed them.
 */
import type { VideoItem } from "@/schemas/content.schema";
import { base } from "@/api/mock/records";
import posterOne from "@/assets/photos/video-1.jpg";
import posterTwo from "@/assets/photos/video-2.jpg";
import posterThree from "@/assets/photos/video-3.jpg";
import posterFour from "@/assets/photos/video-4.jpg";
import posterFive from "@/assets/photos/video-5.jpg";
import posterSix from "@/assets/photos/video-6.jpg";

const posters = [posterOne, posterTwo, posterThree, posterFour, posterFive, posterSix];

export const dummyVideos: VideoItem[] = [
  base("video-1", 1, {
    title: "How to find the right proposal",
    description: "What a family should ask a matchmaker before paying anything.",
    youtubeId: "3zhU5WdR54A",
    thumbnailUrl: posters[0],
    category: "guidance",
    durationLabel: "9 min",
    publishedAt: "2025-11-18",
  }),
  base("video-2", 2, {
    title: "Questions to ask before nikah",
    description: "Money, housing, in-laws and work. Four conversations to have early.",
    youtubeId: "h-Lk7wfMdZg",
    thumbnailUrl: posters[1],
    category: "nikah",
    durationLabel: "7 min",
    publishedAt: "2025-12-02",
  }),
  base("video-3", 3, {
    title: "The conversations every couple must have",
    description: "A longer discussion about expectations before the wedding.",
    youtubeId: "UHRRdiLS7_8",
    thumbnailUrl: posters[2],
    category: "nikah",
    durationLabel: "34 min",
    publishedAt: "2026-01-11",
  }),
  base("video-4", 4, {
    title: "Are you ready for marriage?",
    description: "A short episode for candidates who are still deciding.",
    youtubeId: "3IAFNMEmRto",
    thumbnailUrl: posters[3],
    category: "guidance",
    durationLabel: "12 min",
    publishedAt: "2026-02-06",
  }),
  base("video-5", 5, {
    title: "What to ask when you meet the family",
    description: "Practical questions for the first family meeting.",
    youtubeId: "mqPZFVBmoHc",
    thumbnailUrl: posters[4],
    category: "families",
    durationLabel: "8 min",
    publishedAt: "2026-02-27",
  }),
  base("video-6", 6, {
    title: "Before the wedding: things to settle",
    description: "A plain list of what to settle before the mehndi and nikah dates are fixed.",
    youtubeId: "wqVOzLkPBGg",
    thumbnailUrl: posters[5],
    category: "families",
    durationLabel: "10 min",
    publishedAt: "2026-03-14",
  }),
];
