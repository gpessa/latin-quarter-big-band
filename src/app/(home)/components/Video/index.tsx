"use client";

import { YouTubeEmbed } from "@next/third-parties/google";
import React from "react";

const Video: React.FC<{ videoid: string }> = ({ videoid }) => (
    <YouTubeEmbed videoid={videoid} style="width: 100%; max-width: 100%;" />
);

export default Video;
