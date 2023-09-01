package com.ssafy.benepick.domain.mydata.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class MyDataUser {

	@Id
	private String myDataUserId;

	@Column(nullable = false)
	private String myDataUserName;

	@Column(nullable = false)
	private String myDataUserSocialNumber;

	@Column(nullable = false)
	private String myDataUserPhoneNumber;

	@OneToMany(mappedBy = "myDataUser", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<MyDataCard> myDataCardList;
}
