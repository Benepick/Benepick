package com.ssafy.benepick.domain.card.entity;

import java.util.List;

import com.ssafy.benepick.domain.mydata.entity.MyDataCard;
import com.ssafy.benepick.domain.mydata.entity.MyDataPayment;

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
public class CardCompany {

	@Id
	private Long cardCompanyId;

	@Column(nullable = false)
	private String cardCompanyImgUrl;

	@Column(nullable = false)
	private String cardCompanyName;

	@OneToMany(mappedBy = "cardCompany", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<Card> cardList;
}
