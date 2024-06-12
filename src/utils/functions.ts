const baseUrl = process.env.NEXT_PUBLIC_URL;

export const generateImageUrl = (image_url: string | undefined) => `${baseUrl}${image_url}` 