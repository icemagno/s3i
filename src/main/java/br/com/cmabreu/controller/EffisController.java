package br.com.cmabreu.controller;

import java.nio.charset.Charset;
import java.util.Arrays;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Controller
public class EffisController {

	@RequestMapping(value ="/geteffis", method = RequestMethod.GET, produces = MediaType.APPLICATION_XML_VALUE )
	public @ResponseBody String getEffis( @RequestParam(value = "fromdate") String fromDate, 
			@RequestParam(value = "todate") String toDate ) {
		
		String response = "";
		
		try {
			RestTemplate restTemplate = new RestTemplate();
			restTemplate.getMessageConverters().add( 0, new StringHttpMessageConverter(Charset.forName("UTF-8") ) );
	
			HttpHeaders headers = new HttpHeaders();
			headers.setAccept( Arrays.asList( MediaType.APPLICATION_XML ) );
			headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
	        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);		
			
			String urlEffis = "http://effis.jrc.ec.europa.eu/applications/fire-news/kml/?&amp;q=&amp;from_date="+fromDate+"&amp;to_date="+toDate;
			
			response = restTemplate.exchange( urlEffis, HttpMethod.GET,entity, String.class ).getBody();
		} catch ( Exception e ) {
			System.out.println("Erro ao receber dados do EFFIS: " + e.getMessage() );
		}
		
		return response;
	}
	
	
	@RequestMapping(value ="/getcopernicusfeed", method = RequestMethod.GET, produces = MediaType.APPLICATION_XML_VALUE )
	public @ResponseBody String getFeed( ) {
		
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getMessageConverters().add( 0, new StringHttpMessageConverter(Charset.forName("UTF-8") ) );
		
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept( Arrays.asList( MediaType.APPLICATION_XML ) );
		headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);		
		
		String urlEffis = "http://emergency.copernicus.eu/mapping/activations-rapid/feed";
		
		String response = restTemplate.exchange( urlEffis, HttpMethod.GET,entity, String.class ).getBody();

		return response;
	}
	
	
}
