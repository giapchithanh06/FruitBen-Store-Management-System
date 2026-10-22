/* Cửa hàng: bộ lọc danh mục, giá tối đa, sắp xếp, chỉ hàng giảm giá, tìm kiếm, phân trang (9 sản phẩm/trang) */
(function () {
  "use strict";
  var MOI_TRANG = 9;
  var CACH_SAP_XEP = { macdinh: "Mặc định", moinhat: "Mới nhất", banchay: "Bán chạy", giatang: "Giá thấp đến cao", giagiam: "Giá cao đến thấp", giamnhieu: "Giảm giá nhiều" };

  var q = new URLSearchParams(location.search);
  var loc = {
    loai: q.get("loai") || "",
    tuKhoa: (q.get("tuKhoa") || "").trim(),
    giaToiDa: q.get("giaToiDa") ? Number(q.get("giaToiDa")) : null,
    sapXep: q.get("sapXep") || "macdinh",
    giamGia: q.get("giamGia") === "true",
    trang: Math.max(1, parseInt(q.get("trang"), 10) || 1)
  };

  var dangBan = FB.SanPham.dangBan();
  var daBan = FB.SanPham.daBan();
  var giaCaoNhat = dangBan.reduce(function (m, s) { return Math.max(m, s.gia); }, 0);
  var giaMax = Math.ceil(giaCaoNhat / 10000) * 10000 || 500000;
  if (loc.giaToiDa != null && !(loc.giaToiDa < giaCaoNhat)) loc.giaToiDa = null; // kéo tối đa = không lọc giá
  var dangLoc = !!(loc.loai || loc.tuKhoa || loc.giaToiDa != null || loc.giamGia || loc.sapXep !== "macdinh");

  function url(thayDoi) {
    var x = { tuKhoa: loc.tuKhoa, loai: loc.loai, giaToiDa: loc.giaToiDa, sapXep: loc.sapXep === "macdinh" ? "" : loc.sapXep, giamGia: loc.giamGia ? "true" : "", trang: "" };
    Object.keys(thayDoi || {}).forEach(function (k) { x[k] = thayDoi[k]; });
    return GD.link("cua-hang.html", x) + "#danhSach";
  }

  // ---------- Lọc ----------
  var ds = dangBan;
  if (loc.loai) ds = ds.filter(function (s) { return s.loai.trim().toLowerCase() === loc.loai.trim().toLowerCase(); });
  if (loc.tuKhoa) ds = FB.SanPham.timKiem(ds, loc.tuKhoa);
  if (loc.giaToiDa != null) ds = ds.filter(function (s) { return s.gia <= loc.giaToiDa; });
  if (loc.giamGia) ds = ds.filter(FB.SanPham.dangGiam);

  var sx = {
    moinhat: function (a, b) { return new Date(b.ngayTao) - new Date(a.ngayTao) || b.id - a.id; },
    giatang: function (a, b) { return a.gia - b.gia; },
    giagiam: function (a, b) { return b.gia - a.gia; },
    giamnhieu: function (a, b) { return FB.SanPham.phanTramGiam(b) - FB.SanPham.phanTramGiam(a); },
    banchay: function (a, b) { return (daBan[b.id] || 0) - (daBan[a.id] || 0) || a.id - b.id; }
  }[loc.sapXep];
  ds = ds.slice().sort(sx || function (a, b) { return a.id - b.id; });

  var tongSo = ds.length, tongTrang = Math.ceil(tongSo / MOI_TRANG);
  if (tongTrang > 0 && loc.trang > tongTrang) loc.trang = tongTrang;
  var trangNay = ds.slice((loc.trang - 1) * MOI_TRANG, loc.trang * MOI_TRANG);

  document.title = (loc.tuKhoa ? "Tìm kiếm: " + loc.tuKhoa : (loc.loai || "Cửa hàng")) + " - FruitBen";

  // ---------- Vừa cập kho + Đang giảm giá (chỉ khi chưa lọc, trang 1) ----------
  if (!dangLoc && loc.trang === 1) {
    var moi = dangBan.slice().sort(function (a, b) { return new Date(b.ngayTao) - new Date(a.ngayTao) || b.id - a.id; }).slice(0, 10);
    document.getElementById("dsHangMoi").innerHTML = moi.map(GD.theSanPham).join("");
    var giam = dangBan.filter(FB.SanPham.dangGiam).sort(function (a, b) { return FB.SanPham.phanTramGiam(b) - FB.SanPham.phanTramGiam(a); }).slice(0, 3);
    if (giam.length) document.getElementById("dsSaleBox").innerHTML = giam.map(GD.theSanPham).join("");
    else document.getElementById("hopSale").remove();
  } else {
    document.getElementById("khuHangMoi").remove();
    document.getElementById("hopSale").remove();
  }

  // ---------- Bộ lọc ----------
  var form = document.getElementById("formLoc");
  form.tuKhoa.value = loc.tuKhoa;
  if (dangLoc) document.getElementById("xoaLoc").hidden = false;
  var chip = '<label class="fb-chip' + (!loc.loai ? " active" : "") + '"><input type="radio" name="loai" value="" class="d-none" data-tu-ap-dung' + (!loc.loai ? " checked" : "") + ' /> Tất cả</label>';
  FB.SanPham.danhSachLoai().forEach(function (l) {
    var chon = l.toLowerCase() === loc.loai.toLowerCase();
    chip += '<label class="fb-chip' + (chon ? " active" : "") + '"><input type="radio" name="loai" value="' + GD.esc(l) + '" class="d-none" data-tu-ap-dung' + (chon ? " checked" : "") + ' /> ' + GD.esc(l) + '</label>';
  });
  document.getElementById("chipLoai").innerHTML = chip;

  var range = form.giaToiDa;
  range.max = giaMax;
  range.value = loc.giaToiDa != null ? loc.giaToiDa : giaMax;
  document.getElementById("giaMaxNhan").textContent = FB.tien(giaMax);
  function nhanGia() { document.getElementById("nhanGia").textContent = FB.tien(range.value); }
  range.addEventListener("input", nhanGia); nhanGia();

  form.sapXep.innerHTML = Object.keys(CACH_SAP_XEP).map(function (k) { return '<option value="' + k + '"' + (k === loc.sapXep ? " selected" : "") + '>' + CACH_SAP_XEP[k] + '</option>'; }).join("");
  form.giamGia.checked = loc.giamGia;

  function apDung() {
    var loaiChon = form.querySelector('input[name="loai"]:checked');
    var gia = Number(range.value);
    location.href = GD.link("cua-hang.html", {
      tuKhoa: form.tuKhoa.value, loai: loaiChon ? loaiChon.value : "",
      giaToiDa: gia < giaMax ? gia : "", sapXep: form.sapXep.value === "macdinh" ? "" : form.sapXep.value,
      giamGia: form.giamGia.checked ? "true" : ""
    }) + "#danhSach";
  }
  form.addEventListener("submit", function (e) { e.preventDefault(); apDung(); });
  GD.$all("[data-tu-ap-dung]", form).forEach(function (el) { el.addEventListener("change", apDung); });

  // ---------- Tiêu đề + bộ lọc đang dùng ----------
  document.getElementById("nhanDanhSach").textContent = loc.tuKhoa ? "Tìm kiếm" : "Danh sách sản phẩm";
  document.getElementById("tieuDeDanhSach").textContent = loc.tuKhoa ? "Kết quả cho “" + loc.tuKhoa + "”" : (loc.loai || (loc.giamGia ? "Đang giảm giá" : "Tất cả trái cây"));
  document.getElementById("tongSo").textContent = tongSo;

  var dangDung = "";
  if (loc.tuKhoa) dangDung += '<a href="' + url({ tuKhoa: "" }) + '">Từ khoá: ' + GD.esc(loc.tuKhoa) + ' <i class="fas fa-times"></i></a>';
  if (loc.loai) dangDung += '<a href="' + url({ loai: "" }) + '">' + GD.esc(loc.loai) + ' <i class="fas fa-times"></i></a>';
  if (loc.giaToiDa != null) dangDung += '<a href="' + url({ giaToiDa: "" }) + '">Đến ' + FB.tien(loc.giaToiDa) + ' <i class="fas fa-times"></i></a>';
  if (loc.giamGia) dangDung += '<a href="' + url({ giamGia: "" }) + '">Đang giảm giá <i class="fas fa-times"></i></a>';
  if (loc.sapXep !== "macdinh") dangDung += '<a href="' + url({ sapXep: "" }) + '">' + CACH_SAP_XEP[loc.sapXep] + ' <i class="fas fa-times"></i></a>';
  var khuLoc = document.getElementById("locDangDung");
  if (dangDung) khuLoc.innerHTML = dangDung; else khuLoc.remove();

  // ---------- Danh sách + phân trang ----------
  document.getElementById("dsSanPham").outerHTML = trangNay.length
    ? '<div class="fb-products cot-3">' + trangNay.map(GD.theSanPham).join("") + "</div>"
    : GD.theRong("fa-search", "Không tìm thấy trái cây phù hợp", "Thử bỏ bớt bộ lọc hoặc tìm bằng từ khoá khác, ví dụ “táo”, “nho”, “nhập khẩu”.",
        '<a class="fb-btn fb-btn-grad mt-2" href="cua-hang.html">Xem tất cả sản phẩm</a>');

  if (tongTrang > 1) {
    var pt = '<li class="' + (loc.trang <= 1 ? "disabled" : "") + '">' + (loc.trang > 1 ? '<a href="' + url({ trang: loc.trang - 1 }) + '" aria-label="Trang trước"><i class="fas fa-chevron-left"></i></a>' : '<span><i class="fas fa-chevron-left"></i></span>') + "</li>";
    for (var i = 1; i <= tongTrang; i++) {
      pt += '<li class="' + (i === loc.trang ? "active" : "") + '">' + (i === loc.trang ? '<span aria-current="page">' + i + "</span>" : '<a href="' + url({ trang: i }) + '">' + i + "</a>") + "</li>";
    }
    pt += '<li class="' + (loc.trang >= tongTrang ? "disabled" : "") + '">' + (loc.trang < tongTrang ? '<a href="' + url({ trang: loc.trang + 1 }) + '" aria-label="Trang sau"><i class="fas fa-chevron-right"></i></a>' : '<span><i class="fas fa-chevron-right"></i></span>') + "</li>";
    document.getElementById("phanTrang").innerHTML = pt;
  } else {
    document.getElementById("phanTrang").remove();
  }
})();
