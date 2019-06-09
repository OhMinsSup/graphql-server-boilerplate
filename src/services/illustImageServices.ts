import { getRepository } from 'typeorm';
import IllustImage from '../entity/IllustImage';

export const iImageLink = async (illustId: string, thumbnails: string[]) => {
  if (!illustId && !thumbnails) return null;

  try {
    const iImageRepo = await getRepository(IllustImage);
    const promises = thumbnails.map(thumbnail => {
      const iImage = new IllustImage();
      iImage.fk_illust_id = illustId;
      iImage.thumbnail = thumbnail;
      return iImageRepo.save(iImage);
    });

    return await Promise.all(promises);
  } catch (e) {
    throw new Error(e);
  }
};
