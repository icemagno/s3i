package br.com.cmabreu.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import br.com.cmabreu.model.User;
import br.com.cmabreu.repository.UserRepository;

public class BasicController {

    @Autowired
    UserRepository userRepository;  	
	
	public User whoami() {
		org.springframework.security.core.userdetails.User userDetail = 
				(org.springframework.security.core.userdetails.User)SecurityContextHolder
					.getContext()
					.getAuthentication()
					.getPrincipal();
		
		String userName = userDetail.getUsername();
	    return userRepository.findByName(userName);
	    
	}	
		
	
	public User getLoggedUser( HttpSession session ) {
		User user = (User)session.getAttribute( "LOGGEDUSER" ); 
		if( user == null ) {
			user = whoami( );
			session.setAttribute( "LOGGEDUSER", user );
		} else {
			//
		}
		return user;
	}	
	
}
