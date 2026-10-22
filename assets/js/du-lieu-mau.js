/* =========================================================================
   FRUITBEN – DỮ LIỆU MẪU
   52 loại trái cây, tài khoản quản trị, tin tức, mã giảm giá, vài sản phẩm đang giảm giá,
   khách hàng và đơn hàng mẫu để trang quản trị có số liệu.
   Chỉ nạp vào trình duyệt (localStorage) ở LẦN ĐẦU mở web, hoặc khi admin bấm "Khôi phục dữ liệu mẫu".
   ngayTaoTruoc / ngayTruoc = số ngày trước hôm nay (để ngày tháng luôn mới khi mở web).
   ========================================================================= */
window.FB_DU_LIEU_MAU = {
  sanPham: [
    { id: 1, ten: "Dâu Tây", loai: "Trái cây nội địa", gia: 220000, giaCu: 264000, ton: 100, anh: "dau-tay.jpg", moTa: "Dâu tây tươi, ngọt, giàu vitamin C.", conHang: true, ngayTaoTruoc: 119 },
    { id: 2, ten: "Nho Đen", loai: "Trái cây nội địa", gia: 40000, giaCu: null, ton: 100, anh: "nho-den.jpg", moTa: "Nho tươi không hạt, vị ngọt thanh.", conHang: true, ngayTaoTruoc: 118 },
    { id: 3, ten: "Chanh", loai: "Trái cây nội địa", gia: 35000, giaCu: null, ton: 200, anh: "chanh.jpg", moTa: "Chanh tươi giàu vitamin C, dùng pha nước hoặc nấu ăn.", conHang: true, ngayTaoTruoc: 117 },
    { id: 4, ten: "Kiwi", loai: "Trái cây nội địa", gia: 75000, giaCu: null, ton: 100, anh: "kiwi.jpg", moTa: "Kiwi ruột xanh, vị chua ngọt hài hoà.", conHang: true, ngayTaoTruoc: 116 },
    { id: 5, ten: "Táo Xanh", loai: "Trái cây nội địa", gia: 45000, giaCu: null, ton: 150, anh: "tao-xanh.jpg", moTa: "Táo xanh giòn, nhập khẩu.", conHang: true, ngayTaoTruoc: 115 },
    { id: 6, ten: "Mâm Xôi", loai: "Trái cây nội địa", gia: 85000, giaCu: null, ton: 80, anh: "mam-xoi.jpg", moTa: "Mâm xôi tươi, thích hợp làm sinh tố, bánh.", conHang: true, ngayTaoTruoc: 114 },
    { id: 7, ten: "Dưa Hấu", loai: "Trái cây nội địa", gia: 30000, giaCu: null, ton: 100, anh: "dua-hau.jpg", moTa: "Dưa hấu vỏ mỏng, ruột đỏ ngọt mát.", conHang: true, ngayTaoTruoc: 113 },
    { id: 8, ten: "Mít Ruột Đỏ", loai: "Trái cây nội địa", gia: 65000, giaCu: null, ton: 60, anh: "mit-ruot-do.jpg", moTa: "Mít ruột đỏ lá bầu, múi dẻo thơm nức.", conHang: true, ngayTaoTruoc: 112 },
    { id: 9, ten: "Nhãn", loai: "Trái cây nội địa", gia: 55000, giaCu: null, ton: 80, anh: "nhan.jpg", moTa: "Nhãn xuồng cơm dày, giòn ngọt.", conHang: true, ngayTaoTruoc: 111 },
    { id: 10, ten: "Cam Sành", loai: "Trái cây nội địa", gia: 60000, giaCu: null, ton: 120, anh: "cam-sanh.jpg", moTa: "Cam sành Tiền Giang mộng nước, chuyên dùng vắt nước.", conHang: true, ngayTaoTruoc: 110 },
    { id: 11, ten: "Dừa Xiêm", loai: "Trái cây nội địa", gia: 25000, giaCu: null, ton: 150, anh: "dua-xiem.jpg", moTa: "Dừa xiêm Bến Tre nước ngọt thanh mát.", conHang: true, ngayTaoTruoc: 109 },
    { id: 12, ten: "Bưởi Da Xanh", loai: "Trái cây nội địa", gia: 85000, giaCu: 102000, ton: 70, anh: "buoi-da-xanh.jpg", moTa: "Bưởi da xanh tép hồng, ngọt dịu dễ bóc.", conHang: true, ngayTaoTruoc: 108 },
    { id: 13, ten: "Dưa Lưới Hữu Cơ Danny Green", loai: "Trái cây nội địa", gia: 75000, giaCu: null, ton: 45, anh: "dua-luoi-huu-co.jpg", moTa: "Dưa lưới hữu cơ chuẩn VietGAP, độ ngọt cao, giòn rụm.", conHang: true, ngayTaoTruoc: 107 },
    { id: 14, ten: "Măng Cụt", loai: "Trái cây nội địa", gia: 70000, giaCu: null, ton: 50, anh: "mang-cut.jpg", moTa: "Măng cụt Lái Thiêu múi trắng nõn, vị chua ngọt hài hòa.", conHang: true, ngayTaoTruoc: 106 },
    { id: 15, ten: "Xoài Cát", loai: "Trái cây nội địa", gia: 65000, giaCu: 78000, ton: 65, anh: "xoai-cat.jpg", moTa: "Xoài cát Hòa Lộc thịt mịn, thơm lừng.", conHang: true, ngayTaoTruoc: 105 },
    { id: 16, ten: "Sầu Riêng", loai: "Trái cây nội địa", gia: 115000, giaCu: 138000, ton: 40, anh: "sau-rieng.jpg", moTa: "Sầu riêng Ri6 cơm vàng hạt lép, béo ngậy.", conHang: true, ngayTaoTruoc: 104 },
    { id: 17, ten: "Thanh Long Ruột Trắng", loai: "Trái cây nội địa", gia: 18000, giaCu: null, ton: 90, anh: "thanh-long-ruot-trang.jpg", moTa: "Thanh long ruột trắng giải nhiệt tươi mát.", conHang: true, ngayTaoTruoc: 103 },
    { id: 18, ten: "Thanh Long Ruột Đỏ", loai: "Trái cây nội địa", gia: 25000, giaCu: null, ton: 85, anh: "thanh-long-ruot-do.jpg", moTa: "Thanh long ruột đỏ vỏ mọng, vị ngọt đậm.", conHang: true, ngayTaoTruoc: 102 },
    { id: 19, ten: "Bơ Sáp", loai: "Trái cây nội địa", gia: 68000, giaCu: null, ton: 60, anh: "bo-sap.jpg", moTa: "Bơ sáp Đắk Lắk dẻo quánh, giàu dinh dưỡng.", conHang: true, ngayTaoTruoc: 101 },
    { id: 20, ten: "Chôm Chôm", loai: "Trái cây nội địa", gia: 30000, giaCu: null, ton: 110, anh: "chom-chom.jpg", moTa: "Chôm chôm nhãn tróc hạt, giòn ngọt.", conHang: true, ngayTaoTruoc: 100 },
    { id: 21, ten: "Chuối", loai: "Trái cây nội địa", gia: 35000, giaCu: null, ton: 130, anh: "chuoi.jpg", moTa: "Chuối laba / chuối già hương thơm ngọt.", conHang: true, ngayTaoTruoc: 99 },
    { id: 22, ten: "Đu Đủ", loai: "Trái cây nội địa", gia: 25000, giaCu: null, ton: 75, anh: "du-du.jpg", moTa: "Đu đủ ruột đỏ ruột dẻo, ngọt thanh.", conHang: true, ngayTaoTruoc: 98 },
    { id: 23, ten: "Ổi", loai: "Trái cây nội địa", gia: 28000, giaCu: null, ton: 100, anh: "oi.jpg", moTa: "Ổi nữ hoàng giòn rụm, ít hạt.", conHang: true, ngayTaoTruoc: 97 },
    { id: 24, ten: "Dứa", loai: "Trái cây nội địa", gia: 20000, giaCu: null, ton: 90, anh: "dua.jpg", moTa: "Dứa mật Cầu Đước ngọt lịm, mắt nở to.", conHang: true, ngayTaoTruoc: 96 },
    { id: 25, ten: "Mận", loai: "Trái cây nội địa", gia: 60000, giaCu: null, ton: 80, anh: "man.jpg", moTa: "Mận hậu Sơn La giòn ngọt, hơi chua nhẹ.", conHang: true, ngayTaoTruoc: 95 },
    { id: 26, ten: "Hồng", loai: "Trái cây nội địa", gia: 70000, giaCu: null, ton: 55, anh: "hong.jpg", moTa: "Hồng giòn Đà Lạt giòn ngọt, không chát.", conHang: true, ngayTaoTruoc: 94 },
    { id: 27, ten: "Mâm Xôi Đen", loai: "Trái cây nội địa", gia: 180000, giaCu: null, ton: 30, anh: "mam-xoi-den.jpg", moTa: "Mâm xôi đen mộng nước, giàu chất chống oxy hóa.", conHang: true, ngayTaoTruoc: 93 },
    { id: 28, ten: "Vải Thiều Lục Ngạn", loai: "Trái cây nội địa", gia: 75000, giaCu: null, ton: 95, anh: "vai-thieu.jpg", moTa: "Vải thiều Lục Ngạn hạt nhỏ, vỏ đỏ, cơm dày.", conHang: true, ngayTaoTruoc: 92 },
    { id: 29, ten: "Nho Đen Nội Địa Trung", loai: "Trái cây nhập khẩu", gia: 90000, giaCu: null, ton: 70, anh: "nho-den-noi-dia-trung.jpg", moTa: "Nho đen quả tròn, ngọt đậm, giá thành hợp lý.", conHang: true, ngayTaoTruoc: 91 },
    { id: 30, ten: "Cam Vàng Navel Úc", loai: "Trái cây nhập khẩu", gia: 105000, giaCu: null, ton: 100, anh: "cam-vang-navel-uc.jpg", moTa: "Cam vàng Navel mộng nước, không hạt, vỏ dễ bóc.", conHang: true, ngayTaoTruoc: 90 },
    { id: 31, ten: "Nho Mẫu Đơn Nội Địa Trung", loai: "Trái cây nhập khẩu", gia: 220000, giaCu: null, ton: 50, anh: "nho-mau-don-noi-dia-trung.jpg", moTa: "Nho mẫu đơn xanh giòn, thơm mùi sữa dịu nhẹ.", conHang: true, ngayTaoTruoc: 89 },
    { id: 32, ten: "Nho Xanh Sweet Globe Mỹ", loai: "Trái cây nhập khẩu", gia: 240000, giaCu: 288000, ton: 60, anh: "nho-xanh-sweet-globe-my.jpg", moTa: "Nho xanh Sweet Globe giòn tan, ngọt lịm không hạt.", conHang: true, ngayTaoTruoc: 88 },
    { id: 33, ten: "Kiwi Vàng New Zealand XL", loai: "Trái cây nhập khẩu", gia: 280000, giaCu: 336000, ton: 80, anh: "kiwi-vang-nz-xl.jpg", moTa: "Kiwi vàng Zespri size XL trái to, vị ngọt lịm.", conHang: true, ngayTaoTruoc: 87 },
    { id: 34, ten: "Táo Envy New Zealand", loai: "Trái cây nhập khẩu", gia: 260000, giaCu: 312000, ton: 90, anh: "tao-envy-nz.jpg", moTa: "Táo Envy thịt giòn đét, hương thơm đặc trưng.", conHang: true, ngayTaoTruoc: 86 },
    { id: 35, ten: "Hồng Táo Nội Địa Trung", loai: "Trái cây nhập khẩu", gia: 120000, giaCu: null, ton: 45, anh: "hong-tao-noi-dia-trung.jpg", moTa: "Hồng táo tươi giòn rụm, xốp xốp vị ngọt dịu.", conHang: true, ngayTaoTruoc: 85 },
    { id: 36, ten: "Nho Đỏ Crimson", loai: "Trái cây nhập khẩu", gia: 170000, giaCu: null, ton: 65, anh: "nho-do-crimson.jpg", moTa: "Nho đỏ Crimson nhập khẩu, trái cứng giòn không hạt.", conHang: true, ngayTaoTruoc: 84 },
    { id: 37, ten: "Lê Nâu Nội Địa Trung", loai: "Trái cây nhập khẩu", gia: 90000, giaCu: null, ton: 85, anh: "le-nau-noi-dia-trung.jpg", moTa: "Lê nâu quả to, nhiều nước, giải nhiệt rất tốt.", conHang: true, ngayTaoTruoc: 83 },
    { id: 38, ten: "Táo Braeburn New Zealand", loai: "Trái cây nhập khẩu", gia: 160000, giaCu: null, ton: 75, anh: "tao-braeburn-nz.jpg", moTa: "Táo Braeburn vị chua ngọt cân bằng, giòn xốp.", conHang: true, ngayTaoTruoc: 82 },
    { id: 39, ten: "Nho Mẫu Đơn Red Ruby Hàn Quốc", loai: "Trái cây nhập khẩu", gia: 420000, giaCu: null, ton: 30, anh: "nho-red-ruby-han.jpg", moTa: "Nho mẫu đơn đỏ Red Ruby cao cấp, hương vị đẳng cấp.", conHang: true, ngayTaoTruoc: 81 },
    { id: 40, ten: "Táo Cherry Mini", loai: "Trái cây nhập khẩu", gia: 180000, giaCu: null, ton: 40, anh: "tao-cherry-mini.jpg", moTa: "Táo cherry xinh xắn, đậm vị, thích hợp làm quà tặng.", conHang: true, ngayTaoTruoc: 80 },
    { id: 41, ten: "Lê Xanh Premium Mỹ", loai: "Trái cây nhập khẩu", gia: 180000, giaCu: null, ton: 55, anh: "le-xanh-premium-my.jpg", moTa: "Lê xanh Mỹ vỏ mỏng, thịt mềm ngọt thanh.", conHang: true, ngayTaoTruoc: 23 },
    { id: 42, ten: "Việt Quất Úc", loai: "Trái cây nhập khẩu", gia: 220000, giaCu: 264000, ton: 50, anh: "viet-quat-uc.jpg", moTa: "Việt quất Úc phủ phấn trắng tự nhiên, giàu dinh dưỡng.", conHang: true, ngayTaoTruoc: 21 },
    { id: 43, ten: "Chanh Vàng Nội Địa Trung", loai: "Trái cây nhập khẩu", gia: 65000, giaCu: null, ton: 110, anh: "chanh-vang-trung.jpg", moTa: "Chanh vàng mọng nước, vỏ thơm chuyên pha trà / detox.", conHang: true, ngayTaoTruoc: 19 },
    { id: 44, ten: "Táo Fuji", loai: "Trái cây nhập khẩu", gia: 130000, giaCu: null, ton: 100, anh: "tao-fuji.jpg", moTa: "Táo Fuji truyền thống giòn ngọt, vỏ đỏ hồng đẹp mắt.", conHang: true, ngayTaoTruoc: 17 },
    { id: 45, ten: "Chà Là Tươi Thái Lan", loai: "Trái cây nhập khẩu", gia: 190000, giaCu: null, ton: 35, anh: "cha-la-tuoi-thai-lan.jpg", moTa: "Chà là tươi nguyên chùm, vị bùi bùi giòn ngọt.", conHang: true, ngayTaoTruoc: 15 },
    { id: 46, ten: "Táo Vàng Kinsei", loai: "Trái cây nhập khẩu", gia: 320000, giaCu: null, ton: 25, anh: "tao-vang-kinsei.jpg", moTa: "Táo vàng Kinsei Nhật Bản thơm mùi mật hoa, ngọt thanh.", conHang: true, ngayTaoTruoc: 13 },
    { id: 47, ten: "Hồng Nhật", loai: "Trái cây nhập khẩu", gia: 260000, giaCu: null, ton: 30, anh: "hong-nhat.jpg", moTa: "Hồng giòn Nhật Bản ngọt lịm, không chát.", conHang: true, ngayTaoTruoc: 11 },
    { id: 48, ten: "Táo Sekai Ichi Nhật Bản", loai: "Trái cây nhập khẩu", gia: 450000, giaCu: null, ton: 20, anh: "tao-sekai-ichi-nhat-ban.jpg", moTa: "Táo Sekai Ichi siêu to, dòng trái cây biếu tặng hoàng gia.", conHang: true, ngayTaoTruoc: 9 },
    { id: 49, ten: "Dâu Tây Mỹ", loai: "Trái cây nhập khẩu", gia: 260000, giaCu: null, ton: 45, anh: "dau-tay-my.jpg", moTa: "Dâu tây Mỹ trái to rắn chắc, vị chua ngọt đậm đà.", conHang: true, ngayTaoTruoc: 7 },
    { id: 50, ten: "Lựu Thái Lan", loai: "Trái cây nhập khẩu", gia: 150000, giaCu: null, ton: 60, anh: "luu-thai-lan.jpg", moTa: "Lựu Thái hạt mềm, nước đỏ sẫm mộng nước.", conHang: true, ngayTaoTruoc: 5 },
    { id: 51, ten: "Táo Shinamo Gold Nhật", loai: "Trái cây nhập khẩu", gia: 340000, giaCu: null, ton: 25, anh: "tao-shinamo-gold.jpg", moTa: "Táo Shinamo Gold vàng óng, độ giòn và thơm đỉnh cao.", conHang: true, ngayTaoTruoc: 3 },
    { id: 52, ten: "Đào Nhật", loai: "Trái cây nhập khẩu", gia: 380000, giaCu: null, ton: 30, anh: "dao-nhat-ban.jpg", moTa: "Đào tươi Nhật Bản vỏ mỏng, thịt dẻo mộng nước thơm lừng.", conHang: true, ngayTaoTruoc: 1 }
  ],

  taiKhoan: [
    { id: 1, hoTen: "Quản Trị Viên", email: "admin@example.com", matKhau: "admin123", soDienThoai: "0901000111", vaiTro: "Admin", ngayTruoc: 120 },
    { id: 2, hoTen: "Nguyễn Thị Lan", email: "lan.nguyen@gmail.com", matKhau: "123456", soDienThoai: "0912345678", vaiTro: "KhachHang", ngayTruoc: 40 },
    { id: 3, hoTen: "Trần Minh Khoa", email: "khoa.tm@gmail.com", matKhau: "123456", soDienThoai: "0987654321", vaiTro: "KhachHang", ngayTruoc: 12 },
    { id: 4, hoTen: "Lê Hoàng Yến", email: "yen.le@gmail.com", matKhau: "123456", soDienThoai: "0934567890", vaiTro: "KhachHang", ngayTruoc: 3 }
  ],

  tinTuc: [
    { id: 1, tieuDe: "Cửa hàng khai trương chương trình khuyến mãi mùa hè", tomTat: "Giảm giá 10% cho tất cả các loại trái cây nhập khẩu.",
      noiDung: "Chào mừng quý khách đến với FruitBen Shop!\nTrong tháng này chúng tôi triển khai chương trình giảm giá 10% cho toàn bộ sản phẩm trái cây nhập khẩu. Nhập mã FRUITBEN10 ở bước thanh toán để được giảm ngay, tối đa 50.000đ cho mỗi đơn từ 200.000đ.\nChương trình áp dụng cho cả khách đặt online và mua tại cửa hàng.",
      anh: "news-bg-1.jpg", nguoiDang: "Admin", hienThi: true, ngayTruoc: 3 },
    { id: 2, tieuDe: "Cách chọn sầu riêng Ri6 chín tới, cơm vàng hạt lép", tomTat: "Nhìn gai, nghe tiếng gõ và ngửi mùi cuống để chọn được trái ngon.",
      noiDung: "1. Nhìn gai: gai to, thưa, đầu gai hơi khô là trái đã già.\n2. Nghe tiếng: gõ nhẹ bằng cán dao, tiếng bộp bộp là cơm đã tách vỏ.\n3. Ngửi cuống: mùi thơm nồng ở cuống và đường nứt múi cho biết trái đã chín tới.\n4. Cuống còn tươi, chắc tay: trái mới rụng, chưa bị ủ thuốc.",
      anh: "news-bg-2.jpg", nguoiDang: "Admin", hienThi: true, ngayTruoc: 8 },
    { id: 3, tieuDe: "Mùa vải thiều Lục Ngạn về FruitBen", tomTat: "Vải được hái và vận chuyển lạnh trong 24 giờ từ Bắc Giang.",
      noiDung: "Vải thiều Lục Ngạn chính vụ đã về kho FruitBen. Vải được hái buổi sáng, đóng thùng xốp kèm đá gel và chuyển thẳng vào TP. Hồ Chí Minh trong vòng 24 giờ.\nTrái hạt nhỏ, cùi dày, vị ngọt sắc. Bảo quản ngăn mát tủ lạnh, dùng trong 3–4 ngày để ngon nhất.",
      anh: "news-bg-3.jpg", nguoiDang: "Admin", hienThi: true, ngayTruoc: 15 }
  ],

  maGiamGia: [
    { id: 1, ma: "FRUITBEN10", moTa: "Giảm 10% cho đơn từ 200.000đ", loai: "PhanTram", giaTri: 10, donToiThieu: 200000, giamToiDa: 50000, soLuong: null, daDung: 0, batDauSau: null, ketThucSau: null, kichHoat: true },
    { id: 2, ma: "GIAM30K", moTa: "Giảm 30.000đ cho đơn từ 300.000đ", loai: "SoTien", giaTri: 30000, donToiThieu: 300000, giamToiDa: null, soLuong: 100, daDung: 0, batDauSau: null, ketThucSau: null, kichHoat: true },
    { id: 3, ma: "TRAICAYNHAPKHAU", moTa: "Giảm 15% tối đa 100.000đ cho đơn từ 500.000đ", loai: "PhanTram", giaTri: 15, donToiThieu: 500000, giamToiDa: 100000, soLuong: null, daDung: 0, batDauSau: null, ketThucSau: 90, kichHoat: true }
  ],

  /* Đơn hàng mẫu: [taiKhoanId|null, họ tên, sđt, tỉnh, phường, địa chỉ, ngàyTrước, giờ, trạng thái, phương thức, mã giảm giá, [[sanPhamId, kg], ...]] */
  donHang: [
    [2, "Nguyễn Thị Lan", "0912345678", "Hồ Chí Minh", "Phường Bến Thành", "12 Lê Lợi", 0, "09:20", "Chờ xử lý", "QR", "FRUITBEN10", [[1, 2], [32, 1], [15, 3]]],
    [3, "Trần Minh Khoa", "0987654321", "Hồ Chí Minh", "Phường Tân Định", "45 Hai Bà Trưng", 0, "08:05", "Chờ xử lý", "COD", null, [[14, 2], [20, 3]]],
    [null, "Phạm Văn Bình", "0909111222", "Hà Nội", "Phường Hoàn Kiếm", "8 Hàng Bài", 1, "16:40", "Đang giao", "COD", null, [[34, 1], [42, 1]]],
    [4, "Lê Hoàng Yến", "0934567890", "Hồ Chí Minh", "Phường Sài Gòn", "22 Nguyễn Huệ", 1, "10:15", "Đang giao", "QR", null, [[16, 2], [12, 2]]],
    [2, "Nguyễn Thị Lan", "0912345678", "Hồ Chí Minh", "Phường Bến Thành", "12 Lê Lợi", 2, "14:30", "Hoàn thành", "COD", null, [[1, 3], [5, 2]]],
    [3, "Trần Minh Khoa", "0987654321", "Hồ Chí Minh", "Phường Tân Định", "45 Hai Bà Trưng", 3, "11:00", "Hoàn thành", "QR", "GIAM30K", [[33, 1], [16, 2]]],
    [null, "Đỗ Thu Hà", "0977333444", "Đà Nẵng", "Phường Hải Châu", "101 Bạch Đằng", 4, "19:10", "Đã hủy", "COD", null, [[24, 2]]],
    [4, "Lê Hoàng Yến", "0934567890", "Hồ Chí Minh", "Phường Sài Gòn", "22 Nguyễn Huệ", 5, "08:45", "Hoàn thành", "COD", null, [[2, 4], [4, 2], [3, 3]]],
    [2, "Nguyễn Thị Lan", "0912345678", "Hồ Chí Minh", "Phường Bến Thành", "12 Lê Lợi", 6, "17:25", "Hoàn thành", "QR", null, [[42, 2], [1, 1]]]
  ],

  lienHe: [
    { hoTen: "Võ Thanh Tâm", email: "tam.vo@gmail.com", soDienThoai: "0911222333", chuDe: "Đặt giỏ quà Tết", tinNhan: "Shop có nhận đặt 20 giỏ quà trái cây nhập khẩu giao trước Tết không ạ?", ngayTruoc: 1, daXuLy: false }
  ]
};
