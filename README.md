#### Team
* 21020001 Nguyen Viet Anh
* 21020003 Pham Van Binh
* 21020034 Hoang Minh Thai

##### Nội dung chính:
Ngôn ngữ UPL:
- Bắt đầu và kết thúc chương trình bằng cặp từ khóa `begin` và `end`.
- Có hai kiểu dữ liệu là số nguyên `(int)` và `boolean (bool)`.
- `id` bắt đầu bằng ký tự chữ, nếu có ký tự số thì phải ở cuối (có thể có nhiều).
- Biến phải được khai báo trước khi sử dụng. 
  - Biến có thể được khởi tạo cùng với câu lệnh khai báo (sử dụng phép gán).
  - Biến có thể gán giá trị nhưng không thể khởi tạo lại.
- Có 3 phép toán `>`, `>=`, `==`, ngoài ra sẽ thông báo lỗi.
- Có phát biểu lựa chọn `if then` và `if then else`.
- Có phát biểu lặp `do...while`
- Có phát biểu in ra màn hình `print` với tham số là một biểu thức.
- Có cơ chế comment như của Java (nghĩa là có cả `/*...*/` và `//…`).
- Kiểm tra và phát hiện trường hợp dấu ngoặc bị thiếu.

##### Lỗi:
Trong trường hợp gặp lỗi sẽ in ra kí tự lỗi và dòng lỗi.
ví dụ:
```
begin
	/*	comments
	cho nhiều dòng
	*/
	
  int y;
	bool    a;
  int a;
end


Error: a is already declared, line: 7
```

