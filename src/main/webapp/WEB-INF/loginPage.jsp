<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html manifest="">
   <jsp:include page="head.jsp" />
   <body class="hold-transition" style="margin:0px; padding:0px">
   
      <div class="page-wrap">
      
         <header class="navbar fixed-top navbar-empty">
            <div class="container">
               <div class="mx-auto">
                  <div style="margin:0 auto; width:50px;height:50px">
                     <!-- <img style="width:40px;height:40px" src="/phoenix/resources/img/logo.png"> -->
                  </div>
               </div>
            </div>
         </header>
         
			<div style="min-height: calc(100vh - 150px);">
			         
		         <div class="container navless-container" style="padding: 65px 15px;max-width: 960px;">

					<c:if test = "${param.error}">
				        <div class="alert alert-danger alert-dismissible">
				          <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
				          <h4><i class="icon fa fa-ban"></i>Dados Inválidos</h4>
				          Não foi possível entrar no sistema com as credenciais fornecidas.
				        </div>
					</c:if>
					      
		            <section class="content">
		               <div class="row">
		                  <div class="col-sm-7 brand-holder">
		                     <h1>
		                        <img style="width:60px;height:60px" src="/phoenix/resources/img/logo.png"> Phoenix
		                     </h1>
		                     <h4>Sistema de Comando e Controle de Combate à Incêndio</h4>
		                     <p style="border-bottom: 1px dotted #cacaca;padding-bottom:20px" class="text-justify">
		                        Phoenix é um projeto protótipo para demostração de um sistema de auxílio às
		                        operações de combate à incêndio. <br><br>
		                        <b>Entre com usuário 'admin', 'drone', 'user01', 'user02' ou 'fireman01' com a senha 'admin' para entrar.</b>
		                     </p>
		                      
		                     <div style="margin:0 auto">
		                     	 <p>Baixe em seu tablet ou celular o APP para servir imagens da câmera ao sistema.</p>
			                     <a target="__BLANK" href="https://play.google.com/store/apps/details?id=com.pas.webcam&hl=pt_BR">
			                     	<img style="width:160px;height:60px" src="resources/img/badge.png">
			                     </a>
		                     </div>
		                     	
		                     
		                  </div>
		                  <div class="col-sm-5">
		                     <div class="box box-primary">
                                 <form action="login" role="form" method="post">
	                              <div class="box-body">
                                    <div class="form-group">
                                       <label for="user_login">Nome de Login</label>
                                       <input placeholder="Usuário" class="form-control" autocomplete="off" autofocus="autofocus" autocapitalize="off" autocorrect="off" required="required" name="username" id="user_login" type="text">
                                    </div>
                                    <div class="form-group">
                                       <label for="user_password">Senha</label>
                                       <input autocomplete="off" placeholder="Senha" class="form-control" required="required" name="password" id="user_password" type="password">
                                    </div>
                                    <div></div>
                                    <div class="box-footer">
                                       <input name="commit" value="Entrar" class="btn btn-block btn-success btn-lg" type="submit">
                                       <input type="hidden" class="form-control" name="error" value="">
                                    </div>
                                   </div> 
                                 </form>
		                     </div>
		                  </div>
		               </div>
		            </section>
            
            	</div>
            
            
         </div>
         <hr class="footer-fixed">
         <div class="container footer-container">
            <div class="footer-links">
               Phoenix v1.2.234
            </div>
         </div>
      </div>
      <jsp:include page="requiredscripts.jsp" />
   </body>
</html>

