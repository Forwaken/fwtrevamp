var fwt = function () {
	// Canvas
	var canvas = $('.activity#game canvas')[0];
	var out = canvas.getContext('2d');

	// Board
	var map, compiled;
	var width = 10, height = 24, levelstart = 0, lastLine;
	var coincount = 0;
	$('.footcoin#foot #right').html("Coins: " + coincount.toFixed(2));

	// Game
	var gameStatus = 0; // 0: no init - 1: over - 2: paused - 3: game
	var level, score, linecount, dropBonus;
	var rnd0, rnd1, rnd2, rnd3, rnd4;
	var seed = [];

	// Velocity
	var delay = 0, normalDelay = 50, limitDelay = normalDelay;

	// Pieces
	var colors = ["red", "green", "cyan", "orange", "blue", "white", "yellow", "purple"];
	var mats = [];
	var mat1, mat2, mat3, mat4;
	var mat1 = true;
	var next1, next2, next3, hold, current, temp, shade, invisible;
	var clock = 0;
	var forms = [];
	var sp1, sp2, sp3, sp4, sp5, sp6, sp7, sp8, sp9, sp10, sp11, sp12, sp13, sp14, sp15, sp16, sp17, sp18, sp19, sp20, sp21, sp22, sp23, sp24, sp25, sp26, sp27, sp28, sp29, sp30, sp31, sp32, sp33, sp34, sp35, sp36, sp37, sp38, sp39, sp40, sp41, sp42, sp43, sp44, sp45, sp46, sp47, sp48, sp49, sp50, sp51, sp52, sp53, sp54, sp55, sp56, sp57;
	var sp1 = true;
	var sp2 = true;
	var sp3 = true;
	var sp4 = true;
	var sp5 = true;
	var sp6 = true;
	var sp7 = true;

	// Options
	var shadeEnabled = true;
	var invisibleEnabled = false;
	var speed = "medium"
	var rotation = "cc";
	var colorTheme = "iced";
		$('canvas#canvas').attr('data-theme', colorTheme);
	// Graphics
	var graphics = {iced: {}, retro: {o: [], t: []}, crayon: {o: [], t: []}, recent: {o: [], t: []},bckwht: {o: [], t: []}, gameboy: {o: [], t: []}, bit8: {o: [], t: []}, face: {o: [], t: []}, billiard: {o: [], t: []}, dark: {o: [], t: []}, stud: {o: [], t: []}, block: {o: [], t: []}, panel: {o: [], t: []}, crystal: {o: [], t: []}, classic: {o: [], t: []}};
	
	// rAF
	window.requestAnimFrame = (function () {
		return window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	window.cancelAnimFrame = (function () {
		return window.cancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			window.msCancelAnimationFrame ||
			window.oCancelAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.clearTimeout;
	})();

	//-> Get preferences from localStorage if any
	try{
		prefs = $.evalJSON(localStorage.fwtPreferences);
		width = prefs.width || width;
		height = prefs.height || height;
		levelstart = prefs.levelstart || levelstart;
		seed = prefs.seed || seed;
		colorTheme = prefs.theme || colorTheme;
			$('canvas#canvas').attr('data-theme', colorTheme);
		shadeEnabled = prefs.shades || shadeEnabled;
		invisibleEnabled = prefs.invisibles || invisibleEnabled;
		speed = prefs.speed || speed;
		rotation = prefs.rotation || rotation;
		sp1 = prefs.sp1s;
		sp2 = prefs.sp2s;
		sp3 = prefs.sp3s;
		sp4 = prefs.sp4s;
		sp5 = prefs.sp5s;
		sp6 = prefs.sp6s;
		sp7 = prefs.sp7s;
		sp8 = prefs.sp8s;
		sp9 = prefs.sp9s;
		sp10 = prefs.sp10s;
		sp11 = prefs.sp11s;
		sp12 = prefs.sp12s;
		sp13 = prefs.sp13s;
		sp14 = prefs.sp14s;
		sp15 = prefs.sp15s;
		sp16 = prefs.sp16s;
		sp17 = prefs.sp17s;
		sp18 = prefs.sp18s;
		sp19 = prefs.sp19s;
		sp20 = prefs.sp20s;
		sp21 = prefs.sp21s;
		sp22 = prefs.sp22s;
		sp23 = prefs.sp23s;
		sp24 = prefs.sp24s;
		sp25 = prefs.sp25s;
		sp26 = prefs.sp26s;
		sp27 = prefs.sp27s;
		sp28 = prefs.sp28s;
		sp29 = prefs.sp29s;
		sp30 = prefs.sp30s;
		sp31 = prefs.sp31s;
		sp32 = prefs.sp32s;
		sp33 = prefs.sp33s;
		sp34 = prefs.sp34s;
		sp35 = prefs.sp35s;
		sp36 = prefs.sp36s;
		sp37 = prefs.sp37s;
		sp38 = prefs.sp38s;
		sp39 = prefs.sp39s;
		sp40 = prefs.sp40s;
		sp41 = prefs.sp41s;
		sp42 = prefs.sp42s;
		sp43 = prefs.sp43s;
		sp44 = prefs.sp44s;
		sp45 = prefs.sp45s;
		sp46 = prefs.sp46s;
		sp47 = prefs.sp47s;
		sp48 = prefs.sp48s;
		sp49 = prefs.sp49s;
		sp50 = prefs.sp50s;
		sp51 = prefs.sp51s;
		sp52 = prefs.sp52s;
		sp53 = prefs.sp53s;
		sp54 = prefs.sp54s;
		sp55 = prefs.sp55s;
		sp56 = prefs.sp56s;
		sp57 = prefs.sp57s;
		mat1 = prefs.mat1s;
		mat2 = prefs.mat2s;
		mat3 = prefs.mat3s;
		mat4 = prefs.mat4s;
	} catch(e){
		//-> No action
	}

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	var prepare = function (saved) {
		map = saved.map;
		current = saved.current;
		next1 = saved.next1;
		next2 = saved.next2;
		next3 = saved.next3;
		hold = saved.hold;

		window.cancelAnimFrame(clock);

		lastLine = saved.lastLine;
		gameStatus = 3;
		setNextPiece(false, true); // -> This requires gameStatus > 1

		score = saved.score;
		$('.activity#game #next #score').html(score);
		
		linecount = saved.linecount;
		$('.activity#game #next #linecount').html('<span class="xtr" data-xtr="linecount-lab">' + $.i18n._('linecount-lab') + '</span> ' + linecount);
		
		level = saved.level;
		$('.activity#game #next #level').html('<span class="xtr" data-xtr="level-lab">' + $.i18n._('level-lab') + '</span> ' + level);

		dropBonus = saved.dropBonus;

		clock = window.requestAnimFrame(pulse);
		pause(1);
	}

	var newGame = function () {
		// Erase saved game
		localStorage.removeItem('saved');
		window.onbeforeunload = saveToLS;

		window.cancelAnimFrame(clock);
		
		set();
		mat();
		
		lastLine = height - 1;
		gameStatus = 3;

		normalDelay = 50;
		limitDelay = normalDelay;

		level = levelstart;
		score = 0;
		linecount = 0;
		$('.activity#game #next #score').html(score);
		$('.activity#game #next #level').html('<span class="xtr" data-xtr="level-lab">' + $.i18n._('level-lab') + '</span> ' + level);
		$('.activity#game #next #linecount').html('<span class="xtr" data-xtr="linecount-lab">' + $.i18n._('linecount-lab') + '</span> ' + linecount);

		resetMap();
		
		setNextPiece(true);
			
			arndForm = Math.round(Math.random() * (forms.length - 1));
			arndColor = Math.round(Math.random() * (colors.length - 1));
			arndMat = Math.round(Math.random() * (mats.length - 1));
			aiSource = Math.round(width / 2) - Math.round(forms[rndForm][0].length / 2);
			ajSource = forms[rndForm].length * -1;

			next1 = { i: aiSource, j: ajSource, mat: mats[arndMat], col: arndColor, form: forms[arndForm] }
			
			brndForm = Math.round(Math.random() * (forms.length - 1));
			brndColor = Math.round(Math.random() * (colors.length - 1));
			brndMat = Math.round(Math.random() * (mats.length - 1));
			biSource = Math.round(width / 2) - Math.round(forms[rndForm][0].length / 2);
			bjSource = forms[rndForm].length * -1;

			next2 = { i: biSource, j: bjSource, mat: mats[brndMat], col: brndColor, form: forms[brndForm] }
			
		dropBonus = 0;
		
		hold = next1;
		current = next1;
		next1 = next2;
		next2 = next3;
		
		loadSeed();
		
		setNextPiece();
		
		generateShade();

		clock = window.requestAnimFrame(pulse);
	}

	var pulse = function () {
		/* if (document.getElementById('audio').volume > 0) {
		document.getElementById('audio').volume -= 0.05;
		console.log('vol: ' + document.getElementById('audio').volume);
		}*/

		if (gameStatus != 3)
			return;

		delay++;

		if (delay > limitDelay) {
			delay = 0;

			if (canFall(current)) {
				current.j++;

				if (limitDelay == 1)
					dropBonus++;
			} else {
				mark(1 + dropBonus, 'pulse');
				if (!freeze())  // false -> game over
					return;

				dropBonus = 0;
				current = next1;
				next1 = next2;
				next2 = next3;

				setNextPiece();
				generateShade();
			}
		}

		repaint();
		clock = window.requestAnimFrame(pulse);
	}

	var drop = function () {
		if (gameStatus < 2)
			return;

		if (gameStatus == 2)
			pause();

		j1 = current.j;

		while (canFall(current))
			current.j++;

		mark((current.j - j1) + Math.floor((current.j - j1) / 2) + 1 + dropBonus, 'drop');
		freeze();

		dropBonus = 0;
		current = next1;
		next1 = next2;
		next2 = next3;

		setNextPiece();
		generateShade();

		delay = 0;
	}

	var holdk = function () {
		if (gameStatus < 2)
			return;

		if (gameStatus == 2)
			pause();

		temp = hold;
		hold = current;
		current = temp;
		
		current.j = 0;
		
		setNextPiece(false, true);
		generateShade();
	}
	
	var freeze = function () {
		for (var j = current.form.length - 1; j >= 0; j--) {
			for (var i = 0; i < current.form[j].length; i++) {
				if (current.form[j][i] == 1) {
					if (current.j + j >= 0) {
						map[current.j + j][current.i + i].mat = current.mat;
						map[current.j + j][current.i + i].col = current.col;
					} else {
						gameOver();
						return false;
					}
				}
			}
		}

		lastLine = Math.min(current.j, lastLine);

		checkLine();
		checkCol();

		return true;
	}

	var gameOver = function () {
		gameStatus = 1;
		repaint();
		clearNext();
		clearHold();

		// Erase saved game
		localStorage.removeItem('fwtActiveGame');
		window.onbeforeunload = null;

		// Erase saved/progress game menu item
		ui.stopGame();
	}

	var mark = function (plus, type, about) {
		// score //
		score += plus;
		$('.activity#game #next #score').html(score);
		
		// line count //
		$('.activity#game #next #linecount').html('<span class="xtr" data-xtr="linecount-lab">' + $.i18n._('linecount-lab') + '</span> ' + linecount);

		// level //
		calcLevel();
		
		// coin //
		if (type == "line") {
			if (invisibleEnabled == true) {
				coincount += (plus*0.05*forms.length*about/normalDelay);
			} else {
				coincount += (plus*0.01*forms.length*about/normalDelay);
			}
		} else {
			if (invisibleEnabled == true) {
				coincount += (plus*0.05*forms.length/normalDelay);
			} else {
				coincount += (plus*0.01*forms.length/normalDelay);
			}
		}
		$('.footcoin#foot #right').html($.i18n._('coincount') + coincount.toFixed(2));
		
		// osd //
		waitExtra = 0;
		classExtra = '';

		osdY = current.j * size - 25;
		if (osdY < 100)
			osdY = 100;
		osdX = (current.i * size) + (current.form[0].length * 25 / 2) - 250;

		msg = '';

		if (plus == 1)
			msg = rnd0[Math.round(Math.random() * 4)];

		if (plus > 1 && type == 'pulse') {
			max = height + Math.floor(height / 2) + 1;

			if (plus <= max / 2)
				msg = rnd1[Math.round(Math.random() * 4)];
			else
				msg = rnd2[Math.round(Math.random() * 4)];
		}

		if (lastLine < 5 && Math.random() * 5 > 2)
			msg = "Date prisa";

		if (type == 'drop')
			msg = rnd3[Math.round(Math.random() * 4)];

		if (plus >= 40 && type == "line") {
			msg = rnd4[about - 1];
			waitExtra = 400;
			classExtra = 'line';
		}

		$('<div>').html('¡' + msg + '! <strong>+ ' + plus + '</strong>').addClass(classExtra).css({ 'top': osdY, 'left': osdX, 'opacity': 0 }).appendTo('#osd').delay(waitExtra).animate({ 'top': osdY - 60, 'opacity': 1 }, 800, 'linear').animate({ 'top': osdY - 60 - 30, 'opacity': 0 }, 600, 'linear', function () {
			$(this).remove();
		});
	}

	var calcLevel = function() {
		level = Math.floor((score / (3000 + (linecount * 10))) + levelstart);
		if (speed == "high") {
				normalDelay = Math.floor((40 - (level ^ 0.8)) / 2);
				limitDelay = normalDelay;
			} else if (speed == "low") {
				normalDelay = Math.floor(40 - (level ^ 0.8)) * 1.5;
				limitDelay = normalDelay;
			} else if (speed == "medium") {
				normalDelay = Math.floor(40 - (level ^ 0.8));
				limitDelay = normalDelay;
			} else {
				normalDelay = Math.floor((40 * Math.random()) - (level ^ Math.random()));
				limitDelay = normalDelay;
			}
		$('.activity#game #next #level').html('<span class="xtr" data-xtr="level-lab">' + $.i18n._('level-lab') + '</span> ' + level);
		savePrefs();
	}

	var checkLine = function () {
		lines = 0;

		for (j = current.form.length - 1; j >= 0; j--) {

			n = 0;
			for (i = 0; i < width; i++) {
				if (map[current.j + j][i].mat == 0)
					break;
				else
					n++;
			}

			if (n == width) {
				for (j_involved = current.j + j; j_involved > lastLine; j_involved--) {
					for (i = 0; i < width; i++){
						if (map[j_involved - 1][i].mat != 4) {
							map[j_involved][i].mat = map[j_involved - 1][i].mat;  // IT CAN FAIL!
							map[j_involved][i].col = map[j_involved - 1][i].col;
						} else {
							map[j_involved][i].mat = map[j_involved][i].mat;
							map[j_involved][i].col = map[j_involved][i].col;
						}
					}
				}
				for (i = 0; i < width; i++){
					if (map[lastLine][i].mat != 4) {
						map[lastLine][i].mat = 0;
						map[lastLine][i].col = 0;
					} else {
						continue;
					}
				}
				lastLine++;
				j++;

				lines++;
				linecount++;
			}

		}

		if (lines > 0) {
			fsum = [10 + linecount, 50 + (linecount * 2), 200 + (linecount * 3), 1000 + (linecount * 4), 1000 + (linecount * 5), 1000 + (linecount * 6), 1000 + (linecount * 7), 1000 + (linecount * 8)];
			p = fsum[lines - 1];
			mark(p, "line", lines);
		}
	}
	
	var checkCol = function () {
		columns = 0;
		
		for (i = current.form[0].length - 1; i >= 0; i--) {

			n = 0;
			for (j = 0; j < height; j++) {
				if (map[j][current.i + i].mat == 3)
					n++
				else
					continue;
			}

			if (n > (height/2)) {
				for (j = 0; j < height; j++){
					map[j][current.i + i].mat = 0;
					map[j][current.i + i].col = 0;
				}
				i++;

				columns++;
				linecount++;
			}

		}

		if (columns > 0) {
			fsum = [10 + linecount, 50 + (linecount * 2), 200 + (linecount * 3), 1000 + (linecount * 4), 1000 + (linecount * 5), 1000 + (linecount * 6), 1000 + (linecount * 7), 1000 + (linecount * 8)];
			p = fsum[columns - 1];
			mark(p, "line", columns);
		}
	}

	var canFall = function (piece) {
		if (piece.j + piece.form.length == height)
			return false

		for (i = 0; i < piece.form[0].length; i++) {
			for (j = piece.form.length - 1; j > -1; j--) {
				if (piece.form[j][i] != 0) {
					if (map[piece.j + j + 1] !== undefined) {
						if (typeof map[piece.j + j + 1][piece.i + i] == 'undefined' || map[piece.j + j + 1][piece.i + i].mat != 0)
							return false;
					}
				}
			}
		}

		return true;
	}

	var right = function () {
		if (gameStatus < 2)
			return;

		if (gameStatus == 2)
			pause();

		if (canRight()) {
			current.i++;

			generateShade();
		}
	}

	var left = function () {
		if (gameStatus < 2)
			return;

		if (gameStatus == 2)
			pause();

		if (canLeft()) {
			current.i--;

			generateShade();
		}
	}

	var generateShade = function () {
		if (shadeEnabled) {
			shade = clone(current);

			while (canFall(shade)) {
				shade.j++;
			}
		}
	}


	var rotate = function () {
		if (rotation == "c")
			rotateC();
		else
			rotateCC();
	}

	var rotateC = function () {
		if (gameStatus < 2)
			return;

		if (gameStatus == 2)
			pause();

		aux = new Array(current.form[0].length);

		for (j = 0; j < aux.length; j++)
			aux[j] = new Array(current.form.length);

		k = 0;
		for (j = current.form.length - 1; j > -1; j--) {
			for (i = 0; i < current.form[j].length; i++) {
				aux[i][k] = current.form[j][i];
			}
			k++;
		}

		if (canRotate(aux)) {
			current.form = aux;
			generateShade();
		}
	}

	var rotateCC = function () {
		if (gameStatus < 2)
			return;

		if (gameStatus == 2)
			pause();

		aux = new Array(current.form[0].length);

		for (j = 0; j < aux.length; j++)
			aux[j] = new Array(current.form.length);

		k = current.form[0].length - 1;
		for (j = 0; j < aux.length; j++) {
			for (i = 0; i < aux[0].length; i++) {
				aux[j][i] = current.form[i][k];
			}
			k--;
		}

		if (canRotate(aux)) {
			current.form = aux;
			generateShade();
		}
	}

	var canRight = function () {
		if (current.i + 1 + current.form[0].length > width) {
			return false;
		}

		for (j = 0; j < current.form.length; j++) {
			for (i = current.form[0].length - 1; i > -1; i--) {
				if (current.form[j][i] != 0) {
					if (current.j + j > -1 && map[current.j + j][current.i + i + 1].mat != 0)
						return false;

					break;
				}
			}
		}

		return true;
	}

	var canLeft = function () {
		if (current.i - 1 < 0) {
			return false;
		}

		for (j = 0; j < current.form.length; j++) {
			for (i = 0; i < current.form[0].length; i++) {
				if (current.form[j][i] != 0) {
					if (current.j + j > -1 && map[current.j + j][current.i + i - 1].mat != 0)
						return false;

					break;
				}
			}
		}

		return true;
	}

	var canRotate = function (aux) {
		for (j = 0; j < aux.length; j++) {
			for (i = 0; i < aux[0].length; i++) {

				if (aux[j][i] != 0 && (current.j + j > 0)) {
					if (typeof map[current.j + j] == 'undefined' || typeof map[current.j + j][current.i + i] == 'undefined' || map[current.j + j][current.i + i].mat != 0)
						return false;
				}

			}
		}

		return true;
	}

	var resetMap = function () {
		map = new Array(height);

		for (j = 0; j < map.length; j++)
			map[j] = new Array(width);

		for (j = 0; j < map.length; j++) {
			for (i = 0; i < map[j].length; i++) {
				map[j][i] = {
					mat: 0,
					col: 0
				}
			}
		}
	}

	var pause = function (ii) {
		if (ii == 0) {
			if (gameStatus == 2) {
				gameStatus = 3;
				clock = window.requestAnimFrame(pulse);
			}
		} else if (ii == 1) {
			if (gameStatus == 3) {
				gameStatus = 2;
				repaint();
			}
		} else {
			if (gameStatus == 2) {
				gameStatus = 3;
				clock = window.requestAnimFrame(pulse);
			} else if (gameStatus == 3) {
				gameStatus = 2;
				repaint();
			}
		}
	}

	var repaint = function () {
		if (map !== undefined) {
			out.clearRect(0, 0, canvas.width, canvas.height);

			size = $(canvas).innerHeight() / height;

			for (j = 0; j < map.length; j++)
				for (i = 0; i < map[0].length; i++)
					if (map[j][i].mat != 0)
						out.drawImage(chooseImage.mapped(i, j, map[j][i].mat), size * i, size * j, size, size);


			if (typeof current != 'undefined' && typeof current.form != 'undefined')
				for (j = 0; j < current.form.length; j++)
					for (i = 0; i < current.form[j].length; i++)
						if (current.form[j][i] == 1)
								out.drawImage(chooseImage.current(current.mat), (i * size) + (current.i * size), (j * size) + (current.j * size), size, size);


			if (shadeEnabled && shade !== undefined && current.j != shade.j) {
				for (j = 0; j < shade.form.length; j++)
					for (i = 0; i < shade.form[j].length; i++)
						if (shade.form[j][i] == 1)
							if (gameStatus == 3)
								out.drawImage(chooseImage.shade(current.mat), (i * size) + (shade.i * size), (j * size) + (shade.j * size), size, size);
			}
		}
	}

	var chooseImage = {
		current: function(mat){
			if (mat == 2) {
				if (gameStatus == 3)
					return graphics.invisible.preview;
				else
					return graphics.invisible.preview;
				} else if (mat == 3) {
					if (colorTheme == "gameboy"){
						if (gameStatus == 3)
							return graphics.gameboy.o.cross;
						else
							return graphics.gameboy.t.cross;
					} else if (colorTheme == "bckwht") {
						if (gameStatus == 3)
							return graphics.bckwht.o.cross;
						else
							return graphics.bckwht.t.cross;
					} else if (colorTheme == "face") {
						if (gameStatus == 3)
							return graphics.face.o.cross;
						else
							return graphics.face.t.cross;
					} else {
						if (gameStatus == 3)
							return graphics.iced.o.cross;
						else
							return graphics.iced.t.cross;
					}
				} else if (mat == 4) {
					if (colorTheme == "classic"){
						if (gameStatus == 3)
							return graphics.classic.o.block;
						else
							return graphics.classic.t.block;
					} else if (colorTheme == "gameboy") {
						if (gameStatus == 3)
							return graphics.gameboy.o.block;
						else
							return graphics.gameboy.t.block;
					} else if (colorTheme == "retro") {
						if (gameStatus == 3)
							return graphics.retro.o.block;
						else
							return graphics.retro.t.block;
					} else if (colorTheme == "bckwht") {
						if (gameStatus == 3)
							return graphics.bckwht.o.block;
						else
							return graphics.bckwht.t.block;
					} else if (colorTheme == "crayon") {
						if (gameStatus == 3)
							return graphics.crayon.o.block;
						else
							return graphics.crayon.t.block;
					} else if (colorTheme == "recent") {
						if (gameStatus == 3)
							return graphics.recent.o.block;
						else
							return graphics.recent.t.block;
					} else if (colorTheme == "bit8") {
						if (gameStatus == 3)
							return graphics.bit8.o.block;
						else
							return graphics.bit8.t.block;
					} else if (colorTheme == "face") {
						if (gameStatus == 3)
							return graphics.face.o.block;
						else
							return graphics.face.t.block;
					} else if (colorTheme == "billiard") {
						if (gameStatus == 3)
							return graphics.billiard.o.block;
						else
							return graphics.billiard.t.block;
					} else if (colorTheme == "dark") {
						if (gameStatus == 3)
							return graphics.dark.o.block;
						else
							return graphics.dark.t.block;
					} else if (colorTheme == "stud") {
						if (gameStatus == 3)
							return graphics.stud.o.block;
						else
							return graphics.stud.t.block;
					} else if (colorTheme == "block") {
						if (gameStatus == 3)
							return graphics.block.o.block;
						else
							return graphics.block.t.block;
					} else if (colorTheme == "panel") {
						if (gameStatus == 3)
							return graphics.panel.o.block;
						else
							return graphics.panel.t.block;
					} else if (colorTheme == "crystal") {
						if (gameStatus == 3)
							return graphics.crystal.o.block;
						else
							return graphics.crystal.t.block;
					} else {
						if (gameStatus == 3)
							return graphics.iced.o.block;
						else
							return graphics.iced.t.block;
					}
				} else if (colorTheme == "classic") {
					if (gameStatus == 3)
						return graphics.classic.o[current.col];
					else
						return graphics.classic.t[current.col];
				} else if (colorTheme == "gameboy") {
					if (gameStatus == 3)
						return graphics.gameboy.o[current.col];
					else
						return graphics.gameboy.t[current.col];
				} else if (colorTheme == "retro") {
					if (gameStatus == 3)
						return graphics.retro.o[current.col];
					else
						return graphics.retro.t[current.col];
				} else if (colorTheme == "bckwht") {
					if (gameStatus == 3)
						return graphics.bckwht.o[current.col];
					else
						return graphics.bckwht.t[current.col];
				} else if (colorTheme == "crayon") {
					if (gameStatus == 3)
						return graphics.crayon.o[current.col];
					else
						return graphics.crayon.t[current.col];
				} else if (colorTheme == "recent") {
					if (gameStatus == 3)
						return graphics.recent.o[current.col];
					else
						return graphics.recent.t[current.col];
				} else if (colorTheme == "bit8") {
					if (gameStatus == 3)
						return graphics.bit8.o[current.col];
					else
						return graphics.bit8.t[current.col];
				} else if (colorTheme == "face") {
					if (gameStatus == 3)
						return graphics.face.o[current.col];
					else
						return graphics.face.t[current.col];
				} else if (colorTheme == "billiard") {
					if (gameStatus == 3)
						return graphics.billiard.o[current.col];
					else
						return graphics.billiard.t[current.col];
				} else if (colorTheme == "dark") {
					if (gameStatus == 3)
						return graphics.dark.o[current.col];
					else
						return graphics.dark.t[current.col];
				} else if (colorTheme == "stud") {
					if (gameStatus == 3)
						return graphics.stud.o[current.col];
					else
						return graphics.stud.t[current.col];
				} else if (colorTheme == "block") {
					if (gameStatus == 3)
						return graphics.block.o[current.col];
					else
						return graphics.block.t[current.col];
				} else if (colorTheme == "panel") {
					if (gameStatus == 3)
						return graphics.panel.o[current.col];
					else
						return graphics.panel.t[current.col];
				} else if (colorTheme == "crystal") {
					if (gameStatus == 3)
						return graphics.crystal.o[current.col];
					else
						return graphics.crystal.t[current.col];
				} else {
					if (gameStatus == 3)
						return graphics.iced.o;
					else
						return graphics.iced.t;
				}
		},
		shade: function(mat){
			if (mat == 2) {
				if (gameStatus == 3)
					return graphics.invisible.shade;
				else
					return graphics.invisible.shade;
			} else if (mat == 3) {
				if (colorTheme == "gameboy"){
					return graphics.gameboy.t.cross;
				} else if (colorTheme == "bckwht"){
					return graphics.bckwht.t.cross;
				} else if (colorTheme == "face"){
					return graphics.face.t.cross;
				} else {
					return graphics.iced.t.cross;
				}
			} else if (mat == 4) {
				if (colorTheme == "classic"){
					return graphics.classic.t.block;
				} else if (colorTheme == "gameboy") {
					return graphics.gameboy.t.block;
				} else if (colorTheme == "retro") {
					return graphics.retro.t.block;
				} else if (colorTheme == "bckwht") {
					return graphics.bckwht.t.block;
				} else if (colorTheme == "crayon") {
					return graphics.crayon.t.block;
				} else if (colorTheme == "recent") {
					return graphics.recent.t.block;
				} else if (colorTheme == "bit8") {
					return graphics.bit8.t.block;
				} else if (colorTheme == "face") {
					return graphics.face.t.block;
				} else if (colorTheme == "billiard") {
					return graphics.billiard.t.block;
				} else if (colorTheme == "dark") {
					return graphics.dark.t.block;
				} else if (colorTheme == "stud") {
					return graphics.stud.t.block;
				} else if (colorTheme == "block") {
					return graphics.block.t.block;
				} else if (colorTheme == "panel") {
					return graphics.panel.t.block;
				} else if (colorTheme == "crystal") {
					return graphics.crystal.t.block;
				} else {
					return graphics.iced.t.block;
				}
			} else if (colorTheme == "classic"){
				return graphics.classic.t[current.col]
			} else if (colorTheme == "gameboy") {
				return graphics.gameboy.t[current.col]
			} else if (colorTheme == "retro") {
				return graphics.retro.t[current.col]
			} else if (colorTheme == "bckwht") {
				return graphics.bckwht.t[current.col]
			} else if (colorTheme == "crayon") {
				return graphics.crayon.t[current.col]
			} else if (colorTheme == "recent") {
				return graphics.recent.t[current.col]
			} else if (colorTheme == "bit8") {
				return graphics.bit8.t[current.col]
			} else if (colorTheme == "face") {
				return graphics.face.t[current.col]
			} else if (colorTheme == "billiard") {
				return graphics.billiard.t[current.col]
			} else if (colorTheme == "dark") {
				return graphics.dark.t[current.col]
			} else if (colorTheme == "stud") {
				return graphics.stud.t[current.col]
			} else if (colorTheme == "block") {
				return graphics.block.t[current.col]
			} else if (colorTheme == "panel") {
				return graphics.panel.t[current.col]
			} else if (colorTheme == "crystal") {
				return graphics.crystal.t[current.col]
			} else {
				return graphics.iced.t;
				}
		},
		next1: function(mat){
			if (mat == 2) {
				if (gameStatus == 3)
					return graphics.invisible.preview;
				else
					return graphics.invisible.preview;
			} else if (mat == 3) {
				if (colorTheme == "gameboy"){
					return graphics.gameboy.o.cross;
				} else if (colorTheme == "bckwht"){
					return graphics.bckwht.o.cross;
				} else if (colorTheme == "face"){
					return graphics.face.o.cross;
				} else {
					return graphics.iced.o.cross;
				}
			} else if (mat == 4) {
				if (colorTheme == "classic"){
					return graphics.classic.o.block;
				} else if (colorTheme == "gameboy") {
					return graphics.gameboy.o.block;
				} else if (colorTheme == "retro") {
					return graphics.retro.o.block;
				} else if (colorTheme == "bckwht") {
					return graphics.bckwht.o.block;
				} else if (colorTheme == "crayon") {
					return graphics.crayon.o.block;
				} else if (colorTheme == "recent") {
					return graphics.recent.o.block;
				} else if (colorTheme == "bit8") {
					return graphics.bit8.o.block;
				} else if (colorTheme == "face") {
					return graphics.face.o.block;
				} else if (colorTheme == "billiard") {
					return graphics.billiard.o.block;
				} else if (colorTheme == "dark") {
					return graphics.dark.o.block;
				} else if (colorTheme == "stud") {
					return graphics.stud.o.block;
				} else if (colorTheme == "block") {
					return graphics.block.o.block;
				} else if (colorTheme == "panel") {
					return graphics.panel.o.block;
				} else if (colorTheme == "crystal") {
					return graphics.crystal.o.block;
				} else {
					return graphics.iced.o.block;
				}
			} else if (colorTheme == "classic"){
				return graphics.classic.o[next1.col]
			} else if (colorTheme == "gameboy") {
				return graphics.gameboy.o[next1.col]
			} else if (colorTheme == "retro") {
				return graphics.retro.o[next1.col]
			} else if (colorTheme == "bckwht") {
				return graphics.bckwht.o[next1.col]
			} else if (colorTheme == "crayon") {
				return graphics.crayon.o[next1.col]
			} else if (colorTheme == "recent") {
				return graphics.recent.o[next1.col]
			} else if (colorTheme == "bit8") {
				return graphics.bit8.o[next1.col]
			} else if (colorTheme == "face") {
				return graphics.face.o[next1.col]
			} else if (colorTheme == "billiard") {
				return graphics.billiard.o[next1.col]
			} else if (colorTheme == "dark") {
				return graphics.dark.o[next1.col]
			} else if (colorTheme == "stud") {
				return graphics.stud.o[next1.col]
			} else if (colorTheme == "block") {
				return graphics.block.o[next1.col]
			} else if (colorTheme == "panel") {
				return graphics.panel.o[next1.col]
			} else if (colorTheme == "crystal") {
				return graphics.crystal.o[next1.col]
			} else {
				return graphics.iced.o;
				}
		},
		next2: function(mat){
			if (mat == 2) {
				if (gameStatus == 3)
					return graphics.invisible.preview;
				else
					return graphics.invisible.preview;
			} else if (mat == 3) {
				if (colorTheme == "gameboy"){
					return graphics.gameboy.o.cross;
				} else if (colorTheme == "bckwht"){
					return graphics.bckwht.o.cross;
				} else if (colorTheme == "face"){
					return graphics.face.o.cross;
				} else {
					return graphics.iced.o.cross;
				}
			} else if (mat == 4) {
				if (colorTheme == "classic"){
					return graphics.classic.o.block;
				} else if (colorTheme == "gameboy") {
					return graphics.gameboy.o.block;
				} else if (colorTheme == "retro") {
					return graphics.retro.o.block;
				} else if (colorTheme == "bckwht") {
					return graphics.bckwht.o.block;
				} else if (colorTheme == "crayon") {
					return graphics.crayon.o.block;
				} else if (colorTheme == "recent") {
					return graphics.recent.o.block;
				} else if (colorTheme == "bit8") {
					return graphics.bit8.o.block;
				} else if (colorTheme == "face") {
					return graphics.face.o.block;
				} else if (colorTheme == "billiard") {
					return graphics.billiard.o.block;
				} else if (colorTheme == "dark") {
					return graphics.dark.o.block;
				} else if (colorTheme == "stud") {
					return graphics.stud.o.block;
				} else if (colorTheme == "block") {
					return graphics.block.o.block;
				} else if (colorTheme == "panel") {
					return graphics.panel.o.block;
				} else if (colorTheme == "crystal") {
					return graphics.crystal.o.block;
				} else {
					return graphics.iced.o.block;
				}
			} else if (colorTheme == "classic"){
				return graphics.classic.o[next2.col]
			} else if (colorTheme == "gameboy") {
				return graphics.gameboy.o[next2.col]
			} else if (colorTheme == "retro") {
				return graphics.retro.o[next2.col]
			} else if (colorTheme == "bckwht") {
				return graphics.bckwht.o[next2.col]
			} else if (colorTheme == "crayon") {
				return graphics.crayon.o[next2.col]
			} else if (colorTheme == "recent") {
				return graphics.recent.o[next2.col]
			} else if (colorTheme == "bit8") {
				return graphics.bit8.o[next2.col]
			} else if (colorTheme == "face") {
				return graphics.face.o[next2.col]
			} else if (colorTheme == "billiard") {
				return graphics.billiard.o[next2.col]
			} else if (colorTheme == "dark") {
				return graphics.dark.o[next2.col]
			} else if (colorTheme == "stud") {
				return graphics.stud.o[next2.col]
			} else if (colorTheme == "block") {
				return graphics.block.o[next2.col]
			} else if (colorTheme == "panel") {
				return graphics.panel.o[next2.col]
			} else if (colorTheme == "crystal") {
				return graphics.crystal.o[next2.col]
			} else {
				return graphics.iced.o;
				}
		},
		next3: function(mat){
			if (mat == 2) {
				if (gameStatus == 3)
					return graphics.invisible.preview;
				else
					return graphics.invisible.preview;
			} else if (mat == 3) {
				if (colorTheme == "gameboy"){
					return graphics.gameboy.o.cross;
				} else if (colorTheme == "bckwht"){
					return graphics.bckwht.o.cross;
				} else if (colorTheme == "face"){
					return graphics.face.o.cross;
				} else {
					return graphics.iced.o.cross;
				}
			} else if (mat == 4) {
				if (colorTheme == "classic"){
					return graphics.classic.o.block;
				} else if (colorTheme == "gameboy") {
					return graphics.gameboy.o.block;
				} else if (colorTheme == "retro") {
					return graphics.retro.o.block;
				} else if (colorTheme == "bckwht") {
					return graphics.bckwht.o.block;
				} else if (colorTheme == "crayon") {
					return graphics.crayon.o.block;
				} else if (colorTheme == "recent") {
					return graphics.recent.o.block;
				} else if (colorTheme == "bit8") {
					return graphics.bit8.o.block;
				} else if (colorTheme == "face") {
					return graphics.face.o.block;
				} else if (colorTheme == "billiard") {
					return graphics.billiard.o.block;
				} else if (colorTheme == "dark") {
					return graphics.dark.o.block;
				} else if (colorTheme == "stud") {
					return graphics.stud.o.block;
				} else if (colorTheme == "block") {
					return graphics.block.o.block;
				} else if (colorTheme == "panel") {
					return graphics.panel.o.block;
				} else if (colorTheme == "crystal") {
					return graphics.crystal.o.block;
				} else {
					return graphics.iced.o.block;
				}
			} else if (colorTheme == "classic"){
				return graphics.classic.o[next3.col]
			} else if (colorTheme == "gameboy") {
				return graphics.gameboy.o[next3.col]
			} else if (colorTheme == "retro") {
				return graphics.retro.o[next3.col]
			} else if (colorTheme == "bckwht") {
				return graphics.bckwht.o[next3.col]
			} else if (colorTheme == "crayon") {
				return graphics.crayon.o[next3.col]
			} else if (colorTheme == "recent") {
				return graphics.recent.o[next3.col]
			} else if (colorTheme == "bit8") {
				return graphics.bit8.o[next3.col]
			} else if (colorTheme == "face") {
				return graphics.face.o[next3.col]
			} else if (colorTheme == "billiard") {
				return graphics.billiard.o[next3.col]
			} else if (colorTheme == "dark") {
				return graphics.dark.o[next3.col]
			} else if (colorTheme == "stud") {
				return graphics.stud.o[next3.col]
			} else if (colorTheme == "block") {
				return graphics.block.o[next3.col]
			} else if (colorTheme == "panel") {
				return graphics.panel.o[next3.col]
			} else if (colorTheme == "crystal") {
				return graphics.crystal.o[next3.col]
			} else {
				return graphics.iced.o;
				}
		},
		hold: function(mat){
			if (mat == 2) {
				if (gameStatus == 3)
					return graphics.invisible.preview;
				else
					return graphics.invisible.preview;
			} else if (mat == 3) {
				if (colorTheme == "gameboy"){
					return graphics.gameboy.o.cross;
				} else if (colorTheme == "bckwht"){
					return graphics.bckwht.o.cross;
				} else if (colorTheme == "face"){
					return graphics.face.o.cross;
				} else {
					return graphics.iced.o.cross;
				}
			} else if (mat == 4) {
				if (colorTheme == "classic"){
					return graphics.classic.o.block;
				} else if (colorTheme == "gameboy") {
					return graphics.gameboy.o.block;
				} else if (colorTheme == "retro") {
					return graphics.retro.o.block;
				} else if (colorTheme == "bckwht") {
					return graphics.bckwht.o.block;
				} else if (colorTheme == "crayon") {
					return graphics.crayon.o.block;
				} else if (colorTheme == "recent") {
					return graphics.recent.o.block;
				} else if (colorTheme == "bit8") {
					return graphics.bit8.o.block;
				} else if (colorTheme == "face") {
					return graphics.face.o.block;
				} else if (colorTheme == "billiard") {
					return graphics.billiard.o.block;
				} else if (colorTheme == "dark") {
					return graphics.dark.o.block;
				} else if (colorTheme == "stud") {
					return graphics.stud.o.block;
				} else if (colorTheme == "block") {
					return graphics.block.o.block;
				} else if (colorTheme == "panel") {
					return graphics.panel.o.block;
				} else if (colorTheme == "crystal") {
					return graphics.crystal.o.block;
				} else {
					return graphics.iced.o.block;
				}
			} else if (colorTheme == "classic"){
				return graphics.classic.o[hold.col]
			} else if (colorTheme == "gameboy") {
				return graphics.gameboy.o[hold.col]
			} else if (colorTheme == "retro") {
				return graphics.retro.o[hold.col]
			} else if (colorTheme == "bckwht") {
				return graphics.bckwht.o[hold.col]
			} else if (colorTheme == "crayon") {
				return graphics.crayon.o[hold.col]
			} else if (colorTheme == "recent") {
				return graphics.recent.o[hold.col]
			} else if (colorTheme == "bit8") {
				return graphics.bit8.o[hold.col]
			} else if (colorTheme == "face") {
				return graphics.face.o[hold.col]
			} else if (colorTheme == "billiard") {
				return graphics.billiard.o[hold.col]
			} else if (colorTheme == "dark") {
				return graphics.dark.o[hold.col]
			} else if (colorTheme == "stud") {
				return graphics.stud.o[hold.col]
				} else if (colorTheme == "block") {
				return graphics.block.o[hold.col]
			} else if (colorTheme == "panel") {
				return graphics.panel.o[hold.col]
			} else if (colorTheme == "crystal") {
				return graphics.crystal.o[hold.col]
			} else {
				return graphics.iced.o;
				}
		},
		mapped: function(i, j, mat){
			if (mat == 2) {
				if (gameStatus == 3)
					return graphics.invisible;
				else
					return graphics.invisible;
			} else if (mat == 3) {
				if (colorTheme == "gameboy"){
					if (gameStatus == 3)
						return graphics.gameboy.o.cross;
					else
						return graphics.gameboy.t.cross;
				} else if (colorTheme == "bckwht") {
					if (gameStatus == 3)
						return graphics.bckwht.o.cross;
					else
						return graphics.bckwht.t.cross;
				} else if (colorTheme == "face") {
					if (gameStatus == 3)
						return graphics.face.o.cross;
					else
						return graphics.face.t.cross;
				} else {
					if (gameStatus == 3)
						return graphics.iced.o.cross;
					else
						return graphics.iced.t.cross;
				}
			} else if (mat == 4) {
				if (colorTheme == "classic"){
					if (gameStatus == 3)
						return graphics.classic.o.block;
					else
						return graphics.classic.t.block;
				} else if (colorTheme == "gameboy") {
					if (gameStatus == 3)
						return graphics.gameboy.o.block;
					else
						return graphics.gameboy.t.block;
				} else if (colorTheme == "retro") {
					if (gameStatus == 3)
						return graphics.retro.o.block;
					else
						return graphics.retro.t.block;
				} else if (colorTheme == "bckwht") {
					if (gameStatus == 3)
						return graphics.bckwht.o.block;
					else
						return graphics.bckwht.t.block;
				} else if (colorTheme == "crayon") {
					if (gameStatus == 3)
						return graphics.crayon.o.block;
					else
						return graphics.crayon.t.block;
				} else if (colorTheme == "recent") {
					if (gameStatus == 3)
						return graphics.recent.o.block;
					else
						return graphics.recent.t.block;
				} else if (colorTheme == "bit8") {
					if (gameStatus == 3)
						return graphics.bit8.o.block;
					else
						return graphics.bit8.t.block;
				} else if (colorTheme == "face") {
					if (gameStatus == 3)
						return graphics.face.o.block;
					else
						return graphics.face.t.block;
				} else if (colorTheme == "billiard") {
					if (gameStatus == 3)
						return graphics.billiard.o.block;
					else
						return graphics.billiard.t.block;
				} else if (colorTheme == "dark") {
					if (gameStatus == 3)
						return graphics.dark.o.block;
					else
						return graphics.dark.t.block;
				} else if (colorTheme == "stud") {
					if (gameStatus == 3)
						return graphics.stud.o.block;
					else
						return graphics.stud.t.block;
				} else if (colorTheme == "block") {
					if (gameStatus == 3)
						return graphics.block.o.block;
					else
						return graphics.block.t.block;
				} else if (colorTheme == "panel") {
					if (gameStatus == 3)
						return graphics.panel.o.block;
					else
						return graphics.panel.t.block;
				} else if (colorTheme == "crystal") {
					if (gameStatus == 3)
						return graphics.crystal.o.block;
					else
						return graphics.crystal.t.block;
				} else {
					if (gameStatus == 3)
						return graphics.iced.o.block;
					else
						return graphics.iced.t.block;
				}
			} else if (invisibleEnabled == true) {
				return graphics.invisible;
			} else {
				if (colorTheme == "classic"){
					if (gameStatus == 3)
						return graphics.classic.o[map[j][i].col];
					else
						return graphics.classic.t[map[j][i].col];
				} else if (colorTheme == "gameboy") {
						if (gameStatus == 3)
							return graphics.gameboy.o[map[j][i].col];
						else
							return graphics.gameboy.t[map[j][i].col];
				} else if (colorTheme == "retro") {
						if (gameStatus == 3)
							return graphics.retro.o[map[j][i].col];
						else
							return graphics.retro.t[map[j][i].col];
				} else if (colorTheme == "bckwht") {
						if (gameStatus == 3)
							return graphics.bckwht.o[map[j][i].col];
						else
							return graphics.bckwht.t[map[j][i].col];
				} else if (colorTheme == "crayon") {
						if (gameStatus == 3)
							return graphics.crayon.o[map[j][i].col];
						else
							return graphics.crayon.t[map[j][i].col];
				} else if (colorTheme == "recent") {
						if (gameStatus == 3)
							return graphics.recent.o[map[j][i].col];
						else
							return graphics.recent.t[map[j][i].col];
				} else if (colorTheme == "bit8") {
						if (gameStatus == 3)
							return graphics.bit8.o[map[j][i].col];
						else
							return graphics.bit8.t[map[j][i].col];
				} else if (colorTheme == "face") {
						if (gameStatus == 3)
							return graphics.face.o[map[j][i].col];
						else
							return graphics.face.t[map[j][i].col];
				} else if (colorTheme == "billiard") {
						if (gameStatus == 3)
							return graphics.billiard.o[map[j][i].col];
						else
							return graphics.billiard.t[map[j][i].col];
				} else if (colorTheme == "dark") {
						if (gameStatus == 3)
							return graphics.dark.o[map[j][i].col];
						else
							return graphics.dark.t[map[j][i].col];
				} else if (colorTheme == "stud") {
						if (gameStatus == 3)
							return graphics.stud.o[map[j][i].col];
						else
							return graphics.stud.t[map[j][i].col];
				} else if (colorTheme == "block") {
						if (gameStatus == 3)
							return graphics.block.o[map[j][i].col];
						else
							return graphics.block.t[map[j][i].col];
				} else if (colorTheme == "panel") {
						if (gameStatus == 3)
							return graphics.panel.o[map[j][i].col];
						else
							return graphics.panel.t[map[j][i].col];
				} else if (colorTheme == "crystal") {
						if (gameStatus == 3)
							return graphics.crystal.o[map[j][i].col];
						else
							return graphics.crystal.t[map[j][i].col];
				} else {
					if (gameStatus == 3)
						return graphics.iced.o;
					else
						return graphics.iced.t;	
					}
				}
			}
		}

	var setNextPiece = function(first, paintOnly) {
		if (gameStatus < 2)
			return;

		if(!paintOnly) {
			set();
			mat();
			rndForm = Math.round(Math.random() * (forms.length - 1));
			rndColor = Math.round(Math.random() * (colors.length - 1));
			rndMat = Math.round(Math.random() * (mats.length - 1));
			iSource = Math.round(width / 2) - Math.round(forms[rndForm][0].length / 2);
			jSource = forms[rndForm].length * -1;

			next3 = { i: iSource, j: jSource, mat: mats[rndMat], col: rndColor, form: forms[rndForm] }
		}

		// --- //

		if (first !== true) {
			// Next 1
			$('.activity#game #next .oldNext1').remove();
			$('.activity#game #next .newNext1').addClass('oldNext1').removeClass('newNext1').animate({ 'left': 120, 'opacity': 0 }, 260, function () {
				$(this).remove();
			});

			newCanvasNext1 = $('<canvas width="120" height="120">').addClass('newNext1').appendTo('#next')[0];
			newOutNext1 = newCanvasNext1.getContext('2d');

			centerX = (120 - next1.form[0].length * 25) / 2;
			centerY = (120 - next1.form.length * 25) / 2;

			for (j = 0; j < next1.form.length; j++)
				for (i = 0; i < next1.form[j].length; i++)
					if (next1.form[j][i] == 1)
						newOutNext1.drawImage(chooseImage.next1(next1.mat), 25 * i + centerX, 25 * j + centerY, 25, 25);

			$(newCanvasNext1).animate({ 'left': 0, 'opacity': 1 }, 260);
			
			// Next 2
			$('.activity#game #next .oldNext2').remove();
			$('.activity#game #next .newNext2').addClass('oldNext2').removeClass('newNext2').animate({ 'left': 120, 'opacity': 0 }, 0, function () {
				$(this).remove();
			});

			newCanvasNext2 = $('<canvas width="60" height="60">').addClass('newNext2').appendTo('#next')[0];
			newOutNext2 = newCanvasNext2.getContext('2d');

			bcenterX = (60 - next2.form[0].length * 12.5) / 2;
			bcenterY = (60 - next2.form.length * 12.5) / 2;

			for (j = 0; j < next2.form.length; j++)
				for (i = 0; i < next2.form[j].length; i++)
					if (next2.form[j][i] == 1)
						newOutNext2.drawImage(chooseImage.next2(next2.mat), 12.5 * i + bcenterX, 12.5 * j + bcenterY, 12.5, 12.5);

			$(newCanvasNext2).animate({ 'left': 0, 'opacity': 1 }, 0);
			
			// Next 3
			$('.activity#game #next .oldNext3').remove();
			$('.activity#game #next .newNext3').addClass('oldNext3').removeClass('newNext3').animate({ 'left': 180, 'opacity': 0 }, 0, function () {
				$(this).remove();
			});

			newCanvasNext3 = $('<canvas width="60" height="60">').addClass('newNext3').appendTo('#next')[0];
			newOutNext3 = newCanvasNext3.getContext('2d');

			ccenterX = (60 - next3.form[0].length * 12.5) / 2;
			ccenterY = (60 - next3.form.length * 12.5) / 2;

			for (j = 0; j < next3.form.length; j++)
				for (i = 0; i < next3.form[j].length; i++)
					if (next3.form[j][i] == 1)
						newOutNext3.drawImage(chooseImage.next3(next3.mat), 12.5 * i + ccenterX, 12.5 * j + ccenterY, 12.5, 12.5);

			$(newCanvasNext3).animate({ 'left': 60, 'opacity': 1 }, 0);
			
			
			// Hold
			
			$('.activity#game #next .oldHold').remove();
			$('.activity#game #next .newHold').addClass('oldHold').removeClass('newHold').animate({ 'left': 120, 'opacity': 0 }, 0, function () {
				$(this).remove();
			});

			newCanvasHold = $('<canvas width="120" height="120" ontouchstart="fwt.holdk()">').addClass('newHold').appendTo('#next')[0];
			newOutHold = newCanvasHold.getContext('2d');

			dcenterX = (120 - hold.form[0].length * 25) / 2;
			dcenterY = (120 - hold.form.length * 25) / 2;

			for (j = 0; j < hold.form.length; j++)
				for (i = 0; i < hold.form[j].length; i++)
					if (hold.form[j][i] == 1)
						newOutHold.drawImage(chooseImage.hold(hold.mat), 25 * i + dcenterX, 25 * j + dcenterY, 25, 25);
			
			$(newCanvasHold).animate({ 'left': 0, 'opacity': 1 }, 0);
		}
	}

	var clearNext = function() {
		next1 = {};
		$('.activity#game #next canvas').animate({ 'left': 120, 'opacity': 0 }, 260, function () {
			$(this).remove();
		});
		next2 = {};
		$('.activity#game #next canvas').animate({ 'left': 120, 'opacity': 0 }, 260, function () {
			$(this).remove();
		});
		next3 = {};
		$('.activity#game #next canvas').animate({ 'left': 120, 'opacity': 0 }, 260, function () {
			$(this).remove();
		});
	}
	
	var clearHold = function() {
		hold = {};
		$('.activity#game #next canvas').animate({ 'left': 120, 'opacity': 0 }, 260, function () {
			$(this).remove();
		});
	}
	
	var clone = function(obj) {
		if (null == obj || "object" != typeof obj) return obj;

		if (obj instanceof Date) {
			var copy = new Date();
			copy.setTime(obj.getTime());
			return copy;
		}

		if (obj instanceof Array) {
			var copy = [];
			var len = obj.length
			for (var i = 0; i < len; ++i)
				copy[i] = clone(obj[i]);
			return copy;
		}

		if (obj instanceof Object) {
			var copy = {};
			for (var attr in obj)
				if (obj.hasOwnProperty(attr))
					copy[attr] = clone(obj[attr]);
			return copy;
		}

		throw new Error("Unable to copy obj! Its type isn't supported.");
	}

	var adjust = function() {
		$(".activity").css('width', $('#layout').innerWidth() - 12);
		$(".activity").css('height', $('#layout').innerHeight() - 12 - 20);

		wPxB = $(".activity#game").innerWidth() - 125;
		hPxB = $(".activity#game").innerHeight();

		size = Math.floor(hPxB / height);
		wPxC = width * size;
		hPxC = height * size;

		if (wPxC > wPxB) {
			size = Math.floor(wPxB / width);
			wPxC = width * size
			hPxC = height * size;
		}

		$(canvas).attr("width", wPxC);
		$(canvas).attr("height", hPxC);
		$(".activity#game #osd").css("width", wPxC);
		$(".activity#game #osd").css("height", hPxC);

		fieldDistance = ($(".activity#game").innerWidth() - 125 - wPxC) / 2;

		$(canvas).css("top", ($(".activity#game").innerHeight() - hPxC) / 2);
		$(canvas).css("left", ($(".activity#game").innerWidth() - 125 - wPxC) / 2 + 125);
		$(".activity#game #osd").css("top", ($(".activity#game").innerHeight() - hPxC) / 2);
		$(".activity#game #osd").css("left", ($(".activity#game").innerWidth() - 125 - wPxC) / 2 + 125);

		repaint();
	}

	var switchTheme = function(theme){
		switch(theme){
			case "classic":
			 colorTheme = "classic";
			 break;
			case "gameboy":
			 colorTheme = "gameboy";
			 break;
			case "retro":
			 colorTheme = "retro";
			 break;
			case "bckwht":
			 colorTheme = "bckwht";
			 break;
			case "crayon":
			 colorTheme = "crayon";
			 break;
			case "recent":
			 colorTheme = "recent";
			 break;
			case "bit8":
			 colorTheme = "bit8";
			 break;
			case "face":
			 colorTheme = "face";
			 break;
			case "billiard":
			 colorTheme = "billiard";
			 break;
			case "dark":
			 colorTheme = "dark";
			 break;
			case "stud":
			 colorTheme = "stud";
			 break;
			case "block":
			 colorTheme = "block";
			 break;
			case "panel":
			 colorTheme = "panel";
			 break;
			case "crystal":
			 colorTheme = "crystal";
			 break;
			default:
			 colorTheme = "iced";
		}
		$('canvas#canvas').attr('data-theme', colorTheme);
		savePrefs();
	}

	var switchShades = function(bool){
		shadeEnabled = bool;
		if (gameStatus > 1) {
			generateShade();
			repaint();
		}
		savePrefs();
	}
	
	var switchInvisibles = function(bool){
		invisibleEnabled = bool;
		if (gameStatus > 1) (repaint())
		savePrefs();
	}	

	var setEvents = function() {
		window.onresize = function() {
			adjust();
		}
		adjust();

		document.onkeyup = function(e) {
			if (e.keyCode == 40 || e.keyCode == 98)
				limitDelay = normalDelay;
			if (e.keyCode == 88)
				rotateC();
			if (e.keyCode == 90)
				rotateCC();
			if (e.keyCode == 16)
				holdk();
			if (e.keyCode == 38 || e.keyCode == 104) //default
				rotate();
			if (e.keyCode == 32 || e.keyCode == 96)
				drop();
			if (e.keyCode == 78 || e.keyCode == 105)
				newGame();
		}

		document.onkeydown = function(e) {
			if (e.keyCode == 39 || e.keyCode == 102)
				right();
			if (e.keyCode == 37 || e.keyCode == 100)
				left();
			if (e.keyCode == 80 || e.keyCode == 103)
				pause();
			if (e.keyCode == 40 || e.keyCode == 98) {
				if (gameStatus < 2)
					return;
				if (gameStatus == 2)
					pause();
				limitDelay = 1;
			}
		}
		
		var ts;
		var to;
		$(document).bind('touchstart', function (e){
		   ts = e.originalEvent.touches[0].clientY;
		   to = e.originalEvent.touches[0].clientX;
		});
		
		$(document).bind('touchend', function (e){
		   var te = e.originalEvent.changedTouches[0].clientY;
		   if(ts < te-50){
		      limitDelay = normalDelay;
		   }
		   if(ts > te+50){
		      holdk();
		   }
		   var tl = e.originalEvent.changedTouches[0].clientX;
		   if(to > tl+50){
		      left();
		   }else if(to < tl-50){
		      right();
		   }
		   if(Math.abs(ts - te) < 50 && Math.abs(to - tl) < 50){
		      rotate();
		   }
		});
		
		window.onbeforeunload = saveToLS;

		setOSDMessages();
	}

	var saveToLS = function(){
		save = {};		
		save.map = map;
		save.current = current;
		save.next1 = next1;
		save.next2 = next2;
		save.next3 = next3;
		save.hold = hold;
		save.lastLine = lastLine;
		save.level = level;
		save.score = score;
		save.linecount = linecount;
		save.dropBonus = dropBonus;
		localStorage.fwtActiveGame = $.toJSON(save);
	}

	var savePrefs = function() {
		localStorage.fwtPreferences = $.toJSON({
			'shades': shadeEnabled,
			'invisibles': invisibleEnabled,
			'coincount': coincount,
			'speed': speed,
			'theme': colorTheme,
			'width': width,
			'height': height,
			'levelstart': levelstart,
			'seed': seed,
			'rotation': rotation,
			'sp1s': sp1,
			'sp2s': sp2,
			'sp3s': sp3,
			'sp4s': sp4,
			'sp5s': sp5,
			'sp6s': sp6,
			'sp7s': sp7,
			'sp8s': sp8,
			'sp9s': sp9,
			'sp10s': sp10,
			'sp11s': sp11,
			'sp12s': sp12,
			'sp13s': sp13,
			'sp14s': sp14,
			'sp15s': sp15,
			'sp16s': sp16,
			'sp17s': sp17,
			'sp18s': sp18,
			'sp19s': sp19,
			'sp20s': sp20,
			'sp21s': sp21,
			'sp22s': sp22,
			'sp23s': sp23,
			'sp24s': sp24,
			'sp25s': sp25,
			'sp26s': sp26,
			'sp27s': sp27,
			'sp28s': sp28,
			'sp29s': sp29,
			'sp30s': sp30,
			'sp31s': sp31,
			'sp32s': sp32,
			'sp33s': sp33,
			'sp34s': sp34,
			'sp35s': sp35,
			'sp36s': sp36,
			'sp37s': sp37,
			'sp38s': sp38,
			'sp39s': sp39,
			'sp40s': sp40,
			'sp41s': sp41,
			'sp42s': sp42,
			'sp43s': sp43,
			'sp44s': sp44,
			'sp45s': sp45,
			'sp46s': sp46,
			'sp47s': sp47,
			'sp48s': sp48,
			'sp49s': sp49,
			'sp50s': sp50,
			'sp51s': sp51,
			'sp52s': sp52,
			'sp53s': sp53,
			'sp54s': sp54,
			'sp55s': sp55,
			'sp56s': sp56,
			'sp57s': sp57,
			'mat1s': mat1,
			'mat2s': mat2,
			'mat3s': mat3,
			'mat4s': mat4
		});
	}

	var setOSDMessages = function(){
		// OSD messages
		rnd0 = [$.i18n._('well'), $.i18n._('slow'), $.i18n._('candobetter'), $.i18n._('onemore'), $.i18n._('point')]
		rnd1 = [$.i18n._('notbad'), $.i18n._('alright'), $.i18n._('genial'), $.i18n._('keepitup'), $.i18n._('nottoobad')];
		rnd2 = [$.i18n._('magnificent'), $.i18n._('veryfast'), $.i18n._('fast'), $.i18n._('shooting'), $.i18n._('fast2')];
		rnd3 = [$.i18n._('instant'), $.i18n._('most'), $.i18n._('welldone'), $.i18n._('stellar'), $.i18n._('awesome')];
		rnd4 = [$.i18n._('singleline'), $.i18n._('doubleline'), $.i18n._('tripleline'), $.i18n._('ttetris'), $.i18n._('ppentris'), $.i18n._('hhextris'), $.i18n._('sseptris'), $.i18n._('ooctotris')];
	}	

	var loadGameGraphics = function(){
		ui.loader.needed(2 + colors.length * 2);

		// Invisible
		graphics.invisible = new Image();
		graphics.invisible.src = "g/material/invisible.png";
		graphics.invisible.onload = function() {
			ui.loader.tick();
		}
		graphics.invisible.preview = new Image();
		graphics.invisible.preview.src = "g/material/invisible-preview.png";
		graphics.invisible.preview.onload = function() {
			ui.loader.tick();
		}
		graphics.invisible.shade = new Image();
		graphics.invisible.shade.src = "g/material/invisible-shade.png";
		graphics.invisible.shade.onload = function() {
			ui.loader.tick();
		}
		
		// Iced
		graphics.iced.o = new Image();
		graphics.iced.o.src = "g/material/iced-o.png";
		graphics.iced.o.onload = function(){
			ui.loader.tick();
		}
		graphics.iced.t = new Image();
		graphics.iced.t.src = "g/material/iced-t.png";
		graphics.iced.t.onload = function(){
			ui.loader.tick();
		}
		
		// Cross
		graphics.bckwht.o.cross = new Image();
		graphics.bckwht.o.cross.src = "g/material/bckwht-o-cross.png";
		graphics.bckwht.o.cross.onload = function() {
			ui.loader.tick();
		}
		graphics.bckwht.t.cross = new Image();
		graphics.bckwht.t.cross.src = "g/material/bckwht-t-cross.png";
		graphics.bckwht.t.cross.onload = function() {
			ui.loader.tick();
		}
		graphics.iced.o.cross = new Image();
		graphics.iced.o.cross.src = "g/material/iced-o-cross.png";
		graphics.iced.o.cross.onload = function() {
			ui.loader.tick();
		}
		graphics.iced.t.cross = new Image();
		graphics.iced.t.cross.src = "g/material/iced-t-cross.png";
		graphics.iced.t.cross.onload = function() {
			ui.loader.tick();
		}
		graphics.gameboy.o.cross = new Image();
		graphics.gameboy.o.cross.src = "g/material/gameboy-o-cross.png";
		graphics.gameboy.o.cross.onload = function() {
			ui.loader.tick();
		}
		graphics.gameboy.t.cross = new Image();
		graphics.gameboy.t.cross.src = "g/material/gameboy-t-cross.png";
		graphics.gameboy.t.cross.onload = function() {
			ui.loader.tick();
		}
		graphics.face.o.cross = new Image();
		graphics.face.o.cross.src = "g/material/face-o-cross.png";
		graphics.face.o.cross.onload = function() {
			ui.loader.tick();
		}
		graphics.face.t.cross = new Image();
		graphics.face.t.cross.src = "g/material/face-t-cross.png";
		graphics.face.t.cross.onload = function() {
			ui.loader.tick();
		}

		// Symbiote
		graphics.iced.o.block = new Image();
		graphics.iced.o.block.src = "g/material/iced-o-block.png";
		graphics.iced.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.iced.t.block = new Image();
		graphics.iced.t.block.src = "g/material/iced-t-block.png";
		graphics.iced.t.block.onload = function() {
			ui.loader.tick();
		}
		graphics.classic.o.block = new Image();
		graphics.classic.o.block.src = "g/material/classic-o-block.png";
		graphics.classic.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.classic.t.block = new Image();
		graphics.classic.t.block.src = "g/material/classic-t-block.png";
		graphics.classic.t.block.onload = function() {
			ui.loader.tick();
		}
		graphics.gameboy.o.block = new Image();
		graphics.gameboy.o.block.src = "g/material/gameboy-o-block.png";
		graphics.gameboy.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.gameboy.t.block = new Image();
		graphics.gameboy.t.block.src = "g/material/gameboy-t-block.png";
		graphics.gameboy.t.block.onload = function() {
			ui.loader.tick();
		}
		graphics.retro.o.block = new Image();
		graphics.retro.o.block.src = "g/material/retro-o-block.png";
		graphics.retro.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.retro.t.block = new Image();
		graphics.retro.t.block.src = "g/material/retro-t-block.png";
		graphics.retro.t.block.onload = function() {
			ui.loader.tick();
		}
		graphics.bckwht.o.block = new Image();
		graphics.bckwht.o.block.src = "g/material/bckwht-o-block.png";
		graphics.bckwht.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.bckwht.t.block = new Image();
		graphics.bckwht.t.block.src = "g/material/bckwht-t-block.png";
		graphics.bckwht.t.block.onload = function() {
			ui.loader.tick();
		}
		graphics.crayon.o.block = new Image();
		graphics.crayon.o.block.src = "g/material/crayon-o-block.png";
		graphics.crayon.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.crayon.t.block = new Image();
		graphics.crayon.t.block.src = "g/material/crayon-t-block.png";
		graphics.crayon.t.block.onload = function() {
			ui.loader.tick();
		}
		graphics.recent.o.block = new Image();
		graphics.recent.o.block.src = "g/material/recent-o-block.png";
		graphics.recent.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.recent.t.block = new Image();
		graphics.recent.t.block.src = "g/material/recent-t-block.png";
		graphics.recent.t.block.onload = function() {
			ui.loader.tick();
		}
		graphics.bit8.o.block = new Image();
		graphics.bit8.o.block.src = "g/material/bit8-o-block.png";
		graphics.bit8.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.bit8.t.block = new Image();
		graphics.bit8.t.block.src = "g/material/bit8-t-block.png";
		graphics.bit8.t.block.onload = function() {
			ui.loader.tick();
		}
		graphics.face.o.block = new Image();
		graphics.face.o.block.src = "g/material/face-o-block.png";
		graphics.face.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.face.t.block = new Image();
		graphics.face.t.block.src = "g/material/face-t-block.png";
		graphics.face.t.block.onload = function() {
			ui.loader.tick();
		}
		graphics.billiard.o.block = new Image();
		graphics.billiard.o.block.src = "g/material/billiard-o-block.png";
		graphics.billiard.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.billiard.t.block = new Image();
		graphics.billiard.t.block.src = "g/material/billiard-t-block.png";
		graphics.billiard.t.block.onload = function() {
			ui.loader.tick();
		}
		graphics.dark.o.block = new Image();
		graphics.dark.o.block.src = "g/material/dark-o-block.png";
		graphics.dark.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.dark.t.block = new Image();
		graphics.dark.t.block.src = "g/material/dark-t-block.png";
		graphics.dark.t.block.onload = function() {
			ui.loader.tick();
		}
		graphics.stud.o.block = new Image();
		graphics.stud.o.block.src = "g/material/stud-o-block.png";
		graphics.stud.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.stud.t.block = new Image();
		graphics.stud.t.block.src = "g/material/stud-t-block.png";
		graphics.stud.t.block.onload = function() {
			ui.loader.tick();
		}
		graphics.block.o.block = new Image();
		graphics.block.o.block.src = "g/material/block-o-block.png";
		graphics.block.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.block.t.block = new Image();
		graphics.block.t.block.src = "g/material/block-t-block.png";
		graphics.block.t.block.onload = function() {
			ui.loader.tick();
		}
		graphics.panel.o.block = new Image();
		graphics.panel.o.block.src = "g/material/panel-o-block.png";
		graphics.panel.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.panel.t.block = new Image();
		graphics.panel.t.block.src = "g/material/panel-t-block.png";
		graphics.panel.t.block.onload = function() {
			ui.loader.tick();
		}
		graphics.crystal.o.block = new Image();
		graphics.crystal.o.block.src = "g/material/crystal-o-block.png";
		graphics.crystal.o.block.onload = function() {
			ui.loader.tick();
		}
		graphics.crystal.t.block = new Image();
		graphics.crystal.t.block.src = "g/material/crystal-t-block.png";
		graphics.crystal.t.block.onload = function() {
			ui.loader.tick();
		}

		for(n = 0; n < colors.length; n++){
			graphics.classic.o[n] = new Image();
			graphics.classic.o[n].src = "g/material/classic-o-" + colors[n] + ".png";
			graphics.classic.o[n].onload = function(){
				ui.loader.tick();
			}
			graphics.classic.t[n] = new Image();
			graphics.classic.t[n].src = "g/material/classic-t-" + colors[n] + ".png";
			graphics.classic.t[n].onload = function(){
				ui.loader.tick();
			}
			graphics.gameboy.o[n] = new Image();
			graphics.gameboy.o[n].src = "g/material/gameboy-o-" + colors[n] + ".png";
			graphics.gameboy.o[n].onload = function(){
				ui.loader.tick();
			}
			graphics.gameboy.t[n] = new Image();
			graphics.gameboy.t[n].src = "g/material/gameboy-t-" + colors[n] + ".png";
			graphics.gameboy.t[n].onload = function(){
				ui.loader.tick();
			}
			graphics.retro.o[n] = new Image();
			graphics.retro.o[n].src = "g/material/retro-o-" + colors[n] + ".png";
			graphics.retro.o[n].onload = function(){
				ui.loader.tick();
			}
			graphics.retro.t[n] = new Image();
			graphics.retro.t[n].src = "g/material/retro-t-" + colors[n] + ".png";
			graphics.retro.t[n].onload = function(){
				ui.loader.tick();
			}
			graphics.bckwht.o[n] = new Image();
			graphics.bckwht.o[n].src = "g/material/bckwht-o-" + colors[n] + ".png";
			graphics.bckwht.o[n].onload = function(){
				ui.loader.tick();
			}
			graphics.bckwht.t[n] = new Image();
			graphics.bckwht.t[n].src = "g/material/bckwht-t-" + colors[n] + ".png";
			graphics.bckwht.t[n].onload = function(){
				ui.loader.tick();
			}
			graphics.crayon.o[n] = new Image();
			graphics.crayon.o[n].src = "g/material/crayon-o-" + colors[n] + ".png";
			graphics.crayon.o[n].onload = function(){
				ui.loader.tick();
			}
			graphics.crayon.t[n] = new Image();
			graphics.crayon.t[n].src = "g/material/crayon-t-" + colors[n] + ".png";
			graphics.crayon.t[n].onload = function(){
				ui.loader.tick();
			}
			graphics.recent.o[n] = new Image();
			graphics.recent.o[n].src = "g/material/recent-o-" + colors[n] + ".png";
			graphics.recent.o[n].onload = function(){
				ui.loader.tick();
			}
			graphics.recent.t[n] = new Image();
			graphics.recent.t[n].src = "g/material/recent-t-" + colors[n] + ".png";
			graphics.recent.t[n].onload = function(){
				ui.loader.tick();
			}
			graphics.bit8.o[n] = new Image();
			graphics.bit8.o[n].src = "g/material/bit8-o-" + colors[n] + ".png";
			graphics.bit8.o[n].onload = function(){
				ui.loader.tick();
			}
			graphics.bit8.t[n] = new Image();
			graphics.bit8.t[n].src = "g/material/bit8-t-" + colors[n] + ".png";
			graphics.bit8.t[n].onload = function(){
				ui.loader.tick();
			}
			graphics.face.o[n] = new Image();
			graphics.face.o[n].src = "g/material/face-o-" + colors[n] + ".png";
			graphics.face.o[n].onload = function(){
				ui.loader.tick();
			}
			graphics.face.t[n] = new Image();
			graphics.face.t[n].src = "g/material/face-t-" + colors[n] + ".png";
			graphics.face.t[n].onload = function(){
				ui.loader.tick();
			}
			graphics.billiard.o[n] = new Image();
			graphics.billiard.o[n].src = "g/material/billiard-o-" + colors[n] + ".png";
			graphics.billiard.o[n].onload = function(){
				ui.loader.tick();
			}
			graphics.billiard.t[n] = new Image();
			graphics.billiard.t[n].src = "g/material/billiard-t-" + colors[n] + ".png";
			graphics.billiard.t[n].onload = function(){
				ui.loader.tick();
			}
			graphics.dark.o[n] = new Image();
			graphics.dark.o[n].src = "g/material/dark-o-" + colors[n] + ".png";
			graphics.dark.o[n].onload = function(){
				ui.loader.tick();
			}
			graphics.dark.t[n] = new Image();
			graphics.dark.t[n].src = "g/material/dark-t-" + colors[n] + ".png";
			graphics.dark.t[n].onload = function(){
				ui.loader.tick();
			}
			graphics.stud.o[n] = new Image();
			graphics.stud.o[n].src = "g/material/stud-o-" + colors[n] + ".png";
			graphics.stud.o[n].onload = function(){
				ui.loader.tick();
			}
			graphics.stud.t[n] = new Image();
			graphics.stud.t[n].src = "g/material/stud-t-" + colors[n] + ".png";
			graphics.stud.t[n].onload = function(){
				ui.loader.tick();
			}
			graphics.block.o[n] = new Image();
			graphics.block.o[n].src = "g/material/block-o-" + colors[n] + ".png";
			graphics.block.o[n].onload = function(){
				ui.loader.tick();
			}
			graphics.block.t[n] = new Image();
			graphics.block.t[n].src = "g/material/block-t-" + colors[n] + ".png";
			graphics.block.t[n].onload = function(){
				ui.loader.tick();
			}
			graphics.panel.o[n] = new Image();
			graphics.panel.o[n].src = "g/material/panel-o-" + colors[n] + ".png";
			graphics.panel.o[n].onload = function(){
				ui.loader.tick();
			}
			graphics.panel.t[n] = new Image();
			graphics.panel.t[n].src = "g/material/panel-t-" + colors[n] + ".png";
			graphics.panel.t[n].onload = function(){
				ui.loader.tick();
			}
			graphics.crystal.o[n] = new Image();
			graphics.crystal.o[n].src = "g/material/crystal-o-" + colors[n] + ".png";
			graphics.crystal.o[n].onload = function(){
				ui.loader.tick();
			}
			graphics.crystal.t[n] = new Image();
			graphics.crystal.t[n].src = "g/material/crystal-t-" + colors[n] + ".png";
			graphics.crystal.t[n].onload = function(){
				ui.loader.tick();
			}
		}
	}
	
	// Function that defines what each piece is
	var set = function() {
		forms.length = 0;
		
		if (sp1 == true) {
			forms.push([[1, 1, 0], [0, 1, 1]]);
		}
		if (sp2 == true) {
			forms.push([[0, 1, 1], [1, 1, 0]]);
		}
		if (sp3 == true) {
			forms.push([[1, 1], [1, 1]]);
		}
		if (sp4 == true) {
			forms.push([[1, 1, 1, 1]]);
		}
		if (sp5 == true) {
			forms.push([[0, 1, 0], [1, 1, 1]]);
		}
		if (sp6 == true) {
			forms.push([[1, 0, 0], [1, 1, 1]]);
		}
		if (sp7 == true) {
			forms.push([[0, 0, 1], [1, 1, 1]]);
		}
		if (sp8 == true) {
			forms.push([[1]]);
		}
		if (sp9 == true) {
			forms.push([[1], [1]]);
		}
		if (sp10 == true) {
			forms.push([[1, 0], [1, 1]]);
		}
		if (sp11 == true) {
			forms.push([[0, 1, 1], [1, 1, 0], [0, 1, 0]]);
		}
		if (sp12 == true) {
			forms.push([[1, 1, 0], [0, 1, 1], [0, 1, 0]]);
		}
		if (sp13 == true) {
			forms.push([[1, 1, 1, 1, 1]]);
		}
		if (sp14 == true) {
			forms.push([[1, 0], [1, 0], [1, 0], [1, 1]]);
		}
		if (sp15 == true) {
			forms.push([[0, 1], [0, 1], [0, 1], [1, 1]]);
		}
		if (sp16 == true) {
			forms.push([[0, 1], [0, 1], [1, 1], [0, 1]]);
		}
		if (sp17 == true) {
			forms.push([[1, 0], [1, 0], [1, 1], [1, 0]]);
		}
		if (sp18 == true) {
			forms.push([[0, 1], [0, 1], [1, 1], [1, 0]]);
		}
		if (sp19 == true) {
			forms.push([[1, 0], [1, 0], [1, 1], [0, 1]]);
		}
		if (sp20 == true) {
			forms.push([[1, 1], [1, 1], [1, 0]]);
		}
		if (sp21 == true) {
			forms.push([[1, 1], [1, 1], [0, 1]]);
		}
		if (sp22 == true) {
			forms.push([[1, 1, 1], [0, 1, 0], [0, 1, 0]]);
		}
		if (sp23 == true) {
			forms.push([[1, 0, 1], [1, 1, 1]]);
		}
		if (sp24 == true) {
			forms.push([[0, 0, 1], [0, 0, 1], [1, 1, 1]]);
		}
		if (sp25 == true) {
			forms.push([[1, 0, 0], [1, 0, 0], [1, 1, 1]]);
		}
		if (sp26 == true) {
			forms.push([[1, 0, 0], [1, 1, 0], [0, 1, 1]]);
		}
		if (sp27 == true) {
			forms.push([[0, 0, 1], [0, 1, 1], [1, 1, 0]]);
		}
		if (sp28 == true) {
			forms.push([[0, 1, 0], [1, 1, 1], [0, 1, 0]]);
		}
		if (sp29 == true) {
			forms.push([[1, 1, 0], [0, 1, 0], [0, 1, 1]]);
		}
		if (sp30 == true) {
			forms.push([[0, 1, 1], [0, 1, 0], [1, 1, 0]]);
		}
		if (sp31 == true) {
			forms.push([[1], [1], [1]]);
		}
		if (sp32 == true) {
			forms.push([[1, 1], [1, 1], [1, 1]]);
		}
		if (sp33 == true) {
			forms.push([[1, 1, 1, 1, 1, 1]]);
		}
		if (sp34 == true) {
			forms.push([[1, 0], [1, 0], [1, 1], [1, 0], [1, 0]]);
		}
		if (sp35 == true) {
			forms.push([[1, 1], [1, 0], [1, 0], [1, 1]]);
		}
		if (sp36 == true) {
			forms.push([[1, 0], [1, 1], [1, 1], [1, 0]]);
		}
		if (sp37 == true) {
			forms.push([[1, 1, 1], [0, 1, 0], [0, 1, 0], [0, 1, 0]]);
		}
		if (sp38 == true) {
			forms.push([[0, 1, 0], [1, 1, 1], [0, 1, 0], [0, 1, 0]]);
		}
		if (sp39 == true) {
			forms.push([[1, 0, 1], [1, 1, 1], [0, 1, 0]]);
		}
		if (sp40 == true) {
			forms.push([[1, 0, 0], [1, 1, 0], [1, 1, 1]]);
		}
		if (sp41 == true) {
			forms.push([[0, 1, 0], [1, 1, 1], [1, 1, 0]]);
		}
		if (sp42 == true) {
			forms.push([[1, 0, 0, 0, 0], [1, 1, 1, 1, 1]]);
		}
		if (sp43 == true) {
			forms.push([[0, 0, 0, 0, 1], [1, 1, 1, 1, 1]]);
		}
		if (sp44 == true) {
			forms.push([[0, 1, 0, 0, 0], [1, 1, 1, 1, 1]]);
		}
		if (sp45 == true) {
			forms.push([[0, 0, 0, 1, 0], [1, 1, 1, 1, 1]]);
		}
		if (sp46 == true) {
			forms.push([[1, 1, 0, 0, 0], [0, 1, 1, 1, 1]]);
		}
		if (sp47 == true) {
			forms.push([[0, 0, 0, 1, 1], [1, 1, 1, 1, 0]]);
		}
		if (sp48 == true) {
			forms.push([[1, 1, 0, 0], [1, 1, 1, 1]]);
		}
		if (sp49 == true) {
			forms.push([[0, 0, 1, 1], [1, 1, 1, 1]]);
		}
		if (sp50 == true) {
			forms.push([[1, 0, 1, 0], [1, 1, 1, 1]]);
		}
		if (sp51 == true) {
			forms.push([[0, 1, 0, 1], [1, 1, 1, 1]]);
		}
		if (sp52 == true) {
			forms.push([[1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 1, 1]]);
		}
		if (sp53 == true) {
			forms.push([[0, 0, 1], [0, 0, 1], [0, 0, 1], [1, 1, 1]]);
		}
		if (sp54 == true) {
			forms.push([[1, 0, 0], [1, 1, 1], [1, 0, 0], [1, 0, 0]]);
		}
		if (sp55 == true) {
			forms.push([[1, 0, 0], [1, 0, 0], [1, 1, 1], [1, 0, 0]]);
		}
		if (sp56 == true) {
			forms.push([[0, 1, 1], [1, 1, 0], [0, 1, 0], [0, 1, 0]]);
		}
		if (sp57 == true) {
			forms.push([[1, 1, 0], [0, 1, 1], [0, 1, 0], [0, 1, 0]]);
		}
	}
	
	//Functions to change and get piece options
	var switchSp1 = function(bool) {
		sp1 = bool;
		set();
		savePrefs();
	}
	var switchSp2 = function(bool) {
		sp2 = bool;
		set();
		savePrefs();
	}
	var switchSp3 = function(bool) {
		sp3 = bool;
		set();
		savePrefs();
	}
	var switchSp4 = function(bool) {
		sp4 = bool;
		set();
		savePrefs();
	}
	var switchSp5 = function(bool) {
		sp5 = bool;
		set();
		savePrefs();
	}
	var switchSp6 = function(bool) {
		sp6 = bool;
		set();
		savePrefs();
	}
	var switchSp7 = function(bool) {
		sp7 = bool;
		set();
		savePrefs();
	}
	var switchSp8 = function(bool) {
		sp8 = bool;
		set();
		savePrefs();
	}
	var switchSp9 = function(bool) {
		sp9 = bool;
		set();
		savePrefs();
	}
	var switchSp10 = function(bool) {
		sp10 = bool;
		set();
		savePrefs();
	}
	var switchSp11 = function(bool) {
		sp11 = bool;
		set();
		savePrefs();
	}
	var switchSp12 = function(bool) {
		sp12 = bool;
		set();
		savePrefs();
	}
	var switchSp13 = function(bool) {
		sp13 = bool;
		set();
		savePrefs();
	}
	var switchSp14 = function(bool) {
		sp14 = bool;
		set();
		savePrefs();
	}
	var switchSp15 = function(bool) {
		sp15 = bool;
		set();
		savePrefs();
	}
	var switchSp16 = function(bool) {
		sp16 = bool;
		set();
		savePrefs();
	}
	var switchSp17 = function(bool) {
		sp17 = bool;
		set();
		savePrefs();
	}
	var switchSp18 = function(bool) {
		sp18 = bool;
		set();
		savePrefs();
	}
	var switchSp19 = function(bool) {
		sp19 = bool;
		set();
		savePrefs();
	}
	var switchSp20 = function(bool) {
		sp20 = bool;
		set();
		savePrefs();
	}
	var switchSp21 = function(bool) {
		sp21 = bool;
		set();
		savePrefs();
	}
	var switchSp22 = function(bool) {
		sp22 = bool;
		set();
		savePrefs();
	}
	var switchSp23 = function(bool) {
		sp23 = bool;
		set();
		savePrefs();
	}
	var switchSp24 = function(bool) {
		sp24 = bool;
		set();
		savePrefs();
	}
	var switchSp25 = function(bool) {
		sp25 = bool;
		set();
		savePrefs();
	}
	var switchSp26 = function(bool) {
		sp26 = bool;
		set();
		savePrefs();
	}
	var switchSp27 = function(bool) {
		sp27 = bool;
		set();
		savePrefs();
	}
	var switchSp28 = function(bool) {
		sp28 = bool;
		set();
		savePrefs();
	}
	var switchSp29 = function(bool) {
		sp29 = bool;
		set();
		savePrefs();
	}
	var switchSp30 = function(bool) {
		sp30 = bool;
		set();
		savePrefs();
	}
	var switchSp31 = function(bool) {
		sp31 = bool;
		set();
		savePrefs();
	}
	var switchSp32 = function(bool) {
		sp32 = bool;
		set();
		savePrefs();
	}
	var switchSp33 = function(bool) {
		sp33 = bool;
		set();
		savePrefs();
	}
	var switchSp34 = function(bool) {
		sp34 = bool;
		set();
		savePrefs();
	}
	var switchSp35 = function(bool) {
		sp35 = bool;
		set();
		savePrefs();
	}
	var switchSp36 = function(bool) {
		sp36 = bool;
		set();
		savePrefs();
	}
	var switchSp37 = function(bool) {
		sp37 = bool;
		set();
		savePrefs();
	}
	var switchSp38 = function(bool) {
		sp38 = bool;
		set();
		savePrefs();
	}
	var switchSp39 = function(bool) {
		sp39 = bool;
		set();
		savePrefs();
	}
	var switchSp40 = function(bool) {
		sp40 = bool;
		set();
		savePrefs();
	}
	var switchSp41 = function(bool) {
		sp41 = bool;
		set();
		savePrefs();
	}
	var switchSp42 = function(bool) {
		sp42 = bool;
		set();
		savePrefs();
	}
	var switchSp43 = function(bool) {
		sp43 = bool;
		set();
		savePrefs();
	}
	var switchSp44 = function(bool) {
		sp44 = bool;
		set();
		savePrefs();
	}
	var switchSp45 = function(bool) {
		sp45 = bool;
		set();
		savePrefs();
	}
	var switchSp46 = function(bool) {
		sp46 = bool;
		set();
		savePrefs();
	}
	var switchSp47 = function(bool) {
		sp47 = bool;
		set();
		savePrefs();
	}
	var switchSp48 = function(bool) {
		sp48 = bool;
		set();
		savePrefs();
	}
	var switchSp49 = function(bool) {
		sp49 = bool;
		set();
		savePrefs();
	}
	var switchSp50 = function(bool) {
		sp50 = bool;
		set();
		savePrefs();
	}
	var switchSp51 = function(bool) {
		sp51 = bool;
		set();
		savePrefs();
	}
	var switchSp52 = function(bool) {
		sp52 = bool;
		set();
		savePrefs();
	}
	var switchSp53 = function(bool) {
		sp53 = bool;
		set();
		savePrefs();
	}
	var switchSp54 = function(bool) {
		sp54 = bool;
		set();
		savePrefs();
	}
	var switchSp55 = function(bool) {
		sp55 = bool;
		set();
		savePrefs();
	}
	var switchSp56 = function(bool) {
		sp56 = bool;
		set();
		savePrefs();
	}
	var switchSp57 = function(bool) {
		sp57 = bool;
		set();
		savePrefs();
	}
	var getSp1 = function() {
		return sp1;
	}
	var getSp2 = function() {
		return sp2;
	}
	var getSp3 = function() {
		return sp3;
	}
	var getSp4 = function() {
		return sp4;
	}
	var getSp5 = function() {
		return sp5;
	}
	var getSp6 = function() {
		return sp6;
	}
	var getSp7 = function() {
		return sp7;
	}
	var getSp8 = function() {
		return sp8;
	}
	var getSp9 = function() {
		return sp9;
	}
	var getSp10 = function() {
		return sp10;
	}
	var getSp11 = function() {
		return sp11;
	}
	var getSp12 = function() {
		return sp12;
	}
	var getSp13 = function() {
		return sp13;
	}
	var getSp14 = function() {
		return sp14;
	}
	var getSp15 = function() {
		return sp15;
	}
	var getSp16 = function() {
		return sp16;
	}
	var getSp17 = function() {
		return sp17;
	}
	var getSp18 = function() {
		return sp18;
	}
	var getSp19 = function() {
		return sp19;
	}
	var getSp20 = function() {
		return sp20;
	}
	var getSp21 = function() {
		return sp21;
	}
	var getSp22 = function() {
		return sp22;
	}
	var getSp23 = function() {
		return sp23;
	}
	var getSp24 = function() {
		return sp24;
	}
	var getSp25 = function() {
		return sp25;
	}
	var getSp26 = function() {
		return sp26;
	}
	var getSp27 = function() {
		return sp27;
	}
	var getSp28 = function() {
		return sp28;
	}
	var getSp29 = function() {
		return sp29;
	}
	var getSp30 = function() {
		return sp30;
	}
	var getSp31 = function() {
		return sp31;
	}
	var getSp32 = function() {
		return sp32;
	}
	var getSp33 = function() {
		return sp33;
	}
	var getSp34 = function() {
		return sp34;
	}
	var getSp35 = function() {
		return sp35;
	}
	var getSp36 = function() {
		return sp36;
	}
	var getSp37 = function() {
		return sp37;
	}
	var getSp38 = function() {
		return sp38;
	}
	var getSp39 = function() {
		return sp39;
	}
	var getSp40 = function() {
		return sp40;
	}
	var getSp41 = function() {
		return sp41;
	}
	var getSp42 = function() {
		return sp42;
	}
	var getSp43 = function() {
		return sp43;
	}
	var getSp44 = function() {
		return sp44;
	}
	var getSp45 = function() {
		return sp45;
	}
	var getSp46 = function() {
		return sp46;
	}
	var getSp47 = function() {
		return sp47;
	}
	var getSp48 = function() {
		return sp48;
	}
	var getSp49 = function() {
		return sp49;
	}
	var getSp50 = function() {
		return sp50;
	}
	var getSp51 = function() {
		return sp51;
	}
	var getSp52 = function() {
		return sp52;
	}
	var getSp53 = function() {
		return sp53;
	}
	var getSp54 = function() {
		return sp54;
	}
	var getSp55 = function() {
		return sp55;
	}
	var getSp56 = function() {
		return sp56;
	}
	var getSp57 = function() {
		return sp57;
	}
	this.switchSp1 = switchSp1;
	this.switchSp2 = switchSp2;
	this.switchSp3 = switchSp3;
	this.switchSp4 = switchSp4;
	this.switchSp5 = switchSp5;
	this.switchSp6 = switchSp6;
	this.switchSp7 = switchSp7;
	this.switchSp8 = switchSp8;
	this.switchSp9 = switchSp9;
	this.switchSp10 = switchSp10;
	this.switchSp11 = switchSp11;
	this.switchSp12 = switchSp12;
	this.switchSp13 = switchSp13;
	this.switchSp14 = switchSp14;
	this.switchSp15 = switchSp15;
	this.switchSp16 = switchSp16;
	this.switchSp17 = switchSp17;
	this.switchSp18 = switchSp18;
	this.switchSp19 = switchSp19;
	this.switchSp20 = switchSp20;
	this.switchSp21 = switchSp21;
	this.switchSp22 = switchSp22;
	this.switchSp23 = switchSp23;
	this.switchSp24 = switchSp24;
	this.switchSp25 = switchSp25;
	this.switchSp26 = switchSp26;
	this.switchSp27 = switchSp27;
	this.switchSp28 = switchSp28;
	this.switchSp29 = switchSp29;
	this.switchSp30 = switchSp30;
	this.switchSp31 = switchSp31;
	this.switchSp32 = switchSp32;
	this.switchSp33 = switchSp33;
	this.switchSp34 = switchSp34;
	this.switchSp35 = switchSp35;
	this.switchSp36 = switchSp36;
	this.switchSp37 = switchSp37;
	this.switchSp38 = switchSp38;
	this.switchSp39 = switchSp39;
	this.switchSp40 = switchSp40;
	this.switchSp41 = switchSp41;
	this.switchSp42 = switchSp42;
	this.switchSp43 = switchSp43;
	this.switchSp44 = switchSp44;
	this.switchSp45 = switchSp45;
	this.switchSp46 = switchSp46;
	this.switchSp47 = switchSp47;
	this.switchSp48 = switchSp48;
	this.switchSp49 = switchSp49;
	this.switchSp50 = switchSp50;
	this.switchSp51 = switchSp51;
	this.switchSp52 = switchSp52;
	this.switchSp53 = switchSp53;
	this.switchSp54 = switchSp54;
	this.switchSp55 = switchSp55;
	this.switchSp56 = switchSp56;
	this.switchSp57 = switchSp57;
	this.getSp1 = getSp1;
	this.getSp2 = getSp2;
	this.getSp3 = getSp3;
	this.getSp4 = getSp4;
	this.getSp5 = getSp5;
	this.getSp6 = getSp6;
	this.getSp7 = getSp7;
	this.getSp8 = getSp8;
	this.getSp9 = getSp9;
	this.getSp10 = getSp10;
	this.getSp11 = getSp11;
	this.getSp12 = getSp12;
	this.getSp13 = getSp13;
	this.getSp14 = getSp14;
	this.getSp15 = getSp15;
	this.getSp16 = getSp16;
	this.getSp17 = getSp17;
	this.getSp18 = getSp18;
	this.getSp19 = getSp19;
	this.getSp20 = getSp20;
	this.getSp21 = getSp21;
	this.getSp22 = getSp22;
	this.getSp23 = getSp23;
	this.getSp24 = getSp24;
	this.getSp25 = getSp25;
	this.getSp26 = getSp26;
	this.getSp27 = getSp27;
	this.getSp28 = getSp28;
	this.getSp29 = getSp29;
	this.getSp30 = getSp30;
	this.getSp31 = getSp31;
	this.getSp32 = getSp32;
	this.getSp33 = getSp33;
	this.getSp34 = getSp34;
	this.getSp35 = getSp35;
	this.getSp36 = getSp36;
	this.getSp37 = getSp37;
	this.getSp38 = getSp38;
	this.getSp39 = getSp39;
	this.getSp40 = getSp40;
	this.getSp41 = getSp41;
	this.getSp42 = getSp42;
	this.getSp43 = getSp43;
	this.getSp44 = getSp44;
	this.getSp45 = getSp45;
	this.getSp46 = getSp46;
	this.getSp47 = getSp47;
	this.getSp48 = getSp48;
	this.getSp49 = getSp49;
	this.getSp50 = getSp50;
	this.getSp51 = getSp51;
	this.getSp52 = getSp52;
	this.getSp53 = getSp53;
	this.getSp54 = getSp54;
	this.getSp55 = getSp55;
	this.getSp56 = getSp56;
	this.getSp57 = getSp57;
	
	// Function that defines what each material is
	var mat = function() {
		mats.length = 0;
		
		if (mat1 == true) {
			mats.push(1, 1);
		}
		if (mat2 == true) {
			mats.push(2);
		}
		if (mat3 == true) {
			mats.push(3);
		}
		if (mat4 == true) {
			mats.push(4);
		}
	}
	
	// Functions to grab materials
	var switchMat1 = function(bool) {
		mat1 = bool;
		mat();
		savePrefs();
	}
	var switchMat2 = function(bool) {
		mat2 = bool;
		mat();
		savePrefs();
	}
	var switchMat3 = function(bool) {
		mat3 = bool;
		mat();
		savePrefs();
	}
	var switchMat4 = function(bool) {
		mat4 = bool;
		mat();
		savePrefs();
	}
	var getMat1 = function() {
		return mat1;	
	}
	var getMat2 = function() {
		return mat2;
	}
	var getMat3 = function() {
		return mat3;
	}
	var getMat4 = function() {
		return mat4;
	}
	this.switchMat1 = switchMat1;
	this.switchMat2 = switchMat2;
	this.switchMat3 = switchMat3;
	this.switchMat4 = switchMat4;
	this.getMat1 = getMat1;
	this.getMat2 = getMat2;
	this.getMat3 = getMat3;
	this.getMat4 = getMat4;
	
	var loadSeed = function() {
		for (j = (height - 1), l = 0; j > (height - seed.length); j--, l++) {
			for (i = 0; i < seed[l].length; i++){
				map[j][i].mat = seed[l][i];
				if (seed[l][i] != 0) {
					map[j][i].col = (Math.round(Math.random() * (colors.length - 1)));
				}
			}
		}
	}
	
	// Functions to grab width, height, level, and options
	var getWidth = function() {
		return width;
	}
	var setWidth = function(p) {
		width = p*1;
		newGame();
		savePrefs();
	}
	var setHeight = function(p) {
		height = p*1;
		newGame();
		savePrefs();
	}
	var setLevel = function(p) {
		levelstart = p*1;
		savePrefs();
	}
	var setSeed = function(p) {
		seed = [];
		seed.push(p);
		savePrefs();
	}
	var getSeed = function() {
		return seed;
	}
	var getLevel = function() {
		return levelstart;
	}
	var getHeight = function() {
		return height;
	}
	var getShadeEnabled = function() {
		return shadeEnabled;
	}
	var getInvisibleEnabled = function() {
		return invisibleEnabled;
	}	
	var getColorTheme = function() {
		return colorTheme;
	}	
	var getSpeed = function() {
		return speed;
	}
	var switchSpeed = function(motion) {
		if (motion == "low" || motion == "medium" || motion == "high" || motion == "rnd") {
			speed = motion;
			newGame();
			savePrefs();
		}
	}
	var getRotation = function() {
		return rotation;
	}
	var switchRotation = function(direction) {
		if (direction == "cc" || direction == "c") {
			rotation = direction;
			savePrefs();
		}
	}

	// Public methods
	this.newGame = newGame;
	this.setEvents = setEvents;
	this.pause = pause;
	this.prepare = prepare;
	this.loadGameGraphics = loadGameGraphics;
	this.repaintNextPiece = function() { setNextPiece(false, true); }

	 // Prefs
	 this.getWidth 					= getWidth;
	  this.setWidth 				= setWidth;
	 this.getHeight 				= getHeight;
	  this.setHeight 				= setHeight;
	 this.getShadeEnabled 			= getShadeEnabled;
	  this.switchShades 			= switchShades;
	 this.getColorTheme 			= getColorTheme;
	  this.switchTheme 				= switchTheme;
	 this.getSpeed 					= getSpeed;
	  this.switchSpeed 				= switchSpeed;
	 this.getRotation 				= getRotation;
	  this.switchRotation 			= switchRotation;
	 this.getInvisibleEnabled		= getInvisibleEnabled;
	  this.switchInvisibles			= switchInvisibles;
	 this.getLevel					= getLevel;
	  this.setLevel					= setLevel;
	 this.getSeed					= getSeed;
	  this.setSeed					= setSeed;

}
var fwt = new fwt();
