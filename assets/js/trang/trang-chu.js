/* Trang chủ: sản phẩm nổi bật, đang giảm giá, mã khuyến mãi, số liệu, tin mới */
(function () {
  "use strict";
  var dangBan = FB.SanPham.dangBan();
  var daBan = FB.SanPham.daBan();

  // Số lượng theo danh mục
  document.getElementById("soNoiDia").textContent = dangBan.filter(function (s) { return s.loai === "Trái cây nội địa"; }).length + " sản phẩm";
  document.getElementById("soNhapKhau").textContent = dangBan.filter(function (s) { return s.loai === "Trái cây nhập khẩu"; }).length + " sản phẩm";
  document.getElementById("soDangGiam").textContent = dangBan.filter(FB.SanPham.dangGiam).length + " sản phẩm";
  document.getElementById("slideSoSP").textContent = "Hơn " + dangBan.length + " loại trái cây";

  // Đang được yêu thích: bán chạy nhất (không tính đơn huỷ), chưa có đơn thì theo thứ tự sản phẩm
  var noiBat = dangBan.slice().sort(function (a, b) { return (daBan[b.id] || 0) - (daBan[a.id] || 0) || a.id - b.id; }).slice(0, 8);
  document.getElementById("dsNoiBat").innerHTML = noiBat.length
    ? noiBat.map(GD.theSanPham).join("")
    : GD.theRong("fa-apple-alt", "Chưa có sản phẩm", "Cửa hàng đang cập nhật hàng mới.");

  // Giảm sâu tuần này
  var giam = dangBan.filter(FB.SanPham.dangGiam).sort(function (a, b) { return FB.SanPham.phanTramGiam(b) - FB.SanPham.phanTramGiam(a); }).slice(0, 4);
  if (giam.length) {
    document.getElementById("dsDangGiam").innerHTML = giam.map(GD.theSanPham).join("");
  } else {
    document.getElementById("khuDangGiam").remove();
  }

  // Băng khuyến mãi lấy từ mã giảm giá đang dùng được (đơn tối thiểu thấp nhất)
  var ma = FB.MaGiamGia.goiY()[0];
  var khuMa = document.getElementById("khuKhuyenMai");
  if (ma) {
    khuMa.querySelector("h2").textContent = FB.MaGiamGia.moTaGiaTri(ma) + (ma.donToiThieu > 0 ? " cho đơn từ " + FB.tien(ma.donToiThieu) : "");
    khuMa.querySelector("p").textContent = "Nhập mã ở bước thanh toán, áp dụng cho mọi loại trái cây" + (ma.ngayKetThuc ? ", hạn dùng đến " + FB.ngay(ma.ngayKetThuc) : "") + ".";
    khuMa.querySelector(".fb-voucher-chip span").textContent = ma.ma;
  } else {
    khuMa.remove();
  }

  // Số liệu
  document.getElementById("tkSanPham").textContent = dangBan.length;
  document.getElementById("tkKhach").textContent = KHO.lay("taiKhoan").filter(function (t) { return t.vaiTro !== "Admin"; }).length;
  document.getElementById("tkDon").textContent = KHO.lay("donHang").filter(function (d) { return d.trangThai === FB.TRANG_THAI.XONG; }).length;

  // Tin mới
  var tin = KHO.lay("tinTuc").filter(function (t) { return t.hienThi; }).sort(function (a, b) { return new Date(b.ngayDang) - new Date(a.ngayDang); }).slice(0, 3);
  if (tin.length) document.getElementById("dsTinMoi").innerHTML = tin.map(GD.theTinTuc).join("");
  else document.getElementById("khuTinTuc").remove();
})();
