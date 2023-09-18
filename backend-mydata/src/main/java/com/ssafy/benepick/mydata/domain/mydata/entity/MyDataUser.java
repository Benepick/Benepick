package com.ssafy.benepick.mydata.domain.mydata.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "mydata_user" , schema = "benepick_bank")
public class MyDataUser {

	@Id
	@Column(name = "mydata_user_id")
	private String myDataUserId;

	@Column(nullable = false ,name = "mydata_user_name")
	private String myDataUserName;

	@Column(nullable = false , name = "mydata_user_social_number")
	private String myDataUserSocialNumber;

	@Column(nullable = false , name = "mydata_user_phone_number")
	private String myDataUserPhoneNumber;

	@OneToMany(mappedBy = "myDataUser", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<MyDataCard> myDataCardList;
}
