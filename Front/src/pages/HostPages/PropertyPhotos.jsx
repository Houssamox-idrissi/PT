import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext';
import ProgressBar from '../../components/ProgressBar';

export default function PropertyPhotos() {
  const navigate = useNavigate();
  const { propertyData, updatePropertyData } = useProperty();
  const [photos, setPhotos] = useState(propertyData.imagesBase64 || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPhotos).then(base64Photos => {
      setSelectedPhotos(base64Photos);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newPhotos = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPhotos).then(base64Photos => {
      setSelectedPhotos(base64Photos);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = () => {
    const updatedPhotos = [...photos, ...selectedPhotos];
    setPhotos(updatedPhotos);
    updatePropertyData({ imagesBase64: updatedPhotos });
    setSelectedPhotos([]);
    setIsModalOpen(false);
  };

  const handleDelete = (photoIndex) => {
    const updatedPhotos = photos.filter((_, index) => index !== photoIndex);
    setPhotos(updatedPhotos);
    updatePropertyData({ imagesBase64: updatedPhotos });
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (photos.length >= 5) {
      navigate('/Property-Title');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="px-12 py-6 flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="text-black">
            <img src="/logo.png" alt="Holi Square" className="h-14" />
          </Link>
          <div className="flex items-center gap-6">
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-[32px] font-semibold text-gray-900">
                Ajoutez quelques photos de votre appartement
              </h1>
              <p className="text-gray-600 text-lg">
                Pour commencer, vous aurez besoin de 5 photos. Vous pourrez en ajouter
                d'autres ou faire des modifications plus tard.
              </p>
            </div>

            {photos.length === 0 ? (
              <div 
                className="mt-8 border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="mx-auto w-24 max-h-80 mb-6">
                  <img src="/cameraa.png" alt="Camera" className="w-full h-full object-contain" />
                </div>
                <button className="px-6 py-2 border border-gray-900 rounded-lg font-medium">
                  Ajoutez des photos
                </button>
              </div>
            ) : (
              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Choisissez au moins 5 photos</h2>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      {index === 0 && (
                        <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-lg text-sm font-medium">
                          Photo de couverture
                        </div>
                      )}
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleDelete(index)}
                        className="absolute top-3 right-3 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {Array.from({ length: Math.max(0, 5 - photos.length) }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="aspect-[4/3] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
                    >
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-light">
                  Add Photos
                  {selectedPhotos.length > 0 && <span className="text-gray-500 ml-2">({selectedPhotos.length} selected)</span>}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedPhotos.length === 0 ? (
                <div
                  className="border border-gray-200 rounded-lg p-12 text-center hover:border-gray-300 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="mb-6">
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-lg font-light mb-2">Drag & drop your photos here</p>
                  <p className="text-gray-500 mb-6 text-sm">or</p>
                  <button
                    onClick={openFileDialog}
                    className="px-8 py-3 bg-black text-white rounded-lg font-light text-sm tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    SELECT FILES
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {selectedPhotos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt=""
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setSelectedPhotos(selectedPhotos.filter((_, i) => i !== index))}
                          className="absolute top-2 right-2 p-1 bg-white/90 rounded-full shadow-sm hover:bg-gray-100 transition-opacity opacity-0 group-hover:opacity-100"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 text-gray-700 font-light hover:underline text-sm tracking-wider"
              >
                CANCEL
              </button>
              <button
                onClick={handleUpload}
                disabled={selectedPhotos.length === 0}
                className={`px-8 py-3 rounded-lg font-light text-sm tracking-wider transition-colors ${
                  selectedPhotos.length > 0
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                UPLOAD PHOTOS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer with Progress */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.03)]">
        <ProgressBar />
        <div className="max-w-7xl mx-auto px-12">
          <div className="h-20 flex items-center justify-between">
            <Link
              to="/equipement"
              className="text-gray-900 font-medium text-base hover:underline"
            >
              Retour
            </Link>
            <button
              onClick={handleSubmit}
              className={`px-8 py-4 rounded-xl font-medium text-base transition-colors ${
                photos.length >= 5
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={photos.length < 5}
            >
              Suivant
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
} 