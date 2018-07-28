package br.com.cmabreu.document;

import java.io.Serializable;

public class Footer  implements Serializable {
	private static final long serialVersionUID = 1L;

	private String content;
	
	public Footer( String content ) {
		this.content = content;
	}
	
	public String getContent() {
		return content;
	}

}
