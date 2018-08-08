package br.com.cmabreu.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SystemController extends BasicController {

	@Value("${terena.midas.location}")
	private String midasLocation;		
	
	@RequestMapping(value = "/camera") 
	public String userDetails( Model model, HttpSession session ) {
		model.addAttribute( "midasLocation", midasLocation );
		model.addAttribute( "user", getLoggedUser(session) );		
		return "camera";
	}		
	
}
