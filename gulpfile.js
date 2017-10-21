var gulp = require('gulp');
var fs = require('fs');

gulp.task('default', ["sassCom","imgMin","jsMin","wath"], () => {
    console.log("编译完成！")
});

// sass编译
var sassCompile = require('gulp-sass');
gulp.task('sassCom', function () {
    gulp.src('src/sass/*.scss')
        .pipe(sassCompile())
        .pipe(gulp.dest('public/stylesheets'));
});

// 监控任务变化
gulp.task('wath',function(){ 
    gulp.watch('src/sass/*.scss',['sassCom']);
    // gulp.watch('src/views/*.jade',['jadeCom']);
    gulp.watch('src/js/*.js',['jsMin']);
})

// js压缩
var uglify=require('gulp-uglify'); 
gulp.task("jsMin",()=>{
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts'));
    console.log('js压缩完毕！');
});
// jade编译
// var jadeCompile = require('gulp-jade');
// gulp.task('jadeCom', () => {
//     // var YOUR_LOCALS = {};
//     gulp.src('views/*.jade')
//         .pipe(jadeCompile({
//             pretty: true 
//         }))
//         .pipe(gulp.dest('src/views'));
//     console.log("jade编译完成！")
// });

// 图片压缩
var imagemin = require('gulp-imagemin');
gulp.task('imgMin', () =>{
    gulp.src('src/images/',{base:'src'})
        .pipe(imagemin())
        .pipe(gulp.dest('public'));
    console.log("图片压缩完成！")
});

