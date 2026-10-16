// Data Game (Bisa ditambah/dikurangi dari sini)
const products = [
  {
    id: 1,
    nama: "Gran Turismo 7",
    harga: 30000,
    stok: 5,
    kategori: "PS5",
    gambar: "Asset/Gran Turismo 7.png",
    desc: "Game simulasi balapan terbaik dengan grafis realistis."
  },
  {
    id: 2,
    nama: "Tekken 7",
    harga: 20000,
    stok: 2,
    kategori: "PS4",
    gambar: "Asset/Tekken 7.png",
    desc: "Game 3D fighting legendaris dengan combo memukau."
  },
  {
    id: 3,
    nama: "The Legend of Zelda: Ocarina of Time",
    harga: 40000,
    stok: 0,
    kategori: "Switch 2",
    gambar: "Asset/Zelda.png",
    desc: "Game petualangan klasik yang kembali hadir memukau."
  },
  {
    id: 4,
    nama: "NBA 2K27",
    harga: 45000,
    stok: 10,
    kategori: "Xbox",
    gambar: "Asset/NBA 2K27.png",
    desc: "Game turnamen bola basket imersif dan realistis."
  },
  {
    id: 5,
    nama: "Spider-Man 2",
    harga: 35000,
    stok: 3,
    kategori: "PS5",
    gambar: "Asset/Spiderman 2.png",
    desc: "Jelajahi New York bersama Peter Parker dan Miles Morales."
  },
  {
    id: 6,
    nama: "Super Mario Party",
    harga: 40000,
    stok: 10,
    kategori: "Switch",
    gambar: "Asset/Super Mario Party.png",
    desc: "Rasakan petualangan yang fantastis bersama karakter ikonik, Mario!"
  },
  {
    id: 7,
    nama: "Back 4 Blood",
    harga: 20000,
    stok: 15,
    kategori: "PS4",
    gambar: "Asset/Back 4 Blood.png",
    desc: "Kerjasama dengan timmu untuk melawan monster yang sedang melanda di Kota New York!"
  },
  {
    id: 8,
    nama: "Forza Horizon 5",
    harga: 32000,
    stok: 2,
    kategori: "Xbox",
    gambar: "Asset/Forza Horizon 5.png",
    desc: "Salah satu game simulasi balapan terbaik dengan latar di Meksiko"
  },
  {
    id: 9,
    nama: "God of War Ragnarok",
    harga: 27000,
    stok: 5,
    kategori: "PS5",
    gambar: "Asset/God of War Ragnarok.png",
    desc: "Kembali berpetualang di Era Nordik bersama Kratos dan Atreus untuk melawan Odin!"
  },
  {
    id: 10,
    nama: "Xenoblade Chronicles 2",
    harga: 31000,
    stok: 10,
    kategori: "Switch 2",
    gambar: "Asset/Xenoblade Chronicles 2.png",
    desc: "Menghadirkan kembali game JRPG legendaris dengan konsol Switch 2!"
  },
  {
    id: 11,
    nama: "Pokemon Legends Arceus",
    harga: 22000,
    stok: 20,
    kategori: "Switch",
    gambar: "Asset/Pokemon Legends Arceus.png",
    desc: "Kembali berpetualang di Era Sengoku untuk melawan sang pokemon legendaris Arceus!"
  },
  {
    id: 12,
    nama: "Need For Speed Heat",
    harga: 18000,
    stok: 2,
    kategori: "PS4",
    gambar: "Asset/NFS Heat.png",
    desc: "Taklukkan wilayah Palm City melalui balapan antar pembalap legendaris sembari menghindar serangan polisi!"
  },
  {
    id: 13,
    nama: "20 Disc Bundle (PS5)",
    harga: 50000,
    stok: 4,
    kategori: "Bundle",
    gambar: "Asset/PS5 Disc.jpg",
    desc: "Main sepuasnya dengan sekumpulan game PS5 terbaik!"
  },
];

//Menentukan status stok
function getStockStatus(stok) {
  if (stok === 0) {
    return { text: "Habis", className: "empty" };
  }if (stok <= 3) {
    return { text: "Stok Menipis", className: "low" };
  }
  return { text: "Tersedia", className: "available" };
}

//Format angka ke Rupiah
function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

//Ambil elemen dari HTML
const productList = document.querySelector("#productList");
const productCount = document.querySelector("#productCount");
const stockCount = document.querySelector("#stockCount");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");

//Menampilkan produk ke layar
function renderProducts(data) {
  productList.innerHTML = "";

  //Jika produk tidak ditemukan
  if (data.length === 0) {
    productList.innerHTML = `
      <div class="empty-state">
        <span style="font-size: 40px; display:block; margin-bottom:10px;">🎮</span>
        Game tidak ditemukan. Coba kata kunci lain.
      </div>
    `;
    productCount.textContent = 0;
    stockCount.textContent = 0;
    return;
  }

  //kartu HTML
  data.forEach(product => {
    const status = getStockStatus(product.stok);
    
    //Desain kartu diinjeksi lewat JavaScript
    productList.innerHTML += `
      <article class="product-card">
        <div class="product-image">
            <img src="${product.gambar}" alt="${product.nama}">
        </div>
        <div class="product-content">
          <span class="category">${product.kategori}</span>
          <h3>${product.nama}</h3>
          <p>${product.desc}</p>
          
          <div class="status-wrap">
            <span class="stock ${status.className}">${status.text} • ${product.stok}</span>
          </div>
          
          <div class="product-footer">
            <strong>${formatRupiah(product.harga)}/Bln</strong>
            ${
              product.stok === 0
                ? `<span class="btn-card btn-disabled">Habis</span>`
                : `<a href="Payment Page.html" class="btn-card">Sewa →</a>`
            }
          </div>
        </div>
      </article>
    `;
  });

  //Update angka statistik di atas layar
  productCount.textContent = data.length;
  const total = data.reduce((sum, product) => sum + product.stok, 0);
  stockCount.textContent = total;
}

//Tampilkan semua produk saat halaman pertama kali dimuat
renderProducts(products);

//Fungsi Filter & Pencarian
function applyFilter() {
  const keyword = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredProducts = products.filter(product => {
    const cocokNama = product.nama.toLowerCase().includes(keyword);
    const cocokDesc = product.desc.toLowerCase().includes(keyword);
    const cocokTeks = cocokNama || cocokDesc;
    const cocokKategori = selectedCategory === "Semua" || product.kategori === selectedCategory;
    return cocokTeks && cocokKategori;
  });

  renderProducts(filteredProducts);
}

//Event Listener agar filter otomatis berjalan saat user mengetik/memilih
searchInput.addEventListener("input", applyFilter);
categoryFilter.addEventListener("change", applyFilter);


const harga = 30000;
const jumlah = 10;

function hitungTotal(harga, jumlah) {
  const subtot = harga * jumlah;
  return subtot;
}

const subtot = hitungTotal(harga, jumlah);

let diskon;

if (subtot >= 40000) {
  diskon = 0.15;
} else {
  diskon = 0;
}

function hitungDiskon(subtot) {
  return subtot - (subtot * diskon);
}

const totalAkhir = hitungDiskon(subtot);

console.log("Subtotal:", subtot);
console.log("Diskon:", diskon * 100 + "%");
console.log("Total akhir:", totalAkhir);
