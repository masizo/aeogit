var Contact={initialized:false,initialize:function(){if(this.initialized){return}this.initialized=true;this.build();this.events()},build:function(){this.validations()},events:function(){},validations:function(){$("#contactForm").validate({submitHandler:function(b){var c=$('#contactForm [type="submit"]');var a=c.text();c.html('<span style="padding: 0 20px"><i class="fa fa-refresh fa-spin"></i></span>');$.ajax({type:"POST",url:"php/contact-form.php",data:{name:$("#contactForm #name").val(),email:$("#contactForm #email").val(),subject:$("#contactForm #subject").val(),message:$("#contactForm #message").val()},dataType:"json",success:function(d){if(d.response=="success"){$("#contactSuccess").removeClass("hidden");$("#contactError").addClass("hidden");$("#contactForm #name, #contactForm #email, #contactForm #subject, #contactForm #message").val("").blur().closest(".control-group").removeClass("success").removeClass("error");$("#contactForm label.error").text("");if(($("#contactSuccess").position().top-80)<$(window).scrollTop()){$("html, body").animate({scrollTop:$("#contactSuccess").offset().top-80},300)}c.html(a)}else{$("#contactError").removeClass("hidden");$("#contactSuccess").addClass("hidden");if(($("#contactError").position().top-80)<$(window).scrollTop()){$("html, body").animate({scrollTop:$("#contactError").offset().top-80},300)}c.html(a)}}})},rules:{name:{required:true},email:{required:true,email:true},subject:{required:true},message:{required:true}},highlight:function(a){$(a).closest(".control-group").removeClass("success").addClass("errorz")},success:function(a){$(a).closest(".control-group").removeClass("error").addClass("success")}})}};Contact.initialize();