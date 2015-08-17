jQuery(document).ready(function() {
	
	/**
	* General Application Settings
	**/	

	//--- Close Function for NewsSlider
	jQuery('.rightBarClose').click(function() {
        	jQuery('#toggleNews').trigger('click');
	});

	//--- Set function to open NewsSlider
	jQuery('#toggleNews').toggle(function(){
        	jQuery('#rightBarWrapper').show().animate({
                	right : '0'	
        	}, 500);
			getNextArchivData(rowNumber, jQuery('.modacRightBar').first(), 'rightBarContentLoad', setRightBarConfig);
	}, function() {
        	jQuery('#rightBarWrapper').animate({
                	right : '-100%'
        	}, 500, function() {
					jQuery('.modacRightBar').first().empty();
                	jQuery(this).hide();
        	});
	});	
	
	/**
	* Archive
	**/
	if (foswiki.preferences.TOPIC.indexOf('WebHome') >= 0 && foswiki.preferences.WEB.indexOf('News') >= 0) {
		var rowNumber = 0;

        getNextArchivData(rowNumber, jQuery('#archiveContentArea'), 'archivLazyLoading');

		jQuery('.newsArchivItem').find('img').each(function() {
			if (!(jQuery(this).parent().hasClass('bigThumb'))) {
				jQuery(this).remove();
			}
		});

		jQuery(window).unbind('scroll').bind('scroll', function() {
			if(jQuery(window).scrollTop() + jQuery(window).height() == jQuery(document).height()) {
				rowNumber += 1;
				getNextArchivData(rowNumber, jQuery('#archiveContentArea', 'archivLazyLoading'));
			}
		});	
	}
});

function getNextArchivData(rowNumber, obj, section, callback) {
	jQuery.get(foswiki.preferences.SCRIPTURL + '/view' + foswiki.preferences.SCRIPTSUFFIX  + '/News/ArchivContentLoad?contenttype=text/plain;skin=text;section=' + section + ';rowNumber=' + rowNumber , function(data) {
		jQuery(obj).append(data);
  	}).done(function() {
		jQuery(obj).find('img').each(function() {
  			if (!(jQuery(this).parent().hasClass('bigThumb'))) {
  				jQuery(this).remove();
 			}
   		});
		
		if (typeof callback != 'undefined') {
			try {
				callback();
			} catch(e) {}
		}
  	});
}

function setRightBarConfig() {
	jQuery('.modacRightBar .newsItem .summary').each(function() {
		var wholeText   = jQuery(this).html();
		var partText    = wholeText.substring(0, 300);
		if (wholeText.length > 300) {
				jQuery(this).after('<div class="partSummary">' + partText + ' ...</div>').hide();
		}
 	});

    jQuery('.modacRightBar .newsItem .partSummary').unbind().bind('click', function() {
		jQuery(this).slideUp('normal', function() {
			jQuery(this).prev().slideDown('normal');
		});
  	});

	jQuery('.modacRightBar').find('img').each(function() {
		if (!(jQuery(this).parent().hasClass('bigThumb')) && !jQuery(this).parent().hasClass('newsTopIconLinks')) {
			jQuery(this).remove();
		}
	});
}

