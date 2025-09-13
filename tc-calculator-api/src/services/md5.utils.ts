import crypto from 'crypto';

export class Md5Utils {
    static computeMd5(s: string) {
        return crypto
            .createHash('md5')
            .update(s.trim(), 'utf-8')
            .digest('hex');
    }
}