<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html manifest="">
  <jsp:include page="head.jsp" />

  <body class="hold-transition skin-blue sidebar-collapse sidebar-mini">
    <div class="wrapper">
    
      <!-- Main Header -->
      <header class="main-header">
        <!-- PAGE LOGO -->
        <jsp:include page="pagelogo.jsp" />
        <!-- Header Navbar -->
        <nav class="navbar navbar-static-top" role="navigation">
          
          
          <a href="#" id="sidebarButton" class="sidebar-toggle" data-toggle="push-menu" role="button">
          
          
          <span class="sr-only">Mudar Navegação</span>
          </a>
          <!-- Navbar Right Menu -->
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <li>
                 <a href="/phoenix/logout"><i class="fa fa-power-off text-red"></i> &nbsp;</a>
              </li>
              <li>
                <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <!-- Left side column. contains the logo and sidebar -->
      <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar" >
          <!-- SIDEBAR -->
          <jsp:include page="sidebar.jsp" />
        </section>
        <!-- /.sidebar -->
      </aside>
      <!-- Content Wrapper. Contains page content -->
      <div id="contentWraper" class="content-wrapper">
      	
        <section  class="content container-fluid">
          <!-- https://pt.stackoverflow.com/questions/182188/qual-a-diferenc%C3%A7a-entre-col-lg-col-md-e-col-sm-no-bootstrap   -->
          <div id="theRow" class="row">

<!-- ************************************************************************** -->
          
                  <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 "  >
                  
                     <div class="box box-danger"  >
                        <div class="box-body" style="background-color:white">
						    <div class="mailbox-controls">
						    	<a href="javascript:drawFireArea();" class="btn btn-default btn-sm ad-click-event">
									<img src="resources/img/areaav.png" width="15">
								</a>	

						    	<a href="javascript:editFireArea();" class="btn btn-default btn-sm ad-click-event">
									<img src="resources/img/pencil.png" width="15">
								</a>	

						    	<a href="javascript:deleteFireArea();" class="btn btn-default btn-sm ad-click-event">
									<img src="resources/img/delete.png" width="15">
								</a>	
						    </div>	                           
                        </div>
                     </div>

                     <div class="box box-danger" id="effisForm" style="display:none" >
                        <div class="box-header with-border">
                           <h3 class="box-title">Copernicus EFFIS</h3>
                        </div>
                        <div class="box-body" style="background-color:white">
                        	<img class="img-responsive" src="/phoenix/resources/img/copernicus.png"></img><br>
                        	<span style="text-align:center" id="effisDate"></span>
                        </div>
                     </div>

                  
                     <div class="box box-primary" id="droneCam" style="display:none" >
                        <div class="box-header with-border">
                           <h3 id="droneCamTitle" class="box-title">&nbsp;</h3>
                        </div>
                        <div class="box-body" style="background-color:white">
	                        <div  class="embed-responsive embed-responsive-4by3" >
	                        	<iframe src="https://www.youtube.com/embed/7J02-mB2Qe8?rel=0&mute=1&controls=0&showinfo=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media"></iframe>
	                        </div>
                        </div>
                     </div>


                     <div class="box box-primary" id="userCam" style="display:none" >
                        <div class="box-header with-border">
                           <h3 id="userCamTitle" class="box-title">&nbsp;</h3>
			               <div class="box-tools pull-right">
				               <button type="button" class="btn btn-box-tool" onclick="closeUserCam();"><i class="fa fa-trash"></i>
				               </button>
			               </div>                           
                           
                        </div>
                        <div class="box-body" style="background-color:white">
	                        <div  class="embed-responsive embed-responsive-4by3" >
	                        	<img class="img-responsive" id="userCamImage" src="/phoenix/resources/img/static.gif"></img>
	                        </div>
                        </div>
                     </div>


<!-- ************************************************************************** -->

                  </div>

                  <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 ">
                     <div class="box box-success" id="mapBox">
                        <div class="box-body" >
                        	<div id="world-map"  style="height: calc(100vh - 180px); width: 100%;" ></div>
                        </div>
                     </div>
				  </div>
                     

          </div>
        </section>
      </div>

	<!-- 
	 <footer class="main-footer">
	   <div class="pull-right hidden-xs">
	     v1.2.234
	   </div>
	   <strong>Sistema Phoenix</strong> 
	 </footer>
 	-->

      <!-- Control Sidebar -->
      <aside class="control-sidebar control-sidebar-dark">
        <!-- Create the tabs -->
        <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
          <li class="active"><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
          <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <!-- Home tab content -->
          <div class="tab-pane active" id="control-sidebar-home-tab">
            <h3 class="control-sidebar-heading">Reservado</h3>
          </div>
          <!-- /.tab-pane -->
          <!-- Stats tab content -->
          <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
          <!-- /.tab-pane -->
          <!-- Settings tab content -->
          <div class="tab-pane" id="control-sidebar-settings-tab">

			Reservado

          </div>
        </div>
      </aside>
      <div class="control-sidebar-bg"></div>
    </div>
    
    
    <!-- LOAD JAVASCRIPT FILES -->
    <jsp:include page="requiredscripts.jsp" />
    
	  <!-- Trafego Aereo -->
	  <script type="text/javascript" src="/phoenix/resources/airtraffic.js"></script>

      <!-- Magno -->
      <script src="/phoenix/resources/sockjs.min.js"></script>
      <script src="/phoenix/resources/stomp.min.js"></script>
      <script src="/phoenix/resources/draw.js"></script>  
      <script src="/phoenix/resources/users.js"></script>  
	  <script src="/phoenix/resources/transit.js"></script>
	  <script src="/phoenix/resources/layers.js"></script>
	  <script src="/phoenix/resources/effis.js"></script>
	  
      <script src="/phoenix/resources/script.js"></script>  
    
  </body>

</html>

