package br.com.cmabreu.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.cmabreu.misc.UserDTO;

@Controller
public class UserController extends BasicController {

	@RequestMapping(value = "/userdetails", method = RequestMethod.GET, produces = "application/json") 
	public @ResponseBody UserDTO userDetails( HttpSession session ) {
		UserDTO user = new UserDTO( getLoggedUser(session) );
		return user;
	}	
	
}
