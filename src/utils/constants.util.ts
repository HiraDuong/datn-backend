/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-10 02:31:19
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-16 23:13:02
 * @ Description:
 */
//! Code
export const CODE_SUCCESS = '200';
export const CODE_CREATED = '201';
export const CODE_NO_CONTENT = '204';

export const CODE_ERR = '500';

export const CODE_ERR_TIMEOUT = '408';
export const CODE_ERR_NOT_FOUND = '404';
export const CODE_ERR_BAD_REQUEST = '400';
export const CODE_ERR_UNAUTHORIZED = '401';
export const CODE_ERR_FORBIDDEN = '403';
// ! Message
export const MESSAGE_SUCCESS = 'Thành công';
export const MESSAGE_CREATED = 'Tạo mới thành công';
export const MESSAGE_NO_CONTENT = 'Không có dữ liệu';
export const MESSAGE_UPDATED = 'Cập nhật thành công';
export const MESSAGE_DELETED = 'Xóa thành công';

export const MESSAGE_ERR = 'Thất bại';
export const MESSAGE_ERR_TIMEOUT = 'Hết thời gian xử lý';
export const MESSAGE_ERR_NOT_FOUND = 'Không tìm thấy đường dẫn';
export const MESSAGE_ERR_BAD_REQUEST = 'Yêu cầu không hợp lệ';
export const MESSAGE_ERR_UNAUTHORIZED = 'Bạn chưa đăng nhập';
export const MESSAGE_ERR_FORBIDDEN = 'Bạn không có quyền truy cập';

export const MESSAGE_ERR_CREATE = 'Tạo mới thất bại';
export const MESSAGE_ERR_UPDATE = 'Cập nhật thất bại';
export const MESSAGE_ERR_DELETE = 'Xóa thất bại';
//? custom error message
//! Auth
export const MESSAGE_LOGIN_SUCCESS = 'Đăng nhập thành công';
export const MESSAGE_REGISTER_SUCCESS = 'Đăng ký thành công';
export const MESSAGE_LOGIN_FAILED = 'Đăng nhập thất bại';
export const MESSAGE_REGISTER_FAILED = 'Đăng ký thất bại';

export const MESSAGE_ERR_USER_NOT_FOUND = 'Người dùng không tồn tại';
export const MESSAGE_ERR_USER_EXISTED = 'Người dùng đã tồn tại';
export const MESSAGE_ERR_WRONG_EMAIL_PASSWORD = 'Sai email hoặc mật khẩu';
export const MESSAGE_ERR_EMAIL_EXISTED = 'Email đã tồn tại';
export const MESSAGE_ERR_EMAIL_NOT_FOUND = 'Email không tồn tại';

// ! User
export enum UserRole {
    Admin = 'admin',
    User = 'user',
}

// ! Task
export enum TaskType {
    Test = 'test',
    Exercise = 'exercise',
}
