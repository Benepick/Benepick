package com.ssafy.benepick.domain.user.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "user_card_category1" , schema = "benepick")
public class UserCardCategory1 {

	@Id
	@Column(name = "user_card_category1_id")
	private Long userCardCategory1Id;

	@Column(nullable = false , name = "user_card_category1_name")
	private String userCardCategory1Name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_card_id" , nullable = false)
	private UserCard userCard;

	@OneToMany(mappedBy = "userCardCategory1", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<UserCardCategory2> userCardCategory2List;

	@OneToMany(mappedBy = "userCardCategory1", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<UserCardBenefit> userCardBenefitList;


	public void addUserCardBenefit(UserCardBenefit userCardBenefit){
		userCardBenefitList.add(userCardBenefit);
	}

	public void addUserCardCategory2(UserCardCategory2 userCardCategory2){
		userCardCategory2List.add(userCardCategory2);
		userCardCategory2.setUserCardCategory1(this);
	}
}
