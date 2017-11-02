export function generateSlug(from, to, exchange) {
  return `${from}-${to}-${exchange}`;
}

export default { generateSlug };
