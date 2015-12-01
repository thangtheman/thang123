var home_url = "http://"+document.domain;
var current_url = window.location.href;
//home_url
//alert( );
var jq = jQuery.noConflict();

    jq(window).load(function() {
       jq("#et-main-area").removeClass('et-main-area');
     });

        function tv_show_parent() {

          jq(".our_mega_menu a#TV__WHERE_TO_WATCH").removeClass("selected");
          jq(".our_mega_menu a#TV__TV_SCHEDULE").removeClass("selected");
          var class_name = ".our_mega_menu a#TV__SHOWS";
          jq(class_name).addClass("selected");
        }
        function tv_shedule_parent() {

          jq(".our_mega_menu a#TV__WHERE_TO_WATCH").removeClass("selected");
          jq(".our_mega_menu a#TV__SHOWS").removeClass("selected");
          var class_name = ".our_mega_menu a#TV__TV_SCHEDULE";
          jq(class_name).addClass("selected");
        }

        function tv_show_wtw() {
          jq(".our_mega_menu a#TV__SHOWS").removeClass("selected");
          jq(".our_mega_menu a#TV__TV_SCHEDULE").removeClass("selected");
          var class_name = ".our_mega_menu a#TV__WHERE_TO_WATCH";
          jq(class_name).addClass("selected");
        } 

        function inner_menudataid(id) {
          $id_array = (id).split("__");
          var hidden_ids_array = (jq("#our_mega_menu_hidden_ids").val()).split("~");
          //alert(".our_mega_menu a #"+($id_array[1]+"~"+$id_array[2]));
          for (i = 0; i < hidden_ids_array.length-1; i++) {
            var loop_class_name = ".our_mega_menu a#"+(hidden_ids_array[i]);
            jq(loop_class_name).removeClass("selected")

          }
          var class_name = ".our_mega_menu a#"+($id_array[1]+"__"+$id_array[2]);
          jq(class_name).addClass("selected")
        } 
        function menu_display(id) {
          //alert("dddddd")
          $url = id;
          //alert($url);
          jq.ajax({  
          type:"GET",  
          cache:  true,
          url: home_url+"/wp-admin/admin-ajax.php?action=cat_5post",  
          data: { 
            'url': $url}, 
          success:function(data){
            jq(".our_mega_menu").html("");
            //jq(".our_mega_menu").css("display","none");
            //jq("#our_mega_menu_"+id).css("display", "block");
            //alert(data)
            data_array = data.split('~!@#$%');
            //alert(data_array[1]);
            jq('#our_mega_menu_'+id).html(data_array[0]);
            jq('#our_mega_menu_hidden_ids').val(data_array[1]);

            //console.log(data); 
      }

        });
      }

      function country_chooser($id,$url){
       // alert("Sdfsdfsdf");

              //$id = id;
              jq.ajax({  
              type:"GET",  
              cache:  true,
              url: home_url+"/wp-admin/admin-ajax.php?action=country_chooser",  
              data: { 
                'country_name': $id
              }, 
              success:function(data){
                //alert (data);
                console.log(data);
                if($url != '')
                  document.location.href = $url;
                else
                  document.location.href = current_url;
                return false;
                /*jq('#CountryModal').modal('hide');
                jq('#header_country_chooser').html(data);
                jq('#widget_country_chooser').html(data);
                */
                //alert(data);
               // jq(".our_mega_menu").css("display", "block");
                //jq('.menu_article_content').html(data);
               // console.log(data); 
            }

            });

      }

      function submenu_display(id,region_value,country_gmt_value,geo_location) {

          var hidden_ids_array = (jq("#our_mega_menu_hidden_ids").val()).split("~");
          //alert(".our_mega_menu a #"+($id_array[1]+"~"+$id_array[2]));
          for (i = 0; i < hidden_ids_array.length-1; i++) {
            var loop_class_name = ".our_mega_menu a#"+(hidden_ids_array[i]);
            jq(loop_class_name).removeClass("selected")

          }

          jq(".our_mega_menu a#TV__SHOWS").removeClass("selected");
          jq(".our_mega_menu a#TV__TV_SCHEDULE").removeClass("selected");
          jq(".our_mega_menu a#TV__WHERE_TO_WATCH").removeClass("selected");

          jq(".our_mega_menu a#RECIPES__ALL_RECIPES").removeClass("selected");
          jq(".our_mega_menu a#RECIPES__BY_COURSE").removeClass("selected");
          jq(".our_mega_menu a#RECIPES__BY_CUISINE").removeClass("selected");

          $id = id;
          jq.ajax({  
          type:"GET",  
          cache:  true,
          url: home_url+"/wp-admin/admin-ajax.php?action=subcat_5post",  
          data: { 
            'id': $id,
            'region_value' : region_value,
            'country_gmt_value' : country_gmt_value,
            'geo_location' :  geo_location
          }, 
          success:function(data){
           // jq(".our_mega_menu").css("display", "block");
            jq('.menu_article_content').html(data);
           // console.log(data); 
        }

        });
      }
      function ValidateForm(){
           try{
                   if(jq("#s").val() == "") {
                        //alert("google");
                           return false;
                   }
           }
           catch(e){
                   alert("ValidateForm() : "+e.message);
           }
      }
       /*This below function checks whether user image icon exists or not starts here */
  function file_exists (url) {
    var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
      if (!req) {
        throw new Error('XMLHttpRequest not supported');
      }

      // HEAD Results are usually shorter (faster) than GET
      req.open('HEAD', url, false);
      req.send(null);
      if (req.status == 200) {
        return true;
      }

    return false;
  }

  function ChangeUrl(page, url) {
        if (typeof (history.pushState) != "undefined") {
            var obj = { Page: page, Url: url };
            //alert(current_url);
            current_url1 = current_url.split('--');
            if(current_url1[0].substr(current_url1[0].length - 1) == '/')
            {current_url = current_url1[0].slice(0,-1);
            } else {
              current_url = current_url1[0];
            }
         // alert(current_url);
            history.pushState('', '', current_url+'--'+url);

        } else {
            alert("Browser does not support HTML5.");
        }
    }

