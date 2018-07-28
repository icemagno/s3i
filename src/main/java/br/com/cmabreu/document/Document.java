package br.com.cmabreu.document;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Document implements Serializable {
	private static final long serialVersionUID = 1L;
	private List<Module> modules;
	private Header header;
	private Footer footer;
	
	public Document( Header header, Footer footer ) {
		this.header = header;
		this.footer = footer;
		this.modules = new ArrayList<Module>();
	}

	public synchronized void updateModule( String moduleId, String content ) {
		for( Module md : modules ) {
			if( md.getId().equals( moduleId ) ) {
				md.setContent(content);
			}
		}
	}
	
	public synchronized int addModule( Module module ) {
		int index = 0;
		modules.add( module );
		for( Module md : modules ) {
			md.setIndex(index);
			index++;
		}
		return module.getIndex();
	}
	
	public Header getHeader() {
		return header;
	}
	
	public Footer getFooter() {
		return footer;
	}
	
	public synchronized List<Module> getModules() {
		return modules;
	}

	public synchronized boolean hasModule(String userName) {
		for( Module md : modules ) {
			if( md.getUserName().equals( userName ) ) return true;
		}
		return false;
	}

	public synchronized Module getModule(String userName) {
		for( Module md : modules ) {
			if( md.getUserName().equals( userName ) ) return md;
		}
		return null;
	}	
}
