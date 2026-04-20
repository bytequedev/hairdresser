/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./styles/Menu.css";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("date-desc");
  const [selected, setSelected] = useState([]); // Seçili kullanıcı id'leri
  // Toplu seçim fonksiyonları
  const selectAll = () => setSelected(filteredUsers.map(u => u.id));
  const selectNotify = () => setSelected(filteredUsers.filter(u => u.notify).map(u => u.id));
  const clearSelection = () => setSelected([]);
  const toggleSelect = (id) => setSelected(sel => sel.includes(id) ? sel.filter(i => i !== id) : [...sel, id]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Firebase initialize kontrolü
        const firebaseConfig = {
          apiKey: "AIzaSyBiWCZe0g_GW4jAIugXGYAIRVD0-02npfo",
          authDomain: "elifkuafor.firebaseapp.com",
          projectId: "elifkuafor",
          storageBucket: "elifkuafor.firebasestorage.app",
          messagingSenderId: "967408631444",
          appId: "1:967408631444:web:e782208ca3c126caf07e81"
        };
        if (getApps().length === 0) {
          initializeApp(firebaseConfig);
        }
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (err) {
        setUsers([]);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Filtre ve sıralama uygulanmış kullanıcılar
  let filteredUsers = users.filter(u =>
    u.email?.toLowerCase().includes(filter.toLowerCase())
  );
  if (sort === "date-desc") {
    filteredUsers.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  } else if (sort === "date-asc") {
    filteredUsers.sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
  } else if (sort === "alpha-asc") {
    filteredUsers.sort((a, b) => (a.name || "").localeCompare(b.name || "", "tr"));
  } else if (sort === "alpha-desc") {
    filteredUsers.sort((a, b) => (b.name || "").localeCompare(a.name || "", "tr"));
  }

  return (
    <div className="admin-page">
      <h2 className="admin-title mb-4 fw-bold">Kullanıcı Yönetimi</h2>
      <div className="admin-section bg-white rounded-4 shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-2" style={{gap:8}}>
          <div className="d-flex align-items-center" style={{gap:6}}>
            <button className="btn btn-sm btn-outline-secondary" style={{fontSize:12, borderRadius:14, padding:'2px 10px'}} onClick={selectAll} type="button">Tümünü Seç</button>
            <button className="btn btn-sm btn-outline-secondary" style={{fontSize:12, borderRadius:14, padding:'2px 10px'}} onClick={selectNotify} type="button">Bildirim:Evet Seç</button>
            <button className="btn btn-sm btn-outline-secondary" style={{fontSize:12, borderRadius:14, padding:'2px 10px'}} onClick={clearSelection} type="button">Seçimi Temizle</button>
            {selected.length > 0 && <span style={{fontSize:12, color:'#DF2F80', marginLeft:6}}>{selected.length} kişi seçili</span>}
          </div>
          <div className="d-flex align-items-center" style={{gap:8}}>
            <input
              type="text"
              className="form-control form-control-sm"
              style={{maxWidth:170, fontSize:13, borderRadius:16, border:'1px solid #DF2F80', padding:'6px 14px'}}
              placeholder="E-posta ile filtrele"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
            <select
              className="form-select form-select-sm"
              style={{maxWidth:140, fontSize:13, borderRadius:16,  padding:'6px 10px'}}
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="date-desc">Tarihe göre (Y→E)</option>
              <option value="date-asc">Tarihe göre (E→Y)</option>
              <option value="alpha-asc">İsme göre (A→Z)</option>
              <option value="alpha-desc">İsme göre (Z→A)</option>
            </select>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>
                  <input type="checkbox"
                    checked={filteredUsers.length > 0 && selected.length === filteredUsers.length}
                    onChange={e => e.target.checked ? selectAll() : clearSelection()}
                    style={{margin:0}}
                  />
                </th>
                <th>Ad Soyad</th>
                <th>E-posta</th>
                <th>Bildirim</th>
                <th>Kayıt Tarihi</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7}>Yükleniyor...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan={7}>Kullanıcı bulunamadı.</td></tr>
              ) : (
                filteredUsers.map((user, idx) => (
                  <tr key={user.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(user.id)}
                        onChange={() => toggleSelect(user.id)}
                        style={{margin:0}}
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.notify ? "Evet" : "Hayır"}</td>
                    <td>{user.createdAt ? new Date(user.createdAt).toLocaleString("tr-TR") : "-"}</td>
                    <td>
                      {/* Düzenle butonu kaldırıldı */}
                      <button className="btn btn-sm btn-outline-danger" title="Sil">
                        <FaTrash style={{marginBottom:2}} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
