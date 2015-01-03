
$(window).load(function() {
  var children = function() {
    var $children = $('.entry').children('.col-md-4');
    var cnt = 0;
    while(cnt < 12) {
     $children[cnt].data("child",cnt);
     $children[cnt+1].data("child",cnt+1);
     $children[cnt+2].data("child",cnt+2);
      var row = $children[cnt],$children[cnt+1],$children[cnt+2];
      
      console.log(row);
      cnt +=3;
    }
    console.log($children);
  }; 
  window.setTimeout(children,450);

})