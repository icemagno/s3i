package br.com.cmabreu.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import br.com.cmabreu.misc.UserDTO;


@Controller
public class UserController extends BasicController {

	@RequestMapping(value = "/userdetails", method = RequestMethod.GET, produces = "application/json") 
	public @ResponseBody UserDTO userDetails( HttpSession session, HttpServletRequest request,
			@RequestParam(value = "ip", required = true) String ip ) {
		
		UserDTO user = new UserDTO( getLoggedUser(session) );
		user.setRemoteAddress( ip );
		
		return user;
	}	

	
	@RequestMapping(value = "/getuserdata", method = RequestMethod.GET, produces = "application/json") 
	public @ResponseBody String userData( HttpSession session, HttpServletRequest request ) {
		
		RestTemplate restTemplate = new RestTemplate();
		String userData = restTemplate.getForObject("http://gturnquist-quoters.cfapps.io/api/random", String.class); 
		
		return userData;
	}	
	
	
	
}
