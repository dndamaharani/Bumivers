// backend/utils/seedDatabase.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('../models/User');
const Article = require('../models/Article');
const Education = require('../models/Education');
const Category = require('../models/Category');
const Commitment = require('../models/Commitment');
const UserAction = require('../models/UserAction');

// Import data
const articlesData1 = [
  {
    title: "Teknik Pertanian Ramah Lingkungan",
    summary: "Gunakan teknik pertanian modern yang menjaga bumi dan memperkuat ketahanan pangan.",
    content: "<p>Pertanian berkelanjutan kini menjadi perhatian utama di tengah perubahan iklim yang semakin nyata. Teknik seperti rotasi tanaman, penggunaan pupuk organik, dan pengendalian hama alami menjadi solusi yang tidak hanya produktif tetapi juga ramah lingkungan. Dengan mengadopsi teknik ini, petani tidak hanya menjaga kesuburan tanah namun juga membantu mengurangi emisi karbon dari sektor pertanian. Yuk mulai dari hal kecil untuk pertanian masa depan yang lebih hijau!</p>",
    image: "/images/artikel/menanam-pohon.jpg",
    category: "Pertanian",
    likes: 15,
    dislikes: 2
  },
  {
    title: "Mengenal Ekowisata dan Manfaatnya",
    summary: "Liburan sambil menjaga alam? Yuk, kenali konsep ekowisata!",
    content: "<p>Ekowisata adalah bentuk pariwisata yang bertanggung jawab terhadap lingkungan dan komunitas lokal. Dalam praktiknya, wisatawan diajak untuk menikmati keindahan alam tanpa merusaknya, serta mendukung perekonomian masyarakat setempat. Menginap di homestay ramah lingkungan, mengikuti tur edukatif, hingga menanam pohon adalah bagian dari pengalaman ini. Ekowisata bukan hanya tren, tapi juga cara bijak menikmati liburan sambil berkontribusi pada pelestarian alam.</p>",
    image: "/images/artikel/ekowisata.jpg",
    category: "Wisata",
    likes: 28,
    dislikes: 1
  },
  {
    title: "Kompos: Emas Hitam dari Dapur",
    summary: "Ubah sampah dapur menjadi pupuk alami yang menyuburkan tanaman.",
    content: "<p>Membuat kompos adalah cara mudah dan efektif untuk mengurangi limbah organik rumah tangga. Sisa sayuran, buah, dan daun kering bisa diolah menjadi pupuk alami yang kaya nutrisi. Proses pengomposan tidak hanya ramah lingkungan, tetapi juga membantu menyuburkan tanaman tanpa bahan kimia. Dengan kompos, kamu bisa berkebun lebih hemat sekaligus menjaga keseimbangan ekosistem tanah. Yuk mulai daur ulang dari dapur sendiri!</p>",
    image: "/images/artikel/kompos.jpg",
    category: "Berkebun",
    likes: 42,
    dislikes: 3
  },
  {
    title: "Hemat Energi, Hemat Bumi",
    summary: "Tips praktis mengurangi konsumsi listrik tanpa mengurangi kenyamanan.",
    content: "<p>Hemat energi bukan berarti hidup serba kekurangan, tapi memilih bijak dalam menggunakan listrik. Mulailah dari mengganti lampu dengan LED, mencabut charger saat tidak digunakan, dan mematikan peralatan listrik saat tidak dibutuhkan. Dengan langkah sederhana ini, kamu bisa menekan tagihan listrik dan ikut serta dalam upaya pelestarian bumi. Hemat energi, langkah kecil untuk perubahan besar!</p>",
    image: "/images/artikel/hemat-energi.jpg",
    category: "Energi",
    likes: 33,
    dislikes: 0
  },
  {
    title: "Makanan Lokal dan Musiman: Pilihan Ramah Iklim",
    summary: "Kenapa membeli makanan lokal bisa mengurangi jejak karbon kita?",
    content: "<p>Makanan lokal dan musiman tidak memerlukan transportasi jarak jauh, sehingga mengurangi emisi karbon dari kendaraan. Selain itu, mendukung petani lokal berarti mendorong ekonomi daerah dan mengurangi ketergantungan pada impor. Makanan musiman juga lebih segar dan bernutrisi. Dengan memilih konsumsi lokal, kita turut menjaga iklim sekaligus mendapatkan manfaat gizi yang optimal.</p>",
    image: "/images/artikel/makanan-lokal.jpg",
    category: "Pangan",
    likes: 19,
    dislikes: 1
  }
];

