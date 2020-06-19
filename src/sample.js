const messages=[
  {
    message:"Heads up, toasts will stack automatically!",
    type:"info"
  },
  {
    message:"you resived a new message",
    type:"info"
  },
  {
    message:"データベース更新しました！",
    type:"success"
  },
  {
    message:"システムエラーが発生しました!",
    type:"danger"
  },
  {
    message:"データを削除します、よろしいですか？",
    type:"warning"
  }
  
]

//draw grid
function drawgrid(container,show) {
  if (!show) {
    container.hide();
    return;
  }
  let rows = [];
  let cols = [];
  let widths = [12, 6, 4, 3, 2, 1, 3, 4];
  //row1
  rows.push('<div class="row">');
  for (var w of widths) {
    cols = [];
    // rows.push('<div class="row">');
    for (let i = 0; i < w; i++) {
      let num = (i + 1) % 2 === 0 ? 1 : 2;
      cols.push(
        `<div class="table-bordered border-gray col-md-${Math.trunc(
          12 / w
        )} col-6">box${i + 1}</div>`
      );
    }
    rows.push(cols.join(""));
    // rows.push("</div>");
  }
  rows.push("</div>");
  container.html(rows.join(""));
}
//見出し（H1~H6）
function drawHeading(show) {
  if (!show) {
    $(".heading").hide();
    return;
  }
  let html = [];
  for (let i = 1; i < 7; i++) {
    html.push(`<h${i} class="m-2 text-bla""ck-70">見出し${i}</h${i}>`);
  }
  $(".heading").html(html.join(""));
}
//table 描画
function drawTable(container,show) {
  if (!show) {
    container.hide();
    return;
  }
  let html = [];
  html.push(
    "<table class='table table-bordered  table-sm  table-striped table-hover '>"
  );
  html.push("<thead class='thead-dark'><tr>");
  for (let i = 0; i < 4; i++) {
    html.push(`<th scope="col">col${i}</th>`);
  }
  html.push("</tr></thead>");
  html.push("<tbody>");
  for (let row = 0; row < 10; row++) {
    html.push("<tr>");
    for (let col = 0; col < 4; col++) {
      if (col === 0) {
        html.push(`<td scope="col">${row + 1}</td>`);
      } else {
        html.push(`<td scope="col">data-${row}-${col} </td>`);
      }
    }
    html.push("</tr>");
  }
  html.push("</tbody>");
  html.push("</table");
  container.html(html.join(""));
}
function drawColorTable(show) {
  if (!show) {
    $(".color-table").hide();
    return;
  }
  const colors = [
    "table-active",
    "table-primary",
    "table-secondary",
    "table-danger",
    "table-warning",
    "table-info",
    "table-light",
    "table-dark",
  ];
  const cols = ["#", "class", "content"];
  let html = [];
  html.push(
    "<div class='table-responsive-sm'>",
    "<table class='table table-sm table-hover '>",
    "<caption>the Contextual classes of table</caption>"
  );
  html.push("<thead class='thead-dark'><tr>");
  for (col of cols) {
    html.push(`<th scope="col">${col}</th>`);
  }
  html.push("</tr></thead>");
  html.push("<tbody>");
  for (let row in colors) {
    html.push(`<tr class="${colors[row]}">`);
    html.push(`<td scope="col">${row}</td>`);
    html.push(`<td scope="col">${colors[row]}</td>`);
    html.push(`<td scope="col">これは${colors[row]}の行です</td>`);
    html.push("</tr>");
  }
  html.push("</tbody>");
  html.push("</table");
  html.push("</div");

  $(".color-table").html(html.join(""));
}
function drawImages(container,show) {
  if (!show) {
    container.hide();
    return;
  }
  let html=[];
  let width,height;
  html.push( "<div class='embed-responsive'>")
  for(let i=0;i<20;i++){
    width=Math.trunc( Math.random()*100)+200;
    height=Math.trunc( Math.random()*100)+200;
    html.push(
        `<img src="https://picsum.photos/250/200?tm=${i}" class=" img-fluid rounded m-1" >`
    );
  }
  html.push( "</div>");
  container.html(html.join(""));
}



function showToast(title,{message,type},time){
  let html=[];
  let index=$('.toast').length+1;
  let id=`toast-${index}`;
  let container =$('#toast-container');
  if(container.length===0){
    $("body").append('<div id="toast-container" style="position: absolute; top: 0; right: 0 ;width:auto; height:100%"></div>');
  }
  html.push(
   `<div id="${id}" class="toast rounded-rounded-lg" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header bg-${type}">
        <strong class="mr-auto text-white">${title}</strong>
        <small class="text-white-50">${time} mins ago</small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
   </div>`
  );
  $("#toast-container").append(html.join(""));
  $(`#${id}`).toast({
    animation:true,
    autohide:true,
    delay:5000
  });

  $(`#${id}`).toast('show');
}

$(function () {
  //draw grid
  $("#showGrid").click(function(){
    let target = $(this).data("target");
    let isshow = !$(this).data("show");
    drawgrid($(target),isshow);
    $(this).data("show",isshow);
  });
  
  //見出し書く
  drawHeading(false);
  $("#showTable").click(function(){
    let target = $(this).data("target");
    let isshow = !$(this).data("show");
    drawTable($(target),isshow);
    $(this).data("show",isshow);
  });
 
  drawColorTable(false);
  
  $("#showimgs").click(function(){
    let target = $(this).data("target");
    let isshow = !$(this).data("show");
    drawImages($(target),isshow);
    $(this).data("show",isshow);
  });
 
  
  $('[data-toggle="popover"]').popover(
    {
      trigger:'focus'
    }
  );
  $("#showCode").click(function(){
    let target = $(this).data("target");
    let isshow = !$(this).data("show");
    isshow? $(target).show():$(target).hide();
    $(this).data("show",isshow);
  });
  $('#showToast').click(function(){
    let id= Math.round((Math.random() * 9 ) / 2);
    showToast('System Message',messages[id],1);
  });
  
});
