$(function() {
  $(".comment").click(function(){
    var target = $(this);
    var toId = target.data('tid');
    var commentId = target.data('cid');
    $("input[name='comment[tid]']").remove();
    $("input[name='comment[cid]']").remove();
    $('<input>').attr({
      type:'hidden',
      name:'comment[tid]',
      value:toId
    }).appendTo('#commentForm');

    $('<input>').attr({
      type:'hidden',
      name:'comment[cid]',
      value:commentId
    }).appendTo('#commentForm');
  })
})