package br.com.cmabreu.document;

import java.io.Serializable;

public class Header  implements Serializable {
	private static final long serialVersionUID = 1L;

	private String content;
	
	public Header( String content ) {
		this.content = content;
	}
	
	public String getContent() {
		return content;
	}	
	
}
