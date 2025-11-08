import React, { useState } from 'react'
import AdminCategoryButtons from './components/Appointmens/AdminCategoryButtons';
import AdminMessagesGrid from './components/Messages/AdminMessagesGrid';
import AdminMessagesHeader from './components/Messages/AdminMessagesHeader';

const MessagesPages = () => {
  const [activeCategory, setActiveCategory] = useState("Tümü");
      const categories = ["Tümü", "Yeni", "Okundu"];
      const [messages] = useState([
      {
        id: 1,
        name: "Başak Köseoğlu",
        email: "basak@gmail.com",
        phone: "05xx xxx xxxx",
        note:"bir yeni mesaj",
        current_date: "2025-11-08 14:00",
        status: "Yeni",
      },
      {
        id: 2,
        name: "Burçin Güngör",
        email: "burcin@gmail.com",
        phone: "05xx xxx xxxx",
        note:"bir yeni mesaj",
        current_date: "2025-11-08 14:00",
        status: "Yeni",
      },
      {
        id: 3,
        name: "Zeynep İmzaoğlu",
        email: "zeynep@gmail.com",
        phone: "05xx xxx xxxx",
        note:"bir yeni mesaj",
        current_date: "2025-11-08 14:00",
        status: "Okundu",
      },
      {
        id: 4,
        name: "Rabia Yulalı",
        email:"rabia@gmail.com",
        phone: "05xx xxx xxxx",
        note:"bir yeni mesaj",
        current_date: "2025-11-08 14:00",
        status: "Okundu",
      },
    ]);

  const filteredMessages =
    activeCategory === "Tümü"
      ? messages
      : messages.filter((item) => item.status === activeCategory);
  return (
    <section className="adminmessages-page">
      <div className="container-fluid py-3">
        <div className="row">
            <AdminMessagesHeader/>
            <AdminCategoryButtons
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}/>
            <AdminMessagesGrid messages={filteredMessages} />
        </div>
      </div>
    </section>
  )
}

export default MessagesPages