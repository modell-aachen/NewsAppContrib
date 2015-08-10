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
	}, function() {
        	jQuery('#rightBarWrapper').animate({
                	right : '-100%'
        	}, 500, function() {
                	jQuery(this).hide();
        	});
	});

	/**
	* WebRightBar
	**/
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
	
	/**
	* Archive
	**/
	if (foswiki.preferences.TOPIC.indexOf('WebHome') >= 0) {
		var rowNumber = 0;

             	getNextArchivData(rowNumber);

             	jQuery('.newsArchivItem').find('img').each(function() {
             		if (!(jQuery(this).parent().hasClass('bigThumb'))) {
             			jQuery(this).remove();
             		}
             	});

          	jQuery(window).unbind('scroll').bind('scroll', function() {
             		if(jQuery(window).scrollTop() + jQuery(window).height() == jQuery(document).height()) {
             			rowNumber += 1;
            			getNextArchivData(rowNumber);
            		}
          	});	
	}
});

function getNextArchivData(rowNumber) {
	jQuery.get(foswiki.preferences.SCRIPTURL + '/view' + foswiki.preferences.SCRIPTSUFFIX  + '/' + foswiki.preferences.WEB + '/ArchivContentLoad?contenttype=text/plain;skin=text;section=archivLazyLoading;rowNumber=' + rowNumber , function(data) {
		jQuery('#archiveContentArea').append(data);
  	}).done(function() {
		jQuery('#archiveContentArea').find('img').each(function() {
  			if (!(jQuery(this).parent().hasClass('bigThumb'))) {
  				jQuery(this).remove();
 			}
   		});
  	});
}
