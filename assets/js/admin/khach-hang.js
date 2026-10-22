/* Admin – Khách hàng: tìm theo tên/email/sđt, sắp xếp mới đăng ký / chi tiêu / số đơn (không tính đơn đã huỷ) */
(function () {
  "use strict";
  if (!window.AD) return; // chưa đăng nhập admin
  var esc = GD.esc;
  var q = new URLSearchParams(location.search), tuKhoa = (q.get("tuKhoa") || "").trim(), sapXep = q.get("sapXep") || "";
  var form = document.getElementById("formTimKhach");
  form.tuKhoa.value = tuKhoa; form.sapXep.value = sapXep;
  form.sapXep.addEventListener("change", function () { form.submit(); });

  var don = KHO.lay("donHang");
  var ds = KHO.lay("taiKhoan").filter(function (t) { return t.vaiTro !== "Admin"; }).map(function (t) {
    var cua = don.filter(function (d) { return d.taiKhoanId === t.id; });
    var hopLe = cua.filter(function (d) { return d.trangThai !== FB.TRANG_THAI.HUY; });
    return {
      tk: t, soDon: cua.length, chiTieu: hopLe.reduce(function (s, d) { return s + d.tongTien; }, 0),
      ganNhat: cua.reduce(function (m, d) { return !m || new Date(d.ngayDat) > new Date(m) ? d.ngayDat : m; }, null)
    };
  });
  if (tuKhoa) {
    var k = FB.boDau(tuKhoa);
    ds = ds.filter(function (x) { return FB.boDau(x.tk.hoTen + " " + x.tk.email + " " + (x.tk.soDienThoai || "")).indexOf(k) >= 0; });
  }
  ds.sort(sapXep === "chitieu" ? function (a, b) { return b.chiTieu - a.chiTieu; } : sapXep === "sodon" ? function (a, b) { return b.soDon - a.soDon; }
    : function (a, b) { return new Date(b.tk.ngayDangKy) - new Date(a.tk.ngayDangKy); });

  document.getElementById("demKhach").textContent = ds.length + " tài khoản · tổng chi tiêu không tính đơn đã huỷ.";
  document.getElementById("bangKhach").innerHTML = !ds.length ? '<div class="ad-empty">Không có khách hàng nào phù hợp.</div>' :
    '<div class="ad-table-wrap"><table class="ad-table"><thead><tr><th>Khách hàng</th><th>Điện thoại</th><th>Ngày đăng ký</th><th class="num">Số đơn</th><th class="num">Tổng chi tiêu</th><th>Đơn gần nhất</th><th></th></tr></thead><tbody>' +
    ds.map(function (x) {
      return '<tr><td><div class="ad-sp" style="min-width: 220px;"><span class="fb-avatar" style="width: 42px; height: 42px; font-size: 1rem; margin: 0;">' + esc(x.tk.hoTen.trim().charAt(0).toUpperCase()) +
        "</span><div><b>" + esc(x.tk.hoTen) + "</b><small>" + esc(x.tk.email) + "</small></div></div></td><td>" + (x.tk.soDienThoai ? esc(x.tk.soDienThoai) : "—") + "</td><td>" + FB.ngay(x.tk.ngayDangKy) +
        '</td><td class="num">' + x.soDon + '</td><td class="num font-weight-bold">' + FB.tien(x.chiTieu) + "</td><td>" + (x.ganNhat ? FB.ngay(x.ganNhat) : "—") + "</td><td>" +
        (x.soDon ? '<a class="fb-btn fb-btn-soft fb-btn-sm" href="don-hang.html?taiKhoanId=' + x.tk.id + '">Xem đơn</a>' : "") + "</td></tr>";
    }).join("") + "</tbody></table></div>";
})();
