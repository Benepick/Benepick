package com.ssafy.benepick.mydata.domain.card.entity;

import java.util.ArrayList;
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

}
