import {Rec} from '@crosscopy/core/database';
import {RecordType} from '@crosscopy/graphql-schema';
import clipboard from '@crosscopy/clipboard';
import {stdoutLogger} from './logger';

export function writeToClipboard(lastRec: Rec): void {
  if (lastRec) {
    if (lastRec.type === RecordType.Text) {
      if (clipboard.readTextSync() === lastRec.value) {
        stdoutLogger.warn('Text is unchanged, skip');
      } else {
        clipboard.writeTextSync(lastRec.value);
      }
    } else if (lastRec.type === RecordType.Image) {
      if (clipboard.readImageBase64Sync() === lastRec.value) {
        stdoutLogger.warn('Image is unchanged, skip');
      } else {
        clipboard.writeImageSync(lastRec.value);
      }
    }
  }
}
