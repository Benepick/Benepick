package com.ssafy.benepick.domain.card.entity;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.benepick.domain.user.entity.UserCard;
import com.ssafy.benepick.domain.user.entity.UserCardCategory1;

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
@Table(name = "category1" , schema = "benepick_bank")
public class Category1 {

	@Id
	@Column(name = "category1_id")
	private Long category1Id;

	@Column(nullable = false , name = "category1_name")
	private String category1Name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "card_code" , nullable = false)
	private Card card;

	@OneToMany(mappedBy = "category1", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<Category2> category2List;

	@OneToMany(mappedBy = "category1", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<CardBenefit> cardBenefitList;


	public UserCardCategory1 toUserCardCategory1(UserCard userCard){
		return UserCardCategory1.builder()
			.userCardCategory1Id(category1Id)
			.userCardCategory1Name(category1Name)
			.userCard(userCard)
			.userCardBenefitList(new ArrayList<>())
			.userCardCategory2List(new ArrayList<>())
			.build();
	}
}
