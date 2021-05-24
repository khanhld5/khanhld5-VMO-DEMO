# Hệ thống quản lý bán hàng

## 1.Mô tả hệ thống theo ngôn ngữ tự nhiên

### 1. Mục đích, phạm vi

Hỗ trợ shop quản lý và bán các sản phẩm cho người dùng:

- Quản lý thông tin:
  - Admin quản lý:
    - Ds sản phẩm
    - Phân loại các sản phẩm
    - Đơn hàng
    - Khách hàng, Admin
  - Khách hàng quản lý:
    - Giỏ hàng
    - Khách hàng
- Không bao gồm quản lý:
  - Quản lý tài sản công ty
  - Công lương thưởng

### 2. Ai được vào hệ thống và làm những gì:

- Khách hàng:
  - Đăng nhập/ đăng ký
  - Cập nhật thông tin cá nhân
  - Xem ds sản phẩm hiện có.
  - Xem chi tiết sản phẩm
  - Tìm kiếm sản phẩm theo tên
  - Thêm, sửa, xóa sản phẩm trong giỏ hàng
  - Đánh giá sản phẩm:
    - Comment
    - Điểm số
  - Đặt hàng
  - Xem đơn đã đặt.
- Admin:
  - Xem, thêm, sửa, xóa mặt hàng
  - Xem, thêm, sửa, số lượng sản phẩm
  - Xem, thêm, sửa, xóa category
  - Xem, xóa đơn hàng
  - Chuyển trạng thái đơn hàng.
  - Xem ds khách hàng

### 3. Chức năng:

- Khách hàng Đăng nhâp/ Đăng ký:
  - Khách hàng vào trang chủ:
    - Giao diện gồm:
      - Navbar:
        - Home btn
        - Collection
        - Login btn
      - Search bar:
        - Logo
        - Search field
        - Search btn
        - Cart
      - Banner
      - Danh sách sản phẩm mua nhiều và xem thêm btn
      - Danh sách sản phẩm mới về và xem thêm btn
      - Danh sách sản phẩm hiện có và xem thêm btn
      - Footer
  - KH chọn login btn
    - Giao diện login gồm:
      - Home btn
      - Login form:
        - Username field
        - Password field
      - Login btn
      - Đăng ký btn
      - footer
  - KH nhập thông tin và nhấn đăng nhập:
    - Điều hướng về giao diện trang chủ, khác với giao diện khi chưa đăng nhập ở điểm:
      - Navbar:
        - Login btn =>
          - User name - toogle menu on hover:
            - Thông tin cá nhân
            - Đổi mật khẩu
          - Log out btn
  - KH chọn đăng ký:
    - Giao diện đăng ký gồm:
      - Home btn
      - Register form:
        - Username field
        - Password field
        - Confirm password field
        - Họ và tên field
        - Ngày sinh field
        - Địa chỉ field
        - CMT field
        - SĐT field
        - Email
      - Register btn
      - footer
  - KH nhập thông tin và chọn đăng ký:
    - Điều hướng về giao diện trang chủ, khác với giao diện khi chưa đăng nhập ở điểm:
      - Navbar:
        - Login btn =>
          - User name - toogle menu on hover:
            - Thông tin cá nhân
            - Đơn hàng
            - Đổi mật khẩu
          - Log out btn
  - KH khi chưa Đăng nhập nhấn vào cart:
    - Điều hướng đến giao diện đăng nhập.
- KH cập nhật thông tin cá nhân: Khách hàng sau khi đăng nhập thành công
  - Tại navbar khách hàng hover vào username và chọn thông tin cá nhân:
    - Giao diện thông tin cá nhân bao gồm:
      - Header như trang chủ
      - Body
        - Sidebar:
          - Thông tin cá nhân.
          - Thông tin nhận hàng.
          - Đơn hàng.
          - Đổi mật khẩu.
        - Form Thông tin cá nhân:
          - Edit btn
          - Ảnh đại diện - uneditable
          - Họ và tên field - uneditable
          - Address field - uneditable
          - CMT field - uneditable
          - SĐT field - uneditable
          - Email field - uneditable
      - footer
  - Khách hàng chọn edit btn:
    - Giao diện như cũ, ngoại trừ:
      - Các trường trong form chuyển về editable
      - Thêm btn hủy, btn save
  - Khách hàng chọn Thông tin nhận hàng:
    - Giao diện như cũ, ngoại trừ form thông tin cá nhân thay bằng form thông tin nhận hàng:
      - Danh sách thông tin nhận hàng, với mỗi 1 item trong list sẽ có:
        - Edit btn
        - Tên gợi nhớ field - uneditable
        - Người nhận field - uneditable
        - Địa chỉ nhận field - uneditable
        - Sđt field - uneditable
  - Khách hàng chọn btn eidt trên item bất kỳ:
    - Giao diện như cữ, ngoại trừ:
      - Các trường trong item chuyển về editable
      - Thêm btn hủy, btn save
  - Khách hàng chọn đổi mật khẩu:
    - Giao diện gồm:
      - Form đổi mật khẩu gồm
        - Mật khẩu cũ field
        - Mật khẩu mới field
        - Confirm mật khẩu mới field
        - Đổi mật khẩu btn
