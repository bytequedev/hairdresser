import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Gallery.css";
import { FaPlus, FaTimes, FaSave } from "react-icons/fa";
import CreatableSelect from "react-select/creatable";
import { db, storage } from "../../../config/firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

const galleryCategories = [
  { value: "Saç Kesimi", label: "Saç Kesimi" },
  { value: "Saç Boyama", label: "Saç Boyama" },
  { value: "Dip Boya", label: "Dip Boya" },
  { value: "Röfle / Balyaj", label: "Röfle / Balyaj" },
  { value: "Ombre / Sombre", label: "Ombre / Sombre" },
  { value: "Fön", label: "Fön" },
  { value: "Topuz / Gelin Başı", label: "Topuz / Gelin Başı" },
  { value: "Makyaj", label: "Makyaj" },
  { value: "Manikür / Pedikür", label: "Manikür / Pedikür" },
  { value: "Cilt Bakımı", label: "Cilt Bakımı" },
  { value: "Keratin Bakım", label: "Keratin Bakım" },
  { value: "Perma", label: "Perma" },
  { value: "Diğer", label: "Diğer" },
];

const AddImage = ({ initialData, onClose, showModal: externalShowModal }) => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setSubtitle(initialData.subtitle || "");
      setSelectedCategory(initialData.category ? { value: initialData.category, label: initialData.category } : null);
      setPreview(initialData.src || null);
    } else {
      setTitle("");
      setSubtitle("");
      setSelectedCategory(null);
      setPreview(null);
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setImageFile(null);
    const fileInput = document.querySelector("#imageInput");
    if (fileInput) fileInput.value = "";
  };

  const handleSave = async () => {
    if (!title || !selectedCategory || (!isEdit && !imageFile)) {
      toast.warning("Lütfen zorunlu alanları (Başlık, Kategori, Resim) doldurun.");
      return;
    }

    setLoading(true);
    try {
      let downloadURL = preview;

      // 1. Eğer yeni bir resim seçildiyse yükle
      if (imageFile) {
        const storageRef = ref(storage, `gallery/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        downloadURL = await getDownloadURL(storageRef);
      }

      const itemData = {
        title,
        subtitle,
        src: downloadURL,
        category: selectedCategory.value,
        updatedAt: serverTimestamp(),
      };

      if (isEdit) {
        // Düzenleme
        await updateDoc(doc(db, "gallery", initialData.id), itemData);
        toast.success("Resim başarıyla güncellendi!");
      } else {
        // Yeni Ekleme
        itemData.createdAt = serverTimestamp();
        await addDoc(collection(db, "gallery"), itemData);
        toast.success("Resim başarıyla eklendi!");
      }

      handleClose();
    } catch (error) {
      console.error("İşlem sırasında hata:", error);
      toast.error("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setShowModal(false);
    }
    // Formu temizle (Sadece ekleme modundaysa veya kapandığında)
    if (!isEdit) {
      setTitle("");
      setSubtitle("");
      setSelectedCategory(null);
      handleRemoveImage();
    }
  };

  const isVisible = externalShowModal !== undefined ? externalShowModal : showModal;

  return (
    <div className="add-image-container">
      {!isEdit && (
        <button
          className="btn btn-primary add-btn"
          onClick={() => setShowModal(true)}
        >
          <FaPlus size={16} className="plus-icon" />
          Yeni Resim Ekle
        </button>
      )}

      {isVisible && (
        <div className="custom-modal-overlay">
          <div className="custom-modal shadow-lg border-0">
            <div className="modal-header-custom d-flex justify-content-between align-items-center p-3 border-bottom-0">
              <h4 className="m-0 fw-bold">{isEdit ? "Resmi Düzenle" : "Yeni Resim Ekle"}</h4>
              <button className="btn p-0 border-0" onClick={handleClose} disabled={loading}>
                <FaTimes size={20} />
              </button>
            </div>

            <div className="modal-body-custom row p-4">
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label small fw-bold text-uppercase text-muted">Başlık *</label>
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light p-3" 
                    placeholder="Başlık ekleyin" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-uppercase text-muted">Açıklama</label>
                  <textarea
                    className="form-control border-0 bg-light p-3"
                    rows="3"
                    placeholder="Kısa açıklama yazın..."
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    disabled={loading}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-uppercase text-muted">Kategori *</label>
                  <CreatableSelect
                    isClearable
                    options={galleryCategories}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    placeholder="Kategori seçin veya yazın..."
                    formatCreateLabel={(inputValue) => `Yeni kategori ekle: "${inputValue}"`}
                    noOptionsMessage={() => "Kategori bulunamadı, yazarak ekleyebilirsiniz"}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    isDisabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-uppercase text-muted">
                    {isEdit ? "Resmi Değiştir (İsteğe bağlı)" : "Resim Seç *"}
                  </label>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    className="form-control border-0 bg-light p-3"
                    onChange={handleImageChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="col-md-6 col-12 text-center d-flex align-items-center justify-content-center bg-light rounded-4 overflow-hidden mt-3 mt-md-0" style={{ minHeight: 250 }}>
                {preview ? (
                  <div className="preview-wrapper w-100 h-100 d-flex align-items-center justify-content-center p-2 position-relative">
                    <img
                      src={preview}
                      alt="Önizleme"
                      className="img-fluid rounded-3 shadow-sm"
                      style={{ maxHeight: '230px' }}
                    />
                    {!loading && imageFile && (
                      <button
                        className="btn btn-danger position-absolute top-0 end-0 m-3 rounded-circle p-2"
                        onClick={handleRemoveImage}
                        style={{ width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="preview-placeholder text-muted d-flex flex-column align-items-center">
                    <i className="fa-solid fa-cloud-arrow-up fs-1 mb-2"></i>
                    <span>Henüz resim seçilmedi</span>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer-custom p-4 border-top-0 d-flex gap-3">
              <button
                className="btn btn-light rounded-pill py-3 px-4 fw-bold text-muted flex-grow-1"
                onClick={handleClose}
                disabled={loading}
              >
                İptal
              </button>
              <button 
                className="btn btn-primary rounded-pill py-3 px-4 fw-bold flex-grow-1 shadow-sm" 
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : <FaSave className="me-2" />}
                {loading ? "Kaydediliyor..." : (isEdit ? "Güncellemeyi Kaydet" : "Resmi Yayına Al")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddImage;
