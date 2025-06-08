// INDEX
// js/main.js
$(function () {
  const stories = [
    // Cerita Pertama
    `Waktu orientasi di kampus BINUS itu seru banget—aku ketemu lima sahabat baru: 
   <span class="highlight">Dapina</span> yang selalu bikin suasana ceria, 
   <span class="highlight">Vanes</span> yang teliti dan rajin banget catat materi, 
   <span class="highlight">Pricil</span> yang jadi penengah kalau kita berdebat,
   <span class="highlight">Lala</span> yang ide-idenya segar, dan 
   <span class="highlight">Wawa</span> yang selalu bisa diajak curhat.
   Dari tugas kelompok itu, kita jadi dekat tanpa diduga—mulai dari ngerjain tugas bareng sampai nongkrong sambil ngeteh.`,

    // Cerita Kedua: Dufan
    `Lima sekawan memutuskan kabur sejenak dari rutinitas dengan petualangan seru ke 
     <span class="highlight">Dufan</span> — tawa pecah sejak antrean pertama, teriakan 
     campur aduk antara takut dan senang waktu naik <span class="highlight">Halilintar</span>, 
     lalu ketawa-ketawa lagi pas ada yang hampir menangis di <span class="highlight">Rumah Miring</span>. 
     Dari main basah-basahan di <span class="highlight">Arung Jeram</span> sampai foto-foto estetik di 
     bianglala saat matahari mulai tenggelam, hari itu penuh cerita konyol dan momen tak terlupakan. 
     Pulang dengan kaki pegal, tapi hati penuh kenangan.`,

    // Cerita Ketiga: Jakarta Fair
    `Jalan bareng ke <span class="highlight">Jakarta Fair</span> berlima jadi momen yang nggak kalah seru — 
     dari masuk gerbang disambut lampu warna-warni dan aroma jajanan yang bikin ngiler, muter-muter 
     lihat booth, nyobain makanan random, sampai borong barang diskonan bareng sambil komentar promo absurd. 
     Pas nonton konser, kita nyanyi bareng sampai suara serak, lalu duduk selonjoran sambil sharing 
     segarnya es kelapa. Malam itu penuh vibes hangat—ramai, tapi terasa nyaman.`,
  ];

  let currentIndex = 0;
  const $bodyP = $(".carousel-body p");
  const $prev = $(".arrow.left");
  const $next = $(".arrow.right");

  function renderStory() {
    $bodyP.html(stories[currentIndex]);
  }

  $prev.on("click", () => {
    currentIndex = (currentIndex - 1 + stories.length) % stories.length;
    renderStory();
  });
  $next.on("click", () => {
    currentIndex = (currentIndex + 1) % stories.length;
    renderStory();
  });

  renderStory();
});

// NOTE

$(document).ready(function () {
  $("#storyForm").on("submit", function (e) {
    e.preventDefault(); // Biar gak reload

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const story = $("#story").val().trim();
    const $message = $("#formMessage");

    $message.text("").removeClass("error success");

    // Validasi bagian nama
    if (name === "") {
      $message.text("Please enter your name.").addClass("error");
      return;
    }

    // validasi bagian email
    if (email === "") {
      $message.text("Please enter your email.").addClass("error");
      return;
    } else if (!validateEmail(email)) {
      $message.text("Please enter a valid email address.").addClass("error");
      return;
    }

    // validasi bagian isi story
    if (story === "") {
      $message.text("Please write your story.").addClass("error");
      return;
    } else if (story.length < 10) {
      $message.text("Your story is too short. Tell us more!").addClass("error");
      return;
    }

    let formData = { name, email, story };
    let localData = JSON.parse(localStorage.getItem("data_story")) || [];
    localData.push(formData);
    localStorage.setItem("data_story", JSON.stringify(localData));

    // Semua valid
    $message.text("Your story has been sent. Thank you!").addClass("success");
    $("#storyForm")[0].reset();
  });

  // Fungsi validasi email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
});

//comment
$(document).ready(function () {
  const loadData = JSON.parse(localStorage.getItem("data_story")) || [];

  if (loadData === 0 || loadData == undefined) {
    $("#comment").html("<p>belum ada cerita</p>");
  } else {
    loadData.forEach(function (item) {
      $("#comment").append(`
        <div class="text">
          <h1>${item.name}</h1>
          <h3>${item.email}</h3>
          <p>${item.story}</p>
        </div>
      `);
    });
  }
});
