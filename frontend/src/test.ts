/* 

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';
const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
      setLoading(false);
      toast.success('Saved images downloaded');
    } catch (error) {
      toast.error(error.message);
    }
  };
const handleSearchSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.get(`${API_URL}/new-image?query=${word}`);
    setImages([{ ...res.data, title: word }, ...images]);
    toast.info(`New image ${word.toUpperCase()} was found`);
  } catch (error) {
    toast.error(error.message);
  }

  setWord('');
};

const handleDeleteImage = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/images/${id}`);
    if (res.data?.deleted_id) {
      toast.warn(
        `Image ${images
          .find((i) => i.id === id)
          .title.toUpperCase()} was deleted`
      );
      setImages(images.filter((image) => image.id !== id));
    }
  } catch (error) {
    toast.error(error.message);
  }
};

const handleSaveImage = async (id) => {
  const imageToBeSaved = images.find((image) => image.id === id);
  imageToBeSaved.saved = true;
  try {
    const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
    if (res.data?.inserted_id) {
      setImages(
        images.map((image) =>
          image.id === id ? { ...image, saved: true } : image
        )
      );
      toast.info(`Image ${imageToBeSaved.title.toUpperCase()} was saved`);
    }
  } catch (error) {
    
    toast.error(error.message);
  }
};
*/