const articlesData2 = [
  {
    title: "Cara Mudah Menanam Sayur di Pekarangan Rumah",
    summary: "Panduan lengkap untuk berkebun dengan metode organik.",
    content: "<p>Mulai berkebun dengan langkah-langkah sederhana bisa menjadi kegiatan yang menyenangkan dan bermanfaat. Mulailah dengan memilih jenis sayuran yang mudah ditanam seperti kangkung, bayam, atau tomat. Pastikan tanah gembur dan subur, dan gunakan pupuk organik untuk menjaga kesuburannya. Penyiraman dilakukan secara teratur, terutama di pagi dan sore hari. Dengan perawatan yang baik, dalam beberapa minggu kamu bisa memetik sayur hasil kebun sendiri. Tidak hanya sehat, tapi juga hemat dan ramah lingkungan!</p>",
    image: "/images/artikel/menanam-sayur.jpg",
    category: "Berkebun",
    likes: 67,
    dislikes: 2
  },
  {
    title: "Mengurangi Sampah Plastik dengan Zero Waste",
    summary: "Pelajari bagaimana mengurangi sampah plastik.",
    content: "<p>Zero waste adalah gaya hidup yang bertujuan untuk mengurangi sampah seminimal mungkin. Langkah awal bisa dimulai dengan membawa tas belanja sendiri, menggunakan botol minum dan wadah makan yang bisa dipakai ulang, serta membeli produk dalam kemasan besar atau tanpa kemasan. Menghindari barang sekali pakai adalah inti dari filosofi ini. Dengan menerapkan gaya hidup zero waste, kita ikut serta dalam menjaga laut, mengurangi polusi, dan memperpanjang usia tempat pembuangan akhir (TPA).</p>",
    image: "/images/artikel/sampah-plastik.jpg",
    category: "Sampah",
    likes: 89,
    dislikes: 4
  },
  {
    title: "Inovasi Pertanian Urban di Tengah Kota",
    summary: "Cara bercocok tanam di lingkungan perkotaan.",
    content: "<p>Pertanian urban menawarkan solusi kreatif untuk bercocok tanam di area terbatas seperti balkon atau atap rumah. Teknik seperti hidroponik, aquaponik, dan vertikultur kini populer karena efisien dan ramah lingkungan. Selain menyediakan sayuran segar untuk keluarga, pertanian urban juga memperindah ruang dan menciptakan udara yang lebih bersih. Bahkan, kegiatan ini bisa menjadi peluang usaha yang menguntungkan di tengah kota.</p>",
    image: "/images/artikel/pertanian-urban.jpg",
    category: "Pertanian",
    likes: 45,
    dislikes: 1
  },
  {
    title: "Transportasi Ramah Lingkungan",
    summary: "Gunakan sepeda atau jalan kaki untuk mengurangi polusi udara.",
    content: "<p>Transportasi ramah lingkungan seperti berjalan kaki, bersepeda, atau menggunakan transportasi umum membantu mengurangi emisi karbon. Selain itu, bersepeda dan berjalan kaki juga menyehatkan tubuh dan hemat biaya. Pemerintah dan komunitas juga mulai menyediakan jalur khusus sepeda untuk mendukung kebiasaan ini. Mari kurangi jejak karbon kita bersama-sama!</p>",
    image: "/images/artikel/transportasi.jpg",
    category: "Transportasi",
    likes: 56,
    dislikes: 3
  }
];

