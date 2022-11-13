export function generateSlug(from: string, to: string, exchange: string) {
  return `${from}-${to}-${exchange}`;
}

export default { generateSlug };
