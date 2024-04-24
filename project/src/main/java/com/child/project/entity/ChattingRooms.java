package com.child.project.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "chatting_room_list")
@Data
public class ChattingRooms {
	
	@Id
	@Column(name = "room_id")
	private String roomId;
	@Column(name = "mem_serial")
	private String memSerial;
	@Column(name = "mem_name")
	private String memName;
	
}
