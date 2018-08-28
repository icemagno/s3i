package br.com.cmabreu.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.cmabreu.misc.UserDTO;


@Controller
public class UserController extends BasicController {

	@RequestMapping(value = "/userdetails", method = RequestMethod.GET, produces = "application/json") 
	public @ResponseBody UserDTO userDetails( HttpSession session, HttpServletRequest request ) {
		
		UserDTO user = new UserDTO( getLoggedUser(session) );
		user.setRemoteAddress( request.getRemoteAddr() );
		
		/*
		IPv6Address addr = new IPv6Address( request.getRemoteAddr().getBytes() );
		if(addr.isIPv4Compatible() || addr.isIPv4Mapped()) {
			
		    IPv4Address derivedIpv4Address = addr.getEmbeddedIPv4Address();
		    //byte ipv4Bytes[] = derivedIpv4Address.getBytes();
		    
		    System.out.println( derivedIpv4Address.toAddressString() );
		    
		    
		}		
		*/
		
		return user;
	}	
	
}
