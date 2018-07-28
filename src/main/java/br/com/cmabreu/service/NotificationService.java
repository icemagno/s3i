package br.com.cmabreu.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

	@Autowired
	private SimpMessagingTemplate messagingTemplate;
	
	@Autowired
	private DocumentService documentService;
	  
	public void notifyUsers( ) {
		try {
			messagingTemplate.convertAndSend("/queue/notify", documentService.getDocument() );
		} catch ( Exception e ) {
			System.out.println(" >> Erro: " + e.getMessage() );
		}
		
	}	  
	
}
