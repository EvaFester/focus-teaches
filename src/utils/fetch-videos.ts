import { getYoutubeVideoId, getThumbnailUrl } from '@/utils';

export const fetchVideos = async (data: any, setVideos: any) => {
    if (data) {
      const videos = await Promise.all(
        data.gallery.items.map(async (videoUrl: string) => {
          const youtubeId = getYoutubeVideoId(videoUrl);
          if (youtubeId) {
            const thumbnailUrl = await getThumbnailUrl(youtubeId);
            return {
              id: youtubeId,
              thumbnail: thumbnailUrl,
            };
          } else {
            return null;
          }
        })
      );
      setVideos(videos.filter(Boolean));
    }
  };
