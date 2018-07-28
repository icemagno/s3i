package br.com.cmabreu.document;

import java.io.Serializable;
import java.util.UUID;

public class Module  implements Serializable {
	private static final long serialVersionUID = 1L;

	private String id;
	private String content;
	private String title;
	private int index;
	String userName;
	
	public Module( String title, String content, String userName ) {
		this.id = UUID.randomUUID().toString();
		this.index = 0;
		this.content = content;
		this.title = title;
		this.userName = userName;
	}
	
	public String getId() {
		return id;
	}
	
	public String getContent() {
		return content;
	}
	
	public void setContent(String content) {
		this.content = content;
	}
	
	public int getIndex() {
		return index;
	}
	
	public void setIndex(int index) {
		this.index = index;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
}
