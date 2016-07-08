(function () {
  var EMOJI = [
    '🐛', '🐝', '🌴', '🌵', '🍊', '🍉', '🌮', '🍟', '🍦', '🏈', '💸', '🇺🇸', '🇨🇦',
    '💖', '🎈', '🎊', '⚽️', '🎷', '🍾', '🍕', '🍍', '🍃', '🕊', '🦄', '👰', '👻', '🐶',
    '🐷', '🐳', '🐚', '🔥', '✨', '☄️', '🍳', '📟', '📠', '💾', '📡', '💿', '📼'
  ];

  function makeFloatingEmoji() {
    // Create the element
    var element = document.createElement('div');
    element.classList.add('floating-emoji');

    // Add an emoji
    element.innerHTML = EMOJI[Math.floor(Math.random()*EMOJI.length)];;

    // Make it fall for a randomish amount of time
    var randomDuration = randomNumberBetween(7500, 10000);
    element.style.animationDuration = randomDuration + 'ms';

    // Random left value
    var randomLeft = randomNumberBetween(1, 99);
    element.style.left = randomLeft + '%';

    // Append to body
    document.body.appendChild(element);

    // Fade out and remove the element
    window.setTimeout(function () {document.body.removeChild(element)}, randomDuration);
  }

  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var currentKeyframes = null;
  function createKeyframes() {
    var keyframe = document.createElement('style');
    keyframe.innerHTML = "@keyframes fall-from-top { \n\
      0% { transform: translateY(-30px); } \n\
      100% { transform: translateY(" + (window.innerHeight + 10) + "px); } \n\
    }";

    if (currentKeyframes !== null) { document.head.removeChild(currentKeyframes) }
    document.head.appendChild(keyframe);
  }

  function hideFaq() {
    var container = document.querySelector('.faq');

    container.classList.remove('slide-up');
    container.classList.remove('bounce-in');
    container.classList.add('slide-down');
    window.setTimeout(function () {container.classList.add('bounce-out');}, 50);
    document.body.style.overflow = 'hidden';
  }

  function showFaq() {
    var container = document.querySelector('.faq');

    container.classList.remove('slide-down');
    container.classList.remove('bounce-out');
    container.classList.add('slide-up');
    window.setTimeout(function () {container.classList.add('bounce-in');}, 0);
    document.body.style.overflow = 'auto';
  }

  document.addEventListener("DOMContentLoaded", function(event) {
    createKeyframes();
    window.addEventListener('resize', createKeyframes);

    for (var i = 0; i < 3; i++) { makeFloatingEmoji() }
    window.setInterval(makeFloatingEmoji, 700);

    document.querySelector('.more').addEventListener('click', showFaq);
    document.querySelector('.close-faq').addEventListener('click', hideFaq);
  });
})()