//FOR TV CAROUSEL SCHEDULE
   //jq('.tv-carousel .et_pb_slide > div.selected').removeClass('tvschedule_click');
     function tvschedule_click(date1,region_value,str_country_gmt_value,str_hq_name_gmt_value,hq_date,current_country_minus30) {
       // alert(this.id);
          jq('.tv-schedule-grid').html('<div style="text-align: center; width: 100%;"><img style="text-align:center" src="'+home_url+'/wp-content/themes/Divi/images/ajax-loader.gif"><p>Loading....</p></div>');
          jq('.tv-filters input:checkbox').removeAttr('checked');
          $id = date1;
          $region_value = region_value;
          $str_country_gmt_value = str_country_gmt_value;
          $str_hq_name_gmt_value = str_hq_name_gmt_value;
          $hq_date = hq_date;
          $current_country_minus30 = current_country_minus30;
          //alert($id);

          $selected_hidden_date = jq('#selected_hidden_date').val();
          //alert($selected_hidden_date);
          jq('.tv-carousel .et_pb_slide > div').removeClass('selected');
          //jq($id).addClass('selected');
          jq.ajax({  
          type:"POST",  
          cache:  true,
          url: home_url+"/wp-admin/admin-ajax.php?action=tvschedule_click",  
          data: { 
            'click_date': $id,
            'region_value':$region_value,
            'str_country_gmt_value':$str_country_gmt_value,
            'str_hq_name_gmt_value':$str_hq_name_gmt_value,
            'hq_date':$hq_date,
            'current_country_minus30':$current_country_minus30}, 
          success:function(data){
            jq('.tv-schedule-grid').html(data);
            //if($selected_hidden_date == ''){
              //alert($id);
              ChangeUrl('Zliving Schedule page', $id);
              ga('send','pageview','tv/schedule--'+$id);
            //}
            jq('#selected_hidden_date').val($id);
            jq($id).removeClass('tvschedule_click');
            $selected_hidden_date = '';
            //alert(data)
            //jq("body").append(data);
          }
        });

     }



    jq( document ).ready(function() {

    jq( ".mobile-search" ).click(function() {
    jq("#et_top_search_mobile" ).toggle( "slow" );
    });

  jq('figure.responsive').picture();
  jq('#myTab1 a').click(function (e) {
    e.preventDefault()
    jq(this).tab('show')
    jq('#myTab1 a:first').tab('show') // Select first tab
  });
  //jq('#myTab1 a:first').tab('show') // Select first tab
  
//Tv schedule checkboxes starts here

  jq('.tv-filters  input:checkbox').change(function(){
    var tempValue='';
    tempValue=jq('.tv-filters  input:checkbox').map(function(n){
       if(this.checked){
              return  this.value;
            };
     }).get().join(',');
   // alert(tempValue);
   var arr = tempValue.split(',');

      //var incrementid  = i+1;
      //var res = str.replace("ck", ""); 
      jq(".ck1").hide();
      jq(".ck2").hide();
      jq(".ck3").hide();
      jq(".ck4").hide();
      
      if(jq.inArray( "ck1", arr )!== -1) {
        //alert("zxc");
        jq(".ck1").show();
      } 

      if(jq.inArray( "ck2", arr )!== -1) {
        jq(".ck2").show();

      }
      if(jq.inArray( "ck3", arr )!== -1) {
        jq(".ck3").show();
      }
      if(jq.inArray( "ck4", arr )!== -1) {
        jq(".ck4").show();
      } 
      //alert();
      if(tempValue === ''){
        //alert("no");
        jq(".ck1").show();
        jq(".ck2").show();
        jq(".ck3").show();
        jq(".ck4").show();
        //jq("#checkbox"+incrementid).hide()
      }
     //}
    })
  
  jq('.tv-carousel > div > div > div').on('click', function(){
    jq('div.selected').removeClass('selected');
    jq(this).addClass('selected');
  });


//Tv schedule checkboxes ends here
   
    
      jq('#VideoModal').on('hide.bs.modal', function (e) {
          jq("#VideoModal").empty();
       });


        
      jq('.model_ajax_popup').click(function() {

          $id = (this.id).split("_");
          //alert($id[1]);
          jq.ajax({  
          type:"POST",  
          cache:  true,
          url: home_url+"/wp-admin/admin-ajax.php?action=model_ajax_popup",  
          data: { 
            'postid': $id[1]}, 
          success:function(data){
            jq("#modelpopup").css("display","block");
            jq('#VideoModal').html(data);
            //alert(data)
            //jq("body").append(data);
          }
        });
        });
     
      


    jq("#top-menu > div").on('mouseover', function(e) {
      e.stopPropagation();
      jq(this).addClass('hovered');
      jq(this).removeClass('nothovered');
      jq('#top-menu > div > div').removeClass('none');
      jq('#top-menu > div > div').addClass('block');
    });
    
    jq("#top-menu > div").on('mouseout', function(e) {
      e.stopPropagation();
      jq(this).removeClass('hovered');
      jq(this).addClass('nothovered');
      jq(this).removeClass('none');
      jq('#top-menu > div > div').addClass('none');
      jq('#top-menu > div > div').removeClass('block');
    });
    
    
       /*jq('body').on('mouseover', '.subcat_menu1', function(e){
       //jq('.subcat_menu1').mouseenter(function () {
          //alert("dddddd")
           e.preventDefault();
          $id = this.id;
          jq.ajax({  
          type:"GET",  
          cache:  true,
          url: home_url+"/wp-admin/admin-ajax.php?action=subcat_5post",  
          data: { 
            'id': $id}, 
          success:function(data){
           // jq(".our_mega_menu").css("display", "block");
            jq('.menu_article_content').html(data);
           // console.log(data); 
        }

        });
      }); */
    
      //jq( ".our_mega_menu" ).mouseleave(function() {
     //jq(".our_mega_menu").css("display", "none");
   // });



    jq('body').on('click', '.logbtn', function(e){ 
      comment_title = jq( this ).attr( "data-commentid" );
    });
          //user_login_status
      var data_str = '';
      //alert(getCookie("userlogin_id"));
      //if(getCookie("userlogin_id") == 'undefined' || getCookie("userlogin_id") == null || getCookie("userlogin_id") == ''){
        //data_str = '<div id="user_login_status" class="pull-right signinlinks">          <a data-toggle="modal" id="login-text" data-target="#loginModal" href="javascript:;" class="logbtn">Sign-in</a> | <a data-toggle="modal" id="register-text" data-target="#loginModal" href="javascript:;" class="logbtn">Sign-up</a>        </div>';
       // } else { 
        //data_str = '<div id="user_login_status"  class="pull-right signinlinks">          <span class="salutation">Hello, '+getCookie("userlogin_name")+'</span>          |          <a href="javascript:;" onclick="startLogoutPolling()">Logout</a>         </div>';
        
     // }
      jq('#user_login_status').html(data_str);

      if(getCookie("get_country_name") == 'undefined' || getCookie("get_country_name") == null || getCookie("get_country_name") == ''){
           span_data = '<span class="flag usa"></span>USA';    
      } else {
           span_data = '<span class="flag '+getCookie("get_country_name")+'"></span>'+(getCookie("get_country_name")).replace(/#|-|_/g,' ');        

      }
      jq('#header_country_chooser').html(span_data);
      jq('#widget_country_chooser').html(span_data);
      
      //jq('#top-menu li:has(ul)').addClass('menuarr');
    
      jq('#myTab a').click(function (e) {
     e.preventDefault()
         jq(this).tab('show')
      })
      
      jq('#login-text').click(function (e) {
        jq('#myTab a[href="#login"]').tab('show')
      })
      
      jq('#register-text').click(function (e) {
    e.preventDefault()
        jq('#myTab a[href="#register"]').tab('show')
      })
      
      function launch_modal(a) {
        jq(".modal").modal("hide");
        jq("#" + a).modal("show");
      }
      <!--FOR VALIDATION-->
        function fnAlert(message,id) {
            jq('#'+id).show();
            jq('#'+id).empty();
            jq('#'+id).append('<div class="alert alert-danger">' + message + '</div>');
            jq('#'+id).delay(5000).fadeOut('slow');
        }     
    function fnVal() {}
    fnVal.email = function(a) {
      try {
        var b = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
        return b.test(a);
      } catch (c) {
        fnErr({
          fnName: "fnVal.email",
          fnParams: a,
          err: c
        });
      }
    };

      Email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
      jq( "#register_form").click(function() {
        try{
              if(jq("#first_name").val() == "") {
                  fnAlert("Please enter your name","err_register");   
                  return false;
              }
              if((!fnVal.email(jq('#user_email').val()))) {
                  fnAlert("Please enter a valid email address","err_register");   
                  return false;  
              } 
             if(jq('#password_register').val().length <=6) {        
                  fnAlert("Password should be at least 6 characters long","err_register");   
                  return false;  
              }
              }
              catch(e){
              alert("RegisterForm() : "+e.message);
              }

          if(jq("#registerform #terms").is(':checked'))
            $terms = '1';
          else
            $terms = '0';
          if(jq("#registerform #updates").is(':checked'))
            $updates = '1';
          else
            $updates = '0';
          jq.ajax({  
          type:"POST",  
          dataType: 'json',
          url: home_url+"/wp-admin/admin-ajax.php?action=addRegForm",  
          data: { 
            'first_name': jq('#registerform #first_name').val(), 
            'user_email': jq('#registerform #user_email').val(), 
            'password': jq('#registerform #password_register').val(), 
            'terms': $terms, 
            'updates': $updates}, 
          success:function(data){  
            //return false;
            if (data.loggedin == true){
              //alert("google") 
              //jq('#register-message-box').html("<div class='alert alert-success'>Thank you for Registering with us.</div>");
              SetCookie("userlogin_name",data.manual_username,1);
              SetCookie("userlogin_id",data.user_id,1);
              SetCookie("userlogin_email",data.user_email,1);
              jq('#loginModal').modal('hide');
        if(file_exists(home_url+'/wp-content/uploads/users/'+getCookie("userlogin_id")+'.jpg') == true)
          image_path = home_url+'/wp-content/uploads/users/'+getCookie("userlogin_id")+'.jpg';
        else
          image_path = home_url+"/wp-content/themes/Divi/images/not-logged-in.jpg";

            jq("#usericon").attr("src",image_path);
            jq("#before_login_"+comment_title).hide();
            jq("#after_login_"+comment_title).show();              
             // document.location.href = home_url;
            jq('#user_login_status').html('<span class="salutation">Hello, '+data.manual_username+'</span>          |          <a href="javascript:;" onclick="startLogoutPolling()">Logout</a>         ');

            } else {
            if(data.message == 'duplicate'){ 
              jq('#register-message-box').html("<div class='alert alert-danger'>You are already registered with us</div>");
            } else if(data.message == 'Error'){ 
              jq('#register-message-box').html("<div class='alert alert-danger'>Something went wrong. Please try after sometime.</div>");
            } 
          }
          },  
          error: function(errorThrown){  
            //alert(errorThrown);  
          }  
        });
        return false;
        }); 

        //Login Form ------------------------------------------------------
    //  jq( "#login_form").click(function() {
        jq('body').on('click', '#login_form', function(e){ 

      try{
            if(jq("#username").val() == "") {
                fnAlert("Please enter your username","err_login");   
                return false;
            }
      if(jq('#password').val().length <=6) {
                fnAlert("Please enter a valid password","err_login");   
                return false;  
            }
            }
            catch(e){
            alert("LoginForm() : "+e.message);
            }


        jq('form#login p.status').show().text('Sending user info, please wait...');
      jq.ajax({
        type: 'POST',
        dataType: 'json',
        url: home_url+"/wp-admin/admin-ajax.php",
        data: { 
          'action': 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
          'username': jq('form#login #username').val(), 
          'password': jq('form#login #password').val(), 
          'security': jq('form#login #security').val() },
        success: function(data){
          jq('form#login p.status').hide();
          
          if (data.loggedin == true){
            SetCookie("userlogin_name",data.manual_username,1);
            SetCookie("userlogin_id",data.user_id,1);
            SetCookie("userlogin_email",data.user_email,1);
            jq('#loginModal').modal('hide');
            //alert(".before_login_"+comment_title);


        if(file_exists(home_url+'/wp-content/uploads/users/'+getCookie("userlogin_id")+'.jpg') == true)
          image_path = home_url+'/wp-content/uploads/users/'+getCookie("userlogin_id")+'.jpg';
        else
          image_path = home_url+"/wp-content/themes/Divi/images/not-logged-in.jpg";

            jq("#usericon").attr("src",image_path);
            jq("#before_login_"+comment_title).hide();
            jq("#after_login_"+comment_title).show();

            
            jq('#user_login_status').html('<span class="salutation">Hello, '+data.manual_username+'</span>          |          <a href="javascript:;" onclick="startLogoutPolling()">Logout</a>         ');
            
            //document.location.href = '<?=home_url();?>';
            //return false;
          } else {
           //jq('form#login .message-box').text(data.message);
            fnAlert(data.message,"err_login");  
            return false; 
          }
          
        }
      });
      return false;
        });
    
    //--------------------------------------------------

    //--forgot passqord-------------
    jq( "#form_forgetpwd").click(function() {
       try{
            if(jq("#user_login").val() == "") {
                fnAlert("Please enter your email address","err_fpassword");   
                return false;
            }
            }
            catch(e){
            alert("FPasswordForm() : "+e.message);
            }

      jq.ajax({
        url: home_url+"/wp-admin/admin-ajax.php",
        data: { 
          'action': 'sexy_lostpwd_hook', //calls wp_ajax_nopriv_ajaxlogin
          'user_login': jq('#form_lostpwd #user_login').val(), 
          },
        type:   'POST',
        dataType: 'json',
        success: function( result ) {
            //alert(result.success);
          if ( result.success == 1 ) {
             jq('#forgot-message-box').html("<div class='alert alert-success'>Check your e-mail for your new password.</div>");     
          } else {
             jq('#forgot-message-box').html("<div class='alert alert-danger'>Please check your email ID and submit again.</div>");      
          }
        },
        });
      return false; 

    });
    //---------------------
    });

var jq = jQuery.noConflict();

(function() {
var useSSL = 'https:' == document.location.protocol;
var src = (useSSL ? 'https:' : 'http:') +
'//www.googletagservices.com/tag/js/gpt.js';
document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
})();
