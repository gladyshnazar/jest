const links = {
  home: "/",
  shop: {
    all: `/shop/all`,
    category: (slug: string) => `/shop/${slug}`,
  },
  product: (slug: string) => `/product/${slug}`,
  profile: "/profile",
  mail: (to: string) => `mailto:${to}`,
};
export default links;
