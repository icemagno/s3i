package br.com.cmabreu.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import br.com.cmabreu.model.User;

@Controller
public class LoginController extends BasicController {

	@Value("${terena.midas.location}")
	private String midasLocation;
	

	@RequestMapping(value = {"/", "/index"}) 
	public String home( Model model, HttpSession session ) {
		model.addAttribute( "midasLocation", midasLocation );
		User  user = getLoggedUser( session );
		model.addAttribute( "user", user );
		
		String result = "index";
		
		if ( user.contains("ROLE_USER") ) {
			result = "citizen";
		}
		
		
		return result;
	}
	
	@RequestMapping(value ="/loginPage")
	public String loginPage(Model model, @RequestParam(value = "error", required = false) String error) {
		model.addAttribute( "midasLocation", midasLocation );
		return "loginPage";
	}	


}