- Khách hàng xem thông tin đơn hàng:
  - Khách hàng hover vào user và chọn đơn hàng hoặc trong trang thông tin cá nhân
    - Giao diện giống với giao diện thông tin cá nhân:
      - Main
        - Danh sách đơn hàng:
          - Trạng thái (đã đánh giá, hoàn thành, đang giao)
          - Thông tin sản phẩm
          - Đơn giá
          - Tổng tiền
          - Chi tiết đơn hàng
  - Khách hàng chọn chi tiết đơn hàng của 1 item bất kỳ trong danh sách
    - Giao diện chi tiết đơn hàng:
      - Ngày đặt, ngày nhận, ngày giao
      - Trạng thái (đã nhận, đang giao, hoàn thành)
      - Thông tin khách hàng
      - Thông tin mặt hàng
      - Số lượng sản phẩm
      - Tổng tiền
      - btn Đánh giá sản phẩm (hiện khi trạng thái là hoàn thành)
- Khách hàng đánh giá sản phẩm:
  - Khách hàng chọn btn Đánh giá sản phầm trong trang chỉ tiết đơn hàng, pop-up form đánh giá
    - Danh sách sản phẩm:
      - Tên sản phẩm
      - Đánh giá
      - Điểm
    - Nút Hủy, Đánh giá
- KH xem ds sản phẩm hiện có: khách hàng không cần thực hiện chức năng đăng nhập vẫn có thể xem các sản phẩm hiện có.
  - Tại trang chủ, khi nhấn vào xem thêm btn hoặc search sẽ điều hướng tới trang xem danh sách sản phẩm, giao diện:
    - Header của trang chủ
    - Body:
      - Side bar: bao gồm các bộ lọc
        - Mới về
        - Bán chạy
        - Lọc theo giá:
          - Thấp tới cao
          - Cao tới thấp
        - Lọc theo category
          - Đồ ăn
          - Đồ uống
      - Main:
        - Danh sách kết quả, tối đa 12 item
        - Danh sách trang kết quả. 1-n
  - Khách hàng khi nhấn vào xem thêm tại **_bán chạy_** filter sẽ auto vào bán chạy, khi nhấn vào **_mới về_** filter sẽ auto vào mới về, khi chọn trong collection đồ ăn sẽ auto về đồ ăn, khi chọn collection đồ uông sẽ auto về đồ uống.
- KH xem chi tiết sản phẩm: khách hàng không cần thực hiện chức năng đăng nhập vẫn có thể xem chỉ tiết về sản phẩm
  - Giao diện:
    - Header giống với trang chủ
    - Body:
      - Section thêm vào giỏ hàng
        - Ảnh sản phẩm
        - Tilte sản phẩm
        - Dòng đánh giá:
          - Trung bình số sao
          - Tổng số đánh gía
          - Tổng số đã bán
        - Giá sản phẩm
        - Hình thức vận chuyển, giá
        - Số lượng
        - Thêm vào giỏ hàng
      - Danh sách các sản phẩm tương tự.
      - Thông tin sản phẩm:
        - Category
        - Thương hiệu
        - Xuất xứ
        - Mô tả
      - Đánh giá:
        - User:
          - Ảnh
          - Username
        - Điểm đánh giá
        - Comment
        - Ngày đánh giá
    - Footer
- KH thêm, sửa, xóa sản phẩm trong giỏ hàng:
  - KH khi chưa đăng nhập nhấn vào giỏ hàng sẽ chuyển tới trang đăng nhập
  - KH khi đã đăng nhập, nhấn vào giỏ hàng:
    - Nếu chưa có sản phẩm nào, giao diện:
      - Mua hàng btn
    - Nếu đã có sản phẩm thì có thể sửa xóa các item trong giỏ hàng.
  - KH thêm sản phẩm vào giỏ hàng:
    - Khách hàng sau khi xem chi tiết sản phẩm có thể chọn số lượng sản phẩm cần mua và chọn thêm vào giỏ hàng, hoặc tại trang danh sách có thể chọn thêm vào giỏ hàng
  - KH sửa, xóa sản phẩm trong giỏ hàng:
    - Khi khách hàng nhấn vào giỏ hàng, giao diện:
      - Danh sách sản phẩm:
        - Title
        - Đơn giá
        - Số lượng
        - Số lượng
        - Tổng tiền
        - Xóa
      - btn chọn Tất cả
      - btn xóa đã chọn
      - btn mua hàng
    - Khi khách hàng thay đổi số lượng sản phẩm có trong giỏ hàng
    - Khách hàng chọn số sản phẩm không cần thiết và chọn xóa hoặc có thể xóa tại từng dòng
