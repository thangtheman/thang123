// Gallery URL change
jq(document).ready(function(){

var hashidx = 0;
var arr_url = null;
var newcap = '';
var hash ='';
function gal_index(){
	// working with url

	var myurl = unescape(window.location.href);
	myurl = myurl.slice(0,-1);
	//alert(myurl);
    arr_url = myurl.split("_");
    if(arr_url.length > 1){
        var n = arr_url[1].indexOf("?"); 
    }
    else{
        var n=0;
    }
	if(n=='') n=0;
	if(n==0 || n==-1){
		hash = arr_url.pop(-1);
	}else{
		hash = arr_url[1].substring(0,n);
	}
	//hash = hash.replace("/","");
	//alert(hash+"   "+n);

	jq('#sliderBigReal ul li').each(function () {
		var el = jq(this);
		//alert(el.attr('id'));
		var newcap = jq.trim(el.attr('id').replace(/ /g, "-"));
		//alert("newcap="+newcap);

		//alert(newcap+'=='+hash);
		if(newcap == hash){
			//alert("if="+el.index());
			hashidx = el.index();
		}
	});
	if(hash == null || hash == "" || hash == " "){
		hashidx = 0;		
	}
	
}
gal_index()
//console.log('Hash index : '+hashidx);
//alert(newcap+'=+='+hash+'=_='+hashidx);
function sliderHandler(){
	var realThumbnum = 5;
	var realThumbslide = 1;
	
	if(jq("#sliderBigReal").length>0){
		
		var realSlider= jq("#sliderBigReal ul").bxSlider({
			speed:1000,
			pager:false,
			nextText:'',
			prevText:'',
			infiniteLoop:true,
			hideControlOnEnd:true,
            adaptiveHeight:true,
			startSlide : hashidx,
			onSlideBefore:function($slideElement, oldIndex, newIndex){
				changeRealDetailThumb(realThumbSlider,newIndex,realThumbnum);				
				var newhash = $slideElement.attr('title');
				newhash = newhash.replace(/ /g, "-");
				newhash = newhash.replace(/[^-a-z0-9]/ig,'-');
                var pid = $slideElement.attr('id');
				//alert(newhash+'------'+pid+'------'+newIndex);
				//alert(gallery_url+newhash+'_'+pid);
				history.pushState('','',gallery_url+newhash+'_'+pid);
                //setPrevNextGalleryLink(newIndex);
                
                //title update
               // document.title = $slideElement.attr('title')+' | '+jq(".h-breadcrumb").next('.hdh1').html()+' | Z Living';
               document.title = $slideElement.attr('title')+' | '+jq('.article-page h1').html()+' | Z Living';
               
			},
            onSlideAfter:function($slideElement, oldIndex, newIndex){
                //update ga on slide
				var curr_url = window.location.href.toString().split(window.location.host)[1];
				ga('send','pageview',curr_url);
				//alert(window.location.href);
               // _gaq.push(['_setAccount', 'UA-27127053-1']);
               // _gaq.push(['_trackPageview',curr_url]);
                
                //comscore
                /*var _comscore = _comscore || [];
                _comscore.push({ c1: "2", c2: "9254297" });
                (function() {
                var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
                s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
                el.parentNode.insertBefore(s, el);
                })();*/

			},
			onSliderLoad:function(currentIndex){
				//alert(realThumbnum+"    "+hashidx);
				
				linkRealSliders("#sliderBigReal ul",hashidx);
				changeRealDetailThumb(realThumbSlider,hashidx,hashidx);
                changeRealDetailThumb(realThumbSlider,hashidx,realThumbnum);
                //set links into previuos next buttons for previous/next gallery
                //setPrevNextGalleryLink(hashidx);
			}
		});
		
		var realThumbSlider=jq("#sliderThumbReal ul").bxSlider({
		  //
		  minSlides: realThumbnum,
		  maxSlides: realThumbnum,
		  slideWidth: 156,
		  slideMargin: 12,
		  moveSlides: realThumbslide,
		  pager:false,
		  speed:1000,
		  infiniteLoop:true,
		  hideControlOnEnd:false,
		  nextText:'',
		  prevText:'',
		  onSlideBefore:function(jQueryslideElement, oldIndex, newIndex){
			}
		});
		
		linkRealSliders(realSlider,realThumbSlider);
		
		if(jq("#sliderThumbReal li").length<(realThumbnum+1)){
			jq("#sliderThumbReal .bx-next").hide();
			alert(realThumbSlider);
		}
	}	
}

function linkRealSliders(bigS,thumbS){
	console.log(bigS);
	console.log(thumbS);

	jq("#sliderThumbReal ul").on("click","a",function(event){
		//alert("hello");
		event.preventDefault();
		newIndex=parseInt(jq(this).parent().attr("slideIndex"));
		bigS.goToSlide(newIndex);
	});
}
function changeRealDetailThumb(slider,newIndex,realThumbnum){
	//alert(slider+'----'+newIndex+'----'+realThumbnum);

	var $thumbS=jq("#sliderThumbReal");
	$thumbS.find('.active').removeClass("active");
	$thumbS.find('li[slideIndex="'+newIndex+'"]').addClass("active");
    
	//if(slider.getSlideCount()-newIndex>=realThumbnum){
		//alert("if")
		setTimeout(function(){ slider.goToSlide(newIndex); }, 300);
        
	//}
	//else {
	//	alert("else")
    //    slider.goToSlide(slider.getSlideCount()-realThumbnum);
	//}
    
   // setPrevNextGalleryLink(newIndex);
}
function setPrevNextGalleryLink(currentIndex){
    //console.log($("#sliderBigReal li").length+'###'+currentIndex);
    //set links into previuos next buttons for previous/next gallery
    if(jq("#sliderBigReal li").length === (currentIndex+1)){
        if(next_gallery_url !== ''){
            var nglink = '<a href="'+next_gallery_url+'" class="nextgal"></a>';
			jq('#sliderBigReal .bx-wrapper .bx-has-controls-direction .bx-controls-direction').append(nglink);
        }
    }
    else{ 
        jq("#sliderBigReal .nextgal").remove();
    }
    if(currentIndex === 0){
        /*if(prev_gallery_url !== ''){
            var pvlink = '<a href="'+prev_gallery_url+'" class="prevgal"></a>';
			jq('#sliderBigReal .bx-wrapper .bx-has-controls-direction .bx-controls-direction').append(pvlink);
        }*/
    }
    else{
       jq("#sliderBigReal .prevgal").remove();
    }
}
// gallery carousel ends
 sliderHandler();
 });