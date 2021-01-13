# Regular Expressions
Regular Expression hay còn gọi là biểu thức chính quy được dùng để xử lý chuỗi nâng cao thông qua biểu thức riêng của nó, những biểu thức này sẽ có những nguyên tắc riêng và bạn phải tuân theo nguyên tắc đó thì biểu thức của bạn mới hoạt động được. Ngoài cái tên gọi Regular Expression ra thì nó còn có thể viết tắt thành RegEx.
## Cách tạo ra một biểu thức chính quy.
Một biểu thức chính quy là một loại đối tượng. Nó có thể được xây dựng với constructor của RegExp hoặc được viết bằng cách kèm theo mẫu trong dấu gạch chéo /.
```
var regExp1 = new RegExp("abc");
var regExp2 = /abc/
```
## Một số nhóm ký tự thông dụng có các cách viết tắt riêng
- `w = [a-zA-Z0-9]` : word
- `W `: not word
- `\d` : digt
- `\D` : not digit
- `\s` : space
- `\S` : not space
- `.` : tất cả
- `[0-5]`: các ký tự số từ 0-5
- `[^0-9]`: Không là các ký tự số từ 0-9
- `^` : bắt đầu
- `$` : kết thúc
- `/b` : khai bao day la bat dau kytu, them /b vao cuoi khai bao ket thuc (tim 'dog' not 'doggg' su dung \bdog\b)
- `+` : 1-n
- `?` : co the co hoac khong
- `*` : 0-n
- `/g`: global
- `/i`: case insentive
- `/m`: mulltiline
- `{m} {m,n}  {m,}` : Chi co m lan, trong khoaog tu m-n lan, nhieu hon m lan.
## Phương thức 
1. Phương thức TEST 
Là phương thức tìm kiếm giá trị chuỗi và trả về true  hoặc false.
```
    let testStr = “Hello Man”;
    let testReg = /Man/;
    testStr.test(testReg); return True
```
2. Phương thức Match 
Là phương thức có trích xuất kết quả tìm kiếm nếu có.
```
let testStr = “Hello Man, Mans,M”;
let testReg = /Man/;
testStr.match(testReg); return 'Man, Man'
```