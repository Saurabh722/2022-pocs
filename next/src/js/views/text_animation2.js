var textAnimation2Component = {
	title: 'Text Animation using pure CSS',
	description: '',
	footerText: 'Last updated 27 Jan 2018',
	view: `
	<div class="view text-container">
		<div class="char-style bg-animation ch-s hidden tabindex"></div>
		<div class="text-style bg-animation text-1 tabindex">S</div>
		<div class="text-style bg-animation text-2 tabindex">A</div>
		<div class="text-style bg-animation text-3 tabindex">U</div>
		<div class="text-style bg-animation text-4 tabindex">R</div>
		<div class="text-style bg-animation text-5 tabindex">A</div>
		<div class="text-style bg-animation text-6 tabindex">B</div>
		<div class="text-style bg-animation text-7 tabindex">H</div>
		<div class="text-style bg-animation text-7 tabindex">H</div>
		<div class="circle"></div>
	</div>
	<script>
		function init() {
		  var $texts = $('.text-style, .circle');

		  $texts.on('click', function() {
			$texts.addClass('text-merge');
			setTimeout(function(){
				$('.text-merge').addClass('hidden');
				$('.char-style').toggleClass('hidden').addClass('rotate-and-sink');
			}, 600);

			setTimeout(function(){
				$('.char-style').toggleClass('rotate-and-sink').addClass('after-animation');
			}, 4000);
		  });
		}

		$(function(){
		  init();
		});

	</script>
	`
}

export { textAnimation2Component };