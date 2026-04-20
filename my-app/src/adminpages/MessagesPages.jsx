/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import AdminCategoryButtons from './components/Appointmens/AdminCategoryButtons';
import AdminMessagesGrid from './components/Messages/AdminMessagesGrid';
import AdminMessagesHeader from './components/Messages/AdminMessagesHeader';

const MessagesPages = () => {
  const [activeCategory, setActiveCategory] = useState("Tümü");
      const categories = ["Tümü", "Yeni", "Okundu"];
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
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
      const querySnapshot = await getDocs(collection(db, "messages"));
      const msgList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgList);
      setLoading(false);
    };
    fetchMessages();
  }, []);

  // Tarih formatlama fonksiyonu
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" });
  };

  // Okundu olarak işaretle
  const handleMarkAsRead = async (id) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "messages", id), { status: "Okundu" });
      setMessages(msgs => msgs.map(m => m.id === id ? { ...m, status: "Okundu" } : m));
    } catch (err) {
      // Hata yönetimi eklenebilir
    }
  };

  const filteredMessages =
    activeCategory === "Tümü"
      ? messages
      : messages.filter((item) => item.status === activeCategory);
  // Mesajlarda tarih formatla
  const displayMessages = filteredMessages.map(m => ({ ...m, current_date: formatDate(m.current_date) }));
  return (
           <div style={{ height: '74vh', display: 'flex', flexDirection: 'column' }}>

    <section className="adminmessages-page">

      <div className="container-fluid py-3">

        <div className="row">
            <AdminMessagesHeader/>
            <AdminCategoryButtons
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}/>
            <AdminMessagesGrid
              messages={displayMessages}
              loading={loading}
              onMarkAsRead={handleMarkAsRead}
              onDelete={() => {}}
            />
        </div>
      </div>
    </section>    </div>

  )
}

export default MessagesPages