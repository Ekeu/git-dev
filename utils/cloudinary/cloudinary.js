import axios from 'axios';
import logger from '../../api/log/logger';

const uploadImage = async (media) => {
  try {
    const form = new FormData();
    form.append('file', media);
    form.append('upload_preset', 'gitdev_profile');
    form.append('cloud_name', 'dmcookpro');

    const res = await axios.post(process.env.CLOUDINARY_UPLOAD_ENDPOINT, form);
    return res.data.secure_url;
  } catch (error) {
    logger.error(error);
  }
};
