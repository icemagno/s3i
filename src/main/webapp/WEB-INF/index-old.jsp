<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html manifest="">
   <!-- PAGE HEAD -->
   <jsp:include page="head.jsp" />
   <body class="hold-transition skin-blue layout-top-nav">
      <div class="wrapper">
         
      <header class="main-header">
        <!-- PAGE LOGO -->
        <jsp:include page="pagelogo.jsp" />
        <!-- Header Navbar -->
        <nav class="navbar navbar-static-top" role="navigation">
          <!-- Sidebar toggle button-->
          <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
          <span class="sr-only">Toggle navigation</span>
          </a>
          <!-- Navbar Right Menu -->
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <li>
                 <a href="/logout"><i class="fa fa-power-off"></i></a>
              </li>
              <li>
                <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar" >
          <!-- SIDEBAR -->
          <jsp:include page="sidebar.jsp" />
        </section>
        <!-- /.sidebar -->
      </aside>      
         <div style="position:relative" class="content-wrapper">
            
            <section class="content container-fluid">
            	<!-- <div id="world-map" style="position:absolute; top:0px;left:0px;width:100%;height: 100%"></div>  -->
                <div class="row">
                  <div class="col-sm-3">
                  
                     <div class="box box-danger">
                        <!-- Caixa da Esquerda  -->
                        <div class="box-body">
							
						    <div class="mailbox-controls">
						      <!-- Check all button -->
						      <button type="button" class="btn btn-default btn-sm checkbox-toggle"><i class="fa fa-square-o"></i></button>
						      <div class="btn-group">
						        <button type="button" class="btn btn-default btn-sm"><i class="fa fa-trash-o"></i></button>
						        <button type="button" class="btn btn-default btn-sm"><i class="fa fa-reply"></i></button>
						        <button type="button" class="btn btn-default btn-sm"><i class="fa fa-share"></i></button>
						      </div>
						      <!-- /.btn-group -->
						      <button type="button" class="btn btn-default btn-sm"><i class="fa fa-refresh"></i></button>
						      <div class="pull-right">
						        
						        <div class="btn-group">
						          <button type="button" class="btn btn-default btn-sm"><i class="fa fa-chevron-left"></i></button>
						          <button type="button" class="btn btn-default btn-sm"><i class="fa fa-chevron-right"></i></button>
						        </div>
						        <!-- /.btn-group -->
						      </div>
						      <!-- /.pull-right -->
						    </div>						
							
                        </div>
                     </div>
                     
                     
<!-- ************************************************************************** -->
                     <div class="box box-primary">
                        <div class="box-header with-border">
                           <h3 class="box-title">[HelmetCam] 675 SD Henrique</h3>
                        </div>
                        <div id="videoPreview" class="box-body" style="background.color:white">
	                        <div class="embed-responsive embed-responsive-4by3">
	                        <iframe src="https://www.youtube.com/embed/DX9dTLeXSO8?rel=0&mute=1&controls=0&showinfo=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media"></iframe>
	                        </div>
                        </div>
                     </div>
