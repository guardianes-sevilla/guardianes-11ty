/* Credit to Luke Jacksonn */

document.addEventListener('DOMContentLoaded', function() {
  // var $btn = document.querySelectorAll('nav button');
  var $vlinks = document.querySelector('nav ul');
  var $hlinks = document.querySelector('nav .more ul');

  var numOfItems = 0;
  var totalSpace = 0;
  var breakWidths = [];

  for (const li of $vlinks.children) {
    if (li === $vlinks.children.lastChild) {
      continue;
    }
    totalSpace += li.offsetWidth
    numOfItems++
    breakWidths.push(totalSpace)
  }

  var availableSpace, numOfVisibleItems, requiredSpace;

  function checkSpace() {

    // Get instant state
    availableSpace = $vlinks.offsetWidth - 10;
    numOfVisibleItems = $vlinks.children.length;
    requiredSpace = breakWidths[numOfVisibleItems - 1];

    // Not enough space
    if (requiredSpace > availableSpace) {
      $hlinks.prepend($vlinks.children[$vlinks.children.length - 2])
      numOfVisibleItems -= 1;
      checkSpace();

      // More than enough space
    } else if (availableSpace > breakWidths[numOfVisibleItems]) {
      $vlinks.insertBefore($hlinks.children[0], $vlinks.lastChild)
      numOfVisibleItems += 1;
      if (availableSpace > breakWidths[numOfVisibleItems]) {
        checkSpace()
      }
    }
    // Update the button
    // $btn.attr("count", numOfItems - numOfVisibleItems);
    // if (numOfVisibleItems === numOfItems) {
    //   $btn.addClass('hidden');
    // } else $btn.removeClass('hidden');
  }

  // $btn.on('click', function() {
  //   $hlinks.toggleClass('hidden');
  // });

  window.addEventListener('resize', checkSpace)
  checkSpace()

});
