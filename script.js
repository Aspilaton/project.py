// --- KALP ANİMASYONU MOTORU ---
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");
let width, height;
let animationRunning = false;
function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
resize(); window.addEventListener("resize", resize);
const heartPosition = (rad) => { return [ Math.pow(Math.sin(rad), 3), -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad)), ]; };
let pointsOrigin = [];
let dr = 0.1;
for (let i = 0; i < Math.PI * 2; i += dr) { pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0)); }
for (let i = 0; i < Math.PI * 2; i += dr) { pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0)); }
for (let i = 0; i < Math.PI * 2; i += dr) { pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0)); }
const heartPointsCount = pointsOrigin.length;
function scaleAndTranslate(pos, sx, sy, dx, dy) { return [dx + pos[0] * sx, dy + pos[1] * sy]; }
let targetPoints = [];
function pulse(kx, ky) { for (let i = 0; i < pointsOrigin.length; i++) { targetPoints[i] = []; targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2; targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2; } }
let e = [];
for (let i = 0; i < heartPointsCount; i++) {
  let x = Math.random() * width; let y = Math.random() * height;
  e[i] = { vx: 0, vy: 0, R: 2, speed: Math.random() + 5, q: ~~(Math.random() * heartPointsCount), D: 2 * (i % 2) - 1, force: 0.2 * Math.random() + 0.7, f: "hsla(0," + ~~(40 * Math.random() + 60) + "%," + ~~(60 * Math.random() + 20) + "%,.3)", trace: [] };
  for (let k = 0; k < 50; k++) e[i].trace[k] = { x: x, y: y };
}
const config = { traceK: 0.4, timeDelta: 0.01 };
let time = 0;
function loop() {
  if (!animationRunning) return;
  let n = -Math.cos(time); pulse((1 + n) * 0.5, (1 + n) * 0.5); time += (Math.sin(time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) * config.timeDelta;
  ctx.fillStyle = "rgba(0,0,0,0.1)"; ctx.fillRect(0, 0, width, height);
  for (let i = e.length - 1; i >= 0; i--) {
    let u = e[i]; let q = targetPoints[u.q]; let dx = u.trace[0].x - q[0]; let dy = u.trace[0].y - q[1]; let length = Math.sqrt(dx * dx + dy * dy);
    if (length < 10) { if (Math.random() > 0.95) { u.q = ~~(Math.random() * heartPointsCount); } else { if (Math.random() > 0.99) { u.D *= -1; } u.q += u.D; u.q %= heartPointsCount; if (u.q < 0) { u.q += heartPointsCount; } } }
    u.vx += (-dx / length) * u.speed; u.vy += (-dy / length) * u.speed; u.trace[0].x += u.vx; u.trace[0].y += u.vy; u.vx *= u.force; u.vy *= u.force;
    for (let k = 0; k < u.trace.length - 1; ) { let T = u.trace[k]; let N = u.trace[++k]; N.x -= config.traceK * (N.x - T.x); N.y -= config.traceK * (N.y - T.y); }
    ctx.fillStyle = u.f; for (let k = 0; k < u.trace.length; k++) { ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1); }
  }
  requestAnimationFrame(loop);
}

// --- OPERASYON ZAMANLAYICI BEYİN ---

const acilisMetni = "Seni seviyorum Azram";

// Video oynarken yukarıda yazacak olan mühimmat
const videoMetni = "Dünyada tam 8 milyar insan var...\nSeninle aynı dönemde yaşama ihtimalim %6.8,\nbu milyarlarca insan arasından seninle karşılaşma ihtimalim ise sadece %0.0000000125...\nVe ben bu imkansızı yaşadım.\nGülüşünü çok seviyorum.";

const sonSoz = "İyi ki benimsin";

const ilkYaziEl = document.getElementById("ilk-yazi");
const videoYaziEl = document.getElementById("video-yazi");
const ortaSozEl = document.getElementById("orta-soz");
const hediyeKutusu = document.getElementById("kutu-merkezi");
const giftImg = document.getElementById("gift");
const videoObj = document.getElementById("gizli-video");
const music = document.getElementById("music");

let idx1 = 0;
let idx2 = 0;

// Yazıyı yumuşakça kaybetme fonksiyonu
function fadeOut(element, callback) {
  let op = 1;
  const timer = setInterval(() => {
    if (op <= 0.05) {
      clearInterval(timer);
      element.style.display = "none";
      if (callback) callback();
    }
    element.style.opacity = op;
    op -= 0.04;
  }, 50);
}

// 1. AŞAMA: Açılış Daktilosu
function ilkDaktilo() {
  if (idx1 < acilisMetni.length) {
    ilkYaziEl.innerHTML += acilisMetni.charAt(idx1);
    idx1++;
    setTimeout(ilkDaktilo, 90);
  } else {
    setTimeout(() => {
      fadeOut(ilkYaziEl, () => {
        hediyeKutusu.style.display = "block";
      });
    }, 1200);
  }
}

// 2. AŞAMA: Video Üstü Daktilosu
function videoDaktilo() {
  if (idx2 < videoMetni.length) {
    if (videoMetni.charAt(idx2) === '\n') {
      videoYaziEl.innerHTML += "<br>";
    } else {
      videoYaziEl.innerHTML += videoMetni.charAt(idx2);
    }
    idx2++;
    setTimeout(videoDaktilo, 70);
  }
}

// Pimi Çek: Hediyeye basınca hem video hem müzik AYNI ANDA cepheye sürülüyor!
giftImg.addEventListener("click", () => {
  hediyeKutusu.style.display = "none"; // Kutuyu imha et
  
  videoObj.style.display = "block"; // Videoyu ekrana getir
  videoObj.play().catch(e => console.log("Video mermisi sıkıştı:", e));
  
  // Şarkı lo! Tam burada devreye giriyor, video dönene kadar arkada gürleyecek
  music.play().catch(e => console.log("Müzik taarruzu engellendi:", e));
  
  videoDaktilo(); // Yazılar üstten akmaya başlasın
});

// 3. AŞAMA: Video Bitişi (Siyah Ekran, Bekleme Süresi ve Kalpler)
videoObj.addEventListener("ended", () => {
  videoObj.style.display = "none"; // Görüntüyü kes
  videoYaziEl.style.display = "none"; // Üstteki yazıyı temizle
  
  // Ekran zifiri karanlıkken o son darbe vuruluyor
  ortaSozEl.innerHTML = sonSoz;
  ortaSozEl.style.display = "block";
  
  // Şarkı burada durmuyor, arkada akmaya devam ediyor komutanım!
  
  // "İyi ki benimsin" yazısı ekranda 4 saniye boyunca çakılı kalacak
  setTimeout(() => {
    ortaSozEl.style.display = "none"; // Yazıyı kaldır
    
    // Ve nihai taarruz: Kalpler sahaya iniyor!
    animationRunning = true;
    canvas.style.display = "block";
    loop();
  }, 4000); 
});

// Operasyon Başlıyor
ilkDaktilo();