<!-- ************************************************************************** -->

                  </div>
                  
               </div> <!-- ROW -->
            </section>
         </div>
      </div>

      <jsp:include page="footer.jsp" />
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
            
				<ul class="sidebar-menu" data-widget="tree">
			        <li class="header">Emergência</li>
                    <li><a href="javascript:toggleHidrantes();"><i class="fa fa-circle-o text-red"></i><span> Hidrantes</span></a></li>
                    <li><a href="#"><i class="fa fa-circle-o text-red"></i><span> Quartéis de Bombeiros</span></a></li>
                    <li><a href="#"><i class="fa fa-circle-o text-red"></i><span> Hospitais</span></a></li>
               	    <li><a href="#"><i class="fa fa-circle-o text-red"></i><span> Pontos de Pouso</span></a></li>
				</ul>
				<ul class="sidebar-menu" data-widget="tree">
			        <li class="header">Apoio</li>
					<li><a href="javascript:toggleOsm();"><i class="fa fa-circle-o text-blue"></i><span> Mapa OpenStreetMap</span></a></li>			                       	    
					<li><a href="javascript:toggleApa();"><i class="fa fa-circle-o text-blue"></i><span> Áreas de Proteção</span></a></li>			                       	    
					<li><a href="#"><i class="fa fa-circle-o text-blue"></i><span> Trânsito</span></a></li>			                       	    
					<li><a href="javascript:toggleAeroTraffic();"><i class="fa fa-circle-o text-blue"></i><span> Tráfego Aéreo</span></a></li>			                       	    
					<li><a href="#"><i class="fa fa-circle-o text-blue"></i><span> Escolas / Estádios</span></a></li>			                       	    
				</ul>
				<ul class="sidebar-menu" data-widget="tree">
			        <li class="header">Unidades</li>
					<li><a href="#"><i class="fa fa-circle-o text-green"></i><span> HazMat</span></a></li>			                       	    
					<li><a href="#"><i class="fa fa-circle-o text-green"></i><span> Magirus</span></a></li>			                       	    
					<li><a href="#"><i class="fa fa-circle-o text-green"></i><span> UTI</span></a></li>			                       	    
					<li><a href="#"><i class="fa fa-circle-o text-green"></i><span> Apoio</span></a></li>			                       	    
					<li><a href="#"><i class="fa fa-circle-o text-green"></i><span> Pessoal (HelmetCam)</span></a></li>			                       	    
				</ul>
				<ul class="sidebar-menu" data-widget="tree">
			        <li class="header">EPIC</li>
					<li><a href="#"><i class="fa fa-circle-o text-green"></i><span> Permeabilidade do Solo</span></a></li>			                       	    
				</ul>
               
               
            </div>
            <!-- /.tab-pane -->
            <!-- Stats tab content -->
            <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
            <!-- /.tab-pane -->
            <!-- Settings tab content -->
            <div class="tab-pane" id="control-sidebar-settings-tab">
               <h3 class="control-sidebar-heading">Importadores Ativos</h3>
               <ul class="control-sidebar-menu">
                  <li>
                     <a href="javascript:;">
                        <h4 class="control-sidebar-subheading">
                           [XYF4A6] - Teste 06 
                           <span class="pull-right-container">
                           <span class="label label-danger pull-right">70%</span>
                           </span>
                        </h4>
                        <div class="progress progress-xxs">
                           <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
                        </div>
                     </a>
                  </li>
                  <li>
                     <a href="javascript:;">
                        <h4 class="control-sidebar-subheading">
                           [UUH34C] - Teste 01 
                           <span class="pull-right-container">
                           <span class="label label-success pull-right">30%</span>
                           </span>
                        </h4>
                        <div class="progress progress-xxs">
                           <div class="progress-bar progress-bar-success" style="width: 30%"></div>
                        </div>
                     </a>
                  </li>
               </ul>
            </div>
            <!-- /.tab-pane -->
         </div>
      </aside>
      <!-- /.control-sidebar -->
      <!-- Add the sidebar's background. This div must be placed
         immediately after the control sidebar -->
      <div class="control-sidebar-bg"></div>

      <!-- ./wrapper -->
      <!-- LOAD JAVASCRIPT FILES -->
      <jsp:include page="requiredscripts.jsp" />

	  <!-- Trafego Aereo -->
	  <script type="text/javascript" src="/resources/airtraffic.js"></script>

      <!-- Magno -->
      <script src="/resources/sockjs.min.js"></script>
      <script src="/resources/stomp.min.js"></script>
      <script src="/resources/script.js"></script>  
      <script src="${midasLocation}/bower_components/ckeditor/ckeditor.js"></script>
      
	  <!-- Layer Control -->
	  <script type="text/javascript" src="/resources/layers.js"></script>
      
   </body>
</html>