- KH đặt hàng:
  - Sau khi đã chỉnh sửa sản phẩm trong giỏ hàng, khách hàng chọn mua hàng btn, giao diện đặt hàng:
    - Địa chỉ nhận hàng.
    - Danh sách sản phẩm
    - Giao hàng
    - Tổng tiền
    - Đặt hàng btn
  - KH chọn đặt hàng btn sẽ hiện lên cửa sổ đặt hàng thành công và nút ok. Nhấn ok sẽ trở về trang chủ
- Admin đăng nhập:
  - Admin sau khi đăng nhập mới có thể sử dụng các tính năng quản lý, giao diện đăng nhập:
    - Logo web
    - Form đăng nhập
      - username field
      - password field
      - btn login
- Admin xem, thêm, sửa, xóa mặt hàng:
  - Admin sau khi đăng nhập có thể xem được trang chủ admin, bao gồm:
    - header:
      - User:
        - Ảnh
        - Username
        - logout
      - Navbar:
        - Home
        - Quản lý sản phẩm
        - Quản lý mặt hàng
        - Quản lý category
        - Quản lý đơn hàng
    - Body (mặc định là home)
      - Hiển thị thống kê.
        - Số đơn hàng mới
        - Số khách mới
        - Số đơn hàng chưa hoàn thành
        - Doanh thu trong tháng
  - Admin chọn Quản lý mặt hàng:
    - Giao diện gồm:
      - Header: như ở trang chủ
      - Body:
        - Thêm sản phẩm btn
        - Danh sách mặt hàng
        - btn xóa, sửa
        - btn xóa selection
  - Admin chọn vào mặt hàng:
    - Giao diện mặt hàng chi tiết:
      - Header: giống của trang chủ
      - Body:
        - btn Sửa
        - btn Xóa
        - Các thông tin về mặt hàng:
          - Ảnh
          - Title
          - Đơn giá nhập
          - Đơn giá bán
          - Mô tả
          - Category
          - Thương hiệu
          - Xuất xứ
  - Admin Chọn Sửa trong danh sách hoặc sửa trong mặt hàng chi tiết.
    - Giao diên mặt hàng chi tiết chuyển về:
      - Body :
        - form sửa mặt hàng:
          - Ảnh
          - Title
          - Đơn giá nhập
          - Đơn giá bán
          - Mô tả
          - Category
          - Thương hiệu
          - Xuất xứ
          - btn hủy, Sửa
  - Admin chọn thêm mặt hàng btn:
    - Giao diện giống với Sửa ngoại trừ btn Sửa là btn Thêm
  - Admin xóa mặt hàng, chọn Xóa btn hoặc select nhiều mặt hàng và chọn xóa selection sẽ có confirm action, Xóa trong giao diện mặt hàng chi tiết
- Admin xem, thêm, sửa số lượng sản phẩm:
  - Admin chọn Quản lý sản phẩm:
    - Header: như trang chủ
    - Body:
      - Danh sách mặt hàng
        - Ảnh
        - Title
        - Số lượng
        - Đã bán
        - Còn lại
        - btn Nhập thêm
        - btn Sửa
  - Admin chọn nhập thêm
    - Pop-up form thêm sản phẩm;
      - Số lượng thêm field
      - btn Thêm, btn Hủy.
  - Admin chọn Sửa:
    - Pop-up form sửa sản phẩm
      - Số lượng còn lại
      - btn Sửa, btn Hủy.
- Admin xem, thêm, sửa, xóa category
  - Admin chọn quản lý category:
    - Giao diện gồm:
      - Header như ở trang chủ
      - Body:
        - btn thêm mới
        - Danh sách category:
          - Title
          - Mô tả
          - btn Sửa
          - btn Xóa
  - Admin Chọn Sửa, pop-up form sửa category:
    - Title field
    - Mô tả field
    - btn Hủy, btn Sửa.
  - Admin Chọn xóa, category bị remove
  - Admin Chọn thêm mới, pop-up form thêm category:
    - Title field
    - Mô tả field
    - btn Hủy, btn thêm.
