package br.com.cmabreu.config;

import java.security.Principal;
import java.util.Map;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

	 
	 @Override
	 public void registerStompEndpoints(StompEndpointRegistry registry) {
		 registry.addEndpoint("ws").setAllowedOrigins("*")
		 .setHandshakeHandler( new MyHandler() )
		 .withSockJS();
	 }	

	 
	 class MyHandler extends DefaultHandshakeHandler{
		    @Override
		    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler,  Map<String, Object> attributes) {

				org.springframework.security.core.userdetails.User userDetail = 
						(org.springframework.security.core.userdetails.User)SecurityContextHolder
							.getContext()
							.getAuthentication()
							.getPrincipal();
				
				String userName = userDetail.getUsername();		    	

		    	return new UsernamePasswordAuthenticationToken(userName, null);
		    }
	 }


	 
}
