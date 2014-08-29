/**
 * rehrh
 * Version : 1.0
 * Par Jean-Christophe "Jissaii" PUGINIER
 * https://github.com/Jissaii/knobyPlayer
 **/

(function($, undefined) {
	"use strict";

	$.fn.knobPlayer = function(params) {

		// Actions du plugin
		this.each(function() {
			// C'est parti
			var $this = $(this);

			var player = document.querySelector('#monplayer'),
		    $playerJQ = $this;
		    $timerBar = $('#timer'),
		    $valueTemps = $('#valueTemps')
			btnPlay = $('#play'),
			btnStop = document.querySelector('#stop')
			slideVolume = document.querySelector('#volume'),
			//slideVolumeValue = document.querySelector('#affichageVolume'),
			timerBar = document.querySelector('.temps'),
			isPlaying = false,
			z = 0,
			y = 0;

		// Fonctions
		var init = function() {
			slideVolume.value = player.volume * 100;
			//slideVolumeValue.innerHTML = slideVolume.value + '%';
			timerBar.value = 0;
		}

		var Lecture = function() {
			$playerJQ[0].play();
			isPlaying = true;
			btnPlay.removeClass('fa-play').addClass('fa-pause');
		}

		var Pause = function() {
			player.pause();
			isPlaying = false;
			btnPlay.removeClass('fa-pause').addClass('fa-play');

		}

		var Stop = function() {
			Pause();
			player.currentTime = 0;
		}

		var ChangerVolume = function(volumeValue) {
			console.log('Volume change.');
			console.log('Value : '+ volumeValue)
			player.volume = volumeValue / 100;
			//slideVolumeValue.innerHTML = slideVolume.value + '%';
		}

		var ChangerTemps = function(tempsValue) {
			console.log('tempsValue : '+ tempsValue)

			//Diviser le slider par 100 pour avoir une valeur comprise
			//comprise entre 0 et 1

			var timerBarParCent = tempsValue / 100;
			console.log('timerBarParCent : '+ timerBarParCent)

			//Multiplier le temps total par la valeur d'au dessus
			//Admettons que la musique fasse 100s., on veut aller au milieu
			// on a tempsTotal = 100
			// On fait donc : 100 * 0.5 (on obtient 50)
			// et on arrive au milieu

			player.currentTime = player.duration * timerBarParCent;

		};

		var AfficherTemps = function() {
		    if($playerJQ[0].duration > 60) {
		        var nbMin = Math.floor($playerJQ[0].currentTime / 60);
		        var nbSec = Math.floor($playerJQ[0].currentTime % 60);
		        if (nbSec < 10 ) {
		            nbSec = '0' + nbSec;
		        }
		        $valueTemps.text(nbMin + ':' + nbSec);
		    } else {
		        $valueTemps.text($playerJQ[0].currentTime);
		    }
		};

		init();

		// Evenements

		$playerJQ.on("timeupdate", function(){

		    var $currentTime = $playerJQ[0].currentTime,
		        $duration = $playerJQ[0].duration,
		        $valueTest = $currentTime / $duration*100;

		    $timerBar.val($valueTest).trigger('change');
		    AfficherTemps();
		});
		btnPlay.on('click', function(event) {
			!isPlaying ? Lecture() : Pause();
		});

		btnStop.addEventListener('click', Stop);

		//On déclare que les input deviennent des Knobs
		$(".volume").knob({

		    change : function (value) {
		    	z = value;
		    	ChangerVolume(value);

			}
		});

		$(".temps").knob({
		    change : function (value) {
		    	y = value;
		    	ChangerTemps(value);
			}
		});
				});

				// Chainage jQuery
				return this;
			};
})(jQuery);
