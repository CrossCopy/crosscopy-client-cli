export function isInSSH(): boolean {
  return Boolean(process.env.SSH_CLIENT);
}

/**
 * For now I only know that this works on LINUX, for Mac and Windows (and everything else),
 * I will simply return true
 * @returns whether $DISPLAY is set
 */
export function hasDisplay(): boolean {
  // eslint-disable-next-line unicorn/prefer-ternary
  if (process.platform === 'linux') {
    return Boolean(process.env.DISPLAY);
    // eslint-disable-next-line no-else-return
  } else {
    return true;
  }
}

export function hasClipboard(): boolean {
  return !isInSSH() && hasDisplay();
}
