/* Credit to Luke Jacksonn */

document.addEventListener('DOMContentLoaded', function() {
  // var $btn = document.querySelectorAll('nav button');
  var $visibleLinks = document.querySelector('nav ul');
  var $hiddenLinks  = document.querySelector('nav .more ul');

  // var numOfItems = 0;
  var breakWidths = [];
  var _totalSpace = 0;

  for (const li of $visibleLinks.children) {
    if (li === $visibleLinks.children.lastChild) {
      continue;
    }
    _totalSpace += li.offsetWidth
    // numOfItems++
    breakWidths.push(_totalSpace)
  }

  function moveToHidden () {
    var target = $visibleLinks.children[$visibleLinks.children.length - 2]
    if (target) {
      $hiddenLinks.prepend(target)
    }
  }

  function moveToVisible () {
    var target = $hiddenLinks.children[0]
    if (target) {
      $visibleLinks.insertBefore(target, $visibleLinks.lastChild)
    }
  }

  function checkSpace () {
    var mediaQuery = window.matchMedia('(min-width: 600px)').matches
    breakWidths.forEach(currentBreak => {
      var numOfVisibleItems = $visibleLinks.children.length;
      var availableSpace = $visibleLinks.offsetWidth - 10;
      var requiredSpace = breakWidths[numOfVisibleItems - 1];

      if (!mediaQuery) {
        moveToHidden()
      } else {
        if (requiredSpace > availableSpace) {
          moveToHidden();
        }
        if (availableSpace > currentBreak) {
          moveToVisible()
        }
      }

    })
  }

  window.addEventListener('resize', checkSpace)
  checkSpace()

});
