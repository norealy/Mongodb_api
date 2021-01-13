# Git Tutorials
Git là một hệ thống quản lý phiên bản phân tán.

##	Vòng đời của git
![Alt image](https://miro.medium.com/max/3000/1*FuM682FUhsjqkFWJasu2Tw.png)
_Hình ảnh trên đây mô tả vòng đời của git, mỗi tập tin trong thư mục làm việc của git có thể ở một trong hai trạng thái: tracked hoặc untracked._
* **Untracked**: Một file khi ở trạng thái untracked là một file chưa thuộc sự quản lý của git.
* **Tracked**: Một file nằm trong sự quản lý của git sẽ có trạng thái là tracked.
* *	**Unmodified**: _Một file khi được commit thì sẽ nằm trong trạng thái unmodified._
* * **Modified** : _Có sự thay đổi bất kỳ nội dung nào trong file thì sẽ được chuyển sang trạng thái modified._
* *	**Staged**: _untracked sau khi được add sẽ chuyển sang trạng thái staged và sẵn sàng để commit._

File **.gitignore**: liệt kê những file mà mình không mong muốn cho vào git. Gitignore hiện nay rất quan trọng trong team work, các bạn nên áp dụng ngay vào quy trình làm việc của team.

## Một số lệnh hay sử dụng trong git
*	_**Git config**_ : 
_Git config là lệnh giúp ta cấu hình cũng như hiển thị các cấu hình của git._
*	_**Git init**_ : 
_Git init là lệnh để khởi tạo một kho lưu trữ (repository) tại local._
*	_**Git status**_ : 
_Git status là lệnh để kiểm tra trạng thái của thư mục làm việc hiện tại._
*	_**Git add**_ : 
_Git add là lệnh để thêm một file vào index, nghĩa là chuyển file được chỉ định sang trạng thái staged và sẵn sàng để commit._
*	_**Git commit**_ : 
_Git commit là lệnh để ghi lại những thay đổi và kho lưu trữ._
*	_**Git push**_ : 
_Git push là lệnh để cập nhật kho lưu trữ từ xa (remote repository) bằng cách đẩy kho lưu trữ local lên kho lưu trữ từ xa._
*	_**Git pull**_ : 
_Git pull là lệnh để cập nhật những thay đổi từ kho lưu trữ từ xa về local nhằm đồng bộ hóa._
*	_**Git remote -v**_ : 
_Git remote là lệnh để kiem tra response remote._
*	_**Git remote add `<branch> <git_url>`**_ : 
_Git remote add git url vao remote._

