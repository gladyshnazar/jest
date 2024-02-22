export const calculateSavings = (
  originalPrice: number,
  discountedPrice: number
) => {
  const dollars = `$${(originalPrice - discountedPrice).toFixed(1)}`;
  const percentage = `${Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  )}%`;

  return { dollars, percentage };
};
