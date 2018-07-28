package br.com.cmabreu.misc;

import java.io.Serializable;

public class Notification implements Serializable {
	private static final long serialVersionUID = 1L;
	private String name;
	private String url;
	private String id;
	private String version;
	private Integer hitCount;
	private Boolean newData;

	public Notification (String name, String url, String id, String version) {
		this.name = name;
		this.url = url;
		this.id = id;
		this.version = version;
		this.hitCount = 0;
		this.newData = true;
	}
	
	public void incHitCount() {
		if ( this.hitCount > 10 ) {
			this.newData = false;
		} else {
			this.hitCount++;
		}
	}

	public Integer getHitCount() {
		return hitCount;
	}
	
	public Boolean getNewData() {
		return newData;
	}
	
	public Boolean isNewData() {
		return this.newData;
	}
	
	public void setHitCount(Integer hitCount) {
		this.hitCount = hitCount;
	}
	
	public String getName() {
		return name;
	}	
	
	public String getUrl() {
		return url;
	}
	
	public String getId() {
		return id;
	}
	
	public String getVersion() {
		return version;
	}
	
}
