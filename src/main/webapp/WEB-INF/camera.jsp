<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html manifest="">
  <jsp:include page="head.jsp" />

  <body class="hold-transition skin-blue layout-top-nav">
    <div class="wrapper">
    
      <header class="main-header">
      
        <jsp:include page="pagelogo.jsp" />
      
        <nav class="navbar navbar-static-top" role="navigation">
          
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <li>
                 <a href="/phoenix/logout"><i class="fa fa-power-off text-red"></i> &nbsp;</a>
              </li>
            </ul>
          </div>
          
        </nav>
        
      </header>

      <div id="contentWraper" class="content-wrapper">
      	
        <section  class="content container-fluid">
          <div id="theRow" class="row">

<!-- ************************************************************************** -->
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 "  >
                  
                     <div class="box box-danger"  >
                        <div class="box-header with-border">
                           <a id="takePhotoBtn" class="btn btn-app"><i class="fa fa-camera "></i> Fotografar</a>
                        </div>                     
                        <div class="box-body" style="background-color:white">
                        	<form>
                        		<input id="myFileInput" type="file" accept="image/*;capture=camera">
                        	</form>
                        	<!-- 	
                        	<div  class="embed-responsive embed-responsive-4by3" >
                        		<video id="video" autoplay></video>
                        	</div>
                        	-->
                        </div>
                     </div>
					 <!-- 	
                     <div class="box box-danger"  >
                        <div class="box-body" style="background-color:white">
                        	<div  class="embed-responsive embed-responsive-4by3" >
                        		<canvas id="photoCanvas" ></canvas>
                        	</div>
                        </div>
                     </div>
					 -->

                  </div>

<!-- ************************************************************************** -->
          
          </div>
        </section>
      </div>

	 <footer class="main-footer">
	   <div class="pull-right hidden-xs">
	     v1.2.234
	   </div>
	   <strong>Sistema Phoenix</strong> 
	 </footer>

    </div>
    <!-- LOAD JAVASCRIPT FILES -->
    <jsp:include page="requiredscripts.jsp" />
    
    <script src="/phoenix/resources/camera.js"></script>  
  </body>

</html>

