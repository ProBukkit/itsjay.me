Particles.init({
  selector: ".background",
  sizeVariations: 5,
  color: "#19e8b4"
});
const scroller = e => {
  if (e.deltaY > 0) {
    const current = $(".content:visible:first");
    const next = current.next(".content");
    const test = next[0] ? next : false;
    if (test) {
      const scroll = $(
        ".scroller ul li span:eq( " + (current.index() - 2) + " )"
      );
      const nextscroll = scroll
        .parent()
        .next()
        .children();
      scroll.removeClass("thisSlide");
      nextscroll.addClass("thisSlide");

      current.removeClass("fadeInUp").addClass("fadeOutUp");

      window.setTimeout(() => {
        current.hide();
        current.removeClass("fadeOutUp");
        test.addClass("fadeInUp").show();
      }, 1000);
    }
  } else {
    const current = $(".content:visible:first");
    const previous = current.prev(".content");
    const test = previous[0] ? previous : false;
    if (test) {
      const scroll = $(
        ".scroller ul li span:eq( " + (current.index() - 2) + " )"
      );
      const prevscroll = scroll
        .parent()
        .prev()
        .children();
      scroll.removeClass("thisSlide");
      prevscroll.addClass("thisSlide");

      current.addClass("fadeOutDown");

      window.setTimeout(() => {
        current.hide();
        current.removeClass("fadeOutDown");
        previous.addClass("fadeInDown").show();
      }, 1000);
    }
  }
};
document.body.addEventListener("wheel", scroller);
