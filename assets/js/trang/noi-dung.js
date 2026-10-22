/* Các trang nội dung: Tin tức, Chi tiết tin tức, Liên hệ, Giới thiệu, Hướng dẫn thanh toán, Vận chuyển, 404 */
(function () {
  "use strict";
  var trang = document.body.getAttribute("data-trang");
  var esc = GD.esc, C = FB.CAU_HINH;

  // Điền các con số cấu hình vào chỗ có data-cau-hinh="TEN" (phí ship, tài khoản QR...)
  GD.$all("[data-cau-hinh]").forEach(function (el) {
    var k = el.getAttribute("data-cau-hinh"), v = C[k];
    el.textContent = typeof v === "number" && v >= 1000 ? FB.tien(v) : v;
  });

  if (trang === "tin-tuc") {
    var ds = KHO.lay("tinTuc").filter(function (t) { return t.hienThi; }).sort(function (a, b) { return new Date(b.ngayDang) - new Date(a.ngayDang); });
    document.getElementById("dsTin").innerHTML = ds.length ? '<div class="fb-news">' + ds.map(GD.theTinTuc).join("") + "</div>"
      : GD.theRong("fa-newspaper", "Chưa có bài viết", "FruitBen sẽ sớm cập nhật tin mới.");
  }

  if (trang === "tin-tuc-chi-tiet") {
    var t = KHO.tim("tinTuc", GD.thamSo("id"));
    if (!t || (!t.hienThi && !FB.TaiKhoan.laAdmin())) { location.replace("404.html"); return; }
    document.title = t.tieuDe + " - FruitBen";
    document.getElementById("duongDan").innerHTML = '<a href="index.html">Trang chủ</a> <i class="fas fa-chevron-right"></i> <a href="tin-tuc.html">Tin tức</a> <i class="fas fa-chevron-right"></i> <span class="hien-tai">' + esc(t.tieuDe) + "</span>";
    document.getElementById("tieuDeTin").textContent = t.tieuDe;
    document.getElementById("thongTinTin").innerHTML = '<span><i class="far fa-calendar-alt"></i> ' + FB.ngayGio(t.ngayDang) + '</span><span><i class="far fa-user"></i> ' + esc(t.nguoiDang) + "</span>";
    var anh = document.getElementById("anhTin");
    if (t.anh) { anh.src = GD.anhTin(t.anh); anh.alt = t.tieuDe; } else anh.remove();
    var tomTat = document.getElementById("tomTatTin");
    if (t.tomTat) tomTat.textContent = t.tomTat; else tomTat.remove();
    document.getElementById("noiDungTin").textContent = t.noiDung;
  }

  if (trang === "gioi-thieu") {
    document.getElementById("tkSoSP").textContent = FB.SanPham.dangBan().length;
  }

  if (trang === "lien-he") {
    var form = document.getElementById("formLienHe");
    var tk = FB.TaiKhoan.hienTai();
    if (tk) { form.hoTen.value = tk.hoTen; form.email.value = tk.email; form.soDienThoai.value = tk.soDienThoai || ""; }
    GD.ganKiemTraTrucTiep(form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!GD.kiemTraForm(form)) return;
      var ok = KHO.them("lienHe", {
        hoTen: form.hoTen.value.trim(), email: form.email.value.trim(), soDienThoai: form.soDienThoai.value.trim(),
        chuDe: form.chuDe.value.trim(), tinNhan: form.tinNhan.value.trim(), ngayGui: new Date().toISOString(), daXuLy: false
      });
      if (!ok) return;
      var hop = document.getElementById("daGui");
      hop.innerHTML = '<i class="fas fa-check-circle"></i> Cảm ơn ' + esc(form.hoTen.value.trim()) + "! FruitBen đã nhận lời nhắn và sẽ phản hồi trong 24 giờ.";
      hop.hidden = false;
      form.chuDe.value = ""; form.tinNhan.value = "";
      hop.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
})();
