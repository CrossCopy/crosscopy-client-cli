export const base64StringToUTF8 = (base64Str: string) => {
  const base64buf = Buffer.from(base64Str, 'base64'); // parse base64 string to buffer
  const text = base64buf.toString('utf8'); // base64 buffer to utf-8 string
  return text;
};

/**
 * Convert a buffer of base64 string back to utf8
 * @param buf: buffer containing a base64 string
 * @returns utf8 string
 */
export const base64BufToUTF8 = (buf: Buffer): string => {
  const base64Text = buf.toString();
  return base64StringToUTF8(base64Text);
};