- Admin xem, xóa đơn hàng:
  - Admin chọn quản lý đơn hàng:
    - Giao diện gồm:
      - Header như ở trang chủ
      - Body:
        - Danh sách đơn hàng
          - thông tin đơn hàng
          - btn Xóa
          - btn Hoàn thành
        - btn Xóa nhiều, Hoàn thành nhiều
  - Admin xóa, chọn xóa, xóa nhiều
- Admin chuyển trạng thái đơn hàng:
  - Admin Xem chi tiết đơn hàng, chọn 1 đơn hàng trong danh sách:
    - Giao diện đơn hàng chi tiết
      - Ngày đặt, ngày nhận, ngày giao
      - Trạng thái (đã nhận, đang giao, hoàn thành)
      - Thông tin khách hàng
      - Thông tin mặt hàng
      - Số lượng sản phẩm
      - Tổng tiền
      - btn giao hàng / hoàn thành
  - Admin chọn nút giao hàng hay hoàn thành dựa trên trạng thái, nếu là đã nhận thì btn giao hàng. Nếu là đang giao thì chọn hoàn thành.
- Admin xem ds khách hàng:
  - Admin chọn danh sách khách hàng:
    - Giao diện:
      - Header: như trang chủ
      - Body:
        - danh sách Khách hàng

### 4. Các đối tượng cần quản lý:

- Người:
  - Thành viên:
    - Username
    - Password
    - Tên
    - Ngày sinh
    - Địa chỉ
    - SĐT
    - Email
    - Vai trò
    - Ghi chú.
  - Admin: Thành viên + mã NV
  - Khách hàng: Thành viên + mã KH
- Vật:
  - Mặt hàng:
    - Ảnh
    - Title
    - Đơn giá nhập
    - Đơn giá bán
    - Mô tả
    - Category
    - Thương hiệu
    - Xuất xứ
  - Sản phẩm: mặt hàng + mã SP + ngày nhập + đã bán.
- Thông tin:
  - Category:
    - Title
    - Mô tả
  - Giỏ hàng:
    - Mã KH
    - Mã SP
    - Tổng tiền
  - Đơn hàng:
    - Mã KH
    - Mã SP
    - Tổng tiền
    - Ngày đặt
    - Ngày giao
    - Trạng thái
  - Comment:
    - Mã KH
    - Mã mặt hàng
    - Title
    - Score

### 5. Quan hệ số lượng giữa các đối tượng:

- 1 khách hàng có 1 giỏ hàng
- 1 giỏ hàng có thể có nhiều sản phẩm
- 1 khách hàng có thể đặt nhiều đơn hàng
- 1 đơn hàng có thể có nhiều sản phẩm
- 1 Mặt hàng có thể có nhiều sản phẩm
- 1 mặt hàng có thể có nhiều comment
- 1 mặt hàng có thể có nhiều category
- 1 category có thể có nhiều mặt hàng => đề xuất lớp mặt hàng category có duy nhất một mặt hàng một category

## 2. Mô tả hệ thống theo ngôn ngữ UML

- Biểu đồ usecase:
  <img src="Usecase Tổng.png">
- Biểu đồ usecase cho chức năng

  - Khách hàng đăng ký
    <img src="KH-Đăng ký.png">
  - Khách hàng đăng nhập
    <img src="KH-Đăng nhập.png">

  - Khách hàng cập nhật thông tin cá nhân
    <img src="KH-Cập nhật thông tin.png">

  - Khách hàng xem thông tin đơn hàng
    <img src="KH-Xem thông tin đơn hàng.png">

  - Khách hàng đánh giá mặt hàng
    <img src="KH-Đánh giá mặt hàng.png">

  - Khách hàng xem ds sản phẩm hiện có
    <img src="KH-Xem ds sản phẩm.png">

  - Khách hàng xem chi tiết sản phẩm
    <img src="KH-Xem chi tiết sản phẩm.png">

  - Khách hàng thêm, sửa, xóa sản phẩm trong giỏ hàng
    <img src="KH-Quản lý giỏ hàng.png">

  - Khách hàng đặt hàng
    <img src="KH-Đặt hàng.png">

  - Admin đăng nhập
    <img src="Admin-Đăng nhập.png">

  - Admin xem, thêm, sửa, xóa mặt hàng
    <img src="Admin-Quản lý mặt hàng.png">

  - Admin xem, thêm, sửa số lượng sản phẩm
    <img src="Admin-Quản lý sản phẩm.png">

  - Admin xem, thêm, sửa, xóa category
    <img src="Admin-Quản lý category.png">

  - Admin xem, xóa đơn hàng
    <img src="Admin-Quản lý đơn hàng.png">

  - Admin chuyển trạng thái đơn hàng
    <img src="Admin-Chuyển Trạng thái đơn hàng.png">

  - Admin xem danh sách khách hàng
    <img src="Admin-Xem danh sách KH.png">
