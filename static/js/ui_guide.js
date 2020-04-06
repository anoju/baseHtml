$(function () {
	if($('.g_content>h2').length && $('.g_content>h2').text() != ''){
		var $title = document.title
		document.title = $('.g_content>h2').text()+' | '+$title;
	}
	
	var $thBtn = $('th button'), 
		$projectSelect = $('.g_project .current'), 
		$document = $(document),
		$currentName = $('nav a[href^="' + location.pathname.split("/")[5] + '"]');
		$currentTile = $currentName.text(),
		$codeView = $('.g_guide_info .code_view'),
		$codeViewTarget = $('.g_guide_info .code_view h4 a');
	$currentName.closest('li').addClass('active').parents('li').addClass('active');// 현재 메뉴 활성화
	//$('.g_content>h2').text($currentTile);// 현재 타이틀
	$projectSelect.on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active').next('.g_list').toggle();
	});
	$document.on('click', function(e) {
		var a = e.target;
		if($(a).closest('.g_project').length === 0) {
			$('.g_project .current').removeClass('active').next('.g_list').hide();
		 }
	});
	if($('.code').length > 0){
		SyntaxHighlighter.all();
	}
	$codeViewTarget.on('click', function() {
		var $this = $(this).closest('.code_view');
		if (!$this.hasClass('active')){
			$codeView.removeClass('active');
			$this.addClass('active');
		} else {
			$this.removeClass('active');
		}
	});
	$thBtn.on('click', function() {
		var $this = $(this), 
			//$target = $this.attr('rel'),
			$idx = $this.closest('th').index(),
			$grid = $this.closest('.g_board');
		$this.closest('th').hide();
		//$grid.find('.'+$target).hide();
		$grid.find('tr').not('.hr').each(function(){
			$(this).find('td').eq($idx).hide();
		});
		$grid.resize();
		var thNum = $grid.find('thead th:visible').length;
		$grid.find('.hr').data('colspan',thNum);
		$grid.find('.hr th').attr('colspan', thNum);
	});

	// Status Count	
	$('.g_content tbody .c_date').each(function(){
		if(!$.trim($(this).html())==''){
			$(this).parent('tr').addClass('complete');
		}
	})
	$('.g_content tbody .m_date').each(function(){
		if(!$.trim($(this).html())==''){
			$(this).parent('tr').addClass('modify');
		}
	});
	$('.g_board_panel').each(function(){
		var $this = $(this),
			$no = $this.find('table .no'),
			pageNum = $no.length;
		
		var $noIdx = 1;
		$this.find('tbody tr').each(function(){
			if($(this).hasClass('cms')){
				$(this).find('.no').text('CMS');
			}else if($(this).find('.no').length){
				$(this).find('.no').text($noIdx);
				$noIdx++;
			}
		});
		var completeNum = $this.find('.complete').length,
			per = Math.round((100/pageNum)*completeNum);
			
		$this.find('.total .num').text(pageNum);
		$this.find('.cp_num .num').text(completeNum);
		$this.find('.ing .num').text(per);
		$this.find('.bar').css('width', per+'%');
	});

	var totalPageNum = $('table .no').length,
		completeTotalNum = $('table .complete').length,
		perTotal = Math.round((100/totalPageNum)*completeTotalNum);

	$('.g_project_status .total .num').text(totalPageNum);
	$('.g_project_status .cp_num .num').text(completeTotalNum);
	$('.g_project_status .ing .num').text(perTotal);
	$('.g_project_status .bar').css('width', perTotal+'%');

	// Tab
	var g_board_tab = function(){
		var $tab = $('.g_board_tab ul li'), $tabCurrent = $('.g_board_tab ul li.active'), $panel = $('.g_board_panel');
		$('#'+$tabCurrent.attr('rel')).addClass('active')
		$tab.on('click', function(e){
			e.preventDefault();
			var $this = $(this), panelID = $this.attr('rel'), $scrollTop = $(window).scrollTop();
			$this.addClass('active').siblings('li').removeClass('active');
			$('#'+panelID).addClass('active').siblings('.g_board_panel').removeClass('active');

			location.hash = panelID;
			$(window).scrollTop($scrollTop);
		});
		//$(window).on('load',function(){
			var $hash = location.hash;
			if(!!$hash){
				$tab.each(function(){
					var $rel = $(this).attr('rel');
					if($rel == $hash.substring(1)){
						$(this).addClass('active').siblings().removeClass('active');
						$('#'+$rel).addClass('active').siblings('.g_board_panel').removeClass('active');
					}
				});
			}else{
				$tab.eq(0).addClass('active');
				$panel.eq(0).addClass('active');
			}
		//});
	}
	g_board_tab();
	
	// swiper Tab
	var tabSwiper = '';
	var tabSlide = function(){
		var $tab = $('.g_board_tab');
		if($tab.length > 0){
			tabSwiper = new Swiper('.g_board_tab', {
				slidesPerView: 'auto',
				freeMode: true
			});
			$('.g_board_tab .swiper-slide').on('click', function(e){
				var $this = $(this),
					gnbWidth = $tab.width(),
					offset = $this.width()+$this.offset().left,
					$slideItems = $this,
					myIndex = $this.index();
				if(gnbWidth < offset){
					tabSwiper.slideNext();
				} else {
					tabSwiper.slideTo(myIndex-1);
				}
			});
			
			$(window).on('load',function(){
				tabSwiper.update();
			});
		}
	}
	tabSlide();
	$(window).on('resize', function () {
		var $hr = $('tr.hr th'), 
			windowWidth = $(window).width();		
		if(windowWidth < 1024){
			$hr.attr('colspan','2');
		}else{
			var $colspan = $hr.parent().data('colspan')
			if($colspan == undefined){
				$hr.attr('colspan','10');
			}else{
				$hr.attr('colspan',$colspan);
			}
		}
	});
	
	
	$('.g_board').each(function(){
		var _this = $(this);
		var dayArry = [];
		var dayArry2 = [];
		var wkArry = [];
		$(this).find('tbody td.c_date').each(function(){
			var _txt = $(this).text();
			if(!!_txt){
				var _txt2 = parseInt(_txt.split('-').join(''));
				var _class = 'c_'+_txt2;
				$(this).closest('tr').addClass(_class);
				if(dayArry.indexOf(_txt2) == -1){
					dayArry.push(_txt2);
				}
			}
		});
		dayArry.sort(function(a,b){
			return a - b;
		});
		var $select = $(this).find('thead th.c_date select');
		if($select.length){
			for(var i = 0;i < dayArry.length;i++){
				var opt = dayArry[i].toString();
				var optTxt = opt.substr(0, 4) + '-' + opt.substr(4, 2) + '-' + opt.substr(6, 2);
				$select.append('<option value="'+opt+'">'+optTxt+'</option>')
			}
		}

		$(this).find('tbody td.m_date').each(function(){
			var _txt3 = $(this).text();
			if(!!_txt3){
				var _txt4 = parseInt(_txt3.split('-').join(''));
				var _class2 = 'm_'+_txt4;
				$(this).closest('tr').addClass(_class2);
				if(dayArry2.indexOf(_txt4) == -1){
					dayArry2.push(_txt4);
				}
			}
		});		
		dayArry2.sort(function(a,b){
			return a - b;
		});		
		var $select2 = $(this).find('thead th.m_date select');
		if($select2.length){
			for(var j = 0;j < dayArry2.length;j++){
				var opt2 = dayArry2[j].toString();
				var optTxt2 = opt2.substr(0, 4) + '-' + opt2.substr(4, 2) + '-' + opt2.substr(6, 2);
				$select2.append('<option value="'+opt2+'">'+optTxt2+'</option>')
			}
		}

		$(this).find('tbody td.worker').each(function(){
			var _txt5 = $(this).text();
			if(!!_txt5){
				var _idx = wkArry.indexOf(_txt5);
				if(_idx == -1){
					_idx = wkArry.length;
					wkArry.push(_txt5);
				}
				var _class3 = 'wk_'+_idx;
				$(this).closest('tr').addClass(_class3);
			}
		});
		var $select3 = $(this).find('thead th.worker select');
		if($select3.length){
			for(var k = 0;k < wkArry.length;k++){
				var opt3 = wkArry[k];
				$select3.append('<option value="'+k+'">'+opt3+'</option>')
			}
		}
		
		var _isMouseDown = false,
			_startX = '',
			_scrollLeft = '',
			_scrollChkHtml = '<div class="g_board_scroll"><div></div></div>';
		if(!_this.next('.g_board_scroll').length)_this.after(_scrollChkHtml);
		_this.on('mousedown',function(e){
			var _scrollWidth = _this.get(0).scrollWidth,
				_thisWidth = _this.width();
			if((_scrollWidth-_thisWidth) > 0){
				_isMouseDown = true;
				_this.addClass('catching');
				_startX = e.pageX - _this.offset().left;
				_scrollLeft = _this.scrollLeft();
			}
		});
		_this.on('mouseup',function(e){
			_isMouseDown = false;
			_this.removeClass('catching');
		});
		_this.on('mouseeleave',function(e){
			_isMouseDown = false;
			_this.removeClass('catching');
		});
		_this.on('mousemove',function(e){
			if(!_isMouseDown) return;
			e.preventDefault();
			var _x = e.pageX - _this.offset().left;
			var _walk = (_x - _startX);
			var _scroll = _scrollLeft - _walk; 
			_this.scrollLeft(_scroll);
		});
		
		var catchChk = function(){
			var _sclWid = _this.get(0).scrollWidth - _this.width(),
				_thisLeft = _this.scrollLeft();
			if(_sclWid > 0){
				_this.addClass('catch');
			}else{
				_this.removeClass('catch');
			}
			
			return (_thisLeft/_sclWid)*100;
		}
		catchChk();
		_this.on('scroll resize',function(e){
			var _tar = _this.next('.g_board_scroll').find('>div');
			var _per = catchChk();
			_tar.css('width',_per+'%');
		});
	});
	$('.g_board thead th select').change(function(){
		var $tbody = $(this).closest('.g_board').find('tbody'),
			$class = '';
		if($(this).val() == ''){
			$tbody.find('tr').removeAttr('style');
		}else{
			if($(this).closest('.c_date').length)$class = '.c_';
			if($(this).closest('.m_date').length)$class = '.m_';
			if($(this).closest('.worker').length)$class = '.wk_';
			$(this).closest('th').siblings().find('select').val('');
			$tbody.find('tr').not('.hr').hide();
			$tbody.find($class+$(this).val()).show();
		}
	});
	
	$(window).resize();
});
