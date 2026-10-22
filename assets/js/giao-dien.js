/* =========================================================================
   FRUITBEN – GIAO DIỆN DÙNG CHUNG PHÍA KHÁCH HÀNG
   - Chèn header (logo, menu, tìm kiếm, giỏ hàng, tài khoản), banner đầu trang, dải logo đối tác, footer
   - Thông báo dạng toast (kể cả thông báo "nhắn" sang trang sau, giống TempData)
   - Hàm vẽ thẻ sản phẩm / thẻ tin tức / nhãn trạng thái đơn dùng lại ở nhiều trang
   - Kiểm tra dữ liệu form (bắt buộc, email, số điện thoại, độ dài, khớp mật khẩu)
   - Hiệu ứng: hiện dần khi cuộn, slider, dải cuộn ngang, ô số lượng, thư viện ảnh, sao chép, mật khẩu
   Mỗi trang HTML chỉ cần: <body data-trang="..." [data-banner="..." data-banner-tieu-de="..."]>
   Tác giả: Giáp Chí Thanh
   ========================================================================= */
(function () {
  "use strict";

  var body = document.body;
  var GOC = body.getAttribute("data-goc") || "";   // "" cho trang khách, "../" cho trang trong thư mục admin

  // ===================== TIỆN ÍCH =====================
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function thamSo(ten) { return new URLSearchParams(location.search).get(ten); }
  function anhSP(file) { return !file ? GOC + "assets/img/products/1.jpg" : (/^(data:|https?:)/.test(file) ? file : GOC + "assets/img/products/" + file); }
  function anhTin(file) { return !file ? "" : (/^(data:|https?:)/.test(file) ? file : GOC + "assets/img/tintuc/" + file); }
  function link(trang, thamSoUrl) {
    var q = thamSoUrl ? Object.keys(thamSoUrl).filter(function (k) { return thamSoUrl[k] !== "" && thamSoUrl[k] != null && thamSoUrl[k] !== false; })
      .map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(thamSoUrl[k]); }).join("&") : "";
    return GOC + trang + (q ? "?" + q : "");
  }

  // ===================== THÔNG BÁO (TOAST) =====================
  function khungToast() {
    var k = document.querySelector(".fb-toasts");
    if (!k) { k = document.createElement("div"); k.className = "fb-toasts"; k.setAttribute("aria-live", "polite"); body.appendChild(k); }
    return k;
  }
  function anToast(t) { t.classList.add("an"); setTimeout(function () { t.remove(); }, 260); }
  // loai: "ok" | "loi"; nutGio: hiện nút "Xem giỏ hàng"
  function toast(noiDung, loai, nutGio) {
    var loi = loai === "loi";
    var t = document.createElement("div");
    t.className = "fb-toast" + (loi ? " loi" : "");
    t.setAttribute("role", loi ? "alert" : "status");
    t.innerHTML = '<span class="fb-toast-icon"><i class="fas ' + (loi ? "fa-exclamation" : "fa-check") + '"></i></span>' +
      '<div class="fb-toast-body">' + esc(noiDung) +
      (nutGio ? '<div><a class="fb-btn fb-btn-soft fb-btn-sm" href="' + link("gio-hang.html") + '">Xem giỏ hàng <i class="fas fa-arrow-right"></i></a></div>' : "") +
      '</div><button class="fb-toast-close" type="button" aria-label="Đóng">&times;</button>';
    t.querySelector(".fb-toast-close").addEventListener("click", function () { anToast(t); });
    khungToast().appendChild(t);
    setTimeout(function () { if (body.contains(t)) anToast(t); }, loi ? 8000 : 5000);
  }
  // Nhắn thông báo sang trang kế tiếp (sau khi chuyển trang)
  function nhan(noiDung, loai, nutGio) {
    try { sessionStorage.setItem("fb_nhan", JSON.stringify({ n: noiDung, l: loai, g: !!nutGio })); } catch (e) { }
  }
  function hienNhan() {
    try {
      var x = JSON.parse(sessionStorage.getItem("fb_nhan") || "null");
      sessionStorage.removeItem("fb_nhan");
      if (x) toast(x.n, x.l, x.g);
    } catch (e) { }
  }

  // ===================== THÀNH PHẦN DÙNG LẠI =====================
  function theSanPham(sp) {
    var het = sp.ton <= 0, giam = FB.SanPham.dangGiam(sp);
    var url = link("san-pham.html", { id: sp.id });
    var nhanSP = het ? '<span class="fb-tag het">Hết hàng</span>' : (giam ? '<span class="fb-tag sale">Sale</span>' : (FB.SanPham.laHangMoi(sp) ? '<span class="fb-tag">Mới</span>' : ""));
    return '<article class="fb-product">' +
      '<a class="fb-product-img" href="' + url + '" aria-label="' + esc(sp.ten) + '">' +
      '<img src="' + anhSP(sp.anh) + '" alt="' + esc(sp.ten) + '" loading="lazy" />' + nhanSP +
      (giam ? '<span class="fb-percent">-' + FB.SanPham.phanTramGiam(sp) + '%</span>' : "") + '</a>' +
      '<div class="fb-product-body">' +
      '<h3 class="fb-product-name"><a href="' + url + '">' + esc(sp.ten) + '</a></h3>' +
      '<span class="fb-product-cat">' + esc(sp.loai) + ' · Giá mỗi kg</span>' +
      '<div class="fb-product-price"><span class="fb-price">' + FB.tien(sp.gia) + '</span>' +
      (giam ? '<span class="fb-old-price">' + FB.tien(sp.giaCu) + '</span>' : "") + '</div>' +
      '<div class="fb-product-actions"><button type="button" class="fb-btn fb-btn-grad" data-them-gio="' + sp.id + '"' + (het ? " disabled" : "") +
      ' aria-label="Thêm ' + esc(sp.ten) + ' vào giỏ"><i class="fas fa-shopping-cart"></i> ' + (het ? "Hết hàng" : "Thêm vào giỏ hàng") + '</button></div>' +
      '</div></article>';
  }

  function theTinTuc(t) {
    return '<a class="fb-news-card" href="' + link("tin-tuc-chi-tiet.html", { id: t.id }) + '">' +
      '<div class="fb-news-img">' + (t.anh ? '<img src="' + anhTin(t.anh) + '" alt="' + esc(t.tieuDe) + '" loading="lazy" />' : '<i class="fas fa-lemon"></i>') + '</div>' +
      '<div class="fb-news-body"><div class="fb-news-meta"><span><i class="far fa-calendar-alt"></i> ' + FB.ngay(t.ngayDang) + '</span>' +
      '<span><i class="far fa-user"></i> ' + esc(t.nguoiDang) + '</span></div>' +
      '<h3>' + esc(t.tieuDe) + '</h3><p>' + esc(t.tomTat) + '</p><span class="fb-more">Đọc tiếp <i class="fas fa-arrow-right"></i></span></div></a>';
  }

  function nhanTrangThai(tt) {
    var lop = "cho", icon = "fa-clock";
    if (tt === FB.TRANG_THAI.GIAO) { lop = "giao"; icon = "fa-truck"; }
    else if (tt === FB.TRANG_THAI.XONG) { lop = "xong"; icon = "fa-check-circle"; }
    else if (tt === FB.TRANG_THAI.HUY) { lop = "huy"; icon = "fa-times-circle"; }
    return '<span class="fb-status ' + lop + '"><i class="fas ' + icon + '"></i> ' + esc(tt || FB.TRANG_THAI.CHO) + '</span>';
  }

  function theRong(icon, tieuDe, moTa, nut) {
    return '<div class="fb-card fb-empty"><i class="fas ' + icon + '"></i><h3>' + esc(tieuDe) + '</h3><p>' + esc(moTa) + '</p>' + (nut || "") + '</div>';
  }

  // ===================== KIỂM TRA FORM =====================
  // Dùng thuộc tính trên ô nhập:
  //   data-bat-buoc="Lời nhắc"   data-email="Lời nhắc"   data-mau="^0\d{9}$" data-mau-loi="Lời nhắc"
  //   data-it-nhat="6" data-it-nhat-loi="..."   data-nhieu-nhat="100"   data-khop="idOKhac" data-khop-loi="..."
  //   data-so-tu="1" (giá trị số nhỏ nhất)   data-so-loi="..."
  // Lỗi hiện trong <span class="fb-error" data-loi-cho="name"></span>
  function datLoi(form, input, loi) {
    var o = form.querySelector('[data-loi-cho="' + input.name + '"]');
    input.classList.toggle("input-validation-error", !!loi);
    if (o) o.textContent = loi || "";
  }
  function kiemTraO(form, input) {
    var v = (input.type === "checkbox" || input.type === "radio") ? (form.querySelector('[name="' + input.name + '"]:checked') ? "x" : "") : (input.value || "").trim();
    var loi = "";
    if (input.hasAttribute("data-bat-buoc") && !v) loi = input.getAttribute("data-bat-buoc") || "Vui lòng nhập thông tin này.";
    else if (v && input.hasAttribute("data-email") && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) loi = input.getAttribute("data-email") || "Email không đúng định dạng.";
    else if (v && input.hasAttribute("data-mau") && !new RegExp(input.getAttribute("data-mau")).test(v)) loi = input.getAttribute("data-mau-loi") || "Giá trị không hợp lệ.";
    else if (v && input.hasAttribute("data-it-nhat") && v.length < +input.getAttribute("data-it-nhat")) loi = input.getAttribute("data-it-nhat-loi") || "Quá ngắn.";
    else if (v && input.hasAttribute("data-nhieu-nhat") && v.length > +input.getAttribute("data-nhieu-nhat")) loi = "Tối đa " + input.getAttribute("data-nhieu-nhat") + " ký tự.";
    else if (input.hasAttribute("data-khop") && v !== (document.getElementById(input.getAttribute("data-khop")).value || "").trim()) loi = input.getAttribute("data-khop-loi") || "Không khớp.";
    else if (v && input.hasAttribute("data-so-tu") && !(Number(v) >= Number(input.getAttribute("data-so-tu")))) loi = input.getAttribute("data-so-loi") || "Giá trị không hợp lệ.";
    datLoi(form, input, loi);
    return !loi;
  }
  function kiemTraForm(form) {
    var hopLe = true, dauTien = null;
    $all("input, select, textarea", form).forEach(function (i) {
      if (!i.name || i.disabled) return;
      if (!kiemTraO(form, i)) { hopLe = false; dauTien = dauTien || i; }
    });
    if (dauTien) dauTien.focus();
    return hopLe;
  }
  function ganKiemTraTrucTiep(form) {
    $all("input, select, textarea", form).forEach(function (i) {
      i.addEventListener("blur", function () { if (i.value) kiemTraO(form, i); });
      i.addEventListener("change", function () { if (i.classList.contains("input-validation-error")) kiemTraO(form, i); });
    });
  }

  // ===================== HEADER / FOOTER =====================
  function veHeader() {
    var tk = FB.TaiKhoan.hienTai(), soGio = FB.GioHang.tongSoLuong();
    var tuKhoa = thamSo("tuKhoa") || "";
    var menu = [["trang-chu", "index.html", "Trang chủ"], ["cua-hang", "cua-hang.html", "Cửa hàng"], ["tin-tuc", "tin-tuc.html", "Tin tức"],
                ["gioi-thieu", "gioi-thieu.html", "Giới thiệu"], ["lien-he", "lien-he.html", "Liên hệ"]];
    var trang = body.getAttribute("data-trang");
    var htmlMenu = menu.map(function (m) {
      return '<li class="nav-item' + (m[0] === trang ? " active" : "") + '"><a class="nav-link" href="' + GOC + m[1] + '">' + m[2] + '</a></li>';
    }).join("");
    var htmlTK = tk
      ? '<div class="dropdown"><button class="fb-btn fb-btn-grad fb-user-btn dropdown-toggle" type="button" id="menuTaiKhoan" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '<i class="fas fa-user-circle"></i> <span class="fb-user-name">Xin chào, ' + esc(tk.hoTen) + '</span></button>' +
        '<div class="dropdown-menu dropdown-menu-right" aria-labelledby="menuTaiKhoan">' +
        '<a class="dropdown-item" href="' + GOC + 'don-hang-cua-toi.html"><i class="fas fa-receipt"></i> Đơn hàng của tôi</a>' +
        '<a class="dropdown-item" href="' + GOC + 'gio-hang.html"><i class="fas fa-shopping-basket"></i> Giỏ hàng (<span data-so-gio>' + soGio + '</span> kg)</a>' +
        (tk.vaiTro === "Admin" ? '<a class="dropdown-item" href="' + GOC + 'admin/index.html"><i class="fas fa-shield-alt"></i> Trang quản trị</a>' : "") +
        '<div class="dropdown-divider"></div>' +
        '<a class="dropdown-item text-danger" href="#" data-toggle="modal" data-target="#modalDangXuat"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a></div></div>'
      : '<a class="fb-btn fb-btn-grad" href="' + link("dang-nhap.html", { quayVe: location.pathname.split("/").pop() + location.search }) + '"><i class="fas fa-user"></i> Đăng nhập</a>';

    var header =
      '<header class="fb-header"><nav class="navbar navbar-expand-lg container">' +
      '<a class="navbar-brand fb-logo" href="' + GOC + 'index.html" aria-label="FruitBen - Trang chủ"><img src="' + GOC + 'assets/img/logo-fruitben.svg" alt="FruitBen" /></a>' +
      '<div class="d-flex align-items-center d-lg-none" style="gap: 8px;">' +
      '<a class="fb-icon-btn" href="' + GOC + 'gio-hang.html" aria-label="Giỏ hàng"><i class="fas fa-shopping-basket"></i><span class="fb-badge-count" data-so-gio>' + soGio + '</span></a>' +
      '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#menuChinh" aria-controls="menuChinh" aria-expanded="false" aria-label="Mở menu"><i class="fas fa-bars"></i></button></div>' +
      '<div class="collapse navbar-collapse" id="menuChinh"><ul class="navbar-nav mx-auto">' + htmlMenu + '</ul>' +
      '<div class="d-flex align-items-center fb-header-actions" style="gap: 10px;">' +
      '<form class="fb-search" action="' + GOC + 'cua-hang.html" method="get" role="search">' +
      '<input type="search" name="tuKhoa" value="' + esc(tuKhoa) + '" placeholder="Tìm trái cây..." aria-label="Tìm trái cây" />' +
      '<button type="submit" aria-label="Tìm"><i class="fas fa-search"></i></button></form>' +
      '<a class="fb-icon-btn d-none d-lg-inline-flex" href="' + GOC + 'gio-hang.html" title="Giỏ hàng" aria-label="Giỏ hàng"><i class="fas fa-shopping-basket"></i><span class="fb-badge-count" data-so-gio>' + soGio + '</span></a>' +
      htmlTK + '</div></div></nav></header>';

    body.insertAdjacentHTML("afterbegin", header);

    // Banner đầu trang
    var banner = body.getAttribute("data-banner");
    if (banner) {
      var main = document.querySelector(".fb-main");
      main.insertAdjacentHTML("afterbegin", '<section class="fb-top-banner"><span class="fb-eyebrow">' + esc(banner) + '</span><h1>' +
        esc(body.getAttribute("data-banner-tieu-de") || document.title.split(" - ")[0]) + '</h1></section>');
    }

    if (tk) {
      body.insertAdjacentHTML("beforeend",
        '<div class="modal fade fb-modal" id="modalDangXuat" tabindex="-1" role="dialog" aria-labelledby="tieuDeDangXuat" aria-hidden="true">' +
        '<div class="modal-dialog modal-dialog-centered modal-sm" role="document"><div class="modal-content">' +
        '<div class="fb-modal-icon"><i class="fas fa-sign-out-alt"></i></div><h3 id="tieuDeDangXuat">Đăng xuất?</h3>' +
        '<p>Bạn có chắc muốn đăng xuất khỏi FruitBen không? Giỏ hàng hiện tại sẽ được xoá.</p>' +
        '<div class="fb-modal-actions"><button type="button" class="fb-btn fb-btn-outline" data-dismiss="modal">Ở lại</button>' +
        '<button type="button" class="fb-btn fb-btn-danger" id="btnDangXuat">Đăng xuất</button></div></div></div></div>');
      document.getElementById("btnDangXuat").addEventListener("click", function () {
        FB.TaiKhoan.dangXuat();
        nhan("Bạn đã đăng xuất.");
        location.href = GOC + "index.html";
      });
    }
  }

  function veFooter() {
    var logos = "";
    for (var i = 1; i <= 5; i++) logos += '<img src="' + GOC + 'assets/img/company-logos/' + i + '.png" alt="Đối tác ' + i + '" />';
    var nam = new Date().getFullYear();
    var footer =
      '<section class="fb-logos" aria-label="Đối tác"><div class="container">' + logos + '</div></section>' +
      '<footer class="fb-footer"><div class="container"><div class="row">' +
      '<div class="col-lg-4 col-md-6 mb-4"><img class="fb-footer-logo" src="' + GOC + 'assets/img/logo-fruitben.svg" alt="FruitBen" />' +
      '<p style="max-width: 34ch;">Trái cây tươi mỗi ngày, tuyển chọn từ nhà vườn VietGAP và nhà nhập khẩu uy tín, giao nhanh tận nhà.</p></div>' +
      '<div class="col-lg-2 col-md-6 col-6 mb-4"><h4>Mua sắm</h4><ul>' +
      '<li><a href="' + link("cua-hang.html", { loai: "Trái cây nội địa" }) + '">Trái cây nội địa</a></li>' +
      '<li><a href="' + link("cua-hang.html", { loai: "Trái cây nhập khẩu" }) + '">Trái cây nhập khẩu</a></li>' +
      '<li><a href="' + link("cua-hang.html", { giamGia: "true" }) + '">Đang giảm giá</a></li>' +
      '<li><a href="' + link("cua-hang.html", { sapXep: "moinhat" }) + '">Hàng mới về</a></li></ul></div>' +
      '<div class="col-lg-2 col-md-6 col-6 mb-4"><h4>Hỗ trợ</h4><ul>' +
      '<li><a href="' + GOC + 'lien-he.html">Liên hệ</a></li><li><a href="' + GOC + 'huong-dan-thanh-toan.html">Thanh toán</a></li>' +
      '<li><a href="' + GOC + 'chinh-sach-van-chuyen.html">Vận chuyển</a></li><li><a href="' + GOC + 'chinh-sach-doi-tra.html">Đổi trả</a></li></ul></div>' +
      '<div class="col-lg-4 col-md-6 mb-4"><h4>Liên hệ</h4><ul class="fb-contact">' +
      '<li><i class="fas fa-map-marker-alt"></i> 140 Lê Trọng Tấn, Phường Tây Thạnh, TP. Hồ Chí Minh</li>' +
      '<li><i class="fas fa-phone"></i> 1900 1234 (8:00 – 21:00)</li><li><i class="fas fa-envelope"></i> fruitben@gmail.com</li></ul></div>' +
      '</div></div><div class="fb-footer-bottom"><div class="container">Bản quyền &copy; ' + nam + ' FruitBen · Thiết kế &amp; phát triển: <strong>' + esc(FB.CAU_HINH.TAC_GIA) + '</strong> · ' +
      '<a href="' + GOC + 'chinh-sach-doi-tra.html">Chính sách đổi trả</a> · <a href="' + GOC + 'chinh-sach-van-chuyen.html">Vận chuyển</a></div></div></footer>';
    body.insertAdjacentHTML("beforeend", footer);
  }

  function capNhatSoGio() {
    var so = FB.GioHang.tongSoLuong();
    $all("[data-so-gio]").forEach(function (el) { el.textContent = so; });
  }

  // Nút "Thêm vào giỏ" trên mọi thẻ sản phẩm (ở lại trang, hiện thông báo kèm nút Xem giỏ hàng)
  function ganNutThemGio() {
    document.addEventListener("click", function (e) {
      var nut = e.target.closest("[data-them-gio]");
      if (!nut) return;
      var kq = FB.GioHang.them(+nut.getAttribute("data-them-gio"), 1);
      toast(kq.thongBao, kq.ok ? "ok" : "loi", kq.ok);
      capNhatSoGio();
    });
  }

  // ===================== HIỆU ỨNG =====================
  function initReveal() {
    var items = $all(".reveal:not(.show)");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) { items.forEach(function (el) { el.classList.add("show"); }); return; }
    body.classList.add("reveal-ready");
    var ob = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("show"); ob.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { ob.observe(el); });
  }

  function initSlider(root) {
    var slides = $all(".fb-slide", root);
    if (slides.length < 2) return;
    var dots = root.querySelector(".fb-dots"), i = 0, timer = null;
    slides.forEach(function (_, idx) {
      var b = document.createElement("button");
      b.type = "button"; b.setAttribute("aria-label", "Ảnh " + (idx + 1));
      b.addEventListener("click", function () { show(idx); restart(); });
      if (dots) dots.appendChild(b);
    });
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("active", k === i); });
      if (dots) $all("button", dots).forEach(function (d, k) { d.classList.toggle("active", k === i); });
    }
    function restart() {
      clearInterval(timer);
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      timer = setInterval(function () { show(i + 1); }, 4500);
    }
    var prev = root.querySelector(".fb-slider-nav.prev"), next = root.querySelector(".fb-slider-nav.next");
    if (prev) prev.addEventListener("click", function () { show(i - 1); restart(); });
    if (next) next.addEventListener("click", function () { show(i + 1); restart(); });
    show(0); restart();
  }

  function initStrips() {
    $all("[data-strip-target]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var strip = document.getElementById(btn.getAttribute("data-strip-target"));
        if (!strip) return;
        var step = (strip.firstElementChild ? strip.firstElementChild.getBoundingClientRect().width : 240) + 24;
        strip.scrollBy({ left: step * parseInt(btn.getAttribute("data-dir"), 10), behavior: "smooth" });
      });
    });
  }

  // Ô số lượng có nút -/+ ; onChange(giaTri) gọi khi đổi (dùng ở giỏ hàng)
  function initQty(root, onChange) {
    $all("[data-qty]", root).forEach(function (box) {
      if (box._da) return; box._da = true;
      var input = box.querySelector("input");
      var min = parseInt(input.getAttribute("min") || "1", 10), max = parseInt(input.getAttribute("max") || "999", 10);
      $all("button[data-step]", box).forEach(function (b) {
        b.addEventListener("click", function () {
          var v = parseInt(input.value || "0", 10) + parseInt(b.getAttribute("data-step"), 10);
          if (isNaN(v)) v = min;
          input.value = Math.max(min, Math.min(max, v));
          if (onChange) onChange(box, +input.value);
        });
      });
      if (onChange) input.addEventListener("change", function () { onChange(box, parseInt(input.value, 10) || 0); });
    });
  }

  function initCopy(root) {
    $all("[data-copy]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        var text = b.getAttribute("data-copy");
        var xong = function () { var cu = b.textContent; b.textContent = "Đã chép"; setTimeout(function () { b.textContent = cu; }, 1500); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(xong, function () { window.prompt("Sao chép nội dung:", text); });
        else window.prompt("Sao chép nội dung:", text);
      });
    });
  }

  function initPassword(root) {
    $all("[data-toggle-pass]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        var input = document.getElementById(b.getAttribute("data-toggle-pass")), hien = input.type === "password";
        input.type = hien ? "text" : "password";
        b.innerHTML = hien ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>';
        b.setAttribute("aria-label", hien ? "Ẩn mật khẩu" : "Hiện mật khẩu");
      });
    });
    $all("[data-strength]", root).forEach(function (input) {
      var bar = document.getElementById(input.getAttribute("data-strength"));
      var text = document.getElementById(input.getAttribute("data-strength") + "Text");
      var nhanDo = ["", "Yếu", "Trung bình", "Khá", "Mạnh"];
      input.addEventListener("input", function () {
        var v = input.value, d = 0;
        if (v.length >= 6) d++;
        if (/[A-Z]/.test(v) && /[a-z]/.test(v)) d++;
        if (/\d/.test(v)) d++;
        if (/[^A-Za-z0-9]/.test(v) || v.length >= 10) d++;
        if (!v) d = 0;
        bar.className = "fb-strength" + (d ? " m" + d : "");
        if (text) text.textContent = d ? "Độ mạnh: " + nhanDo[d] : "Nên dùng ít nhất 6 ký tự, có chữ hoa, chữ thường và số.";
      });
    });
  }

  // Đếm ngược thời gian giữ đơn chờ chuyển khoản QR
  function demNguoc(el) {
    if (!el) return;
    var giay = parseInt(el.getAttribute("data-con-giay"), 10), span = el.querySelector("span");
    (function ve() {
      if (giay <= 0) { span.textContent = "Đã quá thời gian giữ đơn"; return; }
      span.textContent = String(Math.floor(giay / 60)).padStart(2, "0") + ":" + String(giay % 60).padStart(2, "0");
      giay--; setTimeout(ve, 1000);
    })();
  }

  // Khối tóm tắt đơn (trang Thành công, Chi tiết đơn)
  function tomTatDon(d) {
    var dong = d.chiTiet.map(function (c) {
      return '<div class="fb-order-line"><img src="' + anhSP(c.anh) + '" alt="" /><div><b>' + esc(c.ten) + '</b><small>' + c.soLuong + ' kg × ' + FB.tien(c.donGia) + '</small></div>' +
        '<span class="font-weight-bold fb-num">' + FB.tien(c.donGia * c.soLuong) + '</span></div>';
    }).join("");
    var tt = d.daThanhToan ? '<span class="fb-pill ok ml-1">Đã thanh toán</span>' : (d.trangThai !== FB.TRANG_THAI.HUY ? '<span class="fb-pill warn ml-1">Chưa thanh toán</span>' : "");
    return '<div class="fb-box-head"><h3>Đơn ' + FB.maDon(d.id) + '</h3>' + nhanTrangThai(d.trangThai) + '</div>' + dong +
      '<div class="mt-3"><div class="fb-sum-row"><span>Tạm tính</span><span>' + FB.tien(d.tamTinh) + '</span></div>' +
      '<div class="fb-sum-row"><span>Phí vận chuyển</span><span>' + (d.phiVanChuyen === 0 ? "Miễn phí" : FB.tien(d.phiVanChuyen)) + '</span></div>' +
      (d.giamGia > 0 ? '<div class="fb-sum-row giam"><span>Giảm giá' + (d.maGiamGiaApDung ? " (" + esc(d.maGiamGiaApDung) + ")" : "") + '</span><span>-' + FB.tien(d.giamGia) + '</span></div>' : "") +
      '<div class="fb-sum-total"><span class="font-weight-bold">Tổng thanh toán</span><strong>' + FB.tien(d.tongTien) + '</strong></div></div>' +
      '<div class="fb-note-box mt-3"><div class="mb-1"><b><i class="fas fa-map-marker-alt"></i> Giao đến</b></div>' +
      esc(d.hoTenNguoiNhan) + ' · ' + esc(d.soDienThoai) + '<br />' + esc(FB.DonHang.diaChiDayDu(d)) +
      (d.ghiChu ? '<div class="mt-1"><i>Ghi chú: ' + esc(d.ghiChu) + '</i></div>' : "") +
      '<div class="mt-2"><b><i class="fas fa-wallet"></i> Thanh toán:</b> ' + FB.DonHang.tenPhuongThuc(d) + ' ' + tt + '</div></div>';
  }

  // Khối chuyển khoản QR
  function khoiQR(d) {
    var C = FB.CAU_HINH;
    var conGiay = Math.max(0, Math.round((new Date(d.ngayDat).getTime() + C.QR_SO_PHUT * 60000 - Date.now()) / 1000));
    var nd = FB.DonHang.noiDungChuyenKhoan(d);
    return '<section class="fb-card fb-card-pad mt-4" id="khoiQR"><div class="fb-box-head">' +
      '<h3><i class="fas fa-qrcode" style="color: var(--fb-orange);"></i> Quét mã để chuyển khoản</h3>' +
      '<span class="fb-timer" data-con-giay="' + conGiay + '"><i class="far fa-clock"></i> <span>--:--</span></span></div>' +
      '<div class="fb-qr"><img src="' + FB.DonHang.linkQR(d) + '" alt="Mã QR chuyển khoản ' + FB.tien(d.tongTien) + '" /><div><dl>' +
      '<dt>Ngân hàng</dt><dd>' + C.QR_TEN_NGAN_HANG + '</dd>' +
      '<dt>Số tài khoản</dt><dd>' + C.QR_SO_TAI_KHOAN + ' <button type="button" class="fb-copy" data-copy="' + C.QR_SO_TAI_KHOAN + '">Chép</button></dd>' +
      '<dt>Chủ tài khoản</dt><dd>' + C.QR_TEN_TAI_KHOAN + '</dd>' +
      '<dt>Số tiền</dt><dd class="fb-price">' + FB.tien(d.tongTien) + '</dd>' +
      '<dt>Nội dung</dt><dd>' + nd + ' <button type="button" class="fb-copy" data-copy="' + nd + '">Chép</button></dd></dl>' +
      '<p class="text-muted mt-3 mb-0" style="font-size: .82rem;">Ghi đúng nội dung để FruitBen tự đối soát. Sau khi nhận được tiền, cửa hàng xác nhận và chuyển đơn sang “Đang giao”. ' +
      'Quá ' + C.QR_SO_PHUT + ' phút chưa chuyển khoản, bạn vẫn có thể chuyển hoặc gọi 1900 1234 để đổi sang COD.</p></div></div></section>';
  }

  function sauKhiVe(root) {
    initReveal();
    initCopy(root);
    demNguoc((root || document).querySelector("#khoiQR .fb-timer"));
  }

  // ===================== KHỞI ĐỘNG =====================
  window.GD = {
    GOC: GOC, esc: esc, $all: $all, thamSo: thamSo, anhSP: anhSP, anhTin: anhTin, link: link,
    toast: toast, nhan: nhan, theSanPham: theSanPham, theTinTuc: theTinTuc, nhanTrangThai: nhanTrangThai, theRong: theRong,
    kiemTraForm: kiemTraForm, ganKiemTraTrucTiep: ganKiemTraTrucTiep, datLoi: datLoi,
    capNhatSoGio: capNhatSoGio, initQty: initQty, initSlider: initSlider, initStrips: initStrips, initPassword: initPassword,
    tomTatDon: tomTatDon, khoiQR: khoiQR, sauKhiVe: sauKhiVe
  };

  if (!body.classList.contains("ad-body")) {
    veHeader();
    veFooter();
    ganNutThemGio();
  }
  document.addEventListener("DOMContentLoaded", function () {
    hienNhan();
    initReveal();
    $all(".fb-slider").forEach(initSlider);
    initStrips();
    initPassword();
    initCopy();
  });
})();
