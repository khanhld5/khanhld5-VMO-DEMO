# Entity class

## Mô tả hệ thống trong một đoạn văn

Hệ thống là trang web hỗ trợ shop bán các sản phẩm của mình nhằm quản lý các thông tin về mặt hàng, đơn hàng và các thành viên của mình. Các thành viên hệ thống bao gồm khách hàng và admin. Khách hàng có thể xem các sản phẩm hiện có trong trang web và chi tiết về sản phẩm kể cả chưa đăng nhập. Sau khi đăng nhập, khách hàng có thể thực hiện các thao tác. Thêm, sửa các thông tin của mình như thông tin cá nhân, thông tin nhận hàng, mật khẩu. Thêm, sửa, xóa các mặt hàng có trong giỏ hàng, sau đó đặt hàng, giỏ hàng có thể không mất đi trừ khi người dùng clear hết các sản phẩm trong giỏ hàng, xóa trình duyệt hoặc đặt hàng. Trong thời gian chờ sản phẩm được giao tới, khách hàng có thể theo dõi trạng thái của đơn hàng, khi khách đã nhận hàng, có thể để lại comment và đánh giá của mình về sản phẩm này và chỉ có thể đánh giá được 1 lần sau khi đã nhận sản phẩm. Admin sau khi đăng nhập có thể thực hiện các thao tác. Quản lý thông tin của mặt hàng: xem, thêm, sửa, xóa danh sách mặt hàng. Các sản phẩm tương ứng với một lượng mặt hàng nhất định và admin có thể quản lý số lượng của sản phẩm trong shop: xem, thêm, sửa số lượng sản phẩm. Mỗi mặt hàng có thể được phân loại dựa theo cateogry, admin quản lý thông tin các category: xem, thêm, sửa, xóa category. Khi khách hàng đặt, admin có thể chuyển trạng thái cũng như xem các thông tin trong đơn hàng của khách hàng hay xóa đơn hàng này. Và admin có thể theo dõi lượng khách đăng ký trên web của mình theo danh sách khách hàng.

## Các danh từ xuất hiện:

- Danh từ về người: Thành viên, khách hàng, admin
- Danh từ về vật: mặt hàng, sản phẩm
- Danh từ thông tin: giỏ hàng, đơn hàng, comment, category

## Duyệt danh từ:

- Người:
  - Lớp ThanhVien: username, paasssword, ten, ngaySinh, diaChi, sdt, email, vaiTro, ghiChu
  - Lớp Admin: kế thừa ThanhVien + maNV
  - Lớp KhachHang: kế thừa ThanhVien + maKH
- Vật:
  - Lớp MatHang: anh, title, giaNhap, giaBan, moTa, category, thuongHieu, xuatXu, among, left, ngungBan
  - Lớp SanPham: MatHang, maSP, ngayNhap, daBan
- Thông tin:
  - Lớp Category: title, moTa
  - Lớp GioHang: KhachHang, SanPham, total
  - Lớp Donhang: KhachHang, SanPham, total, ngayDat, ngayGiao, status
  - Lớp Comment: KhachHang, MatHang, title, score, ngayViet

## Xét quan hệ số lượng:

- 1 khách hàng có 1 giỏ hàng, **KhachHang** và **GioHang**: 1-1
- 1 Mặt hàng có thể có nhiều sản phẩm: **MatHang** và **SanPham**: 1-n
- 1 giỏ hàng có thể có nhiều sản phẩm, **GioHang** và **SanPham**: 1-n
- 1 khách hàng có thể đặt nhiều đơn hàng, **KhachHang** và **DonHang**: 1-n
- 1 đơn hàng có thể có nhiều sản phẩm, **DonHang** và **SanPham**: 1-n
- 1 mặt hàng có thể có nhiều comment, **MatHang** và **Comment**: 1-n
- 1 Khách hàng có thể viết nhiều comment cho nhiều sản phẩm, **KhachHang** và **Comment**: 1-n
- 1 mặt hàng có thể có nhiều category, 1 category có thể có nhiều mặt hàng => quan hệ n-n, đề xuất lớp **MHCategory** có duy nhất một mặt hàng một category

<img src="Lớp tổng.png">
