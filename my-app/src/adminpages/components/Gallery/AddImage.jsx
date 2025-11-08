import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Gallery.css";
import { FaPlus, FaTimes } from "react-icons/fa";

const AddImage = () => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setPreview(null);
    const fileInput = document.querySelector("#imageInput");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="add-image-container">
      <button
        className="btn btn-primary add-btn"
        onClick={() => setShowModal(true)}
      >
        <FaPlus size={16} className="plus-icon" />
        Yeni Resim Ekle
      </button>

      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="modal-header-custom">
              <h4>Yeni Resim Ekle</h4>
            </div>

            <div className="modal-body-custom row">
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label>Başlık</label>
                  <input type="text" className="form-control" placeholder="Başlık ekleyin" />
                </div>

                <div className="mb-3">
                  <label>Açıklama</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Kısa açıklama yazın..."
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label>Kategori</label>
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Kategori Seçin</option>
                    <option>Saç Kesim</option>
                    <option>Boyama</option>
                    <option>Makyaj</option>
                    <option>Ağda</option>
                    <option>Manikür</option>
                    <option>Pedikür</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label>Resim Ekle</label>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="col-md-6 col-12 text-center position-relative">
                {preview ? (
                  <div className="preview-wrapper">
                    <img
                      src={preview}
                      alt="Önizleme"
                      className="preview-image"
                    />
                    <button
                      className="remove-image-btn"
                      onClick={handleRemoveImage}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="preview-placeholder">
                    Henüz resim seçilmedi
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer-custom">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                İptal
              </button>
              <button className="btn btn-primary">Resmi Ekle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddImage;
