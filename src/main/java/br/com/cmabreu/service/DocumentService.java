package br.com.cmabreu.service;

import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import br.com.cmabreu.document.Document;
import br.com.cmabreu.document.Footer;
import br.com.cmabreu.document.Header;
import br.com.cmabreu.document.Module;

@Service("documentService")
@Scope("singleton")
public class DocumentService {
	private Document document;
	
	public void updateModule( String moduleId, String content ) {
		document.updateModule(moduleId, content);
	}
	
	public List<Module> getModules() {
		return document.getModules();
	}
	
	public void fakeInit() {
		document = new Document( new Header("<h3>Cabecalho</h3>"), new Footer("<h5>Rodape</h5>") );
	}
	
	public void addModule( Module module ) {
		document.addModule( module );
	}
	
	public Document getDocument() {
		return document;
	}
	
	public boolean hasModule( String userName ) {
		return document.hasModule( userName );
	}

	public Module getModule( String userName ) {
		return document.getModule( userName );
	}
	
	
}
