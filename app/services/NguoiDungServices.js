function NguoiDungServices(){
    this.layDanhSachNguoiDung = function(){
        //this.DSND = []
        return $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET"
        })
        .done(function(result){
            
            // taoBang(result);
            // console.log(result);
        })
        .fail(function(err){
            console.log(err);
        })
    }
    this.themNguoiDung = function(nguoiDung){
        $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: nguoiDung
        })
        .done(function(result){
            if(result === "tai khoan da ton tai"){
                alert(result);
            }else{
                location.reload();
            }
        })
        .fail(function(err){
            console.log(err);
        })
    }
    this.xoaNguoiDung = function(taiKhoan){
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taiKhoan}`,
            type: "DELETE"
        })
        .done(function(result){
            console.log(result);
        })
        .fail(function(err){
            console.log(err);
        })
    }
    this.timKiemNguoiDung = function(chuoiTimKiem){
        var mangTimKiem = []
        var dsnd =JSON.parse(localStorage.getItem("danhSachNguoiDung"));

        dsnd.map(function(item){
            if(item.TaiKhoan.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1){
                mangTimKiem.push(item);
            }
        })
        return mangTimKiem;
    }
}

