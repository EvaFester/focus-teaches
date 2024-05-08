const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// Функция для получения URL миниатюры YouTube видео по его идентификатору
export const getThumbnailUrl = async (videoId: string) => {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`);
        if (!response.ok) {
            throw new Error('Thumbnail req failed');
        }
        const data = await response.json();
        return data.items[0].snippet.thumbnails.default.url;
    } catch (error) {
        let message: string = '';
        if (error instanceof Error) {
            message = error.message;
        }
        console.error('Error fetching thumbnail URL:', message);
    }
};
