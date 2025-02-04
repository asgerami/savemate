export const Currencies = [
  { value: "USD", label: "$ US Dollar", locale: "en-US" },
  { value: "CNY", label: "¥ Chinese Yuan", locale: "zh-CN" },
  { value: "EGP", label: "£ Egyptian Pound", locale: "ar-EG" },
  { value: "ETB", label: "Br Ethiopian Birr", locale: "am-ET" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "GBP", label: "£ British Pound", locale: "en-GB" },
  { value: "INR", label: "₹ Indian Rupee", locale: "hi-IN" },
  { value: "KES", label: "Sh Kenyan Shilling", locale: "en-KE" },
  { value: "NGN", label: "₦ Nigerian Naira", locale: "en-NG" },
];

export type Currency = (typeof Currencies)[0];