const educationData = [
  {
    title: "Dampak Sampah Plastik",
    description: "Pelajari dampak buruk sampah plastik terhadap lingkungan.",
    imageUrl: "/images/edukasi/plastik.jpg",
    content: `
      <p>Sampah plastik adalah salah satu penyebab utama pencemaran lingkungan...</p>
      <ul>
        <li>Mencemari laut dan sungai</li>
        <li>Berbahaya bagi hewan laut</li>
        <li>Sulit terurai secara alami</li>
      </ul>
    `
  },
  {
    title: "Apa itu Energi Terbarukan?",
    description: "Kenali berbagai sumber energi ramah lingkungan.",
    imageUrl: "/images/edukasi/energi.jpg",
    content: `
      <p>Energi terbarukan adalah energi yang berasal dari sumber alami seperti matahari, angin, dan air...</p>
    `
  },
  {
    title: "Polusi Udara dan Kesehatan",
    description: "Mengapa udara bersih penting dan bagaimana kita bisa menjaga kualitas udara.",
    imageUrl: "/images/edukasi/polusi.jpg",
    content: `
      <p>Polusi udara berdampak langsung pada kesehatan manusia dan lingkungan...</p>
    `
  },
  {
    title: "Menjaga Kelestarian Hutan",
    description: "Hutan adalah paru-paru dunia, mari kita jaga bersama.",
    imageUrl: "/images/edukasi/hutan.jpg",
    content: `
      <p>Hutan menyediakan oksigen, tempat tinggal hewan, dan menjaga keseimbangan iklim...</p>
    `
  },
  {
    title: "Menghemat Penggunaan Air",
    description: "Air bersih semakin langka. Yuk belajar cara hemat air di rumah.",
    imageUrl: "/images/edukasi/air.jpg", 
    content: `
      <p>Dengan menghemat air, kita turut serta menjaga ketersediaan sumber daya air bersih...</p>
    `
  }
];

const categoriesData = [
  {
    name: "Berkebun",
    icon: "🌱",
    description: "Berkebun bukan hanya hobi, tapi aksi nyata menjaga bumi dari halaman rumahmu sendiri.",
    funFact: "Tanaman hias seperti lidah mertua dapat menyerap polusi udara dan menghasilkan oksigen di malam hari!",
    tips: "Mulailah dengan pot kecil dan tanah kompos — hijaukan ruangmu selangkah demi selangkah.",
    quote: "\"Berkebun adalah bentuk paling lembut dari perlawanan terhadap kerusakan bumi.\"" // Escape kutip ganda
  },
  {
    name: "Sampah",
    icon: "🗑️",
    description: "Sampah yang dibiarkan adalah masalah. Sampah yang dikelola bisa jadi sumber daya.",
    funFact: "Plastik bisa bertahan lebih lama dari umur manusia — hingga 450 tahun!",
    tips: "Terapkan prinsip 3R: Reduce, Reuse, Recycle dalam kehidupan sehari-hari.",
    quote: "\"Setiap sampah yang kau buang adalah cerminan dari pilihan hidupmu.\"" // Escape kutip ganda
  },
  {
    name: "Pertanian",
    icon: "🌾",
    description: "Makanan lokal bukan hanya lezat, tapi juga langkah ramah lingkungan.",
    funFact: "Tanaman polong-polongan bisa menambah nitrogen ke dalam tanah secara alami.",
    tips: "Dukung petani lokal — lebih segar, lebih adil, lebih hijau.",
    quote: "\"Tanah yang subur adalah warisan terbaik yang bisa kita tinggalkan.\"" // Escape kutip ganda
  },
  {
    name: "Hemat Energi",
    icon: "💡",
    description: "Setiap detik listrik yang kita hemat, adalah napas tambahan untuk bumi.",
    funFact: "Lampu LED menggunakan 85% lebih sedikit energi dibanding lampu pijar.",
    tips: "Cabut charger yang tidak dipakai. Konsisten kecil, dampak besar.",
    quote: "\"Menghemat energi hari ini, menyelamatkan masa depan.\"" // Escape kutip ganda
  },
  {
    name: "Transportasi Hijau",
    icon: "🚲",
    description: "Bergeraklah tanpa meninggalkan jejak karbon.",
    funFact: "Sepeda lebih dari olahraga — ia menyelamatkan bumi dari emisi gas buang.",
    tips: "Gunakan sepeda atau jalan kaki untuk jarak dekat. Sehat untuk tubuh dan bumi.",
    quote: "\"Setiap kayuhan adalah langkah menuju langit yang lebih bersih.\"" // Escape kutip ganda
  }
];

