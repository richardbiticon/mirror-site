import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // Worktree shares node_modules with the main repo, so disambiguate explicitly.
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
