import { describe, expect, it } from 'vitest';
import { youtubeEmbeddedFormatter } from '../youtubeUtils';

describe('youtube url utils', () => {
  describe('將傳入網址轉換成嵌入式網址', () => {
    it('傳入 watch 類型網址，應該回傳嵌入式網址', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

      expect(youtubeEmbeddedFormatter(url)).toBe(expected);
    });

    it('傳入 embed 類型網址，應該回傳嵌入式網址', () => {
      const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

      expect(youtubeEmbeddedFormatter(url)).toBe(expected);
    });

    it('傳入 youtu.be 類型網址，應該回傳嵌入式網址', () => {
      const url = 'https://youtu.be/dQw4w9WgXcQ';
      const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

      expect(youtubeEmbeddedFormatter(url)).toBe(expected);
    });

    it('傳入無效網址，應該回傳 null', () => {
      const url = 'https://www.youtube.com';
      const expected = null;

      expect(youtubeEmbeddedFormatter(url)).toBe(expected);
    });
  });
});
