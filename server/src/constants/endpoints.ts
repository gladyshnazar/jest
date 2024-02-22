export const endpoints = {
  user: {
    fetch: "/api/user/fetch",
    signin: "/api/user/signin",
    signup: "/api/user/signup",
    signout: "/api/user/signout",
    profile: {
      cart: {
        add: "/api/user/profile/cart/add",
        remove: "/api/user/profile/cart/remove",
        increaseQuantity: "/api/user/profile/cart/increase-product-quantity",
        decreaseQuantity: "/api/user/profile/cart/decrease-product-quantity",
      },
      edit: {
        password: "/api/user/profile/edit/password",
        info: "/api/user/profile/edit/info",
      },
    },
  },
  collections: "/api/collections",
  shop: {
    all: "/api/shop/all",
    featured: "/api/shop/featured",
    discounted: "/api/shop/discounted",
    category: (slug: string) => `/api/shop/category/${slug}`,
    product: (slug: string) => `/api/shop/product/${slug}`,
  },
  search: (query: string) => `/api/search/${query}`,
  stripe: {
    createSession: "/api/create-checkout-session",
    webhook: "/webhook",
  },
};
