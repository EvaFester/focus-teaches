import { getYoutubeVideoId, getThumbnailUrl } from '@/utils';
interface Video {
  id: string;
  thumbnail: string;
}

interface GalleryData {
  gallery: {
    items: string[];
  };
}

export const fetchVideos = async (data: GalleryData, setVideos: (videos: Video[]) => void) => {
  const { items } = data.gallery;
  const videos = await Promise.all(
    items.map(async (videoUrl: string) => {
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
  setVideos(videos.filter(Boolean) as Video[]);
};
