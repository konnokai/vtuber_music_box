/**
 * 將 YouTube 網址轉換成嵌入式網址，當 YouTube 網址無效時回傳 null
 * @param youTubeUrl YouTube 影片的網址
 * @returns 嵌入式網址
 */
export const youtubeEmbeddedFormatter = (youTubeUrl: string) => {
  const id = extractYouTubeVideoId(youTubeUrl);

  if (id) {
    return `https://www.youtube.com/embed/${id}`;
  } else {
    return null;
  }
};

/**
 * 從 YouTube 網址中擷取影片 ID
 * @param url YouTube 影片的網址
 * @returns 影片 ID
 */
export const extractYouTubeVideoId = (url: string) => {
  // 定義正規表達式來匹配網址中的影片 ID
  const regExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=|v\/)|youtu\.be\/)([^\s&]+)/;

  // 使用正規表達式來提取影片 ID
  const match = url.match(regExp);

  if (match && match[1]) {
    // 回傳擷取到的影片 ID
    return match[1];
  } else {
    // 若無法匹配網址，回傳 null 或任何你覺得合適的值
    return null;
  }
};
