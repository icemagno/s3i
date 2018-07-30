package br.com.cmabreu.controller;

import java.util.Arrays;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Controller
public class AirTrafficController {

	@RequestMapping(value ="/getairtraffic", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
	public @ResponseBody String getAirTraffic( @RequestParam(value = "maxlon") String maxlon, 
			@RequestParam(value = "minlon") String minlon,
			@RequestParam(value = "maxlat") String maxlat,
			@RequestParam(value = "minlat") String minlat ) {
		
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);		
		
		String urlFlightRadar = "https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds="+
				maxlon+","+minlon+","+maxlat+","+minlat+"&faa=1&mlat=1&flarm=1&adsb=1&gnd=0&air=1&vehicles=1&estimated=1&maxage=1000&gliders=1&stats=1";
		
		String response = restTemplate.exchange( urlFlightRadar, HttpMethod.GET,entity, String.class ).getBody();

		return response;
	}
	
}
