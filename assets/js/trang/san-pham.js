/* Chi tiết sản phẩm: ảnh + thư viện ảnh phụ, tình trạng kho, chọn số kg, Thêm vào giỏ / Mua ngay, tab thông tin, sản phẩm cùng loại */
(function () {
  "use strict";
  var sp = KHO.tim("sanPham", GD.thamSo("id"));
  if (!sp) { location.replace("404.html"); return; }

  document.title = sp.ten + " - FruitBen";
  var daBan = FB.SanPham.daBan()[sp.id] || 0;
  var conHang = sp.conHang && sp.ton > 0;
  var toiDa = Math.min(sp.ton, FB.CAU_HINH.TOI_DA_MOI_LAN);
  var dsAnh = [sp.anh].concat(sp.anhPhu || []).filter(Boolean);
  var giam = FB.SanPham.dangGiam(sp);
  var esc = GD.esc;

  document.getElementById("duongDan").innerHTML =
    '<a href="index.html">Trang chủ</a> <i class="fas fa-chevron-right"></i> <a href="cua-hang.html">Cửa hàng</a> <i class="fas fa-chevron-right"></i> ' +
    '<a href="' + GD.link("cua-hang.html", { loai: sp.loai }) + '">' + esc(sp.loai) + '</a> <i class="fas fa-chevron-right"></i> <span class="hien-tai">' + esc(sp.ten) + "</span>";

  // ---------- Ảnh ----------
  document.getElementById("anhChinh").src = GD.anhSP(dsAnh[0]);
  document.getElementById("anhChinh").alt = sp.ten;
  document.getElementById("nhanAnh").outerHTML = giam ? '<span class="fb-tag sale">Sale</span>' : (FB.SanPham.laHangMoi(sp) ? '<span class="fb-tag">Mới</span>' : "");
  var thumbs = document.getElementById("thuVienAnh");
  if (dsAnh.length > 1) {
    thumbs.innerHTML = dsAnh.map(function (a, i) {
      return '<button type="button" class="' + (i === 0 ? "active" : "") + '" data-src="' + GD.anhSP(a) + '" aria-label="Xem ảnh ' + (i + 1) + '"><img src="' + GD.anhSP(a) + '" alt="" loading="lazy" /></button>';
    }).join("");
    GD.$all("button", thumbs).forEach(function (b) {
      b.addEventListener("click", function () {
        document.getElementById("anhChinh").src = b.getAttribute("data-src");
        GD.$all("button", thumbs).forEach(function (x) { x.classList.toggle("active", x === b); });
      });
    });
  } else thumbs.remove();

  // ---------- Thông tin ----------
  var tinhTrang = !sp.conHang ? '<span class="fb-pill bad"><i class="fas fa-ban"></i> Ngừng kinh doanh</span>'
    : sp.ton <= 0 ? '<span class="fb-pill bad"><i class="fas fa-times-circle"></i> Hết hàng</span>'
    : sp.ton <= FB.CAU_HINH.NGUONG_SAP_HET ? '<span class="fb-pill warn"><i class="fas fa-exclamation-circle"></i> Chỉ còn ' + sp.ton + ' kg</span>'
    : '<span class="fb-pill ok"><i class="fas fa-check-circle"></i> Còn hàng</span>';
  document.getElementById("dauThongTin").innerHTML = '<span class="fb-pill">' + esc(sp.loai) + "</span>" + tinhTrang;
  document.getElementById("tenSP").textContent = sp.ten;
  document.getElementById("daBan").innerHTML = '<i class="fas fa-shopping-bag"></i> Đã bán ' + daBan + " kg · Kho còn " + sp.ton + " kg";
  document.getElementById("giaSP").innerHTML = '<span class="fb-price">' + FB.tien(sp.gia) + '</span><span class="fb-unit">/ kg</span>' +
    (giam ? '<span class="fb-old-price" style="font-size: 1.05rem;">' + FB.tien(sp.giaCu) + '</span><span class="fb-sale-pill">-' + FB.SanPham.phanTramGiam(sp) + "%</span>" : "");
  var moTa = document.getElementById("moTaNgan");
  if (sp.moTa) moTa.textContent = sp.moTa; else moTa.remove();

  // ---------- Mua ----------
  var o = document.getElementById("soLuong");
  o.max = conHang ? toiDa : 1;
  o.disabled = !conHang;
  document.getElementById("ghiChuSoLuong").textContent = conHang ? "Tối đa " + toiDa + " kg mỗi lần đặt" : "Tạm thời chưa thể đặt";
  GD.$all("#formMua button[type=submit]").forEach(function (b) { b.disabled = !conHang; });
  GD.initQty(document.getElementById("formMua"));

  var nutVuaBam = null;
  GD.$all("#formMua button[type=submit]").forEach(function (b) { b.addEventListener("click", function () { nutVuaBam = b; }); });
  document.getElementById("formMua").addEventListener("submit", function (e) {
    e.preventDefault();
    var nut = e.submitter || nutVuaBam;
    var muaNgay = !!nut && nut.name === "muaNgay";
    var kq = FB.GioHang.them(sp.id, o.value);
    if (!kq.ok) { GD.toast(kq.thongBao, "loi"); return; }
    if (muaNgay) { location.href = "thanh-toan.html"; return; }
    GD.toast(kq.thongBao, "ok", true);
    GD.capNhatSoGio();
  });

  // ---------- Tab ----------
  document.getElementById("tabMoTaNoiDung").textContent = sp.moTa || "Sản phẩm đang được cập nhật mô tả.";
  document.getElementById("bangThongTin").innerHTML =
    "<tr><th>Loại</th><td>" + esc(sp.loai) + "</td></tr><tr><th>Giá bán</th><td>" + FB.tien(sp.gia) + " / kg</td></tr>" +
    "<tr><th>Tồn kho</th><td>" + sp.ton + " kg</td></tr><tr><th>Đã bán</th><td>" + daBan + " kg</td></tr>" +
    "<tr><th>Ngày lên kệ</th><td>" + FB.ngay(sp.ngayTao) + "</td></tr><tr><th>Mã sản phẩm</th><td>" + FB.maSanPham(sp.id) + "</td></tr>";

  // ---------- Cùng loại: ưu tiên hàng đang giảm, còn lại ngẫu nhiên ----------
  var lienQuan = FB.SanPham.dangBan().filter(function (x) { return x.loai === sp.loai && x.id !== sp.id; })
    .map(function (x) { return { x: x, k: (FB.SanPham.dangGiam(x) ? 0 : 1) + Math.random() }; })
    .sort(function (a, b) { return a.k - b.k; }).slice(0, 4).map(function (y) { return y.x; });
  if (lienQuan.length) {
    document.getElementById("tieuDeLienQuan").textContent = "Cùng loại " + sp.loai.toLowerCase();
    document.getElementById("xemCungLoai").href = GD.link("cua-hang.html", { loai: sp.loai });
    document.getElementById("dsLienQuan").innerHTML = lienQuan.map(GD.theSanPham).join("");
  } else document.getElementById("khuLienQuan").remove();
})();
