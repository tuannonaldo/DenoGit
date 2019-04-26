$(document).ready(function(){
    var nguoiDungServices = new NguoiDungServices();

    layDanhSachNguoiDung();

    function getInput(title, btnTitle, btnID){
        $(".modal-title").html(title)
        var footer = `
            <button id="${btnID}" class="btn btn-success">${btnTitle}</button>
            <button type"button" class="btn btn-danger" data-dismiss="modal">Close</button>
        `
        $(".modal-footer").html(footer);
    }

    $("#btnThemNguoiDung").click(function(){
        getInput("Thêm người dùng", "Thêm","btnThem");
    })
    $("body").delegate(".btnXoa", "click",function(){
        var taiKhoan = $(this).data('taikhoan');
        nguoiDungServices.xoaNguoiDung(taiKhoan);
    })
    $("body").delegate(".btnSua", "click", function(){
        getInput("Sửa người dùng", "Cập nhật","btnCapNhat");
    })
    $("body").delegate("#btnThem", "click", function(){
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();

        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, loaiNguoiDung);
        console.log(nguoiDung);
        nguoiDungServices.themNguoiDung(nguoiDung);
    })
    
    $("#txtTimKiem").keyup(function(){
        var mangTimKiem = []
        var taiKhoan = $("#txtTimKiem").val();
        console.log(taiKhoan);
        mangTimKiem = nguoiDungServices.timKiemNguoiDung(taiKhoan);
        taoBang(mangTimKiem);
        
    })

    function layDanhSachNguoiDung(){
        nguoiDungServices.layDanhSachNguoiDung()
        .done(function(result){
            taoBang(result);
            localStorage.setItem("danhSachNguoiDung", JSON.stringify(result));
        })
        .fail(function(err){
            console.log(err);
        })
    }
    
})
function taoBang(danhSachNguoiDung){
    var tblBody = "";
    danhSachNguoiDung.map(function(item, index){
    tblBody += `
             <tr>
                 <td>${index + 1}</td>
                 <td>${item.TaiKhoan}</td>
                 <td>${item.MatKhau}</td>
                 <td>${item.HoTen}</td>
                 <td>${item.Email}</td>
                 <td>${item.SoDT}</td>
                 <td>${item.TenLoaiNguoiDung}</td>
                 <td>
                     <button  class="btn btn-success btnSua" data-toggle="modal" data-target="#myModal">Sửa</button>
                     <button  class="btn btn-danger btnXoa" data-taikhoan="${item.TaiKhoan}">Xóa</button>
                 </td>
             </tr>
         `
    })
    $("#tblDanhSachNguoiDung").html(tblBody);
}