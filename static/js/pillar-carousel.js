(function () {
  var track = document.getElementById('pillar-track');
  if (!track) return;

  var slides = Array.prototype.slice.call(track.querySelectorAll('.pillar-slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.pillar-dot'));
  var prevBtn = document.querySelector('.pillar-prev');
  var nextBtn = document.querySelector('.pillar-next');
  var currentIndex = 0;

  function setActiveDot(index) {
    currentIndex = index;
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
    });
  }

  function goToIndex(index) {
    var clamped = Math.max(0, Math.min(slides.length - 1, index));
    var target = slides[clamped];
    if (target) {
      track.scrollTo({ left: target.offsetLeft, behavior: 'auto' });
      setActiveDot(clamped);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goToIndex(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goToIndex(currentIndex + 1);
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goToIndex(i);
    });
  });

  if ('IntersectionObserver' in window && slides.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        var visible = entries.filter(function (entry) {
          return entry.isIntersecting;
        });
        if (!visible.length) return;
        visible.sort(function (a, b) {
          return b.intersectionRatio - a.intersectionRatio;
        });
        var index = slides.indexOf(visible[0].target);
        if (index !== -1) setActiveDot(index);
      },
      { root: track, threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] }
    );
    slides.forEach(function (slide) {
      observer.observe(slide);
    });
  }
})();
