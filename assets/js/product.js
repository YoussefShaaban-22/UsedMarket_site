let all=document.querySelectorAll('.all img');
let view=document.querySelector('.view img');
for(let i=0;i<all.length;i++){
    all[i].addEventListener('click',function(){
        view.src=all[i].src;
    })
}
