/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable oklch color function in CSS
  experimental: {
    // Ensure we're using the most compatible CSS processing
    turbo: {
      rules: {
        // Disable advanced color functions
        "*.css": [
          {
            loader: "@next/swc-loader",
            options: {
              jsc: {
                transform: {
                  css: {
                    // Use more compatible CSS processing
                    modules: {
                      mode: "local",
                    },
                  },
                },
              },
            },
          },
        ],
      },
    },
  },
};

module.exports = nextConfig;
