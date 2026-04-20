import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import "../../styles/AuthModal.css";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

// FontAwesome CDN (sadece bir kez eklenir, SSR yoksa index.html'e eklenmeli)
if (typeof window !== "undefined" && !document.getElementById("fa-cdn")) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
  link.id = "fa-cdn";
  document.head.appendChild(link);
}


const AuthModal = ({ show, onClose, setDisplayName }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [password2, setPassword2] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [notifyChecked, setNotifyChecked] = useState(false);

// Google ile giriş
  // Firebase hata kodlarını Türkçeye çevir
  const firebaseErrorTR = (err) => {
    if (!err || !err.code) return "Bilinmeyen bir hata oluştu.";
    const map = {
      "auth/email-already-in-use": "Bu e-posta adresi zaten kullanımda.",
      "auth/invalid-email": "Geçersiz e-posta adresi.",
      "auth/user-not-found": "Kullanıcı bulunamadı.",
      "auth/wrong-password": "Şifre yanlış.",
      "auth/weak-password": "Şifre çok zayıf (en az 6 karakter olmalı).",
      "auth/popup-closed-by-user": "Google giriş penceresi kapatıldı.",
      "auth/popup-blocked": "Google giriş penceresi engellendi.",
      "auth/network-request-failed": "Ağ bağlantı hatası. Lütfen internetinizi kontrol edin.",
      "auth/too-many-requests": "Çok fazla deneme yapıldı. Lütfen daha sonra tekrar deneyin.",
      "auth/internal-error": "Sunucu hatası. Lütfen tekrar deneyin.",
      "auth/operation-not-allowed": "Bu işlem şu anda aktif değil.",
      "auth/account-exists-with-different-credential": "Bu e-posta başka bir giriş yöntemiyle kayıtlı.",
      "auth/user-disabled": "Bu kullanıcı hesabı devre dışı bırakılmış.",
      "auth/invalid-credential": "Geçersiz kimlik bilgisi.",
      "auth/invalid-login-credentials": "E-posta veya şifre hatalı.",
    };
    return map[err.code] || err.message || "Bilinmeyen bir hata oluştu.";
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Firestore'a kullanıcıyı kaydet (varsa günceller)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        notify: true,
        createdAt: new Date().toISOString()
      }, { merge: true });
      if (setDisplayName) setDisplayName(user.displayName || "");
      onClose();
    } catch (err) {
      setError(firebaseErrorTR(err));
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isLogin) {
      if (!name.trim()) {
        setError("Lütfen adınızı girin.");
        return;
      }
      if (password !== password2) {
        setError("Şifreler eşleşmiyor.");
        return;
      }
      if (!privacyChecked) {
        setError("Kayıt için gizlilik politikasını kabul etmelisiniz.");
        return;
      }
    }
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Kullanıcı adı güncelle (Firebase v9+ fonksiyonel kullanım)
        await updateProfile(userCredential.user, { displayName: name });
        if (setDisplayName) setDisplayName(name);
        // Firestore'a kaydet
        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          name,
          email,
          notify: notifyChecked,
          createdAt: new Date().toISOString()
        });
        onClose();
      }
    } catch (err) {
      setError(firebaseErrorTR(err));
    }
    setLoading(false);
  };

  return (
    <div className={`auth-modal-backdrop${show ? " show" : ""}`} onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>&times;</button>
        <h3 className="text-center mb-3">
          <i className={`fa-solid ${isLogin ? "fa-right-to-bracket" : "fa-user-plus"}`} style={{ color: "#DF2F80", marginRight: 8 }}></i>
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
        </h3>
      
        <form onSubmit={handleSubmit} autoComplete="off">
          {!isLogin && (
            <div className="input-group" style={{ position: 'relative' }}>
              <span className="input-icon" style={{ left: 10, right: 'auto' }}><i className="fa-solid fa-user"></i></span>
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '2.2rem' }}
                placeholder="Adınız Soyadınız"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}
          <div className="input-group" style={{ position: 'relative' }}>
            <span className="input-icon" style={{ left: 10, right: 'auto' }}><i className="fa-solid fa-envelope"></i></span>
            <input
              type="email"
              className="form-control"
              style={{ paddingLeft: '2.2rem' }}
              placeholder="E-posta"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="input-group" style={{ position: 'relative' }}>
            <span className="input-icon" style={{ left: 10, right: 'auto' }}><i className="fa-solid fa-lock"></i></span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              style={{ paddingLeft: '2.2rem', paddingRight: '2.2rem' }}
              placeholder="Şifre"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            <span className="input-icon" style={{ right: 10, left: 'auto', cursor: 'pointer' }} onClick={() => setShowPassword(v => !v)}>
              <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </div>
          {!isLogin && (
            <>
              <div className="input-group" style={{ position: 'relative' }}>
                <span className="input-icon" style={{ left: 10, right: 'auto' }}><i className="fa-solid fa-lock"></i></span>
                <input
                  type={showPassword2 ? "text" : "password"}
                  className="form-control"
                  style={{ paddingLeft: '2.2rem', paddingRight: '2.2rem' }}
                  placeholder="Şifre (Tekrar)"
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <span className="input-icon" style={{ right: 10, left: 'auto', cursor: 'pointer' }} onClick={() => setShowPassword2(v => !v)}>
                  <i className={`fa-solid ${showPassword2 ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>
              <div className="form-check mb-2" style={{ textAlign: 'left' }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="privacyCheck"
                  checked={privacyChecked}
                  onChange={e => setPrivacyChecked(e.target.checked)}
                  required
                />
                <label className="form-check-label" htmlFor="privacyCheck" style={{ fontSize: '0.97rem', userSelect: 'none' }}>
                  <span style={{ color: '#DF2F80', fontWeight: 500 }}>Gizlilik Politikasını</span> kabul ediyorum.
                </label>
              </div>
              <div className="form-check mb-2" style={{ textAlign: 'left' }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="notifyCheck"
                  checked={notifyChecked}
                  onChange={e => setNotifyChecked(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="notifyCheck" style={{ fontSize: '0.97rem', userSelect: 'none' }}>
                  Yeniliklerden ve kampanyalardan haberdar olmak istiyorum.
                </label>
              </div>
            </>
          )}
          {error && <div className="text-danger small mb-2">{error}</div>}
          <button className="btn btn-primary w-100 mb-2" type="submit" disabled={loading}>
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>
            <button
          type="button"
          className="btn w-100 align-items-center justify-content-center gap-2 mt-2"
          style={{ fontWeight: 500, borderRadius: 20, color: '#000', background: 'transparent', minHeight: 38 }}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <i className="fa-brands fa-google" style={{ fontSize: 18, marginRight: 6 }}></i>
        </button>
        </form>
        <div className="text-center">
          <button className="btn btn-link p-0" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Hesabınız yok mu? Kayıt Ol" : "Zaten hesabınız var mı? Giriş Yap"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
