// Функция для извлечения идентификатора YouTube видео из URL
export const getYoutubeVideoId = (url: string) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return match[2];
    } else {
        console.error('Invalid YouTube video URL');
        return null;
    }
};
