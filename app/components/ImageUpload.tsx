import { useState, useCallback } from 'react';
import { FaUpload, FaTrash, FaStar } from 'react-icons/fa';

interface Image {
  url: string;
  file?: File;
  isMain?: boolean;
}

interface ImageUploadProps {
  images: Image[];
  onImagesChange: (images: Image[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ 
  images, 
  onImagesChange, 
  maxImages = 5 
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFiles = useCallback((files: FileList) => {
    const newImages: Image[] = Array.from(files)
      .slice(0, maxImages - images.length)
      .map(file => ({
        url: URL.createObjectURL(file),
        file,
        isMain: images.length === 0
      }));

    onImagesChange([...images, ...newImages]);
  }, [images, maxImages, onImagesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      processFiles(files);
    }
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      processFiles(files);
    }
  }, [processFiles]);

  const handleRemoveImage = useCallback((index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    
    // Si eliminamos la imagen principal, hacer la primera imagen la principal
    if (images[index].isMain && newImages.length > 0) {
      newImages[0].isMain = true;
    }
    
    onImagesChange(newImages);
  }, [images, onImagesChange]);

  const handleSetMainImage = useCallback((index: number) => {
    const newImages = images.map((image, i) => ({
      ...image,
      isMain: i === index
    }));
    onImagesChange(newImages);
  }, [images, onImagesChange]);

  return (
    <div className="space-y-4">
      {/* Área de carga */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <FaUpload className="text-4xl text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">
            Arrastra y suelta imágenes aquí o
          </p>
          <label className="cursor-pointer text-blue-600 hover:text-blue-800">
            selecciona archivos
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileInput}
              disabled={images.length >= maxImages}
            />
          </label>
          <p className="text-sm text-gray-500 mt-2">
            Máximo {maxImages} imágenes
          </p>
        </div>
      </div>

      {/* Previsualización de imágenes */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.url}
              className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100"
            >
              <img
                src={image.url}
                alt={`Imagen ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay con acciones */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleSetMainImage(index)}
                    className={`p-2 rounded-full ${
                      image.isMain ? 'bg-yellow-500' : 'bg-white'
                    } hover:bg-yellow-600 transition-colors`}
                    title={image.isMain ? 'Imagen principal' : 'Establecer como principal'}
                  >
                    <FaStar className={image.isMain ? 'text-white' : 'text-yellow-500'} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-2 rounded-full bg-white hover:bg-red-600 hover:text-white transition-colors"
                    title="Eliminar imagen"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* Indicador de imagen principal */}
              {image.isMain && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  Principal
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 