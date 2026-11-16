const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export function formatPrice(value: number): string {
  return peso.format(value);
}
