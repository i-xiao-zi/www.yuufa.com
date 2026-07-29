import config from "@/config";
import type { NextConfig } from "next";

export default {
  /* config options here */
  rewrites: async () => [
    {
      source: '/searchor',
      destination: `${config.base_api}/searchor`
    }
  ],
  staticPageGenerationTimeout: 3000,
} satisfies NextConfig;