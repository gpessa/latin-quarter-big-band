"use client";

import { Section } from "@/components";
import { YouTubeEmbed } from "@next/third-parties/google";
import React from "react";

const Video: React.FC<{ videoid: string }> = ({ videoid }) => (
  <Section>
    <YouTubeEmbed
      videoid={videoid}
      style="width: 100%; max-width: 100%;"
    />
  </Section>
);

export default Video;
