/* Giỏ hàng: đổi số kg (kiểm tra tồn kho), xoá, tạm tính, tiến độ miễn phí ship */
(function () {
  "use strict";
  var esc = GD.esc, C = FB.CAU_HINH;
  var khung = document.getElementById("noiDungGio");

  if (FB.TaiKhoan.hienTai()) document.getElementById("nutXemDon").hidden = false;

  function ve() {
    var dong = FB.GioHang.lay();
    GD.capNhatSoGio();
    if (!dong.length) {
      khung.innerHTML = GD.theRong("fa-shopping-basket", "Giỏ hàng đang trống", "Chọn vài loại trái cây tươi cho hôm nay nhé.",
        '<a class="fb-btn fb-btn-grad mt-2" href="cua-hang.html">Đi tới cửa hàng</a>');
      return;
    }
    var tamTinh = FB.GioHang.tamTinh(dong);
    var tongKg = dong.reduce(function (t, x) { return t + x.soLuong; }, 0);
    var tietKiem = dong.reduce(function (t, x) { return t + (x.giaCu ? (x.giaCu - x.gia) * x.soLuong : 0); }, 0);
    var conThieu = Math.max(0, C.MIEN_PHI_TU - tamTinh);
    var phanTram = Math.min(100, Math.floor(tamTinh * 100 / C.MIEN_PHI_TU));

    var htmlDong = dong.map(function (x) {
      var url = "san-pham.html?id=" + x.sanPhamId;
      return '<div class="fb-cart-item" data-id="' + x.sanPhamId + '">' +
        '<a class="fb-cart-thumb" href="' + url + '"><img src="' + GD.anhSP(x.anh) + '" alt="' + esc(x.ten) + '" /></a>' +
        '<div class="fb-cart-info"><h4><a href="' + url + '" style="color: inherit;">' + esc(x.ten) + '</a></h4>' +
        '<div class="meta">' + esc(x.loai || "Trái cây") + " · " + FB.tien(x.gia) + "/kg " + (x.giaCu ? '<span class="fb-old-price">' + FB.tien(x.giaCu) + "</span>" : "") + "</div>" +
        '<div class="fb-price mt-1">' + FB.tien(x.thanhTien) + "</div></div>" +
        '<div class="fb-cart-side"><div class="fb-qty" data-qty><button type="button" data-step="-1" aria-label="Giảm 1 kg">−</button>' +
        '<input type="number" value="' + x.soLuong + '" min="0" max="999" aria-label="Số kg ' + esc(x.ten) + '" />' +
        '<button type="button" data-step="1" aria-label="Tăng 1 kg">+</button></div>' +
        '<button type="button" class="fb-btn fb-btn-danger fb-btn-sm" data-xoa="' + x.sanPhamId + '"><i class="fas fa-trash-alt"></i> Xoá</button></div></div>';
    }).join("");

    khung.innerHTML =
      '<div class="fb-checkout"><section class="fb-card fb-card-pad"><div class="fb-box-head"><h3>' + dong.length + " sản phẩm · " + tongKg + ' kg</h3>' +
      '<span class="fb-pill ok"><i class="fas fa-shipping-fast"></i> Miễn phí ship từ ' + FB.tien(C.MIEN_PHI_TU) + "</span></div>" + htmlDong + "</section>" +
      '<aside class="fb-card fb-card-pad fb-sticky"><div class="fb-box-head"><h3>Tổng đơn hàng</h3><span class="fb-box-icon"><i class="fas fa-receipt"></i></span></div>' +
      '<div class="fb-sum-row"><span>Tạm tính (' + tongKg + ' kg)</span><span>' + FB.tien(tamTinh) + "</span></div>" +
      (tietKiem > 0 ? '<div class="fb-sum-row giam"><span>Đã tiết kiệm nhờ giá sale</span><span>-' + FB.tien(tietKiem) + "</span></div>" : "") +
      '<div class="fb-sum-total"><span class="font-weight-bold">Tổng tạm tính</span><strong>' + FB.tien(tamTinh) + "</strong></div>" +
      '<div class="fb-freeship mt-3">' + (conThieu > 0
        ? '<span><i class="fas fa-truck"></i> Mua thêm <b>' + FB.tien(conThieu) + "</b> để được miễn phí giao hàng</span>"
        : '<span><i class="fas fa-check-circle"></i> Đơn của bạn được <b>miễn phí giao hàng</b></span>') +
      '<div class="bar"><span style="width: ' + phanTram + '%;"></span></div></div>' +
      '<div class="fb-note-box mt-3"><i class="fas fa-info-circle"></i> Phí vận chuyển và mã giảm giá được tính ở bước thanh toán.</div>' +
      '<a class="fb-btn fb-btn-grad fb-btn-lg fb-btn-block mt-3" href="thanh-toan.html">Thanh toán ngay <i class="fas fa-arrow-right"></i></a>' +
      '<a class="fb-btn fb-btn-soft fb-btn-block mt-2" href="cua-hang.html"><i class="fas fa-plus"></i> Mua thêm sản phẩm</a></aside></div>';

    GD.initQty(khung, function (box, soLuong) {
      var id = +box.closest(".fb-cart-item").getAttribute("data-id");
      if (soLuong <= 0 && !confirm("Xoá sản phẩm này khỏi giỏ hàng?")) { ve(); return; }
      var kq = FB.GioHang.capNhat(id, soLuong);
      if (kq.thongBao) GD.toast(kq.thongBao, "loi");
      ve();
    });
    GD.$all("[data-xoa]", khung).forEach(function (b) {
      b.addEventListener("click", function () {
        var ten = b.closest(".fb-cart-item").querySelector("h4").textContent;
        if (!confirm("Xoá " + ten + " khỏi giỏ hàng?")) return;
        FB.GioHang.xoa(+b.getAttribute("data-xoa"));
        ve();
      });
    });
  }
  ve();
})();
