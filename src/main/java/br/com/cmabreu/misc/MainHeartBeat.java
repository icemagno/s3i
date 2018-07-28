package br.com.cmabreu.misc;

import br.com.cmabreu.service.DocumentService;
import br.com.cmabreu.service.NotificationService;

public class MainHeartBeat implements Runnable {
	private NotificationService notificationService;
	private DocumentService documentService;

	public MainHeartBeat(  NotificationService notificationService, DocumentService documentService ) {
		this.notificationService = notificationService;
		this.documentService = documentService;
	}

	@Override
	public void run() {
		/*
			Isso eh um teste de digitacao
		*/
		/*
		String texto = UUID.randomUUID().toString();
		List<Module> modules = documentService.getModules();
		if( modules.size() > 0 ) {
			Module first = modules.get(0);
			documentService.updateModule( first.getId(), "<p>"+texto+"</p>" );
		}
		notificationService.notifyUsers( );
		*/
		
	}
	
}	
