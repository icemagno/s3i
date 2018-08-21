<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<%@ page pageEncoding="UTF-8" %>
<text class="content">


      <ul class="sidebar-menu" data-widget="tree">
      
      
        <li class="header">MENU PRINCIPAL</li>

        <li class="treeview">
          <a href="#">
            <i class="fa fa-fire"></i><span>Emergência</span>
            <span id="solucion-count" class="pull-right-container">
            </span>
          </a>
          <ul class="treeview-menu" id="emerg-menu">
	            <li>
	            	<a href="javascript:toggleEffis();"><i class="fa fa-circle-o text-red"></i><span> Copernicus EFFIS</span>
			            <span id="effisMenuCheck" class="pull-right-container" style="display:none">
			              <small class="label pull-right bg-green"> <i class="fa fa-check-square text-blue"></i> </small>
			            </span>	 
	            	</a>
	            </li>
	            <li>
	            	<a href="javascript:toggleGwis();"><i class="fa fa-circle-o text-red"></i><span> Copernicus GWIS</span>
			            <span id="gwisMenuCheck" class="pull-right-container" style="display:none">
			              <small class="label pull-right bg-green"> <i class="fa fa-check-square text-blue"></i> </small>
			            </span>	 
	            	</a>
	            </li>
          </ul>
        </li>
        
        <li class="treeview">
          <a href="#">
            <i class="fa fa-flash"></i><span>Componentes</span>
            <span id="solucion-count" class="pull-right-container">
            </span>
          </a>
          <ul class="treeview-menu" id="comp-menu">
	            <li>
	            	<a href="javascript:toggleHidrantes();"><i class="fa fa-circle-o text-red"></i><span> Hidrantes</span>
			            <span id="hidranteMenuCheck" class="pull-right-container" style="display:none">
			              <small class="label pull-right bg-green"> &nbsp </small>
			            </span>	            
	            	</a>
	            </li>
	            <li><a href="javascript:niy();"><i class="fa fa-circle-o text-red"></i><span> Quartéis de Bombeiros</span></a></li>
	            <li><a href="javascript:niy();"><i class="fa fa-circle-o text-red"></i><span> Hospitais</span></a></li>
	       	    <li><a href="javascript:niy();"><i class="fa fa-circle-o text-red"></i><span> Pontos de Pouso</span></a></li>          
          </ul>
        </li>


        <li class="treeview">
			<a href="#">
				<i class="fa fa-database"></i><span>Camadas</span>
			</a>
			<ul class="treeview-menu" id="apoio-menu">
				<li>
					<a href="javascript:toggleOsm();"><i class="fa fa-circle-o text-blue"></i><span> Mapa OpenStreetMap</span>
			            <span id="osmMenuCheck" class="pull-right-container">
			              <small class="label pull-right bg-green"> <i class="fa fa-check-square text-blue"></i> </small>
			            </span>	 
					</a>
				</li>
				
				<li>
					<a href="javascript:toggleSatelite();"><i class="fa fa-circle-o text-blue"></i><span> Imagem Satélite</span>
			            <span id="sateliteMenuCheck" class="pull-right-container" style="display:none">
			              <small class="label pull-right bg-green"> <i class="fa fa-check-square text-blue"></i> </small>
			            </span>	 
					</a>
				</li>					
							                       	    
				<li>
					<a href="javascript:toggleApa();"><i class="fa fa-circle-o text-blue"></i><span> Áreas de Proteção</span>
			            <span id="apaMenuCheck" class="pull-right-container" style="display:none">
			              <small class="label pull-right bg-green"> &nbsp </small>
			            </span>	 
					</a>
				</li>			                       	    
				
				<li>
					<a href="javascript:toggleTransit();"><i class="fa fa-circle-o text-blue"></i><span> Trânsito</span>
			            <span id="transitMenuCheck" class="pull-right-container" style="display:none">
			              <small class="label pull-right bg-green"> &nbsp </small>
			            </span>	 
					</a>
				</li>	

				<li>
					<a href="javascript:toggleAeroTraffic();"><i class="fa fa-circle-o text-blue"></i><span> Tráfego Aéreo</span>
			            <span id="aeroMenuCheck" class="pull-right-container" style="display:none">
			              <small class="label pull-right bg-green"> &nbsp </small>
			            </span>	 
					</a>
				</li>			                       	    
				<li><a href="javascript:niy();"><i class="fa fa-circle-o text-blue"></i><span> Escolas / Estádios</span></a></li>
			</ul>	
        </li>		

        <li class="treeview">
          <a href="#">
            <i class="fa fa-cloud"></i><span>Auxiliar</span>
          </a>
          <ul class="treeview-menu" >
				<li><a href="/phoenix/clima"><i class="fa fa-circle-o"></i><span> Clima</span></a></li>			                       	    
		  </ul>
        </li>

        <li class="treeview">
          <a href="#">
            <i class="fa fa-bus"></i><span>Unidades</span>
          </a>
          <ul class="treeview-menu" id="unidade-menu">
				<li><a href="javascript:niy();"><i class="fa fa-circle-o text-green"></i><span> HazMat</span></a></li>			                       	    
				<li><a href="javascript:niy();"><i class="fa fa-circle-o text-green"></i><span> Magirus</span></a></li>			                       	    
				<li><a href="javascript:niy();"><i class="fa fa-circle-o text-green"></i><span> UTI</span></a></li>			                       	    
				<li><a href="javascript:niy();"><i class="fa fa-circle-o text-green"></i><span> Apoio</span></a></li>			                       	    
				<li><a href="javascript:niy();"><i class="fa fa-circle-o text-green"></i><span> Drone</span></a></li>			                       	    
				<li><a href="javascript:niy();"><i class="fa fa-circle-o text-green"></i><span> Pessoal (HelmetCam)</span></a></li>	
		  </ul>
        </li>
        
        
<security:authorize access="hasRole('ROLE_ADMIN')">
        <li class="header">ADMINISTRAÇÃO</li>
	        <li>
	          <a href="javascript:niy();">
	            <i class="fa fa-users"></i><span>Usuários</span>
	          </a>
	        </li>
	        <li>
	          <a href="javascript:niy();">
	            <i class="fa fa-cogs"></i><span>Configuração</span>
	          </a>
	        </li>
</security:authorize>	        
	                
		</ul>
</text>		
