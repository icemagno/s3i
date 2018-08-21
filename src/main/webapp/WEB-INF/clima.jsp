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
                <a href="/phoenix/resources/img/loading-image.gif" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <aside class="main-sidebar">
        <section class="sidebar" >
          <jsp:include page="sidebar.jsp" />
        </section>
      </aside>
      <div id="contentWraper" class="content-wrapper">
      	
        <section  class="content container-fluid">
          <div class="row">

<!-- ************************************************************************** -->
				<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 "  >          
             
                     <div class="box box-primary"  >
                        <div class="box-header with-border">
                           <h3 id="titleKm" class="box-title">Aguarde...</h3>
                        </div>
                        <div class="box-body" >
                        	<img class="img-responsive" id="wKmImage" src="/phoenix/resources/img/loading-image.gif"></img>
                        </div>
                     </div>
                     

                     
				</div>
<!-- ************************************************************************** -->

                  <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 ">
                  
                     <div class="box box-primary"  >
                        <div class="box-header with-border">
                           <h3 id="titleVisual" class="box-title">Aguarde...</h3>
                        </div>
                        <div class="box-body" >
                        	<img class="img-responsive" id="wVisImage" src="/phoenix/resources/img/loading-image.gif"></img>
                        </div>
                     </div>                     
				  </div>
                     
<!-- ************************************************************************** -->

                  <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 ">
                     <div class="box box-primary"  >
                        <div class="box-header with-border">
                           <h3 id="titleSlot01" class="box-title">Vago</h3>
                        </div>
                        <div class="box-body" >
                        	<img class="img-responsive" id="slot01" src="/phoenix/resources/img/static.gif"></img>
                        </div>
                     </div>                     
				  </div>

<!-- ************************************************************************** -->

                  <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 ">
                     <div class="box box-primary"  >
                        <div class="box-header with-border">
                           <h3 id="titleSlot02" class="box-title">Vago</h3>
                        </div>
                        <div class="box-body" >
                        	<img class="img-responsive" id="slot02" src="/phoenix/resources/img/static.gif"></img>
                        </div>
                     </div>                     
				  </div>


          </div>
        </section>
      </div>


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
    
    
    
    <!-- Magno -->
    <script src="/phoenix/resources/weather.js"></script>  
    
  </body>

</html>

