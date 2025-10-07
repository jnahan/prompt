export default function convertToSubCurrency(
  amount: number,
  factor: number = 100
) {
  return Math.round(amount * factor);
}