const commitmentsData = [
  { label: "Mengurangi penggunaan plastik sekali pakai", points: 10 },
  { label: "Mendaur ulang sampah rumah tangga", points: 15 },
  { label: "Menanam pohon di halaman rumah", points: 20 },
  { label: "Menggunakan transportasi umum", points: 12 },
  { label: "Hemat listrik dan air di rumah", points: 8 }
];

const seedDatabase = async () => {
  try {
    console.log('🌍 Starting BUMIVERSE database seeding...');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data
    await User.deleteMany({});
    await Article.deleteMany({});
    await Education.deleteMany({});
    await Category.deleteMany({});
    await Commitment.deleteMany({});
    await UserAction.deleteMany({});
    console.log('🧹 Cleared existing data');
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      username: 'Admin BUMIVERSE',
      email: 'admin@bumiverse.com',
      password: hashedPassword,
      role: 'admin',
      totalPoints: 0
    });
    await adminUser.save();
    console.log('👤 Created admin user');
    
    // Create sample regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const regularUser = new User({
      username: 'Eco Warrior',
      email: 'user@bumiverse.com',
      password: userPassword,
      role: 'user',
      totalPoints: 45
    });
    await regularUser.save();
    console.log('👤 Created sample user');
    
    // Seed Articles
    const allArticles = [...articlesData1, ...articlesData2];
    await Article.insertMany(allArticles);
    console.log(`📰 Seeded ${allArticles.length} articles`);
    
    // Seed Education Topics
    await Education.insertMany(educationData);
    console.log(`🎓 Seeded ${educationData.length} education topics`);
    
    // Seed Categories
    await Category.insertMany(categoriesData);
    console.log(`📂 Seeded ${categoriesData.length} categories`);
    
    // Seed Commitments
    await Commitment.insertMany(commitmentsData);
    console.log(`🤝 Seeded ${commitmentsData.length} commitments`);
    
    // Sample User Actions for regular user
    const sampleActions = [
      {
        user: regularUser._id,
        label: "Menggunakan tote bag",
        points: 4,
        category: "Sampah"
      },
      {
        user: regularUser._id,
        label: "Naik sepeda ke kampus",
        points: 7,
        category: "Transportasi"
      },
      {
        user: regularUser._id,
        label: "Mengompos sisa makanan",
        points: 6,
        category: "Organik"
      },
      {
        user: regularUser._id,
        label: "Mematikan lampu saat tidak digunakan",
        points: 2,
        category: "Energi"
      },
      {
        user: regularUser._id,
        label: "Ikut kegiatan bersih-bersih pantai",
        points: 12,
        category: "Lingkungan"
      },
      {
        user: regularUser._id,
        label: "Menanam pohon di taman kota",
        points: 15,
        category: "Berkebun"
      }
    ];
    
    await UserAction.insertMany(sampleActions);
    console.log(`⚡ Seeded ${sampleActions.length} user actions`);
    
    console.log('\n🌟 BUMIVERSE database seeding completed successfully!');
    console.log('📋 Summary:');
    console.log(`   - Users: 2 (1 admin, 1 regular)`);
    console.log(`   - Articles: ${allArticles.length}`);
    console.log(`   - Education Topics: ${educationData.length}`);
    console.log(`   - Categories: ${categoriesData.length}`);
    console.log(`   - Commitments: ${commitmentsData.length}`);
    console.log(`   - User Actions: ${sampleActions.length}`);
    console.log('\n🔑 Login Credentials:');
    console.log('   Admin: admin@bumiverse.com / admin123');
    console.log('   User:  user@bumiverse.com / user123');
    console.log('\n🚀 Ready to save the planet! 🌍');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();