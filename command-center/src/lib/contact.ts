function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

function toInternational(phone: string): string {
  const digits = digitsOnly(phone);
  if (digits.startsWith("63")) return digits;
  if (digits.startsWith("0")) return `63${digits.slice(1)}`;
  if (digits.length === 10) return `63${digits}`;
  return digits;
}

export function telHref(phone: string): string {
  return `tel:+${toInternational(phone)}`;
}

export function whatsappHref(phone: string, message?: string): string {
  const intl = toInternational(phone);
  const base = `https://wa.me/${intl}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function smsHref(phone: string): string {
  return `sms:+${toInternational(phone)}`;
}
