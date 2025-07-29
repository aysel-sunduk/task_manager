// Not: Tarih biçimlendirme dosyasında logout işlemi yapılmaz. Ancak, genel olarak yetkisiz erişim tespitinde
// üst seviye bir bileşende logout fonksiyonu çağrılabilir.

export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("tr-TR");
}; 