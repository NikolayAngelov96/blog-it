/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  async headers() {
    return [
      {
        source: "/post/create",
        headers: [
          {
            key: "X-Authorization",
            value: "",
          },
        ],
      },
      {
        source: "/post",
        headers: [
          {
            key: "X-Authorization",
            value: "",
          },
        ],
      },
      {
        source: "/post/update",
        headers: [
          {
            key: "X-Authorization",
            value: "",
          },
        ],
      },
      {
        source: "/post/delete",
        headers: [
          {
            key: "X-Authorization",
            value: "",
          },
        ],
      },
      {
        source: "/post/addComment",
        headers: [
          {
            key: "X-Authorization",
            value: "",
          },
        ],
      },
    ];
  },
};
